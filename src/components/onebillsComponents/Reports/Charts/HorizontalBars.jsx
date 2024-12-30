
import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { palletteCategories } from './ColorPalette';
import BasicButtonExample from './ReportsDropdown';

const chartSetting = {
    xAxis: [
        {
            label: 'rainfall (mm)',
        },
    ],
    width: 600,
    height: 600,
};

export default function HorizontalBars({
    demo,
    data,
    reportsList,
    widgetId,
    layout,
    setLayout,
    setLayoutModifying,
    lockLayout
}) {
    const [reportData, setReportData] = useState({})
    const [graphData, setGraphData] = useState(null)
    const reports = reportsList?.filter(report => report.type === 'bar-horizontal') || []

    const updateGraphData = (data) => {
        setGraphData(data)
    }

    return (
        demo ?

            <BarChart
                dataset={data ? data.dataset : []}
                yAxis={data ? data.yAxis : []}
                series={data ? data.series : []}
                layout="horizontal"
                slotProps={{ legend: { hidden: true, position: 'right' } }}
                colors={palletteCategories['stack1']}
                {...chartSetting}
            />
            :
            <>
                <BasicButtonExample
                    reportData={reportData}
                    setReportData={setReportData}
                    reportsList={reports}
                    widgetId={widgetId}
                    setGraphData={updateGraphData}
                    layout={layout}
                    setLayout={setLayout}
                    setLayoutModifying={setLayoutModifying}
                    lockLayout={lockLayout}
                />

                <BarChart
                    dataset={graphData?.dataset || []}
                    yAxis={graphData?.yAxis || [{ scaleType: 'band', dataKey: 'month' }]}
                    series={graphData?.series || []}
                    layout="horizontal"
                    slotProps={{ legend: { hidden: true, position: 'right' } }}
                    colors={palletteCategories['stack1']}
                    {...chartSetting}
                />

            </>
    );
}
