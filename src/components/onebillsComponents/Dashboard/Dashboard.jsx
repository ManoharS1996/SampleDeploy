import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import GridLayout from 'react-grid-layout';
import { Tooltip } from "react-tooltip";

import { LiaUsersSolid, LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdCurrencyRupee, MdOutlineMiscellaneousServices, MdOutlinePayments } from "react-icons/md";
import { FaLock, FaLockOpen, FaMoneyBillTransfer } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaSyncAlt } from "react-icons/fa";
import { GrDocumentUpdate, GrServices } from "react-icons/gr";
import { CgLoadbarDoc } from "react-icons/cg";
import { FaCreativeCommonsNc } from "react-icons/fa";
import { getRecordData, updateTableData, getTopReportsData, getPaymentsTopReportsData, getTableData, getPaymentsRevenueCount } from "../Reports/CRUDoperations";
import LayoutsDropdown from "./LayoutsDropdown";
import { defaultDashboardLayouts } from "../../../assets/DefaultDashboardLayouts/DefaultLayouts";
import StackBars from "../Reports/Charts/StackedBarChart";
import HorizontalBars from "../Reports/Charts/HorizontalBars";
import PieAnimation from "../Reports/Charts/PieAnimation";
import PieHighlights from "../Reports/Charts/PieHighlights";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
// import PieSizing from "../Reports/Charts/PieSizing";

import theme from '../../../../shared/theme.json'

import {
    MainContainer, ContentContainer, BodyDiv, SumsDiv,
    Tile, Icon, TextDiv, Text1, Text2, Dashbords,
    Box, DashboardHeaderContainer, DashboardActionBtn, InfoIcon
} from "./StyledComponents";

import SideNav from "../SideNav/SideNav";
import Header from "../Header/Header";

const widgetStyles = {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 1)',
    borderRadius: '1rem',
    backdropFilter: 'blur(4px)',
    webkitBackdropFilter: 'blur(5px)',
    border: '1px solid #EEEEEE',
}

const Dashboard = () => {
    const [layout, setLayout] = useState({})
    const [onDrag, setOnDrag] = useState(false)
    const [width, setWidth] = useState(0)
    const [clientsCount, setClientsCount] = useState(0)
    const [invoicesCount, setInvoicesCount] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [allLayouts, setAllLayouts] = useState([])
    const [lockLayout, setLockLayout] = useState(true)
    const [reportsData, setReportsData] = useState([])
    const [isLayoutModified, setLayoutModifying] = useState(false)
    const [topReportData, setTopReportData] = useState(null)
    const containerRef = useRef(null)

    const localUserId = JSON.parse(localStorage.getItem('userId'))
    const userType = sessionStorage.getItem('userType')

    const onLayoutChange = (newLayout) => {
        { layout?.id && setLayout({ ...layout, layouts: newLayout }) }
        setLayoutModifying(!lockLayout)
        // console.log('new layout', newLayout);
        const fetchTopReportData = async () => {
            switch (layout?.id) {
                case 1:
                    setTopReportData(await getTopReportsData('clients'))
                    break
                case 2:
                    setTopReportData(await getTopReportsData('products'))
                    break
                case 3:
                    setTopReportData(await getTopReportsData('invoices'))
                    break
                case 4:
                    setTopReportData(await getPaymentsTopReportsData())
                    break
                default:
                    break
            }
        }
        fetchTopReportData()
    }

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
            }
        };
        const getReportsData = async () => {
            try {
                const response = await getTableData('reports')
                if (!response.err) {
                    setReportsData(response.reports)
                }
                await getPaymentsRevenueCount()
            } catch (err) {
                console.error(err)
            }
        }

        getReportsData()
        updateWidth();
        getClientsCount()
        getRevenueCount()
        getInvoicesCount()
        getDefaultLayouts()
        RenderLoadingAlert()
        setLayoutModifying(false)
        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, [])

    const getDefaultLayouts = async () => {
        const userData = await getRecordData('users', localUserId)
        // console.log(userData.dashboard_layouts)

        setAllLayouts(userData?.dashboard_layouts || [])
        if (userData.dashboard_layouts && userData.dashboard_layouts.length > 0) {
            const userSelectedLayoutId = userData.selected_layout.toString()
            const updatedLayoutData = userData.dashboard_layouts.filter(item => item.id.toString() === userSelectedLayoutId)[0]

            setLayout({ ...updatedLayoutData })
        } else {
            setLayout(defaultDashboardLayouts[0])
        }
    }

    const onDragStart = () => {
        setOnDrag(true);
    }

    const onDragStop = (layout) => {
        setOnDrag(false);
        // Auto-rearrange items on drag stop
        const rearrangedLayout = layout.map((item) => ({
            ...item,
            y: Math.floor(item.y / 2), // Example adjustment logic (you can modify this logic as needed)
        }));
        // setLayout(rearrangedLayout);
    }

    const getClientsCount = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/table-record-count/clients`, { method: 'GET' });
        const data = await response.json()
        // console.log(data)
        setClientsCount(data?.[0]?.count || 0)
    }

    const getInvoicesCount = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/table-record-count/invoices`, { method: 'GET' });
        const data = await response.json()
        // console.log(data)
        setInvoicesCount(data?.[0]?.count || 0)
    }

    const getRevenueCount = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/total-revenue-count`, { method: 'GET' });
        const data = await response.json()
        // console.log(data)
        setTotalRevenue(data?.[0]?.total_gross_amount || 0)
    }

    const updateLayout = async () => {
        localStorage.setItem('myGridLayout', JSON.stringify(layout))
        await updateTableData('users', localUserId, { dashboard_layouts: allLayouts.length > 0 ? allLayouts.map(item => layout.id === item.id ? layout : item) : [layout] })
        setLayoutModifying(false)

        return (Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Layout Updated Successfully",
            showConfirmButton: false,
            timer: 1500
        }))
    }

    const RenderLoadingAlert = () => {
        let timerInterval;
        Swal.fire({
            title: "HoldOn!",
            html: "Almost There, Your Journey Awaits!  <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
    }
    // console.log(topReportData)

    return (
        <MainContainer>
            <Header />

            <ContentContainer>
                <SideNav />

                {userType === 'super-admin' ?
                    <SuperAdminDashboard>
                        super Admin dashboard
                    </SuperAdminDashboard> :
                    <BodyDiv>
                        <SumsDiv>
                            <Tile>
                                <Icon style={{ backgroundColor: 'rgba(217, 217, 254, 0.8)' }}>
                                    {
                                        layout.id === 1 ? <LiaUsersSolid size={25} /> :
                                            layout.id === 2 ? <GrServices size={25} /> :
                                                layout.id === 3 ? <LiaFileInvoiceDollarSolid size={25} /> :
                                                    layout.id === 4 ? <MdOutlinePayments size={25} /> :
                                                        '-'
                                    }
                                </Icon>

                                <TextDiv>
                                    <Text1>{
                                        layout.id === 1 ? 'Total Clients' :
                                            layout.id === 2 ? 'Total Services' :
                                                layout.id === 3 ? 'Total Invoices' :
                                                    layout.id === 4 ? 'Total Amount' :
                                                        '-'
                                    }</Text1>
                                    <Text2>{topReportData?.[Object.keys(topReportData)?.[0]] || 0}</Text2>
                                </TextDiv>
                            </Tile>

                            <Tile>
                                <Icon style={{ backgroundColor: 'rgba(225, 252, 225, 0.8)' }}>
                                    {
                                        layout.id === 1 ? <IoPersonSharp size={25} style={{ color: '#6EC207' }} /> :
                                            layout.id === 2 ? <MdCurrencyRupee size={25} style={{ color: '#6EC207' }} /> :
                                                layout.id === 3 ? <CgLoadbarDoc size={25} style={{ color: '#6EC207' }} /> :
                                                    layout.id === 4 ? <FaMoneyBillTransfer size={25} style={{ color: '#6EC207' }} /> :
                                                        '-'
                                    }
                                    {/* <MdCurrencyRupee /> */}
                                </Icon>

                                <TextDiv>
                                    <Text1>{
                                        layout.id === 1 ? 'Active Clients' :
                                            layout.id === 2 ? 'Active Services' :
                                                layout.id === 3 ? 'Active Invoices' :
                                                    layout.id === 4 ? 'Recieved Amount' :
                                                        '-'
                                    }</Text1>

                                    <Text2>{topReportData?.[Object.keys(topReportData)?.[1]] || 0}</Text2>
                                </TextDiv>
                            </Tile>

                            {layout.id === 4 &&
                                <Tile>
                                    <Icon style={{ backgroundColor: '#ccc' }}>
                                        <FaMoneyBillTransfer size={25} style={{ color: '#000' }} />
                                    </Icon>

                                    <TextDiv>
                                        <Text1>
                                            Requested Amount
                                        </Text1>

                                        <Text2>{topReportData?.[Object.keys(topReportData)?.[2]] || 0}</Text2>
                                    </TextDiv>
                                </Tile>
                            }

                            <DashboardHeaderContainer>
                                <InfoIcon data-tooltip-id="dashboard-info">
                                    <BsFillInfoCircleFill />
                                </InfoIcon>

                                <Tooltip
                                    id="dashboard-info"
                                    style={{
                                        width: "20vw",
                                        borderRadius: '0.4rem',
                                        opacity: '1',
                                        fontFamily: 'calibri',
                                        textAlign: 'left',
                                        fontSize: '0.7rem'
                                    }}
                                >
                                    The dashboard offers a fully customizable experience with drag-and-drop
                                    widgets, real-time insights, and quick access to reports and key metrics
                                    for efficient billing management.
                                </Tooltip>

                                <DashboardActionBtn
                                    type='button'
                                    title='Lock / Unlock layout'
                                    onClick={() => setLockLayout(!lockLayout)}
                                >
                                    {lockLayout ? <FaLock size={15} /> : <FaLockOpen size={15} />}
                                </DashboardActionBtn>

                                {!isLayoutModified &&
                                    <DashboardActionBtn
                                        type="button"
                                        title="Update"
                                        onClick={updateLayout}
                                    >
                                        <FaSyncAlt size={15} />
                                    </DashboardActionBtn>
                                }
                            </DashboardHeaderContainer>
                        </SumsDiv>

                        <Dashbords ref={containerRef}>
                            <GridLayout
                                className="layout"
                                compactType={'horizontal'}
                                layout={layout.layouts}
                                cols={12}
                                onResize={() => { }}
                                rowHeight={50}
                                width={width - 5}
                                margin={[5, 6]}
                                autoSize
                                isBounded={false}
                                isResizable={false}
                                isDraggable={!lockLayout}
                                preventCollision={true}
                                allowOverlap={false}
                                onDragStart={onDragStart}
                                onDragStop={onDragStop}
                                onLayoutChange={onLayoutChange}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    overflow: 'auto',
                                    flexGrow: '1',
                                    background: 'transparent',
                                    display: 'grid',
                                    justifyContent: 'center',
                                }}
                            >
                                {/* {layout.map((item) => (
                                <Box key={item.i} data-grid={item} style={widgetStyles}>
                                    <span className="text">{item.i}</span>
                                </Box>
                            ))} */}

                                <Box key='1' style={widgetStyles}>
                                    <StackBars
                                        widgetId='1'
                                        reportsList={reportsData}
                                        layout={layout}
                                        setLayout={setLayout}
                                        setLayoutModifying={setLayoutModifying}
                                        lockLayout={lockLayout}
                                    />
                                </Box>

                                <Box key='a' style={widgetStyles}>
                                    <PieHighlights
                                        widgetId='a'
                                        reportsList={reportsData}
                                        layout={layout}
                                        setLayout={setLayout}
                                        setLayoutModifying={setLayoutModifying}
                                        lockLayout={lockLayout}
                                    />
                                </Box>

                                <Box key='b' style={widgetStyles}>
                                    <HorizontalBars
                                        widgetId='b'
                                        reportsList={reportsData}
                                        layout={layout}
                                        setLayout={setLayout}
                                        setLayoutModifying={setLayoutModifying}
                                        lockLayout={lockLayout}
                                    />
                                </Box>

                                <Box key='c' style={widgetStyles}>
                                    <PieHighlights
                                        widgetId='c'
                                        reportsList={reportsData}
                                        layout={layout}
                                        setLayout={setLayout}
                                        setLayoutModifying={setLayoutModifying}
                                        lockLayout={lockLayout}
                                    />
                                </Box>

                                {/* <Box key='d' style={widgetStyles}>
                                <PieSizing
                                    widgetId='d'
                                    reportsList={reportsData}
                                    layout={layout}
                                    setLayout={setLayout}
                                    setLayoutModifying={setLayoutModifying}
                                />
                            </Box> */}
                            </GridLayout>
                        </Dashbords>
                    </BodyDiv>}
            </ContentContainer>
        </MainContainer>
    );
};

export default Dashboard;
