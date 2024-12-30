// MODULE IMPORTS
import { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';

// COMPONENT IMPORTS
import WonBillsContext from '../../../context/WonBillsContext';

// STYLE IMPORTS
import { MainContainer, Title, Options, Option, SpanTag, Icon, LoginBtn, TitleDiv, Option2, ToggleBtn } from './StyledComponents'

// ICON IMPORTS
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { PiInvoiceLight } from "react-icons/pi";
import { IoWallet } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { FaTableList } from "react-icons/fa6";
import { IoBusiness } from "react-icons/io5";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { Translate } from '@mui/icons-material';
import { RiLogoutCircleLine } from "react-icons/ri";

const SideNav = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const cookies = new Cookies();
    const { setActiveTab, companyName } = useContext(WonBillsContext);
    const PathText = location.pathname.split('/')
    const TabOptions = [
        { name: 'Dashboard', label: 'Dashboard', link: '/Dashboard', icon: <IoMdHome size={20} /> },
        { name: 'Clients', label: 'Clients', link: '/Clients', icon: <FaUser /> },
        { name: 'Items', label: 'Items', link: '/Items', icon: <AiFillProduct size={19} /> },
        { name: 'Invoices', label: 'Invoices', link: '/Invoices', icon: <PiInvoiceLight size={20} /> },
        { name: 'Purchases', label: 'Purchases', link: '/Purchases', icon: <IoWallet size={20} /> },
        { name: 'Settings', label: 'Settings', link: '/Settings', icon: <IoIosSettings size={22} /> },
    ]

    const [expand, setExpand] = useState(false)

    useEffect(() => {
        setActiveTab(PathText[1]);
    }, [])

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
            customClass: {
                popup: 'swal2-popup',
                title: 'swal2-title',
                htmlContainer: 'swal2-html-container',
                confirmButton: 'swal2-confirm',
                cancelButton: 'swal2-cancel',
                icon: 'my-custom-icon',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                //  REMOVE THE JWT TOKEN COOKIE
                cookies.remove('WonBillsUserToken');
                localStorage.clear()
                sessionStorage.clear()
                // REMOVE USERID FROM LOCALSTORAGE
                // localStorage.removeItem('userId');

                // REDIRECT TO LOGIN PAGE
                navigate("/login");
            }
        });
    };

    const activeUserType = JSON.parse(localStorage.getItem('userDetails'))?.user_type || 'customer'

    return (
        <WonBillsContext.Consumer>
            {(value) => {
                const { activeTab, isNavExpanded, setActiveTab, setNavExpanded } = value
                const onClickTab = (tab) => {
                    setActiveTab(tab)
                }

                const onToggleNav = (value) => {
                    setNavExpanded(value)
                }

                return (
                    <MainContainer isActive={isNavExpanded}>
                        <ToggleBtn onClick={() => onToggleNav(!isNavExpanded)}
                            style={{
                                transform: `rotate(${isNavExpanded ? 0 : 180}deg)`,
                                transition: "transform 0.4s ease",
                            }}> <MdKeyboardArrowLeft /> </ToggleBtn>

                        <Options>
                            {TabOptions.map(each => (
                                <Link key={each.label} to={each.link} style={{ textDecoration: 'none' }}>
                                    <Option isActive={isNavExpanded} active={activeTab === each.label} onClick={() => onClickTab(each.label)}>
                                        <Icon isActive={isNavExpanded} active={activeTab === each.label}>{each.icon} </Icon>
                                        <SpanTag isNavExpanded={isNavExpanded} active={activeTab === each.label}>{each.name}</SpanTag>
                                    </Option>
                                </Link>
                            ))
                            }
                        </Options>

                        <Options>
                            {activeUserType === 'super-admin' &&
                                <>
                                    <Link to={'/all-reports'}>
                                        <Option isActive={isNavExpanded} active={activeTab === 'All Reports'} onClick={() => onClickTab('All Reports')}>
                                            <Icon isActive={isNavExpanded} active={activeTab === 'All Reports'}><FaTableList /> </Icon>
                                            {/* {isNavExpanded &&  */}
                                            <SpanTag isNavExpanded={isNavExpanded} active={activeTab === 'All Reports'}>All Reports</SpanTag>
                                            {/* } */}
                                        </Option>
                                    </Link>

                                    <Link to={'/create-reports'}>
                                        <Option isActive={isNavExpanded} active={activeTab === 'Create Reports'} onClick={() => onClickTab('Create Reports')}>
                                            <Icon active={activeTab === 'Create Reports'}><TbReportAnalytics size={22} /> </Icon>
                                            {/* {isNavExpanded &&  */}
                                            <SpanTag isNavExpanded={isNavExpanded} active={activeTab === 'Create Reports'}>Create Reports</SpanTag>
                                            {/* } */}
                                        </Option>
                                    </Link>
                                </>
                            }
                        </Options>

                        <LoginBtn isActive={isNavExpanded} type="button" onClick={handleLogout}>
                            {isNavExpanded ? "Logout" : <RiLogoutCircleLine />}
                        </LoginBtn>
                    </MainContainer>
                )
            }}
        </WonBillsContext.Consumer>
    )
}

export default SideNav;