// MODULE IMPORTS
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// STYLE IMPORTS
import {
    MainContainer, ContentContainer, BodyDiv, CreateDiv, TitleDiv, Title, CloseBtn, DetailsForm, Legend, InputTag, FieldSet, InputsContainer, CustomDiv, Label, SaveBtn,
    ReactDropdown, InputsContainer2, ReactDropdown2, TableTag, TrTag, ThTag, TdTag, TableContainer, PTag, CountDiv, CountBtn, ThTag2, DelBtn, Btns, CheckboxInputTag,
    ImgDiv, DateInputTag, InvoiceDiv, NetAmount, Label2, Div2, ErrorText, StatusDIv
} from "./StyledComponents";
import { CustomStyles, Customstyles2 } from '../../DefaultData/StyledComponents'

// COMPONENT IMPORTS
import SideNav from "../../SideNav/SideNav";
import Header from "../../Header/Header";
import WonBillsContext from "../../../../context/WonBillsContext";
import { savedToken } from '../../DefaultData/DefaultData';
import { Loader } from "../../DefaultData/StyledComponents";

// ICON IMPORTS
import { AiFillMinusCircle } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";


const InvoiceDetailView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const UserID = localStorage.getItem('userId');
    const PathText = location.pathname.split("/");
    const { setPathText, setActiveTab } = useContext(WonBillsContext);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [errors, setErrors] = useState({});

    const [clientsData, setClientsData] = useState([])
    const [servicesData, setServicesData] = useState([])
    const [servicesInStock, setServicesInStock] = useState([])
    const [trySubmit, setTrySubmit] = useState(false);
    const [loading, setLoading] = useState(false)

    const displayCols = ['product_id', 'product_name', 'category', 'description', 'in_stock', 'discount', 'quantity', 'price']

    const [formInputs, setFormInputs] = useState({
        'Invoice Details': [
            { name: 'invoice_id', label: 'ID *', inputType: 'input', type: 'text', placeholder: 'Invoice ID', required: true, ReadOnly: true },
            { name: 'invoice_name', label: 'Name *', inputType: 'input', type: 'text', placeholder: 'Invoice Name', required: true, ReadOnly: false },
            { name: 'client', label: 'Client *', inputType: 'dropdown', type: 'text', placeholder: 'Select Client', options: ['Open', 'Closed'], required: true, ReadOnly: false },
            { name: 'due_date', label: 'Due Date *', inputType: 'date', type: 'date', placeholder: 'Select Due Date', required: true, ReadOnly: false },
            { name: 'valid_from', label: 'Start Date *', inputType: 'date', type: 'date', placeholder: 'Select Start Date', required: true, ReadOnly: false },
            { name: 'valid_until', label: 'End Date *', inputType: 'date', type: 'date', placeholder: 'Select End Date', required: true, ReadOnly: false },
            { name: 'items', label: 'Add Products *', inputType: 'productsdropdown', type: '', placeholder: 'Select Products', required: true, ReadOnly: false },
        ],
    });

    const [formData, setFormData] = useState({
        invoice_id: '',
        invoice_name: "",
        client: "",
        created_date: "",
        last_modified_date: "",
        due_date: "",
        valid_from: "",
        valid_until: "",
        quantity: "",
        include_taxation: "",
        terms_and_conditions: "",
        net_amount: "",
        taxation: "",
        gross_amount: "",
        status: "",
        items: [],
    });

    useEffect(() => {
        setPathText("");
        setActiveTab(PathText[1]);
        fetchInvoicesData();
        getClientsData()
        getProductsData()
    }, []);

    const getClientsData = async () => {
        try {
            const url = `${apiUrl}/allActiveClients/${UserID}`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${savedToken}`
                }
            };

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setClientsData(data)
        } catch (error) {
            console.error('Error fetching Client Data:', error.message);
        }
    }

    const getProductsData = async () => {
        setLoading(true)
        try {
            const url = `${apiUrl}/valid/allProducts/${UserID}`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${savedToken}`
                }
            };

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data, 'thhis is items data')
            const newData = data.map(item => {
                return {
                    ...item,
                    quantity: 1
                };
            });

            setServicesInStock(
                newData.map(each => {
                    const inStockValue = each.category !== 'product' ? each.in_stock : each.in_stock - 1;
                    return {
                        id: each.product_id,
                        inStock: inStockValue
                    };
                })
            );

            setServicesData(newData || [])
        } catch (error) {
            console.error('Error fetching Products Data:', error.message);
        } finally {
            setLoading(false)
        }
    };

    const fetchInvoicesData = async () => {
        try {
            const url = `${apiUrl}/invoice/${id}`;
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${savedToken}`
                },
            };

            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                setFormData(mapApiDataToFormData(data));
            } else {
                console.error("Error fetching client data:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const mapApiDataToFormData = (data) => {
        const parseJson = (jsonString) => {
            try {
                return typeof jsonString === "string"
                    ? JSON.parse(jsonString)
                    : jsonString;
            } catch (error) {
                console.error("Error parsing JSON:", error);
                return [];
            }
        };

        const formatDate = (isoDateString) => {
            if (!isoDateString) return "";
            const date = new Date(isoDateString);
            if (isNaN(date)) return ""; // Return an empty string if the date is invalid
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        // Handle cases where data.items might be undefined or not a JSON string
        const items = data.items ? parseJson(data.items) : [];

        const formData = {
            invoice_id: data.invoice_id || "",
            invoice_name: data.invoice_name || "",
            client: data.client || "",
            created_date: formatDate(data.created_date),
            last_modified_date: formatDate(data.last_modified_date),
            due_date: formatDate(data.due_date),
            valid_from: formatDate(data.valid_from),
            valid_until: formatDate(data.valid_until),
            quantity: data.quantity || "",
            include_taxation: data.include_taxation || "",
            terms_and_conditions: data.terms_and_conditions || "",
            net_amount: data.net_amount || "",
            taxation: data.taxation || "",
            gross_amount: data.gross_amount || "",
            status: data.status || "",
            items: items,
        };

        return formData;
    };

    const OnBack = () => {
        navigate("/Invoices");
    };

    const OnChangeInputValue = (value, key) => {
        // RESET ANY ERRORS RELATED TO THIS INPUT
        setErrors(prevErrors => ({ ...prevErrors, [key]: undefined }));

        if (key === 'items') {
            const newItems = value.filter(each =>
                formData['items'].every(obj => obj.product_id !== each.product_id)
            );

            setFormData(prev => ({
                ...prev,
                [key]: [...prev['items'], ...newItems]
            }));

            const updatedServicesInStock = servicesInStock.map(service => {
                // FIND IF THERE IS A MATCHING NEW ITEM BY PRODUCT_ID
                const matchingItem = newItems.find(item => item.product_id === service.id);

                // IF A MATCHING ITEM IS FOUND, REDUCE THE INSTOCK VALUE
                if (matchingItem) {
                    return {
                        ...service,
                        inStock: Math.max(0, service.inStock - (matchingItem.quantity || 1)) // REDUCE STOCK BY QUANTITY OR 1
                    };
                }
                // OTHERWISE, RETURN THE SERVICE UNCHANGED
                return service;
            });
            setServicesInStock(updatedServicesInStock)

        } else {
            setFormData(prev => ({
                ...prev,
                [key]: value
            }));
        }
    };

    const OnQuantityChange = (operation, id) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map(each => {
                if (id === each.product_id) {
                    if (operation === 'minus') {
                        if (each.quantity > 1) {
                            // INCREASE THE STOCK WHEN QUANTITY IS DECREASED
                            setServicesInStock(prevStock =>
                                prevStock.map(s =>
                                    s.id === id
                                        ? { ...s, inStock: s.inStock + 1 }
                                        : s
                                )
                            );
                            return {
                                ...each,
                                quantity: each.quantity - 1
                            };
                        }
                    }
                    if (operation === 'plus') {
                        // FIND THE CORRESPONDING STOCK FROM SERVICESINSTOCK
                        const service = servicesInStock.find(service => service.id === id);

                        // IF THERE'S STOCK AVAILABLE, INCREASE THE QUANTITY AND DECREASE THE STOCK
                        if (service && service.inStock > 0) {
                            // DECREASE THE STOCK
                            setServicesInStock(prevStock =>
                                prevStock.map(s =>
                                    s.id === id
                                        ? { ...s, inStock: s.inStock - 1 }
                                        : s
                                )
                            );
                            return {
                                ...each,
                                quantity: each.quantity + 1
                            };
                        }
                    }
                }
                return each;
            })
        }));
    };

    const getNetAmount = () => {
        let NetA = 0

        formData.items.map(each => {
            const X = each.price * each.quantity
            NetA += X
        })
        return parseFloat(NetA).toFixed(2)
    }

    const getTaxation = () => {
        let NetA = 0

        formData.items.map(each => {
            const X = each.price * each.quantity
            NetA += X
        })

        const tax = NetA * 0.15;
        return formData.include_taxation ? parseFloat(tax).toFixed(2) : 0;
    }

    const getGrossAmount = () => {
        let NetA = 0

        formData.items.map(each => {
            const X = each.price * each.quantity
            NetA += X
        })

        const tax = NetA * 0.15;
        const gross = formData.include_taxation ? parseFloat(NetA + tax).toFixed(2) : parseFloat(NetA).toFixed(2)

        return gross

    }

    const getTotalNoOfItems = () => {
        let count = 0

        formData.items.map(each => {
            const X = each.quantity
            count += X
        })

        return count
    }

    const onRemoveItem = (ID) => {

        const A = formData['items'].filter(each => each.product_id !== ID)

        setFormData(prev => ({
            ...prev,
            ['items']: A
        }))
    }

    const options = clientsData.map(option => ({
        value: option.client_id,
        label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{option.client_id}</span>
                <span >{option.client_name}</span>
            </div>
        )
    }))

    const ProductOptions = servicesData
        .map(option => ({
            value: option.product_id,
            label: (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{option.product_id}</span>
                    <span>{option.product_name}</span>
                </div>
            )
        }))

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        Object.keys(formInputs).forEach((section) => {
            formInputs[section].forEach((input) => {
                const { name, required } = input;
                const value = formData[name] || '';

                if (required && !value) {
                    isValid = false;
                    formErrors[name] = `${input.label} is required`;
                }

                // ADDITIONAL VALIDATION FOR SPECIFIC TYPES
                if (name === 'due_date' || name === 'valid_from' || name === 'valid_until') {
                    if (new Date(value).toString() === 'Invalid Date') {
                        isValid = false;
                        formErrors[name] = `${input.label} must be a valid date`;
                    }
                }

                // VALIDATE THAT 'VALID_UNTIL' IS AFTER 'VALID_FROM'
                if (name === 'valid_until' && formData['valid_from']) {
                    if (new Date(value) <= new Date(formData['valid_from'])) {
                        isValid = false;
                        formErrors[name] = 'Valid Until must be after Valid From';
                    }
                }
            });
        });

        // CHECK ITEMS FIELD TO ENSURE IT'S NOT EMPTY
        if (formData.items.length === 0) {
            isValid = false;
            formErrors['items'] = 'At least one product must be added';
        }

        setErrors(formErrors); // UPDATE STATE TO HOLD ERROR MESSAGES
        return isValid;
    };

    const modifications = (data) => {
        const NetAmount = getNetAmount()
        const tax = getTaxation()
        const GrossAmount = getGrossAmount()
        const Count = getTotalNoOfItems()

        const newData = {
            ...data,
            'net_amount': NetAmount,
            'quantity': Count,
            'taxation': tax,
            'gross_amount': GrossAmount,
            userID: localStorage.getItem('userId') || ''
        }

        return newData
    }

    const updateInvoice = async (url, ModifiedData) => {
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${savedToken}` },
            body: JSON.stringify(ModifiedData),
        };
        const response = await fetch(url, options);
        if (response.ok) {
            return true;
        } else {
            throw new Error(`Invoice Update Failed: ${response.statusText}`);
        }
    };

    const updateProductStock = async (products) => {
        const productUpdateUrl = `${apiUrl}/update-products-instock`;
        const productUpdateOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${savedToken}` },
            body: JSON.stringify({
                items: products,
                userID: localStorage.getItem('userId') || '',
            }),
        };
        const response = await fetch(productUpdateUrl, productUpdateOptions);
        if (response.ok) {
            return true;
        } else {
            throw new Error(`Product Stock Update Failed: ${await response.text()}`);
        }
    };

    const OnSave = async (e) => {
        e.preventDefault();
        setTrySubmit(true); // INDICATES A SUBMISSION ATTEMPT

        // VALIDATE FORM BEFORE PROCEEDING
        const isFormValid = validateForm();
        if (!isFormValid) {
            console.error('Form validation failed', errors);
            enqueueSnackbar('Please fill required fields before submitting.', { variant: 'error', autoHideDuration: 3000 });
            return; // STOP FURTHER EXECUTION IF THE FORM IS NOT VALID
        }

        const ModifiedData = modifications(formData);
        const url = `${apiUrl}/update-invoice-details/${id}`;

        try {
            // Update the invoice
            const invoiceUpdated = await updateInvoice(url, ModifiedData);
            if (invoiceUpdated) {
                enqueueSnackbar('Invoice Updated Successfully!', { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });

                // Update the product stock
                const productStockUpdated = await updateProductStock(servicesInStock);
                if (productStockUpdated) {
                    enqueueSnackbar('Products stock updated successfully!', { variant: 'success', autoHideDuration: 1000 });
                }

                // After successful updates, navigate away
                navigate('/Invoices');
            }
        } catch (error) {
            console.error('Error:', error.message);
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 3000 });
        }
    };

    return (
        <MainContainer>
            <Header />

            <ContentContainer>
                <SideNav />

                <BodyDiv>

                    {loading ?
                        (<CreateDiv style={{alignItems:'center'}}>
                            <Loader />
                        </CreateDiv>) :
                        (<CreateDiv>
                            <TitleDiv>
                                <Title>Invoice Details</Title>

                                <CloseBtn type='button' onClick={OnBack}>
                                    <IoArrowBackCircleOutline />
                                </CloseBtn>

                                <StatusDIv>
                                    <ReactDropdown
                                        isSearchable={false}  // DISABLE SEARCH AS THERE ARE ONLY TWO OPTIONS
                                        placeholder='Select Status'
                                        options={[
                                            { label: 'Active', value: 'active' },
                                            { label: 'Inactive', value: 'inactive' }
                                        ]}
                                        onChange={(selectedOption) => OnChangeInputValue(selectedOption?.value, 'status')}
                                        value={{
                                            label: formData['status'] === 'active' ? 'Active' : 'Inactive',
                                            value: formData['status']
                                        }}
                                        styles={{
                                            ...CustomStyles,
                                            ...Customstyles2,
                                            option: (provided, state) => ({
                                                ...provided,
                                                borderRadius: '0.7rem',
                                                backgroundColor: state.isSelected
                                                    ? (state.data.value === 'inactive' ? 'red' : 'green')  // GREEN BACKGROUND FOR ACTIVE, RED FOR INACTIVE
                                                    : provided.backgroundColor, // KEEP DEFAULT BACKGROUND IF NOT SELECTED

                                                color: state.isSelected
                                                    ? 'white' // WHITE TEXT FOR BOTH ACTIVE AND INACTIVE WHEN SELECTED
                                                    : state.data.value === 'active' ? 'green' : 'red'  // TEXT COLOR FOR UNSELECTED OPTIONS (GREEN FOR ACTIVE, RED FOR INACTIVE)
                                            }),
                                            singleValue: (provided, state) => ({
                                                ...provided,
                                                color: state.data.value === 'active' ? 'green' : 'red', // COLOR FOR THE SELECTED OPTION
                                            })
                                        }}
                                    />
                                </StatusDIv>
                            </TitleDiv>

                            <DetailsForm onSubmit={(e) => OnSave(e)}>
                                {Object.entries(formInputs).map(([category, fields], index) => (
                                    <FieldSet key={index}>
                                        <Legend>{category}</Legend>

                                        <CustomDiv>
                                            {(
                                                fields.map((field, idx) => (
                                                    <>
                                                        {field.inputType === 'dropdown' ? (
                                                            <InputsContainer>
                                                                <Div2 >
                                                                    <ReactDropdown
                                                                        isSearchable
                                                                        placeholder={field.placeholder}
                                                                        options={options}
                                                                        onChange={(selectedOption) => OnChangeInputValue(selectedOption?.value, field.name)}
                                                                        value={
                                                                            clientsData
                                                                                .map(option => ({
                                                                                    label: option.client_name,
                                                                                    value: option.client_id
                                                                                }))
                                                                                .find(option => option.value === formData[field.name]) || null
                                                                        }
                                                                        styles={{ ...CustomStyles, ...Customstyles2 }}
                                                                    />
                                                                </Div2>
                                                                {errors[field.name] && (
                                                                    <ErrorText>{errors[field.name]}</ErrorText>
                                                                )}
                                                            </InputsContainer>
                                                        ) : field.inputType === 'productsdropdown' ? (
                                                            <InputsContainer2 >
                                                                <Label>Add Items</Label>

                                                                <ReactDropdown2
                                                                    isMulti // ENABLES MULTI-SELECT MODE
                                                                    isSearchable
                                                                    isClearable={false}
                                                                    components={{ MultiValueRemove: () => null }}
                                                                    closeMenuOnSelect={false}
                                                                    noOptionsMessage={() => 'Item Not Found'}
                                                                    placeholder={field.placeholder}
                                                                    options={ProductOptions}
                                                                    onChange={(selectedOptions) => {
                                                                        // SELECTEDOPTIONS IS AN ARRAY OF SELECTED OPTIONS
                                                                        const selectedProducts = selectedOptions.map(option =>
                                                                            servicesData.find(product => product.product_id === option.value)
                                                                        );
                                                                        // PASS THE SELECTED PRODUCT OBJECTS INSTEAD OF JUST IDS
                                                                        OnChangeInputValue(selectedProducts, field.name);
                                                                    }}
                                                                    value={(formData[field.name] || []).map(selectedProduct => ({
                                                                        label: selectedProduct.product_name, // MAP SELECTED PRODUCTS TO OPTIONS
                                                                        value: selectedProduct.product_id
                                                                    }))}
                                                                    styles={{ ...CustomStyles, ...Customstyles2 }}

                                                                />
                                                                {errors[field.name] && (
                                                                    <ErrorText style={{ right: '0', top: '0', left: '86%' }}>{errors[field.name]}</ErrorText>
                                                                )}

                                                            </InputsContainer2>
                                                        ) : field.inputType === 'date' ? (
                                                            <InputsContainer key={idx}>
                                                                <ImgDiv style={{ background: 'transparent', padding: '0.1rem', justifyContent: 'space-between' }}>
                                                                    <Label style={{ marginLeft: '0', fontWeight: '550' }}>{field.label}</Label>
                                                                    <DateInputTag
                                                                        type={field.type}
                                                                        placeholder={field.placeholder}
                                                                        onChange={(e) => OnChangeInputValue(e.target.value, field.name)}
                                                                        value={formData[field.name] || new Date().toISOString().split('T')[0]}
                                                                    />
                                                                </ImgDiv>
                                                                {errors[field.name] && (
                                                                    <ErrorText>{errors[field.name]}</ErrorText>
                                                                )}
                                                            </InputsContainer>
                                                        ) : (
                                                            <InputsContainer key={idx}>
                                                                <InputTag
                                                                    type={field.type}
                                                                    readOnly={field.ReadOnly}
                                                                    onChange={(e) => OnChangeInputValue(e.target.value, field.name)}
                                                                    value={formData[field.name]}
                                                                />
                                                                <Label2>{field.label}</Label2>
                                                                {errors[field.name] && (
                                                                    <ErrorText>{errors[field.name]}</ErrorText>
                                                                )}
                                                            </InputsContainer>
                                                        )

                                                        }
                                                    </>

                                                ))
                                            )}
                                        </CustomDiv>

                                    </FieldSet>
                                ))}

                                <TableContainer style={{ border: formData['items'] && formData['items'].length > 0 ? '2px solid #ccc' : 'none' }}>
                                    {formData['items'] && formData['items'].length > 0 ? (
                                        <TableTag>
                                            <thead>
                                                <TrTag>
                                                    {displayCols.map((each, index) => {
                                                        if (each === 'product_id') {
                                                            return <ThTag key={index}>ID</ThTag>
                                                        }
                                                        return formData['items'][0].hasOwnProperty(each) && (
                                                            <ThTag key={index}>{each}</ThTag>
                                                        );
                                                    })}
                                                    <ThTag>total</ThTag>
                                                    <ThTag2> </ThTag2>
                                                </TrTag>
                                            </thead>
                                            <tbody>
                                                {formData['items'].map((eachRec, index) => {
                                                    // Find the corresponding service in servicesData
                                                    const service = servicesInStock.find(service => service.id === eachRec.product_id);
                                                    const inStockNumber = service ? service.inStock : 0; // Assuming in_stock holds the stock number

                                                    return (
                                                        <TrTag key={index}>
                                                            {displayCols.map((col, colIndex) => {
                                                                // Handle product_id separately
                                                                if (col === 'product_id') {
                                                                    return (
                                                                        <TdTag key={colIndex}>
                                                                            {eachRec['product_id']}
                                                                        </TdTag>
                                                                    );
                                                                }

                                                                // Check if the column is 'in_stock' to display the inStockNumber
                                                                if (col === 'in_stock') {
                                                                    return (
                                                                        <TdTag key={colIndex}>
                                                                            {inStockNumber}
                                                                        </TdTag>
                                                                    );
                                                                }

                                                                // Render other columns as they are
                                                                return (
                                                                    eachRec.hasOwnProperty(col) && (
                                                                        <TdTag key={colIndex}>
                                                                            {eachRec[col] === true ? 'True' : eachRec[col] === false ? 'False' : eachRec[col]}
                                                                        </TdTag>
                                                                    )
                                                                );
                                                            })}
                                                            <TdTag>{(eachRec.price * eachRec.quantity).toFixed(2)}</TdTag>
                                                            <TdTag style={{ width: '4rem' }}>
                                                                <Btns>

                                                                    <CountDiv>
                                                                        {eachRec.category === 'product' && <>
                                                                            <CountBtn type='button' onClick={() => OnQuantityChange('minus', eachRec.product_id)}>
                                                                                <AiFillMinusCircle />
                                                                            </CountBtn>
                                                                            <CountBtn type='button' onClick={() => OnQuantityChange('plus', eachRec.product_id)}>
                                                                                <CiCirclePlus />
                                                                            </CountBtn>
                                                                        </>
                                                                        }

                                                                    </CountDiv>
                                                                    <DelBtn type='button' onClick={() => onRemoveItem(eachRec.product_id)}>
                                                                        <MdOutlineDeleteOutline />
                                                                    </DelBtn>
                                                                </Btns>
                                                            </TdTag>
                                                        </TrTag>
                                                    );
                                                })}
                                            </tbody>
                                        </TableTag>
                                    ) : (
                                        <PTag>No Products Selected</PTag>
                                    )}
                                </TableContainer>


                                <InvoiceDiv style={{ justifyContent: 'flex-end' }}>

                                    <NetAmount style={{ justifyContent: 'space-between' }}>
                                        <Label style={{ marginLeft: '0', fontWeight: '550', color: '#86352e', width: '8rem' }}>Net Amount : -</Label>
                                        <Label style={{ marginLeft: '0.5rem', fontWeight: '550', width: 'fit-content' }}>{getNetAmount()}</Label>

                                    </NetAmount>

                                </InvoiceDiv>

                                <InvoiceDiv style={{ justifyContent: 'flex-end' }}>
                                    <NetAmount style={{}}>
                                        <Label style={{ marginLeft: '0', fontWeight: '550', width: '8rem', color: '#86352e' }}>Taxation : -</Label>
                                        <Label style={{ marginLeft: '0.5rem', fontWeight: '550', width: 'fit-content' }}>{getTaxation()}</Label>

                                    </NetAmount>
                                </InvoiceDiv>

                                <InvoiceDiv style={{ justifyContent: 'space-between' }}>
                                    <NetAmount style={{}}>
                                        <Label style={{ marginLeft: '0', fontWeight: '550', width: '8rem', color: '#86352e' }}>No Of Items</Label>
                                        <Label style={{ marginLeft: '0.5rem', fontWeight: '550', width: 'fit-content' }}>{getTotalNoOfItems()}</Label>
                                    </NetAmount>

                                    <NetAmount style={{}}>
                                        <Label style={{ marginLeft: '0', fontWeight: '550', width: '8rem', color: '#86352e' }}>Gross Amount : -</Label>
                                        <Label style={{ marginLeft: '0.5rem', fontWeight: '550', width: 'fit-content' }}>{getGrossAmount()}</Label>
                                    </NetAmount>
                                </InvoiceDiv>

                                <SaveBtn type='submit'>Save</SaveBtn>

                            </DetailsForm>

                        </CreateDiv>)
                    }

                </BodyDiv>

                <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />

            </ContentContainer>


        </MainContainer>
    );
};

export default InvoiceDetailView;
