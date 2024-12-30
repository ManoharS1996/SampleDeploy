// MODULE IMPORTS
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from "react-icons/md";

import moment from 'moment-timezone';

// COMPONENT IMPORTS
import UploadProfilePicture from './UploadProfilePicture';
import { savedToken } from '../DefaultData/DefaultData';

// ICON IMPORTS
import { GrStatusGood } from "react-icons/gr";

// STYLES IMPORT
import { CustomDiv, InputTag2, Label3, InputsContainer, PhoneNumInput, Btn, Btn2,Theme, ReactSelect, VerifiedSpan, EmailEditBtn, CustomDiv1, Error } from './StyledComponents';
import { Loader } from '../DefaultData/StyledComponents';

const BankAccountDetails = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const UserID = localStorage.getItem('userId');

    const [loader, setLoader] = useState(false)

    const [userBankDetails, setUserBankDetails] = useState({
        account_holder_name: '',
        ifsc_code: '',
        account_number: '',
        pan_card: ''
    });

    const [originalBankDetails, setOriginalBankDetails] = useState(null)

    const [errors, setErrors] = useState({
        account_holder_name: '',
        ifsc_code: '',
        account_number: '',
        pan_card: ''
    });


    useEffect(() => {
        const fetchData = async () => {
            await getUserData();
        };
        fetchData();
    }, []);

    // FUNCTION TO FETCH USER DATA 
    const getUserData = async () => {
        setLoader(true)
        try {
            const result = await axios.get(`${apiUrl}/user/${UserID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${savedToken}`
                }
            });
            const Data = result.data;

            // Save original bank details for comparison
            const bankDetails = {
                account_holder_name: Data?.bank_details?.account_holder_name || '',
                ifsc_code: Data?.bank_details?.ifsc_code || '',
                account_number: Data?.bank_details?.account_number || '',
                pan_card: Data?.pan_card || '',
                razorpay_account_status: Data?.razorpay_account_status || '',
            };

            setOriginalBankDetails(bankDetails); // Save original details for comparison
            setUserBankDetails(bankDetails); // Set editable details
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoader(false)
        }
    };

    // FUNCTION TO HANDLE INPUT CHANGE
    const onChangePersonalDetails = (value, key) => {
        setUserBankDetails(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // FUNCTION TO VALIDATE FORM DATA
    const validateForm = () => {
        // OBJECT TO STORE ERROR MESSAGES FOR INVALID FIELDS
        const newErrors = {};

        // FLAG TO TRACK THE OVERALL VALIDITY OF THE FORM
        let isValid = true;

        // CHECK IF THE FULL NAME IS PROVIDED
        if (!userBankDetails.account_holder_name) {
            newErrors.account_holder_name = 'Account holder name is required'; // ADD ERROR MESSAGE FOR FULL NAME
            isValid = false; // SET FORM VALIDITY TO FALSE IF FULL NAME IS MISSING
        }

        // CHECK IF A CURRENCY PREFERENCE IS SELECTED
        if (!userBankDetails.ifsc_code) {
            newErrors.ifsc_code = 'IFSC code is required';
            isValid = false;
        }

        // CHECK IF A TIMEZONE IS SELECTED
        if (!userBankDetails.account_number) {
            newErrors.account_number = 'Account number is required';
            isValid = false;
        }

        // UPDATE THE STATE WITH THE NEW ERRORS (IF ANY) TO DISPLAY ERROR MESSAGES ON THE FORM
        setErrors(newErrors);

        // RETURN THE OVERALL VALIDITY OF THE FORM (TRUE IF VALID, FALSE OTHERWISE)
        return isValid;
    };


    // FUNCTION TO UPDATE THE DATA
    const onSave = async () => {
        console.log("Bank Details to be sent:", userBankDetails);

        const isValid = validateForm();

        if (!isValid) {
            enqueueSnackbar('Please fix the errors before submitting.', { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
            return;
        }

        // Compare current userBankDetails with the originalBankDetails
        const hasChanges = JSON.stringify(userBankDetails) !== JSON.stringify(originalBankDetails);

        if (!hasChanges) {
            enqueueSnackbar('No changes detected in bank details.', { variant: 'info', autoHideDuration: 3000, preventDuplicate: true });
            return;
        }

        const Data = {
            account_holder_name: userBankDetails.account_holder_name,
            ifsc_code: userBankDetails.ifsc_code,
            account_number: userBankDetails.account_number,
        }

        const url = `${apiUrl}/update-user-bank-details/${UserID}`;
        // const url = `${apiUrl}/create-beneficiary/`;
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bankDetails: Data }) // Send bankDetails
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                enqueueSnackbar('User Bank Details Updated Successfully!', { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });
            } else {
                const errorData = await response.json();
                console.error("Error Updating User Bank Details:", errorData);
                enqueueSnackbar(`Error Updating User Bank Details: ${response.statusText}`, { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
            }
        } catch (error) {
            console.error("Error:", error.message);
            enqueueSnackbar(`Error: ${error.message}`, { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
        }
    };

    const handleKYCSubmit = async () => {
        // console.log("Bank Details to be sent:", userBankDetails);
        let isValid = true;
        const newErrors = {};

        if (!userBankDetails.pan_card) {
            newErrors.pan_card = 'PAN Card Number is required to Complete KYC'; // ADD ERROR MESSAGE FOR FULL NAME
            isValid = false; // SET FORM VALIDITY TO FALSE IF FULL NAME IS MISSING
            return
        }
        if (userBankDetails.pan_card.length !== 10) {
            newErrors.pan_card = 'PAN Card Number length should atleast 10'; // ADD ERROR MESSAGE FOR FULL NAME
            isValid = false; // SET FORM VALIDITY TO FALSE IF FULL NAME IS MISSING
            return
        }

        if (!isValid) {
            enqueueSnackbar('Please fix the errors before submitting PAN.', { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
            return;
        }

        const url = `${apiUrl}/update-pan-card/${UserID}`;
        // const url = `${apiUrl}/create-beneficiary/`;
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ panCard: userBankDetails.pan_card }) // Send bankDetails
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                enqueueSnackbar('User PAN Card Updated Successfully!', { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });
            } else {
                const errorData = await response.json();
                console.error("Error Updating User PAN Card:", errorData);
                enqueueSnackbar(`Error Updating User PAN Card: ${response.statusText}`, { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
            }
        } catch (error) {
            console.error("Error:", error.message);
            enqueueSnackbar(`Error: ${error.message}`, { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
        }
    }

    return (
        <ThemeProvider theme={Theme}>
            <Accordion sx={{ border: 'none', boxShadow: 'none', borderRadius: '1rem' }}>
                <AccordionSummary expandIcon={<MdExpandMore style={{ fontSize: '2rem' }} />}>
                    <Typography>KYC Details</Typography>
                </AccordionSummary>

                {loader ?
                    <CustomDiv style={{padding:'0',justifyContent:'center',alignItems:'center',height:'4rem'}}>
                        <Loader />
                    </CustomDiv>

                    :

                    <AccordionDetails>
                        <CustomDiv style={{ alignItems: 'center' }}>
                            <InputsContainer>
                                <InputTag2
                                    required
                                    type="text"
                                    readOnly={userBankDetails.pan_card !== null && userBankDetails.razorpay_account_status === 'activated'}
                                    value={userBankDetails.pan_card}
                                    onChange={(e) => onChangePersonalDetails(e.target.value.toUpperCase(), 'pan_card')}
                                    maxLength='10'
                                />
                                <Label3>PAN Card Number</Label3>
                                {userBankDetails.pan_card &&
                                    <VerifiedSpan style={{ right: '1rem', bottom: '37%' }}><GrStatusGood /></VerifiedSpan>
                                }

                                {errors.pan_card && <Error>{errors.pan_card}</Error>}
                            </InputsContainer>
                            {userBankDetails.pan_card === null && userBankDetails.razorpay_account_status !== 'activated' &&
                                <Btn2 type='button' onClick={handleKYCSubmit}>Verify</Btn2>
                            }

                        </CustomDiv>

                        <h1 style={{ fontSize: '1rem', fontWeight: '700' }}>Fund Account Details</h1>
                        <CustomDiv style={{ alignItems: 'center' }}>

                            <InputsContainer>
                                <InputTag2
                                    required
                                    type="text"
                                    value={userBankDetails.account_holder_name}
                                    onChange={(e) => onChangePersonalDetails(e.target.value, 'account_holder_name')}
                                />
                                <Label3>Account Holder Name</Label3>
                                {errors.account_holder_name && <Error>{errors.account_holder_name}</Error>}
                            </InputsContainer>

                            <InputsContainer>
                                <InputTag2
                                    required
                                    type="text"
                                    value={userBankDetails.ifsc_code}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Convert value to uppercase and allow only alphanumeric characters
                                        const formattedValue = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                                        onChangePersonalDetails(formattedValue, 'ifsc_code');
                                    }}
                                />
                                <Label3>IFSC Code</Label3>
                                {errors.ifsc_code && <Error>{errors.ifsc_code}</Error>}
                            </InputsContainer>

                            <InputsContainer>
                                <InputTag2
                                    required
                                    type="number"
                                    value={userBankDetails.account_number}
                                    onChange={(e) => onChangePersonalDetails(e.target.value, 'account_number')}
                                />
                                <Label3>Account Number</Label3>
                                {errors.account_number && <Error>{errors.account_number}</Error>}
                            </InputsContainer>

                            <Btn type='button' onClick={onSave}>Submit</Btn>

                        </CustomDiv>

                    </AccordionDetails>
                }



            </Accordion>
            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
        </ThemeProvider>
    );
};

export default BankAccountDetails;