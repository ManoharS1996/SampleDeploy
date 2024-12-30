
import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { palletteCategories } from './ColorPalette';
import BasicButtonExample from './ReportsDropdown';

export default function StackBars({
    demo, data, reportsList, widgetId,
    layout, setLayout, setLayoutModifying,
    lockLayout
}) {
    const [reportData, setReportData] = useState({})
    const [graphData, setGraphData] = useState(null)
    const reports = reportsList?.filter(report => report.type === 'bar-stacked') || []

    return (
        demo ?
            <BarChart
                dataset={data ? data.dataset : []}
                series={data ? data.series : []}
                xAxis={data ? data.xAxis : [{ scaleType: 'band', dataKey: 'name' }]}
                slotProps={{ legend: { hidden: true } }}
                colors={palletteCategories['stack1']}
                width={600}
                height={350}
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
                    lockLayout={lockLayout}
                />

                <BarChart
                    dataset={graphData?.dataset || []}
                    series={graphData?.series || []}
                    xAxis={graphData?.xAxis || []}
                    slotProps={{ legend: { hidden: true } }}
                    colors={palletteCategories['stack1']}
                    width={600}
                    height={350}
                />
            </>
    );
}
