
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenerateReports from "./GenerateReports/GenerateReports";
import {
    getAllTableNames, getTableData, getTableColumnNames,
    getGeneratedReportData, createNewRecordInTable
} from "./CRUDoperations";
import Swal from "sweetalert2";
import FormatChartData from "../../../utils/formatChartData/formatChartData";
import Header from "../Header/Header";
import SideNav from "../SideNav/SideNav";

import {
    MainContainer, SelectReportViewContainer, ReportViewsContainer,
    ViewCard, BackIconAndTitleContainer, CardImg, ContentContainer,
    BodyDiv
} from "./ReportsStyledComponents";

import { IoIosArrowBack } from "react-icons/io";

const graphTypes = [
    { id: 2, name: "Bar stack chart", type: 'bar-stacked', src: 'https://res.cloudinary.com/drtguvwir/image/upload/v1726124603/WON-Platform-Images/wgzbfkn7r9qmb0szpas8.png' },
    { id: 5, name: "Bar Horizontal", type: 'bar-horizontal', src: 'https://res.cloudinary.com/drtguvwir/image/upload/v1726124603/WON-Platform-Images/e63fh1tleatoidjzjddp.png' },
    // { id: 4, name: "Pie Sizing", type: 'pie-sizing', src: 'https://res.cloudinary.com/drtguvwir/image/upload/v1726124603/WON-Platform-Images/gztbrrc4xehmk1d1fiyy.png' },
    { id: 1, name: "Pie Chart", type: 'pie-highlights', src: 'https://res.cloudinary.com/drtguvwir/image/upload/v1726124603/WON-Platform-Images/lw98cbnclj44i8jttrdp.png' },
    { id: 6, name: "Pie Animation", type: 'pie-animation', src: 'https://res.cloudinary.com/drtguvwir/image/upload/v1726124603/WON-Platform-Images/oytiskzc5gmdjnewmwbu.png' },
]

export default function ReportCardSelection() {
    const [step, setStep] = useState(1)
    const [view, setView] = useState(null)
    const [graphType, setGraphType] = useState(null)
    const [tablesList, setTablesList] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null)
    const [tableColumns, setTableColumns] = useState([])
    const [tableData, setTableData] = useState([])
    const [groupBy, setGroupBy] = useState(null)
    const [stackBy, setStackBy] = useState(null)
    const [aggregation, setAggregation] = useState({ label: 'Count', value: 'count' })
    const [reportName, setReportName] = useState(null)
    const [shortDescription, setShortDescription] = useState(null)
    const [visibility, setVisibility] = useState({ label: 'Public', value: 'public' })
    const [displayTable, setDisplayTable] = useState(false)
    const [interval, setInterval] = useState(null)
    const [gaugeReportFields, setGaugeReportFields] = useState([])
    const [graphData, setGraphData] = useState(null)
    const [filterConditions, setFilterConditions] = useState([{
        id: 1,
        column: null,
        operation: null,
        value: null,

    }])
    const [generatedData, setGeneratedData] = useState(null)
    const [orderByData, setOrderByData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [dateLabel, setDateLabel] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const getNames = async () => {
            const data = await getAllTableNames()
            // console.log(data)
            setTablesList(data)
        }

        getNames()
    }, [])

    const formattedData = { chartType: graphType, filterConditions, stackBy, groupBy, aggregation, selectedTable }

    const convertName = (name) => {
        const nameArr = name.split('_')
        const convertedName = nameArr.map((item,) => item[0].toUpperCase() + item.slice(1))
        return (convertedName.join(' '))
    }

    const updateGroupBy = (value) => {
        setGroupBy(value)
        value.value.type !== 'int' && setAggregation({ label: 'Count', value: 'count' })
    }

    const updateStackBy = (value) => {
        setStackBy(value)
    }

    const updateAggregation = (value) => {
        setAggregation(value)
    }

    const getSelectedTableColumns = async (e) => {
        if (e.label) {
            const data = await getTableColumnNames(e.value)
            const tableData = await getTableData(e.value)
            // console.log(tableData)

            setTableColumns(data.columns)
            setTableData(tableData[e.value])
            setSelectedTable(e)
            setGroupBy(null)
            setStackBy(null)
            setGaugeReportFields([])
        }
    }

    const updateSelectView = (value) => {
        setView(value)
        setStep(2)
    }

    const updateSelectedGrapgh = (value) => {
        setGraphType(value)
        if (generatedData && graphType && orderByData) {
            setGraphData(FormatChartData(
                {
                    formattedData: { ...formattedData, chartType: value },
                    generatedData
                }
            ))
        }
        setStep(3)
    }

    const updateGaugeReportFields = (e) => {
        setGaugeReportFields(e)
    }

    const generateAndGetReportData = async () => {
        setIsLoading(true)

        const reportData = await getGeneratedReportData({
            aggregation: aggregation && aggregation.value,
            groupBy: groupBy && groupBy.value.name,
            selectedTable: selectedTable && selectedTable.value,
            stackBy: stackBy && stackBy.value.name,
            filterConditions,
            dateLabel: dateLabel && dateLabel.value
        })
        console.log(reportData)

        setGeneratedData(reportData.generatedReportData)
        setOrderByData(reportData.orderByResult)

        reportData && setIsLoading(false)

        const formattedGraphData = FormatChartData({
            formattedData,
            generatedData: reportData.generatedReportData,
            setGeneratedData,
            orderByData: reportData.orderByResult,
            setOrderByData,
            graphData,
            setGraphData
        }
        )
        console.log(formattedGraphData)
        setGraphData(formattedGraphData)
    }

    const onCreateReport = async (e) => {
        e.preventDefault()

        if (
            reportName && selectedTable &&
            groupBy &&
            visibility && view &&
            graphType && shortDescription &&
            interval
        ) {
            const response = await createNewRecordInTable({
                title: reportName,
                selected_table: selectedTable.value,
                group_by: groupBy,
                stack_by: stackBy,
                aggregation: aggregation,
                created_by: JSON.parse(localStorage.getItem('activeUserData')).username,
                created_on: (new Date()).toString().slice(0, 42),
                state: 'created',
                short_description: shortDescription,
                interval_duration: interval,
                filter_conditions: filterConditions,
                display_table: `${displayTable}`,
                visibility: visibility.value,
                view: view,
                type: graphType,
                gauge_report_fields: gaugeReportFields,
                date_label: dateLabel?.value

            }, 'reports')

            if (response.success === true) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Report Generated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/Dashboard')
            }

        } else {
            const missingFields = {
                report_name: reportName === null,
                source: selectedTable === null,
                group_by: groupBy === null,
                stack_by: stackBy === null,
                visibility: visibility === null,
                view: view === null,
                graph_type: graphType === null,
                short_description: shortDescription === null,
                interval: interval === null,
            }

            const filteredMissingFields = Object.keys(missingFields).filter(key => missingFields[key] === true).map(field => convertName(field))
            Swal.fire({
                title: "!Mandatory Field(s)",
                text: `Missing: ${filteredMissingFields.join(', ')} values`,
                icon: "warning",
                confirmButtonText: "Got it!",
                showConfirmButton: true,
                buttonsStyling: true,
                customClass: {
                    confirmButton: "btn btn-primary got-it-btn"
                }
            });
        }
    }

    // console.log(tableColumns)

    return (
        <MainContainer>
            <SideNav />
            <ContentContainer>
                <Header />

                {step === 1 &&
                    <SelectReportViewContainer>
                        <BackIconAndTitleContainer> Report Card Selection</BackIconAndTitleContainer>

                        <ReportViewsContainer>
                            <ViewCard onClick={() => updateSelectView('tab')} >Tab </ViewCard>
                            <ViewCard onClick={() => updateSelectView('mobile')} >Mobile </ViewCard>
                            <ViewCard onClick={() => updateSelectView('desktop')} >Desktop </ViewCard>
                            <ViewCard onClick={() => updateSelectView('sms')} >SMS </ViewCard>
                        </ReportViewsContainer>
                    </SelectReportViewContainer>
                }

                {step === 2 &&
                    <SelectReportViewContainer>
                        <BackIconAndTitleContainer>
                            <IoIosArrowBack size={25} onClick={() => setStep(1)} />
                            Graph Type Selection
                        </BackIconAndTitleContainer>

                        <ReportViewsContainer>
                            {graphTypes.map((card) =>
                            (<ViewCard key={card.id} onClick={() => updateSelectedGrapgh(card.type)}>
                                <CardImg src={card.src} alt={card.name} />
                            </ViewCard>))
                            }
                        </ReportViewsContainer>
                    </SelectReportViewContainer>
                }

                {step === 3 &&
                    <GenerateReports
                        graphType={graphType}
                        setGraphType={setGraphType}
                        view={view}
                        formStates={{
                            tablesList: tablesList,
                            selectedTable: selectedTable,
                            tableColumns: tableColumns,
                            tableData: tableData,
                            groupBy: groupBy,
                            stackBy: stackBy,
                            aggregation: aggregation,
                            reportName: reportName,
                            shortDescription: shortDescription,
                            visibility: visibility,
                            displayTable: displayTable,
                            graphData: graphData,
                            generatedData: generatedData,
                            orderByData: orderByData,
                            interval: interval,
                            dateLabel: dateLabel,


                            setSelectedTable: setSelectedTable,
                            setTableColumns: setTableColumns,
                            setTableData: setTableData,
                            setGroupBy: updateGroupBy,
                            setStackBy: updateStackBy,
                            setAggregation: updateAggregation,
                            getSelectedTableColumns: getSelectedTableColumns,
                            setStep: setStep,
                            setReportName: setReportName,
                            setShortDescription: setShortDescription,
                            setVisibility: setVisibility,
                            setDisplayTable: setDisplayTable,
                            setGeneratedData: setGeneratedData,
                            setOrderByData: setOrderByData,
                            setInterval: setInterval,
                            setDateLabel: setDateLabel
                        }}
                        filterConditions={filterConditions}
                        setFilterConditions={setFilterConditions}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        generateAndGetReportData={generateAndGetReportData}
                        onCreateReport={onCreateReport}
                        gaugeReportFields={gaugeReportFields}
                        updateGaugeReportFields={updateGaugeReportFields}
                    />}

            </ContentContainer>
        </MainContainer>
    )
}