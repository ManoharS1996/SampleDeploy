
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Tooltip } from 'react-tooltip';
import { HiDotsVertical } from "react-icons/hi";
import { WodgetSettingsBtn, } from './StyledChatsComponents';
import FormatChartData from '../../../../utils/formatChartData/formatChartData';
import { getGeneratedReportData, getPaymentsRevenueCount } from '../CRUDoperations';

export default function BasicButtonExample({
    reportData, setReportData, reportsList, widgetId,
    setGraphData, gaugeReports,
    setGeneratedGaugeReportsData, setLayout, layout,
    setLayoutModifying,
    lockLayout
}) {
    const [isIntervalRunning, setIntervalRunning] = useState(false)

    const selectedReport = reportsList?.filter(reportItem =>
        reportItem.id === layout?.selected_reports?.filter(r => r.widget_id === widgetId)?.[0]?.report_id)?.[0]

    useEffect(() => {
        let intervalId;

        const getselectedReportData = async () => {
            if (selectedReport) {
                await onReportSelection(selectedReport);

                // Clear previous interval if any
                if (intervalId) clearInterval(intervalId);

                // Set new interval
                // intervalId = setInterval(async () => {
                //     await onReportSelection(selectedReport);
                // }, selectedReport.setInterval * 6000); // Assuming setInterval is in seconds
            }

            if (layout?.selected_reports?.length > 0) {
                // const gaugeReportsData = selectedReport?.gauge_report_fields &&
                //     await getGugeReportsData(
                //         selectedReport?.gauge_report_fields || [],
                //         selectedReport?.selected_table
                //     )

                // await setGeneratedGaugeReportsData(gaugeReportsData)
            } else {
                setGraphData(null)
            }
        }

        getselectedReportData()
        // Cleanup function to clear the interval when component unmounts or dependencies change
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [layout?.selected_reports?.length || layout])

    useEffect(() => {
        if (selectedReport) {
            // Set new interval
            setInterval(async () => {
                setIntervalRunning(!isIntervalRunning)
                await onReportSelection(selectedReport);
            }, selectedReport.setInterval * 6000); // Assuming setInterval is in seconds
        }
    }, [isIntervalRunning])


    const onReportSelection = async (report) => {
        console.log('interval rendering...')
        setReportData(report)
        const FetchedReportData = report?.view === 'default' ? await getPaymentsRevenueCount() :
            await getGeneratedReportData({
                aggregation: report?.aggregation?.value,
                groupBy: report?.group_by?.name,
                selectedTable: report?.selected_table,
                stackBy: report?.stack_by?.name,
                filterConditions: report?.filter_conditions,
                dateLabel: report?.date_label
            })

        const formattedData = {
            chartType: report.type,
            filterConditions: report.filterConditions,
            stackBy: report.stack_by,
            groupBy: report.group_by,
            aggregation: report.aggregation,
            selectedTable: report.selected_table
        }

        const fetchedDaTA = FormatChartData({
            formattedData,
            generatedData: FetchedReportData.generatedReportData,
            orderByData: FetchedReportData.orderByResult,
            setGraphData
        })

        setGraphData(fetchedDaTA)

        const createOrUpdateSelectedReports = (reportsList) => {
            const updatedList = [...reportsList]; // Create a shallow copy of the reports list
            const existingWidget = reportsList.find(item => item.widget_id === widgetId);

            if (existingWidget) {
                // Map and update the existing widget's report_id
                const updatedWidgets = updatedList.map(item =>
                    item.widget_id === widgetId ? { ...item, report_id: report.id } : item
                );
                return updatedWidgets; // Return the updated array
            } else {
                // Push the new widget object to the array
                updatedList.push({ widget_id: widgetId, report_id: report.id });
                return updatedList; // Return the updated array
            }
        };

        setLayout({
            ...layout,
            selected_reports: layout.selected_reports &&
                createOrUpdateSelectedReports(layout.selected_reports)
                || []
        })
        // console.log('layout modifying')
        { !lockLayout && setLayoutModifying(true) }
    }
    const activeUserType = JSON.parse(localStorage.getItem('userDetails'))?.user_type || 'customer';


    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                alignSelf: 'flex-end',
                justifyContent: 'space-between',
                margin: '0',
                padding: '0',
            }}
        >
            <span style={{ margin: 'auto', fontSize: '12px' }}>
                {
                    Object.keys(reportData ? reportData : {})?.length > 0 ?
                        reportData?.title : 'Please Select Report' || selectedReport?.title
                }
            </span>

            <WodgetSettingsBtn type='button' data-tooltip-id={widgetId}>
                <HiDotsVertical size={15} />
            </WodgetSettingsBtn>

            <Tooltip
                id={widgetId}
                openOnClick
                clickable
                noArrow
                opacity={1}
                style={{
                    position: 'absolute',
                    backgroundColor: '#fff',
                    color: '#000',
                    boxShadow: '0px 0px 2px 1px #ccc',
                    width: 'fit-content',
                    zIndex: '15',
                    opacity: '1'
                }}
            >
                <span>Settings</span>

                {reportsList.length > 0 && activeUserType === 'super-admin' &&
                    <DropdownButton
                        id="dropdown-basic-button"
                        title={reportData?.title || 'Select Report'}
                        className='widget_settings_dropdown'
                    >
                        {reportsList.map(report =>
                            <Dropdown.Item
                                key={report.id}
                                value={report}
                                onClick={() => onReportSelection(report)}
                            >
                                {report.title}
                            </Dropdown.Item>
                        )}
                    </DropdownButton>
                }
            </Tooltip>
        </div>
    );
}