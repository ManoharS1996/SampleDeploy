import { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { valueFormatter } from './webUsageStats';
import { palletteCategories } from './ColorPalette';

import BasicButtonExample from './ReportsDropdown'

export default function PieHighlights({
    demo, data, reportsList, widgetId,
    layout, setLayout, setLayoutModifying,
    lockLayout
}) {
    const [reportData, setReportData] = useState({})
    const reports = reportsList?.filter(report => report.type === 'pie-highlights') || []
    const [graphData, setGraphData] = useState(null)

    return (
        demo ?
            <PieChart
                series={[
                    {
                        data: data ? data.data : [],
                        highlightScope: { fade: 'global', highlight: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        valueFormatter,
                        arcLabel: (params) => params.label ?? '',
                    },
                ]}
                height={350}
                colors={palletteCategories['stack1']}
            />
            :
            <>
                <BasicButtonExample
                    reportData={reportData}
                    setReportData={setReportData}
                    reportsList={reports}
                    widgetId={widgetId}
                    graphData={graphData}
                    setGraphData={setGraphData}
                    layout={layout}
                    setLayout={setLayout}
                    setLayoutModifying={setLayoutModifying}
                    lockLayout={lockLayout}
                />

                <PieChart
                    series={[
                        {
                            data: graphData?.data || [],
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            valueFormatter,
                        },
                    ]}
                    height={350}
                    colors={palletteCategories['stack1']}
                />
            </>
    );
}