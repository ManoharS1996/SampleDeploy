import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { SnackbarProvider, enqueueSnackbar } from "notistack"; // POP UP IMPORT
import Swal from "sweetalert2"; // POP UP IMPORT

// ICON IMPORTS
import { TbCircleDashedPlus } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { GrStatusGood } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

// COMPONENT IMPORTS
import SideNav from "../SideNav/SideNav";
import Header from "../Header/Header";
import { savedToken } from "../DefaultData/DefaultData";

// STYLES IMPORT
import {
    MainContainer,
    ContentContainer,
    BodyDiv,
    ActionsDiv,
    CreateNewBtn,
    Icon,
    SearchDiv,
    Search,
    Icon2,
    InputTag,
    Table,
    TrTag,
    ThTag,
    TdTag,
    Thead,
    DataDiv,
    OperationDiv,
    Btn,
    Line,
    HighlightText,
    NoRecordsText,
    TableDiv, PaginationDiv, PaginationBtn, BtnsDiv

} from "./StyledComponents";
import { Loader } from "../DefaultData/StyledComponents";

const Clients = () => {
    const navigate = useNavigate();
    const UserID = localStorage.getItem("userId");
    const [searchText, setSearchText] = useState("");
    const [Clients, setClients] = useState([]);
    const Columns = [
        "client_id",
        "client_name",
        "trading_name",
        "work_number",
        "gst_reference",
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(11);
    const [totalClients, setTotalClients] = useState(0);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchText === '') {
            getClientsList();

        } else {
            getSearchedClients()
        }
    }, [currentPage, pageSize, searchText]);

    const getSearchedClients = async () => {
        setLoading(true);
        try {
            const url = `${apiUrl}/onSearch-allClients/${UserID}?text=${encodeURIComponent(searchText)}&page=${currentPage}&limit=${pageSize}`;
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

            const { data, totalClients } = await response.json();

            setClients(data);
            setTotalClients(totalClients || data.length);
        } catch (error) {
            console.error('Error fetching paginated clients:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const getClientsList = async () => {
        setLoading(true);
        try {
            const url = `${apiUrl}/allClients/${UserID}?page=${currentPage}&limit=${pageSize}`;
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${savedToken}`,
                },
            };

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTotalClients(data.totalClients || data?.clients?.length);

            const updatedClients =
                data?.clients.filter((each) => each.client_name !== null) || [];

            setClients(updatedClients);
        } catch (error) {
            console.error("Error fetching Client Data:", error.message, error);
        } finally {
            setLoading(false);
        }
    };

    const OnCreate = () => {
        navigate("/Clients/Create-Client");
    };

    const OnEdit = (id) => {
        navigate(`/Clients/${id}`);
    };

    //FILTERING THE DATA BY SEARCH TEXT
    const filteredCustomers = () => {
        const SearchText = searchText.trim().toLowerCase();

        const searchTextsArray = SearchText.split(" ");

        const filterTable = (data, searchTextsArray) => {
            return data.filter((item) => {
                return searchTextsArray.every((SearchText) => {
                    if (SearchText === undefined || SearchText === null) return true;

                    const searchInOBject = (obj) => {
                        return Object.values(obj).some((value) => {
                            if (value !== null && value !== undefined) {
                                if (typeof value === "object" && !Array.isArray(value)) {
                                    return searchInOBject(value);
                                }

                                return value.toString().toLowerCase().includes(SearchText);
                            }
                            return false;
                        });
                    };
                    return searchInOBject(item);
                });
            });
        };

        const result = filterTable([...Clients], searchTextsArray);

        return result;
    };

    //HIGHLIGHTING THE TEXT THAT WE SEARCHED IN THE TABLE
    const highlightText = (text, highlight) => {
        text = String(text);

        if (!highlight || !highlight.trim()) {
            return text;
        }
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <HighlightText key={index}>{part}</HighlightText>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    const OnStatus = async (id) => {
        try {
            // GET THE CURRENT CLIENT STATUS FROM THE CLIENT LIST
            const client = Clients.find((each) => each.client_id === id);
            const currentStatus = client.status;

            // SET BUTTON TEXT AND WARNING TEXT DYNAMICALLY BASED ON CURRENT STATUS
            const confirmButtonText =
                currentStatus === "active" ? "Mark Inactive" : "Mark Active";
            const warningText =
                currentStatus === "active"
                    ? "Do you really want to mark this client as inactive?"
                    : "Do you really want to mark this client as active?";

            // SHOW SWEETALERT WITH DYNAMIC BUTTON AND WARNING TEXT
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
                    popup: "swal2-popup",
                    title: "swal2-title",
                    htmlContainer: "swal2-html-container",
                    confirmButton: "swal2-confirm",
                    cancelButton: "swal2-cancel",
                    icon: "my-custom-icon",
                },
            });

            // IF USER CONFIRMS, TOGGLE THE CLIENT STATUS
            if (result.isConfirmed) {
                const toggleUrl = `${apiUrl}/toggle-client-status/${id}`;
                const options = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${savedToken}`,
                    },
                };

                const response = await fetch(toggleUrl, options);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error: ${response.status} - ${errorText}`);
                }

                const newStatus = currentStatus === "active" ? "inactive" : "active";
                await getClientsList(); // REFRESH THE CLIENT LIST AFTER TOGGLING STATUS
                enqueueSnackbar(`Client with ID ${id} marked as ${newStatus}!`, {
                    preventDuplicate: true,
                    variant: "success",
                    autoHideDuration: 1000,
                });
            }
        } catch (error) {
            console.error("Error toggling client status:", error);
            enqueueSnackbar(`Failed to toggle client status for ID ${id}!`, {
                preventDuplicate: true,
                variant: "error",
                autoHideDuration: 1000,
            });
        }
    };

    const convertName = (name) => {
        const nameArr = name.split("_");
        const convertedName = nameArr.map(
            (item) => item[0].toUpperCase() + item.slice(1)
        );
        return convertedName.join(" ");
    };


    return (
        <MainContainer>
            <Header />

            <ContentContainer>
                <SideNav />

                <BodyDiv>
                    <ActionsDiv>
                        <SearchDiv>
                            <Search>
                                <Icon2>
                                    <BsSearch />
                                </Icon2>
                                <InputTag
                                    type="search"
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </Search>
                        </SearchDiv>

                        <CreateNewBtn type="button" onClick={OnCreate}>
                            Add Client
                            <Icon>
                                {" "}
                                <TbCircleDashedPlus />{" "}
                            </Icon>
                        </CreateNewBtn>
                    </ActionsDiv>

                    {loading ? (
                        <DataDiv style={{ alignItems: "center", justifyContent: "center" }}>
                            <Loader />
                        </DataDiv>
                    ) : Clients.length === 0 ? (
                        <DataDiv style={{ justifyContent: "center", alignItems: "center" }}>
                            <NoRecordsText>No client records to show</NoRecordsText>
                        </DataDiv>
                    ) : (
                        <DataDiv>
                            <TableDiv>
                                <Table>
                                    <Thead>
                                        <TrTag>
                                            {Columns.map((col) => (
                                                <ThTag key={col}>{convertName(col)}</ThTag>
                                            ))}
                                            <ThTag style={{ textAlign: "center" }}>Status</ThTag>
                                        </TrTag>
                                    </Thead>

                                    <tbody>
                                        {Clients.map((each, index) => (
                                            <TrTag key={index}>
                                                {Columns.map((col) => {
                                                    if (each[col] !== undefined && each[col] !== null) {
                                                        if (col === "client_id") {
                                                            return (
                                                                <TdTag key={col}>
                                                                    {highlightText(each[col], searchText)}
                                                                </TdTag>
                                                            );
                                                        }
                                                        return (
                                                            <TdTag key={col}>
                                                                {highlightText(each[col], searchText)}
                                                            </TdTag>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                                <TdTag>
                                                    <OperationDiv>
                                                        <Btn
                                                            style={{ color: "blue", justifyContent: "right" }}
                                                            type="button"
                                                            onClick={() => OnEdit(each.client_id)}
                                                            title="Edit"
                                                        >
                                                            <TbEdit />
                                                        </Btn>
                                                        <Line />
                                                        <Btn
                                                            style={{
                                                                color: each.status === "active" ? "green" : "red",
                                                            }}
                                                            type="button"
                                                            onClick={() => OnStatus(each.client_id)}
                                                            title="Status"
                                                        >
                                                            {each.status !== "active" ? (
                                                                <MdCancel />
                                                            ) : (
                                                                <GrStatusGood />
                                                            )}
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
                                    {totalClients}
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
                                        disabled={currentPage * pageSize >= totalClients}
                                        onClick={() => setCurrentPage((prev) => prev + 1)}
                                    >
                                        <MdKeyboardArrowRight />
                                    </PaginationBtn>
                                </BtnsDiv>
                            </PaginationDiv>
                        </DataDiv>
                    )}
                </BodyDiv>
                {/* CALLING POP UP  */}
                <SnackbarProvider
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                />
            </ContentContainer>
        </MainContainer>
    );
};

export default Clients;
