// MODULE IMPORTS
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// STYLES IMPORTS
import {
    MainContainer, ContentContainer, BodyDiv, CreateDiv, TitleDiv, Title, CloseBtn, DetailsForm, InputTag, FieldSet, InputsContainer, Label,
    SaveBtn, CheckboxInputTag, TextAreaTag, ReactDropdown, DateInputTag, ImgDiv, State, BottomBtns, Label2, ErrorText, AmountSpan
} from './StyledComponents'
import { ReactSelect, CustomStyles, StatusDIv, Customstyles2 } from '../../DefaultData/StyledComponents'

// COMPONENT IMPORTS
import SideNav from '../../SideNav/SideNav'
import Header from '../../Header/Header';
import WonBillsContext from '../../../../context/WonBillsContext';
import { savedToken } from '../../DefaultData/DefaultData';

//ICON IMPORTS
import { IoArrowBackCircleOutline } from "react-icons/io5";


const CreatePayment = () => {
    const navigate = useNavigate()
    const PathText = location.pathname.split('/')
    const storedUserId = localStorage.getItem('userId');
    const apiUrl = import.meta.env.VITE_API_URL;
    const isIdGenerated = useRef(false);
    const [errors, setErrors] = useState({});

    const { setPathText, setActiveTab } = useContext(WonBillsContext)

    const [invoiceData, setInvoiceData] = useState([])
    const [ClientsData, setClientsData] = useState([])

    const [formData, setFormData] = useState({
        payment_id: '',
        invoice_id: '',
        payment_due_date: '',
        payment_state: 'requested',
        schedule_date: '',
        status: 'active',
        payment_note: '',
        invoice_amount: '',
        mode_of_payment: 'online_payment',
        check_number: '',
        commission_by_customer: 'false'
    })

    const [trySubmit, setTrySubmit] = useState(false)

    useEffect(() => {
        setPathText('')
        setActiveTab(PathText[1])
        getInvoicesData()
        getClientsData()

        // CHECKING IF THE UNIQUE ID HAS ALREADY BEEN GENERATED TO PREVENT MULTIPLE REQUESTS
        if (!isIdGenerated.current) {
            getUniqueID();
            isIdGenerated.current = true;  // SET FLAG TO TRUE AFTER GENERATING ID
        } 


    }, [])

    // FUNCTION TO GET THE UNIQUE ID
    const getUniqueID = async () => {
        try {
            const response = await axios.post(`${apiUrl}/generate-payment-id/${storedUserId}`, {}, {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                }
            });
            // localStorage.setItem('paymentID', response.data.paymentId)
            setFormData(prev => ({
                ...prev,
                payment_id: response.data.paymentId
            }))
        } catch (error) {
            console.error('Error generating unique payment ID:', error);
        }
    }

    // FUNCTION TO GET THE INVOICES LIST
    const getInvoicesData = async () => {
        try {
            const url = `${apiUrl}/allInvoices-active/${storedUserId}`
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

            let Data = await response.json();
            Data = Data.data
            console.log(Data, 'this is sdata')
            setInvoiceData(Data || [])
        } catch (error) {
            console.error('Error fetching Invoices Data:', error.message);
        }
    }

    // FUNCTION TO GET THE CLIENTS DATA
    const getClientsData = async () => {
        try {
            const url = `${apiUrl}/allClients/${storedUserId}`;
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
            setClientsData(data.clients)
        } catch (error) {
            console.error('Error fetching Client Data:', error.message);
        }
    }

    //FUNCTION THAT HANDLES BACK BUTTION FUNCTIONALITY 
    const OnBack = async () => {
        let id = localStorage.getItem('paymentID');
        if (id) {
            try {
                // CALL THE API TO DELETE THE CLIENT RECORD
                // await axios.delete(`${apiUrl}/delete-payment/${id}`);
                // localStorage.removeItem('paymentID');
                navigate('/Purchases');
            } catch (error) {
                // localStorage.removeItem('paymentID');
                navigate('/Purchases');
                console.error('Error deleting payment record:', error);
            }
        }
    }

    // PAYMENT OPTIONS
    const paymentOptions = [
        { label: 'Online Payment', value: 'online_payment' },
        { label: 'Cash', value: 'cash' },
        { label: 'Cheque', value: 'cheque' }
    ];

    // FUNCTION TO CONVERT A STRING TO TITLE CASE
    const toTitleCase = (str) => {
        return str.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    // FUNCTION TO HANDLE INPUT VALUE CHANGE
    const OnChangeInputValue = (value, key) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    }

    // OPTIOINS FOR INVOICES DROPDOWN
    const options = invoiceData.map(option => ({
        value: option.invoice_id,
        label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{option.invoice_id}</span>
                <span>{option.invoice_name}</span>
            </div>
        )
    }))

    // VALIDATE FORM DATA
    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        // CHECK REQUIRED FIELDS
        if (!formData.payment_id) {
            isValid = false;
            formErrors['payment_id'] = 'Payment Number is required';
        }

        if (!formData.invoice_id) {
            isValid = false;
            formErrors['invoice_id'] = 'Invoice Number is required';
        }

        if (!formData.mode_of_payment) {
            isValid = false;
            formErrors['mode_of_payment'] = 'Mode of Payment is required';
        }

        if (!formData.payment_due_date) {
            isValid = false;
            formErrors['payment_due_date'] = 'Payment Due Date is required';
        } else if (new Date(formData.payment_due_date).toString() === 'Invalid Date') {
            isValid = false;
            formErrors['payment_due_date'] = 'Payment Due Date must be a valid date';
        }

        if (formData.mode_of_payment === 'check') {
            if (!formData.check_number || NaN(formData.check_number)) {
                isValid = false;
                formErrors['check_number'] = 'Check Number is required when the mode of payment is Check';
            }
        }

        // SET ERRORS IN STATE
        setErrors(formErrors);

        return isValid;
    };

    // FUNCTION TO FORMAT THE AMOUNT IN MORE READABLE WAY
    const formatNumber = (num) => {
        if (!num) return "0.00"; // Handle falsy values like null or undefined

        // Format number with grouping separators and two decimal points
        return new Intl.NumberFormat("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    // FUNCTION TO GET THE INVOICE GROSS AMOUNT
    const invoiceAmount = () => {
        const invoice = invoiceData?.find(each => each.invoice_id === formData.invoice_id);
        if (invoice) {
            const amount = invoice.gross_amount
            // return amount;

            // Format the number
            const formattedAmount = formatNumber(amount);
            return formattedAmount;
        }
        return 0;
    };

    // GET THE CHARGES ON INVOICE AMOUNT
    const chargesAmount = () => {
        const invoice = invoiceData?.find(each => each.invoice_id === formData.invoice_id);
        if (invoice) {
            const fee = parseInt(invoice.gross_amount) * 5 / 100
            const formattedAmount = formatNumber(fee);
            return formattedAmount;
            // return fee.toFixed(2);
        }
        return 0;
    }

    // GET TOTAL AMOUNT
    const TotalAmount = () => {
        const invoice = invoiceData?.find(each => each.invoice_id === formData.invoice_id);
        if (invoice) {
            const fee = parseInt(invoice.gross_amount) * 5 / 100
            let amount
            if (formData.commission_by_customer !== 'true') {
                amount = parseInt(invoice.gross_amount) - fee
            } else {
                amount = parseInt(invoice.gross_amount) + fee
            }

            const formattedAmount = formatNumber(amount);
            return formattedAmount;
            // return amount;
        }
        return 0;
    }

    // FUNCTION TO HANDLE SAVE RECORD
    const OnSave = async (e) => {
        e.preventDefault();
        setTrySubmit(true);
        const id = formData.payment_id

        // Validate form before proceeding
        const isFormValid = validateForm();
        if (!isFormValid) {
            console.log('Form validation failed', errors);
            enqueueSnackbar('Please fill required fields before submitting.', { variant: 'error', autoHideDuration: 2000 });
            return { success: false, message: 'Form validation failed' };
        }

        const paymentState = formData.schedule_date !== '' ? 'scheduled' : 'requested'

        // Prepare data to send
        let payload = {
            ...formData,
            client_name: clientName(),
            invoice_amount: invoiceAmount(),
            payment_state: paymentState
        };

        const url = `${apiUrl}/update-payment/${id}`;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${savedToken}`,
            },
            body: JSON.stringify(payload)
        };

        try {
            const response = await fetch(url, options);
            const responseData = await response.json();

            if (response.ok) {
                enqueueSnackbar('Payment updated successfully!', { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });
                return { success: true, data: responseData }
            } else {
                console.error("Error updating payment:", response.statusText, responseData);
                enqueueSnackbar(`Failed to update payment: ${responseData.message || response.statusText}`, { variant: 'error', autoHideDuration: 2000 });
                return { success: false, message: responseData.message || response.statusText };
            }
        } catch (error) {
            console.error("Fetch error:", error.message);
            enqueueSnackbar(`Error: ${error.message}`, { variant: 'error', autoHideDuration: 2000 });
            return { success: false, message: error.message }
        }
    };

    // FUNCTION TO CHECK KYC STATUS
    const KYCStatus = async () => {
        try {
            const response = await fetch(`${apiUrl}/get-kyc-status/${storedUserId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${savedToken}` },
            });

            if (!response.ok) {
                console.error(`Failed to fetch KYC status: ${response.statusText}`);
                return null;
            }

            const data = await response.json();
            console.log('Fetched KYC Data:', data);
            return data.razorpay_account_status || null;
        } catch (error) {
            console.error("Error in KYCStatus:", error);
            return null;
        }
    };

    // FUNCTION TO HANDLE PURCHASE ORDER SUBMIT
    const SendPayment = async (e) => {
        e.preventDefault();
        const saveResult = await OnSave(e);

        if (!saveResult.success) {
            console.log('purchase update failed', saveResult.message)
            return
        }

        const checkKYC = await KYCStatus()
        if (!checkKYC || checkKYC !== 'activated') {
            enqueueSnackbar("Please complete the KYC inOrder to send or sechedule Payments", { variant: 'error', autoHideDuration: 2000 });
            return;
        }

        if (saveResult.success && formData.schedule_date !== '') {
            setTimeout(() => {
                enqueueSnackbar("Purchase order scheduled successfully.", {
                    variant: "success",
                    autoHideDuration: 2000,
                });
                navigate("/Purchases");
            }, 1000)

            return;
        }

        const ClientData = invoiceData.filter(eachIVC => eachIVC.invoice_id === formData.invoice_id); // GET THE CLIENT ID FROM INVOICE DATA

        // CHECK IF A VALID CLIENTID WAS FOUND
        if (!ClientData.length || !ClientData[0]?.client) {
            enqueueSnackbar("Invalid invoice data. Please check and try again.", {
                variant: "error",
                autoHideDuration: 2000,
            });
            return;
        }
        if (ClientData[0]?.status !== 'active') {
            enqueueSnackbar("Invoice is inActive please mark invoice active to create purchase Order.", { variant: 'error', autoHideDuration: 2000 });
            return;
        }

        const Details = {
            purchase_id: formData.payment_id,
            client_id: ClientData[0].client,
            gross_amount: parseInt(ClientData[0].gross_amount),
            invoice_id: ClientData[0].invoice_id,
            invoice_name: ClientData[0].invoice_name,
            net_amount: ClientData[0].net_amount,
            status: ClientData[0].status,
            user_id: storedUserId,
            clientPaysFees: formData.commission_by_customer
        }
        console.log(Details, 'these rae details')


        try {
            const response = await fetch(`${apiUrl}/create-order-payment-link/${storedUserId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${savedToken}`, },
                body: JSON.stringify(Details),
            });

            if (response.ok) {
                const responseData = await response.json();
                enqueueSnackbar(
                    `Payment shared successfully to ${responseData.mail}!`,
                    { preventDuplicate: true, variant: "success", autoHideDuration: 1000 }
                );
                setTimeout(() => navigate('/Purchases'), 2000);
            } else {
                console.error("Error sending payment:", response.statusText);
                enqueueSnackbar(
                    `Failed to send payment: ${response.statusText}`,
                    { variant: "error", autoHideDuration: 1000 }
                );
            }
        } catch (error) {
            console.error("Error sending payment:", error);
            enqueueSnackbar(`Error: ${error.message}`, {
                variant: "error",
                autoHideDuration: 1000,
            });
        }

    };

    // FUNCTION TO GET THE CLIENT NAME FOR THE SELECTED INVOICE
    const clientName = () => {
        const clientFromIVC = invoiceData?.find(each => each.invoice_id === formData.invoice_id);

        if (clientFromIVC) {
            const matchedClient = ClientsData.find(client => client.client_id === clientFromIVC.client);
            return matchedClient ? matchedClient.client_name : ''; // RETURN THE CLIENT'S NAME
        }
        return ''; // RETURN AN EMPTY STRING IF NO CLIENT IS FOUND
    };

    // HANDLE CASH CHECK BOX CHANGE 
    const CashCheckboxChange = (event) => {
        const isChecked = event.target.checked; // CHECK WHETHER THE CHECKBOX IS CHECKED

        setFormData(prev => ({
            ...prev,
            payment_state: isChecked ? 'received' : 'requested' // SET 'RECEIVED' IF CHECKED, 'REQUESTED' OTHERWISE
        }));
    };

    // TOGGLE FUNCTION TO SAY WHO PAY THE CHARGES 
    const CommissionHandling = (event) => {
        const isChecked = event.target.checked;
        console.log(isChecked)

        setFormData(prev => ({
            ...prev,
            commission_by_customer: isChecked ? 'true' : 'false'
        }));
    }


    return (
        <MainContainer>
            <Header />

            <ContentContainer>
                <SideNav />

                <BodyDiv>
                    <CreateDiv>
                        <TitleDiv>
                            <Title>Create Purchase</Title>

                            <CloseBtn type='button' onClick={OnBack}>
                                <IoArrowBackCircleOutline />
                            </CloseBtn>

                            <StatusDIv>
                                <ReactSelect
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

                        <DetailsForm onSubmit={(e) => SendPayment(e)}>

                            <FieldSet>
                                <InputsContainer>
                                    <InputTag
                                        id='payment_id'
                                        placeholder='Payment ID'
                                        readOnly
                                        value={formData.payment_id}
                                        onChange={(e) => OnChangeInputValue(e.target.value, 'payment_id')}
                                    />
                                    <Label2>ID *</Label2>
                                    {errors.payment_id && (
                                        <ErrorText>{errors.payment_id}</ErrorText>
                                    )}

                                </InputsContainer>

                                <InputsContainer>
                                    <ReactDropdown
                                        id='invoice_id'
                                        isSearchable
                                        options={options}
                                        onChange={(selectedOption) => OnChangeInputValue(selectedOption?.value, 'invoice_id')}
                                        value={
                                            invoiceData
                                                .map(option => ({
                                                    label: option.invoice_id,
                                                    value: option.invoice_id
                                                }))
                                                .find(option => option.value === formData.invoice_id) || null
                                        }
                                        styles={{ ...CustomStyles, ...Customstyles2 }}
                                    />
                                    <Label2>Invoice ID *</Label2>

                                    {errors.invoice_id && (
                                        <ErrorText>{errors.invoice_id}</ErrorText>
                                    )}
                                </InputsContainer>
                            </FieldSet>

                            <FieldSet>

                                <InputsContainer >
                                    <ImgDiv style={{ background: 'transparent', padding: '0.1rem', justifyContent: 'space-between' }}>
                                        <Label style={{ marginLeft: '0', fontWeight: '550' }}>Payment Due Date *</Label>
                                        <DateInputTag
                                            type='date'
                                            onChange={(e) => OnChangeInputValue(e.target.value, 'payment_due_date')}
                                            value={formData.payment_due_date}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </ImgDiv>
                                    {errors.payment_due_date && (
                                        <ErrorText>{errors.payment_due_date}</ErrorText>
                                    )}
                                </InputsContainer>

                                <InputsContainer>
                                    <InputTag
                                        id='client_name'
                                        readOnly
                                        value={clientName()}
                                    />
                                    <Label2>Client *</Label2>
                                    {errors.payment_id && (
                                        <ErrorText>{errors.payment_id}</ErrorText>
                                    )}

                                </InputsContainer>

                            </FieldSet>

                            <FieldSet>

                                <InputsContainer >
                                    <ImgDiv style={{ background: 'transparent', padding: '0.1rem', justifyContent: 'space-between' }}>
                                        <Label style={{ marginLeft: '0', fontWeight: '550' }}>Schedule Payment</Label>
                                        <DateInputTag
                                            type='date'
                                            onChange={(e) => OnChangeInputValue(e.target.value, 'schedule_date')}
                                            value={formData.schedule_date}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </ImgDiv>
                                </InputsContainer>

                                <InputsContainer>
                                    <TextAreaTag
                                        id='payment_id'
                                        style={{ border: trySubmit && formData.payment_note === '' ? '2px solid #000' : '' }}
                                        value={formData.payment_note}
                                        onChange={(e) => OnChangeInputValue(e.target.value, 'payment_note')}
                                    />
                                    <Label2>Payment Note</Label2>
                                </InputsContainer>
                            </FieldSet>

                            <FieldSet>
                                <InputsContainer>
                                    <ReactDropdown
                                        id='payment_method'
                                        isSearchable
                                        placeholder='Select Payment Method'
                                        options={paymentOptions}
                                        onChange={(selectedOption) => OnChangeInputValue(selectedOption?.value, 'mode_of_payment')}
                                        value={
                                            formData.mode_of_payment
                                                ? { label: toTitleCase(formData.mode_of_payment), value: formData.mode_of_payment }
                                                : null // Ensure the placeholder shows when no value is selected
                                        }
                                        styles={{ ...CustomStyles, ...Customstyles2 }}
                                    />
                                    <Label2>Mode of Payment *</Label2>
                                </InputsContainer>

                                {formData.mode_of_payment === 'cash' ? (
                                    <InputsContainer style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <CheckboxInputTag
                                            type="checkbox"
                                            checked={formData.payment_state === 'received'}
                                            onChange={CashCheckboxChange}
                                        />
                                        <label>Received</label>
                                    </InputsContainer>
                                ) : formData.mode_of_payment === 'cheque' ? (
                                    <>
                                        <InputsContainer style={{ width: '40%' }}>
                                            <InputTag
                                                type="number"
                                                value={formData.check_number}
                                                onChange={(e) => OnChangeInputValue(e.target.value, 'check_number')}
                                            />
                                            <Label2>Check Number</Label2>
                                            {errors.check_number && (
                                                <ErrorText>{errors.check_number}</ErrorText>
                                            )}
                                        </InputsContainer>

                                        <InputsContainer style={{ flexDirection: 'row', alignItems: 'center', width: '5rem', padding: '0' }}>
                                            <CheckboxInputTag
                                                style={{ marginLeft: '0.3rem', height: '1.5rem', width: '1.5rem' }}
                                                type="checkbox"
                                                checked={formData.payment_state === 'received'}
                                                onChange={CashCheckboxChange}
                                            />
                                            <label style={{ fontSize: '0.9rem' }}>Received</label>
                                        </InputsContainer>


                                    </>
                                ) : formData.mode_of_payment === 'online_payment' ? (
                                    <InputsContainer style={{ flexDirection: 'row', height: 'fit-content', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <label style={{ fontSize: '0.9rem' }}>Collect Service Charges From Customer</label>
                                        <CheckboxInputTag
                                            style={{ marginLeft: '0.5rem' }}
                                            type="checkbox"
                                            checked={formData.commission_by_customer === 'true'}
                                            onChange={CommissionHandling}
                                        />
                                    </InputsContainer>
                                ) : null}

                            </FieldSet>

                            {/* --------------------------- Buttons -------------------------------- */}
                            <FieldSet style={{ flexDirection: 'column' }}>
                                <InputsContainer style={{ flexDirection: 'row', width: 'fit-content', minHeight: '2rem', padding: '0' }}>
                                    <Label style={{ fontWeight: '700' }}>Purchase Amount :-</Label>
                                    <AmountSpan >{invoiceAmount()}</AmountSpan>
                                </InputsContainer>

                                <InputsContainer style={{ flexDirection: 'row', width: 'fit-content', minHeight: '2rem', padding: '0' }}>
                                    <Label style={{ fontWeight: '700' }}>Charges :-</Label>
                                    <AmountSpan>{chargesAmount()}</AmountSpan>
                                </InputsContainer>
                                <InputsContainer style={{ flexDirection: 'row', width: 'fit-content', minHeight: '2rem', padding: '0' }}>
                                    <Label style={{ fontWeight: '700' }}>Total :-</Label>
                                    <AmountSpan>{TotalAmount()}</AmountSpan>
                                </InputsContainer>

                            </FieldSet>


                            <BottomBtns>
                                <SaveBtn type='submit'>Send</SaveBtn>
                            </BottomBtns>
                            <span
                                style={{
                                    alignSelf: 'flex-end',
                                }}
                            >
                                * Note: Please complete your <a href='/Settings'>KYC</a> before initializing paymets.
                            </span>
                        </DetailsForm>

                        {/* <State></State> */}

                    </CreateDiv>

                </BodyDiv>

                <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />

            </ContentContainer>


        </MainContainer>
    )
}

export default CreatePayment