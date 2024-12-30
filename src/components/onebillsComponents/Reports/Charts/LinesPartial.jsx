import { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { palletteCategories } from './ColorPalette';

import BasicButtonExample from './ReportsDropdown';

const defaultData = {
  xAxis: [{ data: [] }],
  series: [],
}

export default function LinesPartial({
  demo, data, reportsList, widgetId,
  layout, setLayout, setLayoutModifying
}) {
  const [reportData, setReportData] = useState({})
  const reports = reportsList?.filter(report => report.type === 'lines-partial') || []
  const [graphData, setGraphData] = useState(null)
  // console.log(graphData)

  return (

    demo ?
      <LineChart
        dataset={data ? data.dataset : []}
        xAxis={data ? data.xAxis : defaultData.xAxis}
        series={data ? data.series : defaultData.series}
        height={200}
        margin={{ top: 10, bottom: 20 }}
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
          height={200}
          margin={{ top: 10, bottom: 20 }}
          colors={palletteCategories['stack1']}
        />
      </>

  );
}
