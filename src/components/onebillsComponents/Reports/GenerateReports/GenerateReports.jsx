
import styled, { keyframes } from "styled-components";
import makeAnimated from 'react-select/animated';
import { IoIosArrowBack } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { MdDoubleArrow, MdRemoveCircle } from "react-icons/md";
import { LuAmpersand, LuRefreshCw } from "react-icons/lu";
import { FaGripLinesVertical } from "react-icons/fa6";
import Select from 'react-select';
import StackBars from '../Charts/StackedBarChart'
import PieAnimation from '../Charts/PieAnimation'
import LinesPartial from '../Charts/LinesPartial'
import LinesInterpolation from '../Charts/LinesInterpolation'
import GaugeValueRangeNoSnap from '../Charts/GaugeChart'
import DisplayTable from "../DisplayTable";
import HorizontalBars from '../Charts/HorizontalBars'
import PieSizing from '../Charts/PieSizing'
import PieHighlights from '../Charts/PieHighlights'
import LinesStacking from '../Charts/LinesStacking'

import {
    ReportForm, ReportFormContainer, FieldContainer,
    ReportFieldLabel, ReportFieldInput, PreviewContainer,
    GeneratereportsHeader, GenerateReportsBodySection, CreateBtn,
    TableContainer, CharContainer, FiltersContainer, UpdatePreviewBtn,
    FilterFieldContainer, AndBtn, OrBtn, RemoveConditionBtn, AddConditionBtn,
    ActionButtonConditions,
} from "../ReportsStyledComponents";

const aggregationList = [
    { id: 1, label: "Sum", value: "sum" },
    { id: 2, label: "Average", value: "avg" },
    { id: 3, label: "Max", value: "max" },
    { id: 4, label: "Min", value: "min" },
    { id: 5, label: "Count", value: "count" },
]

const operationList = [
    { id: 1, label: "Contains", value: "LIKE '%value%'" },
    { id: 2, label: "Equals", value: "=" },
    { id: 3, label: "Starts With", value: "LIKE" },
    { id: 4, label: "Ends With", value: "LIKE" },
    { id: 5, label: "Is Empty", value: "= '' OR IS NULL" },
    { id: 6, label: "Is Not Empty", value: "!= '' AND IS NOT NULL" },
    { id: 7, label: "Is Any Of", value: "IN ('value1', 'value2', ...)" }
];

const dateFiledLabels = [
    { id: 1, label: "Day", value: 'D' },
    { id: 2, label: "Month", value: 'M' },
    { id: 3, label: "Year", value: 'Y' },
    { id: 4, label: "Full Date", value: 'f' },
]

const stackbyIcludedchartTypes = (import.meta.env.VITE_STACKBY_APPLICABLE_LIST).split(',')

const InputHighlighter = keyframes`
    from {
        background: #1e96fc;
    }

    to {
        width: 0;
        background: transparent;
    }
`

const Group = styled.div`
  position: relative;
  width: ${({ width }) => width ? width : 'fit-content'};
  min-width: 20px;
  height: 80%;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const Input = styled.input`
  padding: 5px 10px;
  display: flex;
  width: 100%;
  border: none;
  border-bottom: 1px solid #9eb3c2;
  background: transparent;
  outline: none;
  color: #03045E;
  text-transform: capitalize;

  &:focus ~ label,
  &:valid ~ label {
    top: -5px;
    font-size: 11px;
    color: #5264ae;
  }
`

const Label = styled.label`
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 15px;
  transition: 0.2s ease all;
  background-color: #fff;
`

const Bar = styled.span`
  position: relative;
  display: block;
  width: 100%;

  &:before,
  &:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 0px;
    position: absolute;
    background: #1e96fc;
    transition: 0.2s ease all;
  }

  &:before {
    left: 50%;
  }

  &:after {
    right: 50%;
  }

  ${Input}:focus ~ &:before,
    ${Input}:focus ~ &::after {
    width: 50%;
  }
`

const Highlight = styled.span`
  position: absolute;
  height: 60%;
  width: 100%;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;

  ${Input}:focus ~ & {
    animation: ${InputHighlighter} 0.3s ease;
  }
`

export default function GenerateReports({
    graphType, view, formStates,
    filterConditions, setFilterConditions,
    isLoading, generateAndGetReportData,
    onCreateReport,
    updateGaugeReportFields, gaugeReportFields
}) {
    const {
        tablesList, selectedTable, tableColumns,
        groupBy, stackBy, aggregation, reportName, shortDescription,
        visibility, displayTable, graphData, orderByData,
        interval, dateLabel,

        setGroupBy, setStackBy,
        setAggregation, getSelectedTableColumns, setStep, setReportName,
        setShortDescription, setVisibility, setDisplayTable,
        setInterval, setDateLabel
    } = formStates

    const convertedNames = (name) => {
        const nameArr = name.split('_')
        const convertedName = nameArr.map((item,) => item[0].toUpperCase() + item.slice(1))
        return (convertedName.join(' '))
    }

    const animatedComponents = makeAnimated();

    const renderselectedGraph = () => {
        switch (graphType) {
            case 'pie-animation':
                return <PieAnimation demo data={graphData} />

            case 'pie-sizing':
                return <PieSizing demo data={graphData} />

            case 'pie-highlights':
                return <PieHighlights demo data={graphData} />

            case 'lines-partial':
                return <LinesPartial demo data={graphData} />

            case 'lines-interpolation':
                return <LinesInterpolation demo data={graphData} />

            case 'lines-stacking':
                return <LinesStacking demo data={graphData} />

            case 'bar-stacked':
                return <StackBars demo data={graphData} />

            case 'bar-horizontal':
                return <HorizontalBars demo data={graphData} />

            case 'gauge':
                return <GaugeValueRangeNoSnap demo data={graphData} />
            default:
                return null
        }
    }

    const addNewCondition = (e, currentConditionID, conditionValue) => {
        e.preventDefault()

        if (
            (currentConditionID !== (null || undefined)) &&
            (conditionValue !== (null || undefined))
        ) {
            const updatedList = filterConditions.map(filter => filter.id === currentConditionID ?
                { ...filter, condition: conditionValue } :
                filter
            )
            const currentCondition = filterConditions.filter((filter) => filter.id === currentConditionID)[0]

            const isPreviousConditionFuflilled = currentCondition.column !== null && currentCondition.value !== null && currentCondition.operation !== null
            {
                isPreviousConditionFuflilled &&
                    setFilterConditions([
                        ...updatedList,
                        {
                            id: filterConditions.length + 1,
                            column: null,
                            value: null,
                            operation: null,
                            condition: null
                        }
                    ])
            }
        } else {
            setFilterConditions([
                {
                    id: filterConditions.length + 1,
                    column: null,
                    value: null,
                    operation: null,
                    condition: null
                }
            ])
        }
    }

    const removeCondition = (conditionId) => {
        setFilterConditions(filterConditions.filter(filter => filter.id !== conditionId))
    }

    const components = {
        DropdownIndicator: null,
    }

    const switchValueField = (filter, index) => {
        const TextInputField = <ReportFieldInput
            type="text"
            placeholder="--Value--"
            value={filter.value}
            onChange={(e) =>
                setFilterConditions((prevConditions) =>
                    prevConditions.map((cond, i) =>
                        i === index ? { ...cond, value: e.target.value } : cond
                    )
                )
            }
        />

        const NumberInputField = <ReportFieldInput
            type="number"
            placeholder="--Value--"
            value={filter.value}
            min={0}
            onChange={(e) =>
                setFilterConditions((prevConditions) =>
                    prevConditions.map((cond, i) =>
                        i === index ? { ...cond, value: e.target.value } : cond
                    )
                )
            }
        />

        const DateInputField = <input type='date' />

        const MultiSelectField = <Select
            isMulti
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
        />

        switch (filter?.column?.value?.type) {
            case 'varchar':
                switch (filter?.operation?.label) {
                    case 'Contains':
                        return TextInputField

                    case 'Is Any Of':
                        return MultiSelectField
                    default:
                        return null
                }

            case 'int':
                return NumberInputField

            case 'enum':
                return TextInputField

            case 'datetime':
                return DateInputField

            default:
                return TextInputField
        }
    }
    console.log(groupBy)
    return (
        <ReportFormContainer>
            <GeneratereportsHeader>
                <IoIosArrowBack size={25} onClick={() => setStep(2)} />

                <Group width={'250px'}>
                    <Input type="text" required value={reportName} onChange={(e) => setReportName(e.target.value)} />
                    <Label>Report Name</Label>
                    <Bar />
                    <Highlight />
                </Group>

                <Group width={'350px'}>
                    <Input type="text" required value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
                    <Label>Short Description</Label>
                    <Bar />
                    <Highlight />
                </Group>

                <Group width={'10rem'}>
                    <Input type="text" required value={convertedNames(view)} />
                    <Label>View</Label>
                    <Bar />
                    <Highlight />
                </Group>

                <Group width={'10rem'}>
                    <Input type="text" required value={convertedNames(graphType)} />
                    <Label>Graph Type</Label>
                    <Bar />
                    <Highlight />
                </Group>

                <Group width={'10rem'}>
                    <Input
                        type="number"
                        required
                        placeholder="In Min"
                        inputMode="numeric"
                        pattern="\d*"
                        min={0}
                        max={60}
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                    />
                    <Label>Interval</Label>
                    <Bar />
                    <Highlight />
                </Group>

                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <label
                        style={{
                            position: 'absolute',
                            transform: 'translate(20%, -120%)',
                            zIndex: '10',
                            background: '#fff',
                            color: '#5264ae',
                            fontSize: '0.7rem',
                            padding: '0 5px'
                        }}
                    >Visibility</label>

                    <Select
                        className="basic-single report-form-select w-auto"
                        classNamePrefix="select"
                        defaultValue={visibility !== null ? visibility : { label: 'Public', value: 'Public' }}

                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        options={[
                            { label: 'Public', value: 'Public' },
                            { label: 'Private', value: 'Private' },
                        ]}
                        onChange={setVisibility}
                    />
                </div>

                <CreateBtn type="button" onClick={onCreateReport}>Create
                    <MdDoubleArrow size={25} />
                </CreateBtn>
            </GeneratereportsHeader>

            <GenerateReportsBodySection style={{ display: 'flex' }}>
                <ReportForm width={'40%'}>
                    <FieldContainer>
                        <ReportFieldLabel><GoDotFill size={10} style={{ color: 'red' }} /> Source</ReportFieldLabel>

                        <Select
                            className="basic-single report-form-select  flex-grow-1"
                            classNamePrefix="select"
                            defaultValue={selectedTable === null ? { label: 'Select Table', value: 'Select Table' } : selectedTable}

                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={true}
                            name="color"
                            options={tablesList.map(item => {
                                return { value: item, label: convertedNames(item) }
                            }
                            )}
                            onChange={getSelectedTableColumns}
                        />
                    </FieldContainer>

                    <FieldContainer>
                        <ReportFieldLabel><GoDotFill size={10} style={{ color: 'red' }} />Group By</ReportFieldLabel>

                        <Select
                            className="basic-single report-form-select flex-grow-1"
                            classNamePrefix="select"
                            defaultValue={groupBy === null ? { label: '-- None --', value: 'None' } : groupBy}

                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={true}
                            name="color"
                            options={tableColumns.map(item => {
                                return { ...item, value: item, label: convertedNames(item.name), }
                            }
                            )}
                            onChange={setGroupBy}
                        />
                    </FieldContainer>

                    {groupBy?.type === 'date' && <FieldContainer>
                        <ReportFieldLabel>GroupBy Label</ReportFieldLabel>

                        <Select
                            className="basic-single report-form-select flex-grow-1"
                            classNamePrefix="select"
                            defaultValue={dateLabel === null ? { label: '-- None --', value: 'None' } : dateLabel}
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={true}
                            name="color"
                            options={dateFiledLabels}
                            onChange={setDateLabel}
                        />
                    </FieldContainer>}

                    {stackbyIcludedchartTypes.includes(graphType) &&
                        <FieldContainer>
                            <ReportFieldLabel><GoDotFill size={10} style={{ color: 'red' }} />Stack By</ReportFieldLabel>

                            <Select
                                className="basic-single report-form-select flex-grow-1"
                                classNamePrefix="select"
                                defaultValue={stackBy === null ? { label: '-- None --', value: 'None' } : stackBy}

                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={true}
                                name="color"
                                options={tableColumns.map(item => {
                                    return { value: item, label: convertedNames(item.name), ...item }
                                }
                                )}
                                onChange={setStackBy}
                            />
                        </FieldContainer>
                    }


                    <FieldContainer>
                        <ReportFieldLabel><GoDotFill size={10} style={{ color: 'red' }} />Aggregation</ReportFieldLabel>

                        <Select
                            className="basic-single report-form-select flex-grow-1"
                            classNamePrefix="select"
                            defaultValue={
                                aggregation === null ?
                                    { label: '--Select--', value: 'select' } :
                                    aggregation
                            }

                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={true}
                            name="color"
                            options={
                                (groupBy?.value?.type !== 'int') ?
                                    { label: 'Count', value: 'count' }

                                    :
                                    aggregationList.map(item => {
                                        return { value: item, label: convertedNames(item.label), ...item }
                                    }
                                    )
                            }

                            onChange={setAggregation}
                        />
                    </FieldContainer>

                    {/* <FieldContainer>
                        <ReportFieldLabel>Display Table</ReportFieldLabel>

                        <Checkbox
                            variant="outlined"
                            checked={displayTable}
                            onChange={(e) => setDisplayTable(e.target.checked)}
                        />
                    </FieldContainer> */}

                    {/* <FieldContainer>
                        <ReportFieldLabel>
                            <GoDotFill size={10} style={{ color: 'red' }} />
                            Gauge Report Fields
                        </ReportFieldLabel>

                        <Select
                            className="basic-single report-form-select flex-grow-1"
                            classNamePrefix="select"
                            defaultValue={
                                gaugeReportFields?.length < 0 ?
                                    [{ label: '', value: '' }] :
                                    gaugeReportFields
                            }
                            isMulti

                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={true}
                            name="color"
                            components={animatedComponents}
                            closeMenuOnSelect={false}
                            options={gaugeReportFields.length > 3 ? [] :
                                tableColumns.filter(record => record.type === 'int').map(item => (
                                    { ...item, value: item, label: convertedNames(item.name) }
                                ))}
                            onChange={updateGaugeReportFields}
                        />
                    </FieldContainer> */}

                    <span style={{
                        color: '#023e8a',
                        fontSize: '0.7rem',
                        background: '#caf0f8 ',
                        padding: '2px 10px',
                        borderRadius: '5px',
                    }}>
                        !important:  "<GoDotFill size={10} style={{ color: 'red' }} />" Marked are manadatory fields.
                    </span>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            rowGap: '15px,'
                        }}
                    >
                        <h5>Filter Conditions</h5>

                        {filterConditions.length > 0 ?
                            filterConditions.map((filter, index) => (
                                <FiltersContainer key={filter.id}>
                                    <FilterFieldContainer>
                                        <Select
                                            className="basic-single report-form-select flex-grow-1"
                                            classNamePrefix="select"
                                            defaultValue={
                                                filter.column === null
                                                    ? { label: '--Column--', value: 'Column' }
                                                    : filter.column
                                            }
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={false}
                                            isRtl={false}
                                            isSearchable={true}
                                            name="column"
                                            options={tableColumns.filter(item => item.type !== 'json').map((item) => ({
                                                value: item,
                                                label: convertedNames(item.name),
                                            }))}
                                            onChange={(e) =>
                                                setFilterConditions((prevConditions) =>
                                                    prevConditions.map((cond, i) =>
                                                        i === index ? { ...cond, column: e } : cond
                                                    )
                                                )
                                            }
                                            components={components}
                                        />
                                    </FilterFieldContainer>

                                    <FilterFieldContainer>
                                        <Select
                                            className="basic-single report-form-select flex-grow-1"
                                            classNamePrefix="select"
                                            defaultValue={
                                                filter.operation === null
                                                    ? { label: '--Operation--', value: 'Operation' }
                                                    : filter.operation
                                            }
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={false}
                                            isRtl={false}
                                            isSearchable={true}
                                            name="operation"
                                            options={operationList.map((item) => ({
                                                value: item,
                                                label: convertedNames(item.label),
                                            }))}
                                            onChange={(e) =>
                                                setFilterConditions((prevConditions) =>
                                                    prevConditions.map((cond, i) =>
                                                        i === index ? { ...cond, operation: e } : cond
                                                    )
                                                )
                                            }
                                            components={components}
                                        />
                                    </FilterFieldContainer>

                                    <FilterFieldContainer>
                                        {switchValueField(filter, index)}
                                    </FilterFieldContainer>

                                    <ActionButtonConditions>
                                        <AndBtn
                                            type="button"
                                            onClick={(e) => addNewCondition(e, filter.id, 'and')}
                                            condition={filter.condition}
                                        >
                                            <LuAmpersand size={15} />
                                        </AndBtn>

                                        <OrBtn
                                            type="button"
                                            onClick={(e) => addNewCondition(e, filter.id, 'or')}
                                            condition={filter.condition}
                                        >
                                            <FaGripLinesVertical size={15} />
                                        </OrBtn>

                                        <RemoveConditionBtn
                                            type='button'
                                            onClick={() => removeCondition(filter.id)}
                                        >
                                            <MdRemoveCircle size={20} />
                                        </RemoveConditionBtn>
                                    </ActionButtonConditions>
                                </FiltersContainer>
                            ))
                            :
                            <AddConditionBtn
                                type="button"
                                onClick={addNewCondition}
                            >
                                + Add Filter Condition(s)
                            </AddConditionBtn>
                        }
                    </div>
                </ReportForm>

                <PreviewContainer width={'60%'}>
                    <FieldContainer>
                        {selectedTable && groupBy && aggregation &&
                            <UpdatePreviewBtn
                                type="button"
                                isLoading={isLoading}
                                onClick={generateAndGetReportData}
                            >
                                <LuRefreshCw size={20} />
                                {isLoading ? <span> Generating...</span> : null}
                            </UpdatePreviewBtn>
                        }
                    </FieldContainer>

                    <CharContainer>{renderselectedGraph()}</CharContainer>

                    {displayTable &&
                        <TableContainer >
                            <DisplayTable tableData={orderByData} />
                        </TableContainer>
                    }
                </PreviewContainer>
            </GenerateReportsBodySection>
        </ReportFormContainer>
    )
}