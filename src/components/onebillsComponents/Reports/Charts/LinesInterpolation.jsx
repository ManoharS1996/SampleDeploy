
import { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { palletteCategories } from './ColorPalette';
import BasicButtonExample from './ReportsDropdown';


export default function LinesInterpolation({
    demo, data, reportsList, widgetId,
    layout, setLayout, setLayoutModifying
}) {
    const [reportData, setReportData] = useState({})
    const [graphData, setGraphData] = useState(null)
    const reports = reportsList?.filter(report => report.type === 'lines-interpolation') || []

    return (

        demo ?

            <LineChart
                dataset={data ? data.dataset : []}
                series={data ? data.series : []}
                xAxis={data ? data.xAxis : []}
                loading={data ? false : true}
                colors={palletteCategories['stack1']}
            /> :
            <>
                <BasicButtonExample
                    reportData={reportData}
                    setReportData={setReportData}
                    reportsList={reports}
                    widgetId={widgetId}
                    setGraphData={setGraphData}
                    layout={layout}
                    setLayout={setLayout}
                    setLayoutModifying={setLayoutModifying}
                />
                <LineChart
                    dataset={graphData?.dataset || []}
                    series={graphData?.series || []}
                    xAxis={graphData?.xAxis || []}
                    loading={graphData ? false : true}
                    colors={palletteCategories['stack1']}
                />
            </>
    )
}