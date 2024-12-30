// MODULE IMPORTS
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// STYLES IMPORT
import {
    BodyDiv, Btns, CheckboxInputTag, CloseBtn, ContentContainer, CountBtn, CountDiv, CreateDiv, CustomDiv, DateInputTag, DelBtn, DetailsForm, Div2, ErrorText,
    FieldSet, ImgDiv, InputTag, InputsContainer, InputsContainer2, InvoiceDiv, Label, Label2, Legend, MainContainer, NetAmount, PTag, ReactDropdown, ReactDropdown2,
    SaveBtn, StatusDIv, TableContainer, TableTag, TdTag, ThTag, ThTag2, Title, TitleDiv, TrTag
} from './StyledComponents';
import { CustomStyles, Customstyles2 } from '../../DefaultData/StyledComponents'

// COMPONENT IMPORTS
import SideNav from '../../SideNav/SideNav'
import Header from '../../Header/Header';
import { savedToken } from '../../DefaultData/DefaultData';

// ICON IMPORTS
import { AiFillMinusCircle } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";


const CreateInvoice = () => {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;
    const UserID = localStorage.getItem('userId');
    const [errors, setErrors] = useState({});
    const isIdGenerated = useRef(false);

    const [clientsData, setClientsData] = useState([])
    const [servicesData, setServicesData] = useState([])
    const [servicesInStock, setServicesInStock] = useState([])
    const [trySubmit, setTrySubmit] = useState(false)

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
        ...Object.values(formInputs).flat().reduce((acc, field) => {
            if (field.name === 'items') {
                acc[field.name] = []
            } else {
                acc[field.name] = '';
            }
            return acc
        }, {}),
        ['taxation']: 0,
        ['net_amount']: 0,
        ['gross_amount']: 0,
        ['terms_and_conditions']: false,
        ['include_taxation']: false,
        ['quantity']: 0,
        ['status']: 'active'

    });

    const displayCols = ['product_name', 'category', 'description', 'in_stock', 'discount', 'quantity', 'price']

    useEffect(() => {
        const fetchData = async () => {
            if (!isIdGenerated.current) {
                getUniqueInvoiceID();
                isIdGenerated.current = true;  // SET FLAG TO TRUE AFTER GENERATING ID
            } 
            await getClientsData();

            await getProductsData();
        };
        fetchData();
    }, []);

    const getUniqueInvoiceID = async () => {
        try {
            const response = await axios.post(`${apiUrl}/generate-invoice-id/${UserID}`, {}, {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                }
            });
            localStorage.setItem('invoiceID', response.data.invoiceId)
            // SET THE GENERATED INVOICE ID IN FORMDATA
            setFormData(prev => ({
                ...prev,
                invoice_id: response.data.invoiceId // ASSIGN THE VALUE TO INVOICE_ID
            }));
            console.log('Generated Invoice ID:', response.data.invoiceId);
        } catch (error) {
            console.error('Error generating unique client ID:', error);
        }
    }

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
            console.log('Error fetching Client Data:', error.message);
        }
    }

    const getProductsData = async () => {
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
                if (item.category !== 'product') {
                    return {
                        ...item,
                        quantity: 1
                    };
                }
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
        }
    };

    const OnBack = async () => {
        // let id = localStorage.getItem('invoiceID');
        navigate('/Invoices');
        // if (id) {
        //     try {
        //         // CALL THE API TO DELETE THE CLIENT RECORD
        //         // await axios.delete(`${apiUrl}/delete-invoice/${id}`);
        //         // localStorage.removeItem('invoiceID');
        //         navigate('/Invoices');
        //     } catch (error) {
        //         // localStorage.removeItem('invoiceID');
        //         navigate('/Invoices');
        //         // console.error('Error deleting Service record:', error);

        //     }
        // }
    }

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
        } else {
            setFormData(prev => ({
                ...prev,
                [key]: value
            }));
        }
    };

    // HANDLING CHANGES IN QUANTITY WITH LIMITS ON STOCK
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
        const url = `${apiUrl}/update-invoice-details/${formData.invoice_id}`;

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
                    <CreateDiv>
                        <TitleDiv>
                            <Title>Create Invoice</Title>
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
                                                                    styles={{
                                                                        ...CustomStyles,
                                                                        ...Customstyles2
                                                                    }}
                                                                />
                                                                <Label2>{field.label}</Label2>
                                                            </Div2>
                                                            {errors[field.name] && (
                                                                <ErrorText>{errors[field.name]}</ErrorText>
                                                            )}
                                                        </InputsContainer>
                                                    ) : field.inputType === 'productsdropdown' ? (
                                                        <InputsContainer2>
                                                            <Label>Add Items *</Label>

                                                            <ReactDropdown2
                                                                isMulti
                                                                isSearchable
                                                                isClearable={false}
                                                                components={{ MultiValueRemove: () => null }}
                                                                closeMenuOnSelect={false}
                                                                noOptionsMessage={() => 'Item Not Found'}
                                                                placeholder={field.placeholder}
                                                                options={ProductOptions} // ENSURE THIS IS AN ARRAY OF { LABEL, VALUE }
                                                                onChange={(selectedOptions) => {
                                                                    const selectedProducts = selectedOptions.map(option =>
                                                                        servicesData.find(product => product.product_id === option.value)
                                                                    );
                                                                    // PASS THE SELECTED PRODUCT OBJECTS BACK
                                                                    OnChangeInputValue(selectedProducts, field.name);
                                                                }}
                                                                value={(formData[field.name] || []).map(selectedProduct => ({
                                                                    label: selectedProduct.product_name,
                                                                    value: selectedProduct.product_id
                                                                }))}
                                                                styles={{
                                                                    ...CustomStyles,
                                                                    ...Customstyles2
                                                                }}
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
                                                                    value={formData[field.name]}
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
                                                {(formData['items'] && formData['items'].length > 0) && (
                                                    <>
                                                        {/* RENDER THE ID COLUMN HEADER */}
                                                        <ThTag>ID</ThTag>

                                                        {/* GENERATE THE REST OF THE COLUMN HEADERS BASED ON `FORMDATA['ITEMS']` */}
                                                        {Object.keys(formData['items'][0]).map((each, keyIndex) => (
                                                            displayCols.includes(each) && (
                                                                <ThTag key={keyIndex}>{each}</ThTag>
                                                            )
                                                        ))}
                                                    </>
                                                )}

                                                <ThTag>total</ThTag>

                                                <ThTag2> </ThTag2>
                                            </TrTag>
                                        </thead>

                                        <tbody>
                                            {formData['items'] && formData['items'].length > 0 && (
                                                formData['items'].map((eachRec, index) => {
                                                    // GET THE INSTOCK VALUE FROM SERVICESINSTOCK
                                                    const service = servicesInStock.find(service => service.id === eachRec.product_id);
                                                    const inStockNumber = service ? service.inStock : 0;

                                                    return (
                                                        <TrTag key={index}>
                                                            <TdTag>{eachRec['product_id']}</TdTag>
                                                            {Object.keys(eachRec).map((itemKey) => {
                                                                if (displayCols.includes(itemKey)) {
                                                                    // IF ITEMKEY IS 'IN_STOCK', DISPLAY INSTOCKNUMBER
                                                                    if (itemKey === 'in_stock') {
                                                                        return (
                                                                            <TdTag key={itemKey}>
                                                                                {inStockNumber}
                                                                            </TdTag>
                                                                        );
                                                                    }

                                                                    // OTHERWISE, DISPLAY THE CORRESPONDING VALUE FROM EACHREC
                                                                    return (
                                                                        <TdTag key={itemKey}>
                                                                            {eachRec[itemKey]}
                                                                        </TdTag>
                                                                    );
                                                                }
                                                                return null; // RETURN NULL FOR KEYS NOT IN DISPLAYCOLS
                                                            })}
                                                            <TdTag>{(eachRec.price * eachRec.quantity).toFixed(2)}</TdTag>
                                                            <TdTag style={{ width: '4rem' }}>
                                                                <Btns>
                                                                    <CountDiv>
                                                                        <CountBtn
                                                                            type='button'
                                                                            onClick={() => OnQuantityChange('minus', eachRec.product_id)}
                                                                            disabled={eachRec.quantity <= 1} // DISABLE IF QUANTITY IS 1 OR LESS
                                                                        >
                                                                            <AiFillMinusCircle />
                                                                        </CountBtn>

                                                                        <CountBtn
                                                                            type='button'
                                                                            onClick={() => OnQuantityChange('plus', eachRec.product_id)}
                                                                        // disabled={eachRec.quantity >= inStockNumber} 
                                                                        >
                                                                            <CiCirclePlus />
                                                                        </CountBtn>
                                                                    </CountDiv>
                                                                    <DelBtn type='button' onClick={() => onRemoveItem(eachRec.product_id)}>
                                                                        <MdOutlineDeleteOutline />
                                                                    </DelBtn>
                                                                </Btns>
                                                            </TdTag>
                                                        </TrTag>
                                                    );
                                                })
                                            )}
                                        </tbody>


                                    </TableTag>
                                ) : (
                                    <PTag>No Items Selected</PTag>
                                )}

                            </TableContainer>

                            <InvoiceDiv style={{ justifyContent: 'flex-end' }}>

                                <NetAmount style={{ justifyContent: 'space-between' }}>
                                    <Label style={{ marginLeft: '0', fontWeight: '550', color: '#86352e', width: '8rem' }}>Net Amount : -</Label>
                                    <Label style={{ marginLeft: '0.5rem', fontWeight: '550', width: 'fit-content' }}>{getNetAmount()}</Label>
                                </NetAmount>

                            </InvoiceDiv>

                            <InvoiceDiv style={{ justifyContent: 'flex-end' }}>
                                <NetAmount>
                                    <Label style={{ marginLeft: '0', fontWeight: '550', width: '8rem', color: '#86352e' }}>Taxation : -</Label>
                                    <Label style={{ marginLeft: '0.5rem', fontWeight: '550', width: 'fit-content' }}>{getTaxation()}</Label>
                                </NetAmount>
                            </InvoiceDiv>

                            <InvoiceDiv style={{ justifyContent: 'space-between' }}>
                                <NetAmount>
                                    <Label style={{ marginLeft: '0', fontWeight: '550', width: '8rem', color: '#86352e' }}>No Of Items</Label>
                                    <Label style={{ marginLeft: '0.5rem', fontWeight: '550', width: 'fit-content' }}>{getTotalNoOfItems()}</Label>
                                </NetAmount>

                                <NetAmount>
                                    <Label style={{ marginLeft: '0', fontWeight: '550', width: '8rem', color: '#86352e' }}>Gross Amount : -</Label>
                                    <Label style={{ marginLeft: '0.5rem', fontWeight: '550', width: 'fit-content' }}>{getGrossAmount()}</Label>
                                </NetAmount>
                            </InvoiceDiv>

                            <SaveBtn type='submit'>Save</SaveBtn>
                        </DetailsForm>
                    </CreateDiv>
                </BodyDiv>
                <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
            </ContentContainer>
        </MainContainer>
    )
}

export default CreateInvoice