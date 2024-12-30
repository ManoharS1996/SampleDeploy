import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import _ from 'lodash'

// ICON IMPORTS
import { CiSettings } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { RiFilter2Line } from "react-icons/ri";

// COMPONENT IMPORTS
import Header from "../../../Header/Header";
import SideNav from '../../SideNavBar/SideNav'
import Settings from "../../Settings/Settings";
import WonContext from "../../../../context/WonContext";
import ConfigureFields from "../../ConfigureFields/ConfigureFields";
import TableComponent from "../../../TableComponent/TableComponent";
import { getTableData, getTableColumnNames } from "../../../../CheckAndExecuteFlows/CRUDoperations";

// <<<<<Model Styles
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        top: '7%',
        left: '4%',
        right: '2%',
        bottom: '8%',
        borderRadius: '10px',
        width: '92vw',
        height: '87vh',
        overflow: 'hidden',
        padding: '3px',
    },
}
// Model Styles>>>>>

import {
    ActionsContainer, AllText, AndBtn, AndOrBtnClose, BackBtn,
    ConfigureButton, CustomContainer, CustomViewContainer, DropdownMenu,
    DropdownToggle, FilterBtn, FilterContainer, FormContent, HeaderContainer,
    MenuItem, MultiLevelDropdownContainer, OrBtn, SearchInput, SideNavNContentContainer,
    StyledDropDown, StyledItem, StyledMenu, StyledToggle, SubMenu, SubMenuItem,
    TitleContainer,
} from '../ReportsStyledComponents';


const DropdownBtnStyles1 = {
    width: '95%',
    height: '100%',
    backgroundColor: '#fff',
    color: '#000',
    padding: '0px',
}

const Data = [
    {
        "notification_id": 1,
        "notification_name": "New Notification 1",
        "active": true,
        "description": "Description for Notification 1",
        "who_will_receive": "Users",
        "subject": "Subject 1",
        "email_body": "This is the email body for Notification 1.",
        "bulk_notification": false,
        "sms_alert": true,
        "preview": "Preview content for Notification 1",
        "created": "2024-01-04T12:00:00",
        "created_by": "User1",
        "updated": "2024-01-05T14:30:00",
        "updated_by": "User2"
    },
    {
        "notification_id": 2,
        "notification_name": "New Notification 2",
        "active": false,
        "description": "Description for Notification 2",
        "who_will_receive": "Groups",
        "subject": "Subject 2",
        "email_body": "This is the email body for Notification 2.",
        "bulk_notification": true,
        "sms_alert": false,
        "preview": "Preview content for Notification 2",
        "created": "2024-01-06T10:45:00",
        "created_by": "User3",
        "updated": "2024-01-07T11:20:00",
        "updated_by": "User4"
    },
    {
        "notification_id": 3,
        "notification_name": "New Notification 3",
        "active": true,
        "description": "Description for Notification 3",
        "who_will_receive": "Fields",
        "subject": "Subject 3",
        "email_body": "This is the email body for Notification 3.",
        "bulk_notification": true,
        "sms_alert": true,
        "preview": "Preview content for Notification 3",
        "created": "2024-01-08T14:00:00",
        "created_by": "User5",
        "updated": "2024-01-09T16:45:00",
        "updated_by": "User6"
    },
    {
        "notification_id": 4,
        "notification_name": "New Notification 4",
        "active": false,
        "description": "Description for Notification 4",
        "who_will_receive": "Users",
        "subject": "Subject 4",
        "email_body": "This is the email body for Notification 4.",
        "bulk_notification": false,
        "sms_alert": true,
        "preview": "Preview content for Notification 4",
        "created": "2024-01-10T09:30:00",
        "created_by": "User7",
        "updated": "2024-01-11T12:15:00",
        "updated_by": "User8"
    },
    {
        "notification_id": 5,
        "notification_name": "New Notification 5",
        "active": true,
        "description": "Description for Notification 5",
        "who_will_receive": "Groups",
        "subject": "Subject 5",
        "email_body": "This is the email body for Notification 5.",
        "bulk_notification": true,
        "sms_alert": false,
        "preview": "Preview content for Notification 5",
        "created": "2024-01-12T15:45:00",
        "created_by": "User9",
        "updated": "2024-01-13T17:30:00",
        "updated_by": "User10"
    },
    {
        "notification_id": 6,
        "notification_name": "New Notification 6",
        "active": false,
        "description": "Description for Notification 6",
        "who_will_receive": "Fields",
        "subject": "Subject 6",
        "email_body": "This is the email body for Notification 6.",
        "bulk_notification": false,
        "sms_alert": true,
        "preview": "Preview content for Notification 6",
        "created": "2024-01-14T11:00:00",
        "created_by": "User11",
        "updated": "2024-01-15T13:45:00",
        "updated_by": "User12"
    },
    {
        "notification_id": 7,
        "notification_name": "New Notification 7",
        "active": true,
        "description": "Description for Notification 7",
        "who_will_receive": "Users",
        "subject": "Subject 7",
        "email_body": "This is the email body for Notification 7.",
        "bulk_notification": true,
        "sms_alert": true,
        "preview": "Preview content for Notification 7",
        "created": "2024-01-16T16:15:00",
        "created_by": "User13",
        "updated": "2024-01-17T18:00:00",
        "updated_by": "User14"
    },
    {
        "notification_id": 8,
        "notification_name": "New Notification 8",
        "active": false,
        "description": "Description for Notification 8",
        "who_will_receive": "Groups",
        "subject": "Subject 8",
        "email_body": "This is the email body for Notification 8.",
        "bulk_notification": false,
        "sms_alert": false,
        "preview": "Preview content for Notification 8",
        "created": "2024-01-18T12:30:00",
        "created_by": "User15",
        "updated": "2024-01-19T14:15:00",
        "updated_by": "User16"
    },
    {
        "notification_id": 9,
        "notification_name": "New Notification 9",
        "active": true,
        "description": "Description for Notification 9",
        "who_will_receive": "Fields",
        "subject": "Subject 9",
        "email_body": "This is the email body for Notification 9.",
        "bulk_notification": true,
        "sms_alert": true,
        "preview": "Preview content for Notification 9",
        "created": "2024-01-20T17:45:00",
        "created_by": "User17",
        "updated": "2024-01-21T19:30:00",
        "updated_by": "User18"
    },
    {
        "notification_id": 10,
        "notification_name": "New Notification 10",
        "active": false,
        "description": "Description for Notification 10",
        "who_will_receive": "Users",
        "subject": "Subject 10",
        "email_body": "This is the email body for Notification 10.",
        "bulk_notification": false,
        "sms_alert": true,
        "preview": "Preview content for Notification 10",
        "created": "2024-01-22T10:00:00",
        "created_by": "User19",
        "updated": "2024-01-23T11:45:00",
        "updated_by": "User20"
    }
]

const TableColumnNames = Object.keys(Data[0])
const defaultColumnsInTable = ['notification_id', 'notification_name', 'active', 'description', 'subject', 'email_body', 'created_by'];

export default function AllReports() {
    const navigate = useNavigate();
    const [reportsData, setReportsData] = useState([]) //state for table data 

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedFilter, setFilter] = useState('')
    const [actionsOnSelectedRows, setActionsOnSelectedRows] = useState('')
    const [filterText, setFilterText] = useState('')
    const [isFilterActive, setFilterStatus] = useState(false)
    const [searchingText, setSearchingText] = useState('') //state for search bar
    const [filterConditions, setFilterConditions] = useState([
        { filter: '', condition: '', searchText: '', logicalOperator: '', filterDisplayText: '' }
    ]);

    const [isConfigureActive, setConfigure] = useState(false)
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [isAllCheckBoxActive, setIsAllCheckBoxActive] = useState(false)
    // console.log(selectedColumns)

    const conditions = ['Like', 'Not Like', 'Equals To', 'Not Equals To']
    const ColumnNames = _.map(selectedColumns, (column) => _.capitalize(column.name.replace(/([A-Z])/g, ' $1')))
    const SelectedRowActionsList = ['Delete', 'Mark As Favorite', 'Move', 'Copy']

    // <<<<API CALL

    useEffect(() => {
        getAllNotifications()
    }, [])

    const getAllNotifications = async () => {
        const data = await getTableData('reports')
        const columns = await getTableColumnNames('reports')
        // console.log(columns)
        data.reports.length > 0 && setReportsData(data.reports)
        columns.columns.length > 0 && setSelectedColumns(columns.columns)
    }

    // API CALL >>>>>

    const OnSelectedRowActions = (action) => {
        setActionsOnSelectedRows(action) // write multiple actions with API calls on selected rows here
        if (action === 'Delete') {
            const x = reportsData.filter(item => !selectedRows.includes(item.notification_id))
            setReportsData(x)
        }
        setIsAllCheckBoxActive(false);
        // console.log(action)
    }

    const handleSelectAllCheckBox = (e) => {             //HANDLING SELECT ALL CHECKBOX
        setIsAllCheckBoxActive(e.target.checked);

        if (e.target.checked) {
            const allUserIds = reportsData.map(item => item.notification_id);
            setSelectedRows(allUserIds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleCheckboxChange = (notificationId) => {
        const isSelected = selectedRows.includes(notificationId);
        // const theseSelectedData = usersData.filter(item => item.user_id === userId)
        if (isSelected) {
            setSelectedRows(selectedRows.filter((id) => id !== notificationId));
        } else {
            setSelectedRows([...selectedRows, notificationId]);
        }
    }

    const onSetSearchText = (e, index) => {
        const text = e.target.value;
        const filters = [...filterConditions];
        filters[index] = { ...filters[index], searchText: text };
        setFilterConditions(filters);
    };

    const applyFilterCondition = (data, { filter, searchText, condition }) => {
        const normalizeText = (text) => text.toString().toLowerCase();

        const filterFunctions = {
            'Like': (item) => normalizeText(item[filter]).includes(normalizeText(searchText)),
            'Not Like': (item) => !normalizeText(item[filter]).includes(normalizeText(searchText)),
            'Equals To': (item) => normalizeText(item[filter]) === normalizeText(searchText),
            'Not Equals To': (item) => normalizeText(item[filter]) !== normalizeText(searchText),
        };

        return data.filter(filterFunctions[condition] || (() => true));
    };

    const applyLogicalOperator = (result, nextConditionResult, logicalOperator) => {
        const logicalOperators = {
            'AND': (item) => nextConditionResult.includes(item),
            'OR': (item) => !result.includes(item), // Change here to return records not present in the original result
        };

        return result.concat(nextConditionResult.filter(logicalOperators[logicalOperator] || (() => true)));
    };

    const filteredData = () => {
        let result = [...reportsData];

        // Apply existing filter conditions
        filterConditions.forEach((condition) => {
            if (condition.filter && condition.condition) {
                result = applyFilterCondition(result, condition);
            }
        });

        // Apply searching text filter
        if (searchingText.trim() !== '') {
            result = result.filter((item) =>
                Object.values(item).some((value) => {
                    // Check if value is not null or undefined before calling toString
                    const stringValue = value !== null && value !== undefined ? value.toString().toLowerCase() : '';
                    return stringValue.includes(searchingText.toLowerCase());
                })
            );
        }

        // Apply logical operators
        for (let i = 1; i < filterConditions.length; i++) {
            const logicalOperator = filterConditions[i].logicalOperator;

            if (logicalOperator && result.length > 0) {
                const nextConditionResult = applyFilterCondition(reportsData, filterConditions[i]);
                result = applyLogicalOperator(result, nextConditionResult, logicalOperator);
            }
        }
        return result;
    };

    const OnSetFilter = (index, event) => {
        const text = event.target.id;
        // Update state with filter text
        setFilterText(text);
        // Capitalize the filter text
        const snakeCase = text.replace(/([A-Z])/g, (match) => match.toLowerCase());
        // Update state with the capitalized filter text
        setFilter(snakeCase);
        // Create a copy of filterConditions array
        const Filters = [...filterConditions];
        // Update the specific filter at the given index
        Filters[index] = {
            ...Filters[index],
            filter: snakeCase,
            filterDisplayText: text
        };
        // Update state with the modified Filters array
        setFilterConditions(Filters);
    };

    const OnsetCondition = (index, event) => {
        const text = event.target.id;
        // Create a copy of filterConditions array
        const Filters = [...filterConditions];
        // Update the specific filter at the given index with the new condition
        Filters[index] = {
            ...Filters[index],
            condition: text
        };
        // Update state with the modified Filters array
        setFilterConditions(Filters);
    };

    // Toggling Filter container visibility
    const OnFilter = () => {
        setFilterStatus(!isFilterActive)
    }

    const onAnd = (index) => {
        const updatedConditions = [...filterConditions];
        updatedConditions[index] = {
            ...updatedConditions[index],
            logicalOperator: 'AND'
        };

        setFilterConditions([...updatedConditions, { filter: '', condition: '', searchText: '', logicalOperator: '' }]);
    };

    const onOr = (index) => {
        const updatedConditions = [...filterConditions];
        updatedConditions[index] = {
            ...updatedConditions[index],
            logicalOperator: 'OR'
        };

        setFilterConditions([...updatedConditions, { filter: '', condition: '', searchText: '', logicalOperator: '' }]);

    }

    const RemoveFilterContainer = (index) => {
        const Filters = [...filterConditions]
        if (Filters.length > 1) {
            Filters.splice(index, 1)
            setFilterConditions(Filters)
        }
    }

    // handling searching text on change
    const onChangeSearchText = (e) => {
        const newText = e.target.value;
        setSearchingText(newText);
    };

    // <<<<<Model Functions
    const ToggleConfigure = () => {
        setConfigure(true)
    }

    const closeConfig = () => {
        setConfigure(false)
    }
    // Model Functions >>>>>

    // go back button functionality
    const OnBack = () => {
        // Navigate to a specific route
        navigate(-1);
    };

    return (
        <WonContext.Consumer>
            {value => {
                const { openSettings, recordsPerPage } = value

                return (
                    <CustomViewContainer>
                        <Header />

                        <SideNavNContentContainer>
                            <CustomContainer>
                                <FormContent>
                                    <HeaderContainer>
                                        <TitleContainer>
                                            {/* Back Button */}
                                            <BackBtn onClick={OnBack}>
                                                <IoIosArrowBack size={26} />
                                            </BackBtn>

                                            {/* filter button */}
                                            <FilterBtn onClick={OnFilter} style={{ background: isFilterActive ? '#adb5bd' : '' }}>
                                                <RiFilter2Line size={20} />
                                            </FilterBtn>

                                            <MultiLevelDropdownContainer>
                                                <DropdownToggle>All Reports</DropdownToggle>

                                                <DropdownMenu>
                                                    <MenuItem>
                                                        Export
                                                        <IoIosArrowForward className="plus" />

                                                        <SubMenu>
                                                            <SubMenuItem>PDF</SubMenuItem>
                                                            <SubMenuItem>CSV</SubMenuItem>
                                                            <SubMenuItem>Excel</SubMenuItem>
                                                        </SubMenu>
                                                    </MenuItem>

                                                    <MenuItem>Selected Row Actions
                                                        <IoIosArrowForward className="plus" />

                                                        <SubMenu>
                                                            {SelectedRowActionsList.map((each) => (
                                                                <SubMenuItem key={each} onClick={() => OnSelectedRowActions(each)} >{each}</SubMenuItem>
                                                            ))}
                                                        </SubMenu>
                                                    </MenuItem>

                                                    <Link to='/create-department'>
                                                        <MenuItem >
                                                            Create New
                                                            <GoPlus className="plus" />
                                                        </MenuItem>
                                                    </Link>
                                                </DropdownMenu>
                                            </MultiLevelDropdownContainer>
                                        </TitleContainer>

                                        <ActionsContainer>
                                            <SearchInput type="text" placeholder="Search" onChange={onChangeSearchText} value={searchingText} />

                                            <ConfigureButton onClick={ToggleConfigure}>
                                                <CiSettings size={20} /> Configure Fields
                                            </ConfigureButton>

                                            <ConfigureFields
                                                isConfigureActive={isConfigureActive}
                                                closeConfig={closeConfig}
                                                customStyles={customStyles}
                                                TableColumnNames={TableColumnNames}
                                                setSelectedColumns={setSelectedColumns}
                                                selectedColumns={selectedColumns}
                                                filteredData={filteredData}
                                            />
                                        </ActionsContainer>
                                    </HeaderContainer>

                                    {isFilterActive ? (
                                        <>
                                            {filterConditions.map((eachArray, index) => (
                                                <FilterContainer key={index}>
                                                    <StyledDropDown>
                                                        <StyledToggle id="operator" style={DropdownBtnStyles1}>
                                                            <p style={{ marginLeft: '5px' }}>{eachArray.filterDisplayText ? eachArray.filterDisplayText : 'Select Filter'}</p>
                                                        </StyledToggle>
                                                        <StyledMenu >
                                                            {ColumnNames.map((option) => (
                                                                <StyledItem key={option} id={option} value={option} onClick={(event) => OnSetFilter(index, event)}> {option}</StyledItem>
                                                            ))}
                                                        </StyledMenu>
                                                    </StyledDropDown>

                                                    <StyledDropDown style={{ marginLeft: '4px' }}>
                                                        <StyledToggle id="operator" style={DropdownBtnStyles1}>
                                                            <p style={{ marginLeft: '5px' }}>{eachArray.condition ? eachArray.condition : 'Select Condition'}</p>
                                                        </StyledToggle>
                                                        <StyledMenu >
                                                            {conditions.map((option) => (
                                                                <StyledItem key={option} id={option} value={option} onClick={(event) => OnsetCondition(index, event)}> {option}</StyledItem>
                                                            ))}
                                                        </StyledMenu>
                                                    </StyledDropDown>

                                                    <SearchInput type="text" placeholder="Value" value={eachArray.searchText} onChange={(e) => onSetSearchText(e, index)} />
                                                    {/* {eachArray.logicalOperator ? <LogicalOperatorText>{eachArray.logicalOperator}</LogicalOperatorText> : null} */}

                                                    <AndBtn style={{ background: eachArray.logicalOperator === 'AND' ? '#efd3d7' : '#fff' }} onClick={() => onAnd(index)} id={`And-${index}`}>AND</AndBtn>
                                                    <OrBtn style={{ background: eachArray.logicalOperator === 'OR' ? '#efd3d7' : '#fff' }} onClick={() => onOr(index)} id={`Or-${index}`}>OR</OrBtn>
                                                    {index !== 0 ? <AndOrBtnClose onClick={() => RemoveFilterContainer(index)}><IoClose size={20} /></AndOrBtnClose> : null}

                                                </FilterContainer>
                                            ))}
                                        </>
                                    ) : null}

                                    <AllText>All</AllText>

                                    <TableComponent
                                        selectedColumns={selectedColumns}
                                        filteredData={filteredData}
                                        recordsPerPage={recordsPerPage}
                                        tableData={reportsData}
                                        id={'id'}
                                        handleCheckboxChange={handleCheckboxChange}
                                        handleSelectAllCheckBox={handleSelectAllCheckBox}
                                        isAllCheckBoxActive={isAllCheckBoxActive}
                                        selectedRows={selectedRows}
                                        tableName={'notifications'}
                                    />
                                </FormContent>
                            </CustomContainer>

                            {openSettings ? <Settings /> : null}
                        </SideNavNContentContainer>
                    </CustomViewContainer>
                )
            }}
        </WonContext.Consumer>
    )
}   