import { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { palletteCategories } from './ColorPalette';
import BasicButtonExample from './ReportsDropdown';

export default function LinesStacking({
    demo, data, reportsList,
    widgetId, layout, setLayout,
    setLayoutModifying
}) {
    const [reportData, setReportData] = useState({})
    const [graphData, setGraphData] = useState(null)
    const reports = reportsList?.filter(report => report.type === 'lines-stacking') || []

    return (
        demo ?
            <LineChart
                dataset={data ? data.dataset : []}
                xAxis={data ? data.xAxis : []}
                series={data ? data.series : []}
                width={600}
                height={400}
                margin={{ left: 70 }}
                colors={palletteCategories['stack1']}
            />
            :
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
                    xAxis={graphData?.xAxis || []}
                    series={graphData?.series || []}
                    width={600}
                    height={400}
                    margin={{ left: 70 }}
                    colors={palletteCategories['stack1']}
                />
            </>
    );
}
