
import { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { palletteCategories } from './ColorPalette';
import BasicButtonExample from './ReportsDropdown';

const valueFormatter = (item) => `${item.value}%`;

export default function PieSizing({
    demo, data, reportsList,
    widgetId, layout, setLayout,
    setLayoutModifying
}) {
    const [reportData, setReportData] = useState({})
    const [graphData, setGraphData] = useState(null)
    const reports = reportsList?.filter(report => report.type === 'pie-sizing') || []
    // console.log(graphData)
    return (
        demo ?
            <PieChart
                series={[
                    {
                        data: data ? data.data : [],
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -45,
                        endAngle: 225,
                        cx: 50,
                        cy: 150,
                    }
                ]}
                {...size}
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
                <PieChart
                    series={[
                        {
                            data: graphData?.data || [],
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -45,
                            endAngle: 225,
                            cx: 150,
                            cy: 150,
                        }
                    ]}
                    {...size}
                    colors={palletteCategories['stack1']}
                />
            </>
    )
}


const size = {
    width: 450,
    height: 300,
}