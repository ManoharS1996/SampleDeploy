import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';
import BasicButtonExample from './ReportsDropdown';
import { palletteCategories } from './ColorPalette';

const data1 = []

const data2 = []

export default function PieAnimation({
  demo, data, reportsList, widgetId,
  layout, setLayout, setLayoutModifying,
  lockLayout
}) {
  const [radius, setRadius] = useState(50)
  const [itemNb, setItemNb] = useState(5)
  const [skipAnimation, setSkipAnimation] = useState(false)
  const [reportData, setReportData] = useState({})
  const reports = reportsList?.filter(report => report.type === 'pie-animation') || []
  const [graphData, setGraphData] = useState(null)

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return
    }
    setItemNb(newValue);
  }

  const handleRadius = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setRadius(newValue);
  }

  return (
    demo ?
      <Box sx={{ width: '100%' }}>
        <PieChart
          height={300}
          series={[
            { data: data ? data.data2 : data2, outerRadius: radius },
            {
              data: (data ? data.data1 : data1).slice(0, itemNb),
              innerRadius: radius,
              // arcLabel: (params) => params.label ?? '',
            },
          ]}
          skipAnimation={skipAnimation}
          colors={palletteCategories['stack1']}
        />

        <FormControlLabel
          checked={skipAnimation}
          control={
            <Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />
          }
          label="skipAnimation"
          labelPlacement="end"
        />

        <Typography id="input-item-number" gutterBottom>
          Number of items
        </Typography>

        <Slider
          value={itemNb}
          onChange={handleItemNbChange}
          valueLabelDisplay="auto"
          min={1}
          max={10}
          aria-labelledby="input-item-number"
        />

        <Typography id="input-radius" gutterBottom>
          Radius
        </Typography>

        <Slider
          value={radius}
          onChange={handleRadius}
          valueLabelDisplay="auto"
          min={15}
          max={100}
          aria-labelledby="input-radius"
        />
      </Box>
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

        <Box sx={{ width: '100%' }}>
          <PieChart
            height={300}
            series={[
              {
                data: graphData?.data2 || [], outerRadius: radius,
                arcLabel: (params) => params.label ?? '',
              },
              {
                data: graphData?.data1 || [],
                innerRadius: radius,
                arcLabel: (params) => params.label ?? '',
              },
            ]}
            skipAnimation={skipAnimation}
            colors={palletteCategories['stack1']}
          />

          <FormControlLabel
            checked={skipAnimation}
            control={
              <Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />
            }
            label="skipAnimation"
            labelPlacement="end"
          />

          <Typography id="input-item-number" gutterBottom>
            Number of items
          </Typography>

          <Slider
            value={itemNb}
            onChange={handleItemNbChange}
            valueLabelDisplay="auto"
            min={1}
            max={10}
            aria-labelledby="input-item-number"
          />

          <Typography id="input-radius" gutterBottom>
            Radius
          </Typography>

          <Slider
            value={radius}
            onChange={handleRadius}
            valueLabelDisplay="auto"
            min={15}
            max={100}
            aria-labelledby="input-radius"
          />
        </Box>
      </>
  );
}
