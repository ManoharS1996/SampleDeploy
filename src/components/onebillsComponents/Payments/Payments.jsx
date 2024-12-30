// MODULE IMPORTS
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";

// STYLES IMPORTS
import {
    MainContainer, ContentContainer, BodyDiv, ActionsDiv, CreateNewBtn, Icon, SearchDiv, Search, Icon2, InputTag, Table,
    TrTag, ThTag, TdTag, Thead, DataDiv, OperationDiv, Btn, Line, HighlightText, NoRecordsText, TableDiv, PaginationDiv, BtnsDiv, PaginationBtn
} from './StyledComponents'

//COMPONENT IMPORTS
import SideNav from '../SideNav/SideNav'
import Header from '../Header/Header'
import { savedToken } from '../DefaultData/DefaultData';
import { Loader } from '../DefaultData/StyledComponents';

// ICON IMPORTS
import { TbCircleDashedPlus } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { GrStatusGood } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md"


const Payments = () => {
    const navigate = useNavigate()
    const UserID = localStorage.getItem('userId');
    const [searchText, setSearchText] = useState('')
    const [payments, setPayments] = useState([])
    const Columns = ['payment_id', 'invoice_id', 'payment_due_date', 'payment_state', 'mode_of_payment']
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPayments, setTotalPayments] = useState(0);

    useEffect(() => {
        if (searchText === '') {
            getPaymentsList()
        } else {
            getSearchedPaymentsList()
        }
    }, [currentPage, pageSize, searchText])

    const getSearchedPaymentsList = async () => {
        setLoading(true); // Start loading
        try {
            const url = `${apiUrl}/allPayments/${UserID}?text=${encodeURIComponent(searchText)}&page=${currentPage}&limit=${pageSize}`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${savedToken}`,
                },
            };

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTotalPayments(data.totalPayments || data?.payments?.length);

            // Set payments data or default to empty array
            setPayments(data.payments || []);
        } catch (error) {
            console.error('Error fetching Payments Data:', error.message, error);
        } finally {
            setLoading(false); // loading state is reset
        }
    };

    // FUNCTION TO GET PAYMENTS LIST FROM THE BACKEND
    const getPaymentsList = async () => {
        setLoading(true); // Start loading
        try {
            const url = `${apiUrl}/allPayments/${UserID}?page=${currentPage}&limit=${pageSize}`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${savedToken}`,
                },
            };

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTotalPayments(data.totalPayments || data?.payments?.length);

            // Set payments data or default to empty array
            setPayments(data.payments || []);
        } catch (error) {
            console.error('Error fetching Payments Data:', error.message, error);
        } finally {
            setLoading(false); // loading state is reset
        }
    };

    // NAVIGATE TO CREATE PURCHASE FORM
    const OnCreate = () => {
        navigate('/Purchases/Create-Purchase')
    }

    // NAVIGATE TO PURCHANGE DETAIL VIEW
    const OnEdit = (id) => {
        navigate(`/Purchases/${id}`)
    }

    //FILTERING THE DATA BY SEARCH TEXT  
    const filteredCustomers = () => {

        const SearchText = searchText.trim().toLowerCase();

        const searchTextsArray = SearchText.split(' ')

        const filterTable = (data, searchTextsArray) => {
            return data.filter(item => {
                return searchTextsArray.every((SearchText) => {
                    if (SearchText === undefined || SearchText === null) return true;

                    const searchInOBject = (obj) => {
                        return Object.values(obj).some(value => {
                            if (value !== null && value !== undefined) {
                                if (typeof value === 'object' && !Array.isArray(value)) {
                                    return searchInOBject(value)
                                }

                                return value.toString().toLowerCase().includes(SearchText)
                            }
                            return false
                        })
                    }
                    return searchInOBject(item)
                });
            });
        };

        const result = filterTable([...payments], searchTextsArray);

        return result
    };

    //HIGHLIGHTING THE TEXT THAT WE SEARCHED IN THE TABLE
    const highlightText = (text, highlight) => {
        text = String(text);

        if (!highlight || !highlight.trim()) {
            return text;
        }
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <HighlightText key={index} >
                            {part}
                        </HighlightText>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    // FUNCTION TO TOGGLE THE STATUS OF THE PURCHASE
    const OnStatusToggle = async (id) => {
        try {
            const state = payments.find(each => each.payment_id === id)
            if (state.payment_state === 'received' && state.status === 'inactive') {
                enqueueSnackbar(`Purchase Order closed Can't change state`, { preventDuplicate: true, variant: 'warning', autoHideDuration: 1000 });
                return
            }
            const currentStatus = state.status

            // SET BUTTON TEXT BASED ON CURRENT STATUS
            const confirmButtonText = currentStatus === 'active' ? 'Mark Inactive' : 'Mark Active';
            const warningText = currentStatus === 'active' ? 'Do you really want to mark this as inactive?' : 'Do you really want to mark this as active?';

            // SHOW SWEETALERT WITH DYNAMIC BUTTON TEXt
            const result = await Swal.fire({
                title: "Are you sure?",
                text: warningText,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: confirmButtonText,
                cancelButtonText: "Cancel",
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                    htmlContainer: 'swal2-html-container',
                    confirmButton: 'swal2-confirm',
                    cancelButton: 'swal2-cancel',
                    icon: 'my-custom-icon',
                },
            });

            // IF USER CONFIRMS, TOGGLE THE PAYMENT STATUS
            if (result.isConfirmed) {
                const toggleUrl = `${apiUrl}/toggle-payment-status/${id}/${UserID}`;
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${savedToken}`
                    }
                };

                const toggleResponse = await fetch(toggleUrl, options);
                if (!toggleResponse.ok) {
                    const errorText = await toggleResponse.text();
                    throw new Error(`Error: ${toggleResponse.status} - ${toggleResponse.statusText || errorText}`);
                }

                const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
                await getPaymentsList();
                enqueueSnackbar(`Purchase with ID ${id} marked as ${newStatus}!`, { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });
            }
        } catch (error) {
            console.error('Error toggling payment status:', error);
            enqueueSnackbar(`Failed to toggle payment status for ID ${id}!`, { preventDuplicate: true, variant: 'error', autoHideDuration: 1000 });
        }
    };

    // FUNCTION TO PARSE DATE
    const isDate = (value) => {
        // CHECKING IF THE VALUE IS A VALID DATE OBJECT OR A STRING THAT CAN BE PARSED AS A DATE
        return (
            value instanceof Date || // CHECKING IF IT'S ALREADY A DATE OBJECT
            (typeof value === 'string' && !isNaN(Date.parse(value))) // CHECK IF IT'S A STRING THAT CAN BE PARSED
        );
    };

    // FUNCTION TO CONVERT SNAKE CASE TO TITLE CASE
    const convertName = (name) => {
        const nameArr = name.split('_')
        const convertedName = nameArr.map((item,) => item[0].toUpperCase() + item.slice(1))
        return (convertedName.join(' '))
    }

    return (
        <MainContainer>
            <Header />

            <ContentContainer>
                <SideNav />

                <BodyDiv>

                    <ActionsDiv>
                        <SearchDiv>
                            <Search>
                                <Icon2><BsSearch /></Icon2>
                                <InputTag type='search' onChange={(e) => setSearchText(e.target.value)} />
                            </Search>

                        </SearchDiv>

                        <CreateNewBtn type='button' onClick={OnCreate}>
                            Create Payment
                            <Icon> <TbCircleDashedPlus /> </Icon>
                        </CreateNewBtn>

                    </ActionsDiv>

                    {
                        loading ?
                            (
                                <DataDiv style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Loader />
                                </DataDiv>
                            ) : payments.length === 0 ? (
                                <DataDiv style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <NoRecordsText>Purchase Records Not Found</NoRecordsText>
                                </DataDiv>
                            ) :
                                (
                                    <DataDiv>
                                        <TableDiv>
                                            <Table>
                                                <Thead>
                                                    <TrTag>
                                                        {Columns.map(col => (
                                                            <ThTag key={col}>{convertName(col)}</ThTag>
                                                        ))}
                                                        <ThTag style={{ textAlign: 'center' }}>Status</ThTag>
                                                    </TrTag>
                                                </Thead>

                                                <tbody>
                                                    {filteredCustomers().map((each, index) => (
                                                        <TrTag key={index}>
                                                            {Object.keys(each).map((row) => {
                                                                // CHECKING IF THE COLUMN IS IN THE COLUMNS ARRAY
                                                                if (Columns.includes(row)) {
                                                                    const cellValue = each[row];

                                                                    // CHECKING IF THE VALUE IS A DATE
                                                                    if (isDate(cellValue)) {
                                                                        // CONVERT DATE TO LOCAL DATE STRING ONLY (WITHOUT TIME)
                                                                        const localDate = new Date(cellValue).toLocaleDateString();
                                                                        return <TdTag key={`${row}-${index}`}>{highlightText(localDate, searchText)}</TdTag>;
                                                                    }

                                                                    // CHECKING IF THE COLUMN IS 'payment_id'
                                                                    if (row === 'payment_id') {
                                                                        return <TdTag key={`${row}-${index}`}>{highlightText(cellValue, searchText)}</TdTag>;
                                                                    }

                                                                    // GENERAL CASE FOR OTHER VALUES
                                                                    return <TdTag key={`${row}-${index}`}>{highlightText(cellValue, searchText)}</TdTag>;
                                                                }
                                                                return null; // RETURN NULL FOR COLUMNS THAT ARE NOT INCLUDED
                                                            })}
                                                            <TdTag>
                                                                <OperationDiv>
                                                                    <Btn
                                                                        style={{ color: 'blue', justifyContent: 'right' }}
                                                                        type="button"
                                                                        onClick={() => OnEdit(each.payment_id)}
                                                                        title='Edit'
                                                                    >
                                                                        <TbEdit />
                                                                    </Btn>
                                                                    <Line />
                                                                    <Btn
                                                                        style={{ color: each.status === 'active' ? 'green' : 'red' }}
                                                                        type="button"
                                                                        onClick={() => OnStatusToggle(each.payment_id)}
                                                                        title='Status'
                                                                    >
                                                                        {each.status !== 'active' ?
                                                                            <MdCancel /> :
                                                                            <GrStatusGood />
                                                                        }

                                                                    </Btn>
                                                                </OperationDiv>
                                                            </TdTag>
                                                        </TrTag>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </TableDiv>

                                        <PaginationDiv>
                                            <h6>
                                                {totalPayments}
                                            </h6>
                                            <BtnsDiv>
                                                <PaginationBtn type="button"
                                                    disabled={currentPage === 1}
                                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                >
                                                    <MdKeyboardArrowLeft />

                                                </PaginationBtn>
                                                <span>Page {currentPage}</span>
                                                <PaginationBtn type="button"
                                                    disabled={currentPage * pageSize >= totalPayments}
                                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                                >
                                                    <MdKeyboardArrowRight />
                                                </PaginationBtn>
                                            </BtnsDiv>
                                        </PaginationDiv>

                                    </DataDiv>
                                )

                    }

                </BodyDiv>

                <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />

            </ContentContainer>


        </MainContainer>
    )
}

export default Payments