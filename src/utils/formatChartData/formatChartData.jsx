
import _ from 'lodash'
export default function FormatChartData({ formattedData, generatedData }) {
    // console.log(formattedData, generatedData)

    const { chartType, stackBy, groupBy, aggregation } = formattedData

    const convertName = (name) => {
        const nameArr = name.split('_')
        const convertedName = nameArr.map((item,) => item[0].toUpperCase() + item.slice(1))
        return (convertedName.join(' '))
    }

    function formatDataForBarStackedChart(generatedReportData) {
        let dataset = generatedReportData

        let series = [{
            label: `${convertName((stackBy?.name || groupBy?.name) + '_' + aggregation.value)}`,
            dataKey: `${groupBy?.name + '_' + aggregation.value}`,
        }]

        if (stackBy?.name) {
            const newDataSet = []
            let stackedData = _.groupBy(dataset, stackBy.name)
            const groupByData = _.groupBy(dataset, groupBy.name)

            Object.keys(groupByData).map(key => {
                let recordData = { [groupBy.name]: key }

                groupByData[key].map(item => {
                    recordData = {
                        ...recordData, [item[stackBy.name] + '_' +
                            aggregation.value]: item[groupBy.name + '_' + aggregation.value]
                    }
                })

                newDataSet.push(recordData)
            })

            dataset = newDataSet

            series = Object.keys(stackedData).map(key => {
                return {
                    label: key,
                    dataKey: `${key + '_' + aggregation.value}`,
                    stack: stackBy.name,

                    valueFormatter: (v) => v
                }
            })
        }

        return {
            xAxis: [{ scaleType: 'band', dataKey: groupBy.name }],
            series: [...series],
            dataset: dataset
        };
    }

    function formatDataForBarHorizontalChart(generatedReportData) {
        let dataset = generatedReportData

        let series = [{
            label: `${convertName((stackBy?.name || groupBy?.name) + '_' + aggregation.value)}`,
            dataKey: `${groupBy?.name + '_' + aggregation.value}`,
        }]

        if (stackBy?.name) {
            const newDataSet = []
            let stackedData = _.groupBy(dataset, stackBy.name)
            const groupByData = _.groupBy(dataset, groupBy.name)
            Object.keys(groupByData).map(key => {
                let recordData = { [groupBy.name]: key }

                groupByData[key].map(item => {
                    recordData = {
                        ...recordData, [item[stackBy.name] + '_' +
                            aggregation.value]: item[groupBy.name + '_' + aggregation.value]
                    }
                })

                newDataSet.push(recordData)
            })

            dataset = newDataSet

            series = Object.keys(stackedData).map(key => {
                return {
                    label: key,
                    dataKey: `${key + '_' + aggregation.value}`,
                    stack: stackBy.name,

                    valueFormatter: (v) => v
                }
            })
        }

        return {
            yAxis: [{ scaleType: 'band', dataKey: groupBy.name }],
            series: [...series],
            dataset: dataset
        };
    }

    function formatPieieSizingChart(generatedReportData) {
        const convertedData = generatedReportData.map(record => {
            // console.log(record[groupBy.name].toString())
            return {
                label: record[groupBy.name].toString(),
                value: record[groupBy.name + '_' + aggregation.value].toString()
            }
        })

        return {
            data: convertedData,
        };
    }

    function formatPieHighlightsChart(generatedReportData) {
        const convertedData = generatedReportData.map(record => {
            // console.log(record, groupBy, aggregation)
            return {
                label: `${record[groupBy.name]}`,
                arcLabel: (item) => `${item.value}`,
                arcLabelMinAngle: 5,
                // arcLabelRadius: '60%',
                value: record[groupBy.name + '_' + aggregation.value].toString(),
                valueFormatter: (v) => `${v}`
            }
        })

        return {
            data: convertedData,
        };
    }

    function formatDataForPieChart(generatedReportData) {
        const data2 = [];
        const data1 = generatedReportData.map(record => {
            // console.log(record, groupBy)
            return {
                label: record[groupBy?.name].toString() || '-',
                value: record[groupBy.name + '_' + aggregation.value].toString()
            }
        })

        return {
            data1: data1,
            data2: data2
        }
    }

    function formatLinesInterpolationchart(generatedReportData) {
        const dataset = generatedReportData.map((item, index) => {
            return { ...item, x: index }
        })
        const seriesData = [{
            data: generatedReportData.map(item => item[`${groupBy.name}_${aggregation.value}`]),
            curve: 'linear',
            label: `${aggregation.value}`
        }]

        return {
            dataset: dataset,
            series: seriesData,
            xAxis: [{ scaleType: 'band', dataKey: groupBy.name }]
        }
    }

    function formatLinesPartialChart(generatedReportData) {
        const dataset = generatedReportData.map((item, index) => {
            return { ...item, x: index }
        })
        const seriesData = [{
            data: generatedReportData.map(item => item[`${groupBy.name}_${aggregation.value}`]),
            label: `${aggregation.value}`
        }]

        return {
            dataset: dataset,
            series: seriesData,
            xAxis: [{ scaleType: 'band', dataKey: groupBy.name }]
        }
    }

    function formatLinesStackingchart(generatedReportData) {
        const dataset = generatedReportData.map((item, index) => {
            return { ...item, x: index }
        })
        const seriesData = generatedReportData.map((record, index) => {
            const formatedData = {
                id: index,
                area: true,
                showMark: false,
                dataKey: `${groupBy.name}_${aggregation.value}`,
                stack: `${groupBy.name}`,
                label: record[`${groupBy.name}`],
                value: generatedReportData.filter(item => {
                    return item[`${groupBy.name}`] === record[`${groupBy.name}`]
                })[0][record[`${groupBy.name}_${aggregation.value}`]]
            }
            return formatedData
        })

        return {
            dataset: dataset,
            series: seriesData,
            xAxis: [{ scaleType: 'band', dataKey: groupBy.name }]
        }
    }

    function formatGaugeChartData(generatedReportData) {
        let gaugeValue = 0
        for (let i of generatedReportData) {
            gaugeValue += i[`${groupBy.name}_${aggregation.value}`]
        }

        return {
            value: gaugeValue
        };
    }

    const formateGraphData = (generatedReportData, type, orderByData) => {
        switch (type) {

            case 'bar-stacked':
                return formatDataForBarStackedChart(generatedReportData, orderByData);

            case 'bar-horizontal':
                return formatDataForBarHorizontalChart(generatedReportData, orderByData);

            case 'pie-sizing':
                return formatPieieSizingChart(generatedReportData, orderByData);

            case 'pie-highlights':
                return formatPieHighlightsChart(generatedReportData, orderByData);

            case 'pie-animation':
                return formatDataForPieChart(generatedReportData, orderByData);

            case 'lines-interpolation':
                return formatLinesInterpolationchart(generatedReportData, orderByData);

            case 'lines-partial':
                return formatLinesPartialChart(generatedReportData, orderByData);

            case 'lines-stacking':
                return formatLinesStackingchart(generatedReportData, orderByData);

            case 'gauge':
                return formatGaugeChartData(generatedReportData);
            default:
                return null
        }
    }

    return (formateGraphData(generatedData, chartType))
}