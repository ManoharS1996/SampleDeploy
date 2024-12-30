import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


import { reportsList } from '../../../../DataFile/DefaultDataFile';

import BasicButtonExample from './ReportsDropdown';

const defaultData = {
  xAxis: [],
  series: []
}

export default function BasicBarChartComponet({ demo, data }) {
  const [reportData, setReportData] = React.useState(reportsList.filter(report => report.graphType === 'bar')[0])

  return (
    demo ?
      <BarChart
        series={data ? data.series : defaultData.series}
        height={290}
        xAxis={data ? data.xAxis : defaultData.xAxis}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }
        }
      /> :
      <>
        <BasicButtonExample reportData={reportData} setReportData={setReportData} reportsList={reportsList} widgetId={'widget-6'} />

        <BarChart
          // dataset={reportData.reportData.series}
          series={reportData.reportData.series}
          height={290}
          xAxis={reportData.reportData.xAxis}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          layout='vertical'
        />

      </>
  );
}
