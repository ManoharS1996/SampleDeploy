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
import UploadProfilePicture from './UploadProfilePicture'
import { currencyOptionsData, savedToken } from '../DefaultData/DefaultData';

// ICON IMPORTS
import { GrStatusGood } from "react-icons/gr";

// STYLES IMPORT
import { CustomDiv, InputTag2, Label3, InputsContainer, PhoneNumInput, Btn, Theme, ReactSelect, VerifiedSpan, EmailEditBtn, CustomDiv1, Error, Label4 } from './StyledComponents';
import { CustomStyles, Customstyles2, Loader } from '../DefaultData/StyledComponents';

const MyProfile = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const fixerApiurl = import.meta.env.FIXER_API_URL
    const UserID = localStorage.getItem('userId');

    const [loader, setLoader] = useState(false)

    const currencyOptions = currencyOptionsData;
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [selectedTimezone, setSelectedTimezone] = useState(null);
    const [exchangeRates, setExchangeRates] = useState({});

    const [userPersonalDetails, setUserPersonalDetails] = useState({
        'user_id': '',
        'full_name': '',
        'phone': { number: '', countryCode: '', dialCode: '' },
        'email': '',
        'currency_preference': '',
        'timezone': ''
    });

    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [errors, setErrors] = useState({
        full_name: '',
        phone: '',
        email: '',
        currency_preference: '',
        timezone: '',
    });

    // GET A LIST OF ALL TIMEZONES AND MAP TO REACT SELECT FORMAT
    const timezones = moment.tz.names();
    const timezoneOptions = timezones.map(tz => ({
        value: tz,
        label: `${tz} (UTC${moment.tz(tz).format('Z')})`
    }));

    const fetchExchangeRates = useCallback(async () => {
        try {
            const response = await axios.get(fixerApiurl);
            if (response.data && response.data.rates) {
                setExchangeRates(response.data.rates);
            }
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await fetchExchangeRates();
            await getUserData();
        };
        fetchData();
    }, [fetchExchangeRates]);

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
            setUserPersonalDetails({
                'user_id': Data.user_id,
                'full_name': Data.full_name,
                'phone': {
                    number: Data.contact_number.number || '',
                    countryCode: Data.contact_number.countryCode || 'IN',
                    dialCode: Data.contact_number.dialCode || '+91'
                },
                'email': Data.email,
                'currency_preference': Data.currency_preference || 'USD',
                'timezone': Data.timezone || 'UTC' // DEFAULT TO UTC IF NOT PROVIDED
            });
            setSelectedCurrency({
                value: Data.currency_preference?.toLowerCase(),
                label: getCurrencyLabel(Data.currency_preference?.toLowerCase()),
                code: Data.currency_preference,
            });
            setSelectedTimezone({
                value: Data.timezone || 'UTC',
                label: Data.timezone || 'UTC',
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoader(false)
        }
    };

    // FUNCTION TO GET CURRENCY LABEL
    const getCurrencyLabel = (currencyCode) => {
        const currency = currencyOptions.find(option => option.code.toLowerCase() === currencyCode.toLowerCase());
        const rateAgainstEUR = exchangeRates[currency.code];
        // const rateAgainstUSD = rateAgainstEUR && exchangeRates['USD']
        //     ? (rateAgainstEUR / exchangeRates['USD']).toFixed(2)
        //     : '';
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '0.9rem' }}>
                {/* <CurrencyFlag currency={currency.code} size="sm" /> */}
                <span style={{ marginLeft: 10 }}>{currency.name} ({currency.code})</span>
            </div>
        );
    };

    // FUNCTION TO HANDLE CURRENCY CHANGE
    const handleCurrencyChange = (selectedOption) => {
        setSelectedCurrency(selectedOption);
        setUserPersonalDetails(prev => ({
            ...prev,
            currency_preference: selectedOption.value.toLowerCase()
        }));
    };

    // FUNCTION TO HANDLE TIMEZONE CHANGE
    const handleTimezoneChange = (selectedOption) => {
        setSelectedTimezone(selectedOption);
        setUserPersonalDetails(prev => ({
            ...prev,
            timezone: selectedOption.value
        }));
    };

    // FUNCTION TO VALIDATE PHONE NUMBER
    const validatePhoneNumber = (phoneNumber) => {
        const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '');
        return sanitizedPhoneNumber.length >= 10 && sanitizedPhoneNumber.length <= 15;
    };

    // FUNCTION TO VALIDATE EMAIL
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    // FUNCTION TO HANDLE PHONE NUMBER CHANGE
    const handlePhoneNumberChange = (value, country) => {
        const numberWithoutDialCode = value.startsWith(country.dialCode)
            ? value.slice(country.dialCode.length)
            : value;

        setUserPersonalDetails(prev => ({
            ...prev,
            phone: {
                number: numberWithoutDialCode,
                countryCode: country.countryCode.toLowerCase(),
                dialCode: country.dialCode
            }
        }));
    };

    // FUNCTION TO HANDLE INPUT CHANGE
    const onChangePersonalDetails = (value, key) => {
        setUserPersonalDetails(prev => ({
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
        if (!userPersonalDetails.full_name) {
            newErrors.full_name = 'Full name is required'; // ADD ERROR MESSAGE FOR FULL NAME
            isValid = false; // SET FORM VALIDITY TO FALSE IF FULL NAME IS MISSING
        }

        // VALIDATE THE PHONE NUMBER USING A UTILITY FUNCTION, COMBINING DIAL CODE AND PHONE NUMBER
        if (!validatePhoneNumber(userPersonalDetails.phone.dialCode + userPersonalDetails.phone.number)) {
            newErrors.phone = 'Invalid phone number';
            isValid = false;
        }

        // VALIDATE THE EMAIL FORMAT USING A UTILITY FUNCTION
        if (!validateEmail(userPersonalDetails.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        // CHECK IF A CURRENCY PREFERENCE IS SELECTED
        if (!userPersonalDetails.currency_preference) {
            newErrors.currency_preference = 'Currency preference is required';
            isValid = false;
        }

        // CHECK IF A TIMEZONE IS SELECTED
        if (!userPersonalDetails.timezone) {
            newErrors.timezone = 'Timezone preference is required';
            isValid = false;
        }

        // UPDATE THE STATE WITH THE NEW ERRORS (IF ANY) TO DISPLAY ERROR MESSAGES ON THE FORM
        setErrors(newErrors);

        // RETURN THE OVERALL VALIDITY OF THE FORM (TRUE IF VALID, FALSE OTHERWISE)
        return isValid;
    };

    // FUNCTION TO UPDATE THE DATA
    const onUpdate = async () => {
        const isValid = validateForm();

        if (!isValid) {
            enqueueSnackbar('Please fix the errors before submitting.', { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
            return;
        }

        const url = `${apiUrl}/update-user-profileData/${UserID}`;
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userPersonalDetails)
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                enqueueSnackbar('User Details Updated Successfully!', { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });
            } else {
                const errorData = await response.json();
                console.error("Error Updating User:", errorData);
                enqueueSnackbar(`Error Updating User: ${response.statusText}`, { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
            }
        } catch (error) {
            console.error("Error:", error.message);
            enqueueSnackbar(`Error: ${error.message}`, { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
        }
    };

    // FUNCTION FOR SENDING OTP TO REGISTERED EMAIL
    const sendOtp = async () => {
        try {
            const response = await axios.post(`${apiUrl}/registered-email-change/send-otp`, { email: userPersonalDetails.email });
            if (response.data.success) {
                enqueueSnackbar('OTP sent successfully to your registered email!', { variant: 'success', autoHideDuration: 3000 });
                setOtpSent(true);
            } else {
                enqueueSnackbar('Failed to send OTP. Try again later.', { variant: 'error', autoHideDuration: 3000 });
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            enqueueSnackbar('Error sending OTP. Try again later.', { variant: 'error', autoHideDuration: 3000 });
        }
    };

    // FUNCTION TO VERIFY OTP AND UPDATE REGISTERED EMAIL WITH NEW EMAIL
    const verifyOtpAndUpdateEmail = async () => {
        try {
            const response = await axios.post(`${apiUrl}/registered-email-change/verify-otp`, { email: userPersonalDetails.email, newEmail: newEmail, otp });
            if (response.data.success) {
                enqueueSnackbar('Email updated successfully!', { variant: 'success', autoHideDuration: 3000 });
                setUserPersonalDetails(prev => ({ ...prev, email: newEmail }));
                setIsEditingEmail(false);
                setOtpSent(false);
                setOtp('');
                setNewEmail('');
            } else {
                enqueueSnackbar('Invalid OTP. Please try again.', { variant: 'error', autoHideDuration: 3000 });
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            enqueueSnackbar('Error verifying OTP. Try again later.', { variant: 'error', autoHideDuration: 3000 });
        }
    };

    // FUNCTION TO HANDLE EMAIL CHANEGE BUTTON
    const handleEmailChangeClick = () => {
        if (otpSent) {
            verifyOtpAndUpdateEmail();
        } else {
            sendOtp();
        }
    };

    return (
        <ThemeProvider theme={Theme}>
            <Accordion sx={{ border: 'none', boxShadow: 'none', borderRadius: '1rem' }}>
                <AccordionSummary expandIcon={<MdExpandMore style={{ fontSize: '2rem' }} />}>
                    <Typography>My Profile</Typography>
                </AccordionSummary>

                {loader ?
                    <CustomDiv style={{ padding: '0', justifyContent: 'center', alignItems: 'center', height: '4rem' }}>
                        <Loader />
                    </CustomDiv> :

                    <AccordionDetails>

                        <CustomDiv>
                            <InputsContainer>
                                <InputTag2 required type="text" value={userPersonalDetails.user_id} readOnly />
                                <Label3>User ID</Label3>
                            </InputsContainer>

                            <InputsContainer>
                                <InputTag2
                                    required
                                    type="text"
                                    value={userPersonalDetails.full_name}
                                    onChange={(e) => onChangePersonalDetails(e.target.value, 'full_name')}
                                />
                                <Label4>Full Name</Label4>
                                {errors.full_name && <Error>{errors.full_name}</Error>}
                            </InputsContainer>

                            <InputsContainer>
                                {userPersonalDetails.phone && (
                                    <PhoneNumInput
                                        country={userPersonalDetails?.phone?.countryCode || 'in'}
                                        enableSearch
                                        disableSearchIcon
                                        onChange={(value, country) => handlePhoneNumberChange(value, country)}
                                        value={(userPersonalDetails.phone.dialCode || "") + (userPersonalDetails.phone.number || "")}
                                        inputStyle={{
                                            width: '100%',
                                            borderRadius: '0.7rem',
                                            fontSize: '16px',
                                            border: 'none',
                                            background: '#FFFAFA',
                                        }}
                                        containerStyle={{
                                            width: '100%',
                                            background: '#FFFAFA',
                                        }}
                                        buttonClass="custom-dropdown-button"
                                        dropdownStyle={{
                                            height: '8rem',
                                            borderRadius: '0.8rem',
                                            overflow: 'auto',
                                            background: '#FFFAFA'
                                        }}
                                    />
                                )}
                                <Label4>Phone</Label4>
                                {errors.phone && <Error>{errors.phone}</Error>}
                            </InputsContainer>

                            <InputsContainer>
                                <InputTag2 style={{ width: '100%' }} required type="text" value={userPersonalDetails.email} readOnly />
                                <Label4>Email</Label4>
                                <VerifiedSpan><GrStatusGood /></VerifiedSpan>
                            </InputsContainer>

                            <InputsContainer>
                                <ReactSelect
                                    isSearchable
                                    placeholder="Select Currency"
                                    options={currencyOptions.map(currency => ({
                                        value: currency.code.toLowerCase(),
                                        label: getCurrencyLabel(currency.code),
                                        code: currency.code,
                                    }))}
                                    onChange={handleCurrencyChange}
                                    value={selectedCurrency}
                                    styles={{ ...CustomStyles, ...Customstyles2 }}
                                />
                                <Label4>Currency Preference</Label4>
                                {errors.currency_preference && <Error>{errors.currency_preference}</Error>}
                            </InputsContainer>

                            <InputsContainer>
                                <ReactSelect
                                    isSearchable
                                    placeholder="Select Timezone"
                                    options={timezoneOptions}
                                    onChange={handleTimezoneChange}
                                    value={selectedTimezone}
                                    styles={{ ...CustomStyles, ...Customstyles2 }}
                                />
                                <Label4>Timezone Preference</Label4>
                                {errors.timezone && <Error>{errors.timezone}</Error>}
                            </InputsContainer>

                            <UploadProfilePicture />

                            <Btn type='button' onClick={onUpdate}>Update</Btn>
                        </CustomDiv>

                    </AccordionDetails>
                }
            </Accordion>
            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
        </ThemeProvider>
    );
};

export default MyProfile;
