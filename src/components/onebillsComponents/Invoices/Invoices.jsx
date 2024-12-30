// MODULE IMPORTS
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { createRoot } from "react-dom/client";

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
    TableDiv,
    PaginationDiv,
    BtnsDiv,
    PaginationBtn,
} from "./StyledComponents";

// COMPONENT IMPORTS
import SideNav from "../SideNav/SideNav";
import Header from "../Header/Header";
import { savedToken } from "../DefaultData/DefaultData";
import PDF1 from "../PDFTemplates/PDF1";
import PDF2 from "../PDFTemplates/PDF2";
import PDF3 from "../PDFTemplates/PDF3";
import { Loader } from "../DefaultData/StyledComponents";

// ICON IMPORTS
import { TbCircleDashedPlus } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { GrStatusGood } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const Invoices = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const UserID = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [invoices, setinvoices] = useState([]);
    const Columns = [
        "invoice_id",
        "invoice_name",
        "client",
        "quantity",
        "gross_amount",
    ];
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(11);
    const [totalInvoices, setTotalInvoices] = useState(0);

    useEffect(() => {
        if (searchText === "") {
            getInvoicesList();
        } else {
            getSearchedInvoicesList();
        }
    }, [currentPage, pageSize, searchText]);

    const getSearchedInvoicesList = async () => {
        setLoading(true); // Start loading
        try {
            const url = `${apiUrl}/allInvoices/${UserID}?text=${encodeURIComponent(
                searchText
            )}&page=${currentPage}&limit=${pageSize}`;
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
            setTotalInvoices(data.totalInvoices || data?.invoices?.length);
            setinvoices(data.invoices || []);
        } catch (error) {
            console.log("Error fetching Invoices Data:", error.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const getInvoicesList = async () => {
        setLoading(true); // Start loading
        try {
            const url = `${apiUrl}/allInvoices/${UserID}?page=${currentPage}&limit=${pageSize}`;
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
            setTotalInvoices(data.totalInvoices || data?.invoices?.length);
            setinvoices(data.invoices || []);
        } catch (error) {
            console.log("Error fetching Invoices Data:", error.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const OnCreate = () => {
        navigate("/Invoices/Create-Invoice");
    };

    const OnEdit = (id) => {
        navigate(`/Invoices/${id}`);
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

        const result = filterTable([...invoices], searchTextsArray);

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

    const OnToggleInvoiceStatus = async (id) => {
        try {
            const invoice = invoices.find((each) => each.invoice_id === id);
            const currentStatus = invoice.status;

            // SET BUTTON TEXT AND WARNING MESSAGE BASED ON CURRENT STATUS
            const confirmButtonText =
                currentStatus === "active" ? "Mark Inactive" : "Mark Active";
            const warningText =
                currentStatus === "active"
                    ? "Do you really want to mark this as inactive?"
                    : "Do you really want to mark this as active?";

            // SHOW SWEETALERT WITH DYNAMIC BUTTON TEXT AND MESSAGE
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

            // IF USER CONFIRMS, TOGGLE THE INVOICE STATUS
            if (result.isConfirmed) {
                const toggleUrl = `${apiUrl}/toggle-invoice-status/${id}`;
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
                    throw new Error(
                        `Error: ${response.status} - ${response.statusText || errorText}`
                    );
                }

                const newStatus = currentStatus === "active" ? "inactive" : "active";
                // REFRESH THE INVOICE LIST AND SHOW SUCCESS NOTIFICATION
                await getInvoicesList();
                enqueueSnackbar(`Invoice with ID ${id} marked as ${newStatus}!`, {
                    preventDuplicate: true,
                    variant: "success",
                    autoHideDuration: 1000,
                });
            }
        } catch (error) {
            console.error("Error toggling invoice status:", error);
            enqueueSnackbar(`Failed to toggle status for Invoice ID ${id}!`, {
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

    const DownloadIVC = async (id) => {
        try {
            // Filter the correct invoice
            const currectINV =
                invoices.filter((each) => each.invoice_id === id) || [];
            console.log(currectINV[0]?.due_date, "this invoice");

            if (!currectINV.length) {
                console.error("Invoice not found");
                return;
            }

            // Extract invoice items
            const invoiceItems =
                currectINV[0]?.items?.map((each) => ({
                    item_id: each.product_id,
                    item_name: each.product_name,
                    quantity: each.quantity,
                    price: each.price,
                })) || [];

            // Fetch client and vendor details
            const client_Vendor_details = await axios
                .get(`${apiUrl}/client-vendor-details/${id}/${UserID}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${savedToken}`,
                    },
                })
                .catch((err) => {
                    console.error("Axios request failed:", err.response || err);
                    alert("Failed to fetch client-vendor details");
                    return; // If request fails, exit the function
                });

            // Dynamically create a container for rendering
            const pdfContainer = document.createElement("div");
            document.body.appendChild(pdfContainer);

            // Use React's createRoot to render the component
            const root = createRoot(pdfContainer);

            let pdfComponent = null;
            if (client_Vendor_details?.data.selected_invoice === "template-1") {
                pdfComponent = (
                    <PDF1
                        id={id}
                        items={invoiceItems}
                        s
                        generateAndDownload={true}
                        clientVendorDetails={client_Vendor_details?.data || {}}
                        currency={client_Vendor_details?.data?.currency_preference}
                        dueDate={currectINV[0]?.due_date}
                    />
                );
            } else if (
                client_Vendor_details?.data.selected_invoice === "template-2"
            ) {
                pdfComponent = (
                    <PDF2
                        id={id}
                        items={invoiceItems}
                        generateAndDownload={true}
                        clientVendorDetails={client_Vendor_details?.data || {}}
                        currency={client_Vendor_details?.data?.currency_preference}
                        dueDate={currectINV[0]?.due_date}
                    />
                );
            } else if (
                client_Vendor_details?.data.selected_invoice === "template-3"
            ) {
                pdfComponent = (
                    <PDF3
                        id={id}
                        items={invoiceItems}
                        generateAndDownload={true}
                        clientVendorDetails={client_Vendor_details?.data || {}}
                        currency={client_Vendor_details?.data?.currency_preference}
                        dueDate={currectINV[0]?.due_date}
                    />
                );
            }

            if (pdfComponent) {
                root.render(pdfComponent);
            }

            // Clean up the temporary container after some time
            setTimeout(() => {
                root.unmount(); // Unmount the React component
                document.body.removeChild(pdfContainer);
            }, 5000);
        } catch (error) {
            console.error("Error in DownloadIVC:", error);
            alert("Failed to download the invoice. Please try again.");
        }
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
                            Create Invoice
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
                    ) : invoices.length === 0 ? (
                        <DataDiv style={{ justifyContent: "center", alignItems: "center" }}>
                            <NoRecordsText>No invoice records to show</NoRecordsText>
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
                                        {filteredCustomers().map((each) => (
                                            <TrTag key={each.invoice_id}>
                                                {Object.keys(each).map(
                                                    (row) =>
                                                        Columns.includes(row) && (
                                                            <TdTag key={row}>
                                                                {highlightText(each[row], searchText)}
                                                            </TdTag>
                                                        )
                                                )}
                                                <TdTag>
                                                    <OperationDiv>
                                                        <Btn
                                                            style={{ color: "blue", justifyContent: "right" }}
                                                            type="button"
                                                            onClick={() => OnEdit(each.invoice_id)}
                                                            title="Edit"
                                                        >
                                                            <TbEdit />
                                                        </Btn>
                                                        <Line />
                                                        <Btn
                                                            type="button"
                                                            onClick={() => DownloadIVC(each.invoice_id)}
                                                            title="download"
                                                        >
                                                            <MdFileDownload />
                                                        </Btn>
                                                        <Line />
                                                        <Btn
                                                            style={{
                                                                color:
                                                                    each.status === "active" ? "green" : "red",
                                                            }}
                                                            type="button"
                                                            onClick={() =>
                                                                OnToggleInvoiceStatus(each.invoice_id)
                                                            }
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
                                <h6>{totalInvoices}</h6>
                                <BtnsDiv>
                                    <PaginationBtn
                                        type="button"
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                                        }
                                    >
                                        <MdKeyboardArrowLeft />
                                    </PaginationBtn>
                                    <span>Page {currentPage}</span>
                                    <PaginationBtn
                                        type="button"
                                        disabled={currentPage * pageSize >= totalInvoices}
                                        onClick={() => setCurrentPage((prev) => prev + 1)}
                                    >
                                        <MdKeyboardArrowRight />
                                    </PaginationBtn>
                                </BtnsDiv>
                            </PaginationDiv>
                        </DataDiv>
                    )}
                </BodyDiv>
                <SnackbarProvider
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                />
            </ContentContainer>
        </MainContainer>
    );
};

export default Invoices;
