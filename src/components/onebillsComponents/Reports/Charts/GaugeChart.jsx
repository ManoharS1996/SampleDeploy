import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import BasicButtonExample from './ReportsDropdown';
import { palletteCategories } from './ColorPalette';

const defaultData = {
  value1: 0,
  value2: 0,
}

export default function GaugeValueRangeNoSnap({ demo, data, defaultValue, reportsList, value }) {
  const [reportData, setReportData] = useState(null)
  const [graphData, setGraphData] = useState(null)

  // console.log(graphData)
  return (
    demo ?
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
        <Gauge
          width={150}
          height={150}
          value={data ? data.value : defaultData.value1}
          colors={palletteCategories['stack1']}
        />
        {/* <Gauge width={100} height={100} value={data ? data.value2 : defaultData.value2} valueMin={0} valueMax={100} /> */}
      </Stack>
      :
      <>
        {!defaultValue &&
          <BasicButtonExample reportData={reportData ? reportData : {}} setReportData={setReportData} reportsList={reportsList?.filter(report => report.type === 'gauge') || []} widgetId={'widget-10'} setGraphData={setGraphData} />
        }

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
          <Gauge
            width={100}
            height={100}
            value={value ? value : 0}
            colors={palletteCategories['stack1']}
          />
          {/* <Gauge width={100} height={100} value={reportData.reportData.value2} valueMin={10} valueMax={60} /> */}
        </Stack>
      </>
  );
}
