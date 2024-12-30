// MODULE IMPORTS
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";

// STYLES IMPORT 
import {
    MainContainer, ContentContainer, BodyDiv, ActionsDiv, CreateNewBtn, Icon, SearchDiv, Search, Icon2, InputTag, Table,
    TrTag, ThTag, TdTag, Thead, DataDiv, OperationDiv, Btn, Line, HighlightText, NoRecordsText,TableDiv, PaginationDiv, PaginationBtn, BtnsDiv
} from './StyledComponents'

// COMPONENT IMPORTS
import SideNav from '../SideNav/SideNav'
import Header from '../Header/Header'
import { savedToken } from '../DefaultData/DefaultData';
import { Loader } from '../DefaultData/StyledComponents'

// ICON IMPORTS
import { TbCircleDashedPlus } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { GrStatusGood } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const Products = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const UserID = localStorage.getItem('userId');
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('')
    const [products, setProducts] = useState([])
    const Columns = ['ID', 'name', 'category', 'total_stock', 'in_stock', 'price']
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(11);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        
        if(searchText === ''){
            getProductsList()
        }else{
            getSearchedItemsList()
        }
    }, [currentPage,pageSize,searchText])

    const getSearchedItemsList = async () => {
        setLoading(true);
        try {
            const url = `${apiUrl}/allProducts/${UserID}?text=${encodeURIComponent(searchText)}&page=${currentPage}&limit=${pageSize}`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${savedToken}`,
                }
            };

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTotalProducts(data.totalItems || data.length);
            setProducts(data.items);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Error fetching Products Data:', error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    // FUNCTION TO FETCH THE PRODUCT/SERVICE/EXPENCE LIST FROM THE DATABASE
    const getProductsList = async () => {
        setLoading(true);
        try {
            const url = `${apiUrl}/allProducts/${UserID}?page=${currentPage}&limit=${pageSize}`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${savedToken}`,
                }
            };

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTotalProducts(data.totalItems || data.length);
            setProducts(data.items);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Error fetching Products Data:', error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    // FUNCTION TO NAVIGATE TO CREATE PRODUCT/SERVICE/EXPENCE FORM
    const OnCreate = () => {
        navigate('/Items/Create-Item')
    }

    // FUNCTION TO NAVIGATE TO DETAILS/EDIT VIEW OF PRODUCT/SERVICE/EXPENCE
    const OnEdit = (id) => {
        navigate(`/Items/${id}`)
    }

    //FILTERING THE DATA LIST BY SEARCH TEXT  
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

        const result = filterTable([...products], searchTextsArray);

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

    // FUNCTION TO TOGGLE THE PRODUCT/SERVICE/EXPENCE STATUS 
    const OnStatusToggle = async (id) => {
        try {
            // FIND THE CURRENT STATUS OF THE SERVICE FROM THE PRODUCTS LIST
            const service = products.find(each => each.product_id === id);
            const currentStatus = service.status;

            // SET BUTTON TEXT AND WARNING TEXT DYNAMICALLY BASED ON CURRENT STATUS
            const confirmButtonText = currentStatus === 'active' ? 'Mark Inactive' : 'Mark Active';
            const warningText = currentStatus === 'active' ? 'Do you really want to mark this service as inactive?' : 'Do you really want to mark this service as active?';

            // SHOW SWEETALERT WITH DYNAMIC BUTTON TEXT AND WARNING TEXT
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

            // IF USER CONFIRMS, TOGGLE THE SERVICE STATUS
            if (result.isConfirmed) {
                const toggleUrl = `${apiUrl}/toggle-service-status/${id}`;
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${savedToken}`,
                    }
                };

                const response = await fetch(toggleUrl, options);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error: ${response.status} - ${response.statusText || errorText}`);
                }

                const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
                // REFRESH THE PRODUCTS LIST AFTER TOGGLING STATUS
                await getProductsList();
                enqueueSnackbar(`Service with ID ${id} marked as ${newStatus}!`, {
                    preventDuplicate: true,
                    variant: 'success',
                    autoHideDuration: 1000
                });
            }
        } catch (error) {
            console.error('Error toggling service status:', error);
            enqueueSnackbar(`Failed to toggle service status for ID ${id}!`, {
                preventDuplicate: true,
                variant: 'error',
                autoHideDuration: 1000
            });
        }
    };

    // FUNCTION TO CONVERT COLUMN NAMES FROM SNAKE CASE TO TITLE CASE
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
                            Add Product
                            <Icon> <TbCircleDashedPlus /> </Icon>
                        </CreateNewBtn>
                    </ActionsDiv>
                    {
                        loading ? (
                            <DataDiv style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Loader />
                            </DataDiv>
                        ) : products.length === 0 ? (
                            <DataDiv style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <NoRecordsText>Item Records Not Found</NoRecordsText>
                            </DataDiv>
                        ) : (
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
                                            {filteredCustomers().map((each) => (
                                                <TrTag key={each.product_id}>
                                                    {Object.keys(each).map((row) => {
                                                        return row === 'product_id' ? (
                                                            <TdTag key={row}>{highlightText(each[row], searchText)}</TdTag>
                                                        ) : row === 'product_name' ? (
                                                            <TdTag key={row}>{highlightText(each[row], searchText)}</TdTag>
                                                        ) : (
                                                            Columns.includes(row) && (
                                                                <TdTag key={row}>{highlightText(each[row], searchText)}</TdTag>
                                                            )
                                                        );
                                                    })}

                                                    <TdTag>
                                                        <OperationDiv>
                                                            <Btn
                                                                style={{ color: 'blue', justifyContent: 'right' }}
                                                                type="button"
                                                                onClick={() => OnEdit(each.product_id)}
                                                                title='Edit'
                                                            >
                                                                <TbEdit />
                                                            </Btn>
                                                            <Line />
                                                            <Btn
                                                                style={{ color: each.status === 'active' ? 'green' : 'red' }}
                                                                type="button"
                                                                onClick={() => OnStatusToggle(each.product_id)}
                                                                title='Status'
                                                            >
                                                                {each.status !== 'active' ? <MdCancel /> : <GrStatusGood />}
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
                                        {totalProducts}
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
                                            disabled={currentPage * pageSize >= totalProducts}
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

export default Products