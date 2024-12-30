import { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import countryRegionData from 'country-region-data/dist/data-umd';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

import {
    MainContainer, ContentContainer, BodyDiv, TitleSection, Title, UserDetailsDiv, SubscriptionDiv, Title2, ProfileImage,
    Btn, InputsDiv2, Label2, Input, CustomDiv, BackBtn, ReactSelect, customStyles, PhoneNumInput, Error, ProfilePicDiv,ImgInput,ImgLabel
} from './StyledComponents'

import SideNav from '../SideNav/SideNav'
import WonBillsContext from '../../../context/WonBillsContext'

import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";

const Profile = () => {
    const { setPathText } = useContext(WonBillsContext)
    const navigate = useNavigate()
    const storedUserId = localStorage.getItem('userId');
    const apiUrl = import.meta.env.VITE_API_URL;
    const UserID = localStorage.getItem('userId');
    const [userDetails, setUserDetails] = useState({
        'user_id': '',
        'full_name': '',
        'phone': { number: '', countryCode: '', dialCode: '' },
        'email': '',
        'password': '',
        'company_details': {
            'company_name': '',
            'company_number': '',
            'company_tax_number': '',
            'company_type': '',
            'country': '',
            'province': '',
            'city': '',
            'postcode': ''
        },
        'profile_picture': '',
        'subscription_details': {
            'plan': '',
            'amount': '',
            'next_billing': ''
        }
    });

    // Validation state
    const [errors, setErrors] = useState({
        full_name: '',
        phone: '',
        email: '',
        password: '',
        business_name: '',
        business_category: '',
        business_type: '',
        country: '',
        state: '',
        district: '',
        city: '',
        pincode: '',
    });
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);

    // Find the regions for the selected country
    const regionOptions =
        selectedCountry &&
        countryRegionData.find(
            (country) => country.countryName === selectedCountry
        )?.regions.map((region) => ({
            label: region.name,
            value: region.shortCode,
        }));

    const validatePhoneNumber = (phoneNumber) => {
        // Allow only digits and check length
        const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '');
        return sanitizedPhoneNumber.length >= 10 && sanitizedPhoneNumber.length <= 15;
    };

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const validatePassword = (password) => password.length >= 6; // Minimum password length

    useEffect(() => {
        setPathText('')

        getUserData()
    }, [])

    const getUserData = async () => {
        try {
            const result = await axios.get(`${apiUrl}/user/${storedUserId}`);
            const Data = result.data
            setUserDetails({
                'user_id': Data.user_id,
                'full_name': Data.full_name,
                'phone': { number: Data.contact_number.number, countryCode: Data.contact_number.countryCode, dialCode: Data.contact_number.dialCode },
                'email': Data.email,
                'password': Data.password,
                'company_details': {
                    'company_name': Data?.company_details?.company_name,
                    'company_number': Data?.company_details?.company_number,
                    'company_tax_number': Data?.company_details?.company_tax_number,
                    'company_type': Data?.company_details?.company_type,
                    'country': Data?.company_details?.country,
                    'province': Data?.company_details?.province,
                    'city': Data?.company_details?.city,
                    'postcode': Data?.company_details?.postcode
                },
                'profile_picture': Data.profile_picture.image,
                'subscription_details': {
                    'plan': Data?.subscription_details?.plan,
                    'amount': Data?.subscription_details?.amount,
                    'next_billing': Data?.subscription_details?.next_billing
                }
            })
            setSelectedCountry(Data?.company_details?.country)
            // console.log(result.data)
        } catch (error) {
            console.log('Error fetching user data');
            console.error(error);
        }
    }


    const handleCountryChange = (selectedOption) => {
        console.log(selectedOption)
        setSelectedCountry(selectedOption);
        onChangeCompanyDetails(selectedOption, 'country')
        setSelectedRegion(null); // Reset the region when a new country is selected
    };

    const handleRegionChange = (selectedOption) => {
        // console.log(selectedOption)
        setSelectedRegion(selectedOption);
        onChangeCompanyDetails(selectedOption, 'province')
    };


    const handlePhoneNumberChange = (key, value, country) => {
        const numberWithoutDialCode = value.startsWith(country.dialCode)
            ? value.slice(country.dialCode.length)
            : value;

        setUserDetails(prev => ({
            ...prev,
            phone: {
                number: numberWithoutDialCode,
                countryCode: country.countryCode.toLowerCase(),
                dialCode: country.dialCode
            }
        }));

        const format = country.format || '';
        const isValid = validatePhoneNumber(value, format);
        setErrors(prev => ({
            ...prev,
            phone: isValid ? '' : 'Invalid phone number format'
        }));
    };

    const onChangePersonalDetails = (value, key) => {
        setUserDetails(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const onChangeCompanyDetails = (value, key) => {
        setUserDetails(prev => ({
            ...prev,
            'company_details': { ...prev['company_details'], [key]: value }
        }))
    }

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Validate User Details
        if (!userDetails.full_name) {
            newErrors.full_name = 'Full name is required';
            isValid = false;
        }

        if (!validatePhoneNumber(userDetails.phone.dialCode + userDetails.phone.number, userDetails.phone.format || '')) {
            newErrors.phone = 'Invalid phone number';
            isValid = false;
        }

        if (!validateEmail(userDetails.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        if (!validatePassword(userDetails.password)) {
            newErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }

        // Validate Business Details (Updated Keys)
        if (!userDetails.company_details.company_name) {
            newErrors.company_name = 'Company name is required';
            isValid = false;
        }

        if (!userDetails.company_details.company_number) {
            newErrors.company_number = 'Company number is required';
            isValid = false;
        }

        if (!userDetails.company_details.company_tax_number) {
            newErrors.company_tax_number = 'Company tax number is required';
            isValid = false;
        }

        if (!userDetails.company_details.company_type) {
            newErrors.company_type = 'Company type is required';
            isValid = false;
        }

        if (!userDetails.company_details.country) {
            newErrors.country = 'Country is required';
            isValid = false;
        }

        if (!userDetails.company_details.province) {
            newErrors.province = 'Province is required';
            isValid = false;
        }

        if (!userDetails.company_details.city) {
            newErrors.city = 'City is required';
            isValid = false;
        }

        if (!userDetails.company_details.postcode || !/^\d+$/.test(userDetails.company_details.postcode)) {
            newErrors.postcode = 'Invalid postcode';
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };



    const onBack = () => {
        navigate(-1)
    }

    const companyTypes = [
        'Private Limited',
        'Public Limited',
        'Partnership',
        'Limited Liability',
        'C - Crop'
    ]

    const onSubmitUser = async () => {
        const isValid = validateForm(); // Run the validation

        if (!isValid) {
            // Form validation failed, log the errors and notify the user
            console.log('Form validation failed', errors);
            enqueueSnackbar('Please fix the errors before submitting.', { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
            return; // Stop execution if the form is invalid
        }

        const url = `${apiUrl}/update-user-profile/${UserID}`;

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails) // Pass the updated user details
        };

        try {
            const response = await fetch(url, options); // Await the fetch API request

            if (response.ok) {
                // Handle successful response
                console.log("User Updated Successfully!");
                enqueueSnackbar('User Details Updated Successfully!', { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });
            } else {
                // Handle error response (non-2xx status codes)
                const errorData = await response.json(); // Try to capture response body for better debugging
                console.error("Error Updating User:", errorData);
                enqueueSnackbar(`Error Updating User: ${response.statusText}`, { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
            }
        } catch (error) {
            // Handle any network or unexpected errors
            console.error("Error:", error.message);
            enqueueSnackbar(`Error: ${error.message}`, { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
        }
    };


    return (
        <MainContainer>
            <SideNav />
            <ContentContainer>

                <BodyDiv>

                    <TitleSection>
                        <BackBtn type='button' onClick={onBack}> <IoArrowBackCircleOutline /></BackBtn>
                        <Title>Your Profile</Title>
                    </TitleSection>

                    <CustomDiv>
                        <UserDetailsDiv>
                            <Title2>Personal Details</Title2>

                            <InputsDiv2>
                                <Input required type="text" value={userDetails.user_id} readOnly />
                                <Label2>User ID</Label2>
                            </InputsDiv2>

                            <InputsDiv2>
                                <Input required type="text" value={userDetails.full_name} onChange={(e) => onChangePersonalDetails(e.target.value, 'full_name')}
                                    style={{ border: errors.full_name ? '2px solid red' : '' }}
                                />
                                <Label2>Full Name</Label2>
                            </InputsDiv2>

                            <InputsDiv2>
                                <PhoneNumInput
                                    country={userDetails.phone.countryCode || 'in'}
                                    enableSearch
                                    disableSearchIcon
                                    onChange={(value, country) => handlePhoneNumberChange('phone', value, country)}
                                    value={userDetails.phone.dialCode + userDetails.phone.number}
                                    inputStyle={{
                                        width: '100%',
                                        borderRadius: '1rem',
                                        fontSize: '16px',
                                        border: 'none',
                                        background: '#F0EFEF',
                                    }}
                                    style={{ border: errors.phone ? '2px solid red' : '' }}
                                    containerStyle={{
                                        width: '100%',
                                        background: '#F0EFEF',
                                        border: errors.phone ? '2px solid red' : '2px solid #ccc'
                                    }}
                                    buttonClass="custom-dropdown-button"
                                    dropdownStyle={{
                                        height: '8rem',
                                        borderRadius: '0.8rem',
                                        overflow: 'auto',
                                        background: '#F0EFEF'
                                    }}
                                />
                            </InputsDiv2>

                            <InputsDiv2>
                                <Input required type="text" value={userDetails.email} onChange={(e) => onChangePersonalDetails(e.target.value, 'email')}
                                    style={{ border: errors.email ? '2px solid red' : '' }}
                                />
                                <Label2>Email</Label2>
                            </InputsDiv2>

                            <InputsDiv2>
                                <Input required type="password" value={userDetails.password} onChange={(e) => onChangePersonalDetails(e.target.value, 'password')}
                                    style={{ border: errors.password ? '2px solid red' : '' }}
                                />
                                <Label2>Password</Label2>
                            </InputsDiv2>

                        </UserDetailsDiv>

                        <UserDetailsDiv>
                            <Title2>Business Details</Title2>

                            <InputsDiv2>
                                <Input required type="text" value={userDetails.company_details.company_name} onChange={(e) => onChangeCompanyDetails(e.target.value, 'company_name')}
                                    style={{ border: errors.company_name ? '2px solid red' : '' }}
                                />
                                <Label2>Company Reg Name</Label2>
                            </InputsDiv2>

                            <InputsDiv2>
                                <Input required type="text" value={userDetails.company_details.company_number} onChange={(e) => onChangeCompanyDetails(e.target.value, 'company_number')}
                                    style={{ border: errors.company_number ? '2px solid red' : '' }}
                                />
                                <Label2>Company Reg No</Label2>
                            </InputsDiv2>

                            <InputsDiv2>
                                <Input required type="text" value={userDetails.company_details.company_tax_number}
                                    onChange={(e) => onChangeCompanyDetails(e.target.value, 'company_tax_number')}
                                    style={{ border: errors.company_tax_number ? '2px solid red' : '' }}
                                />
                                <Label2>Reg Tax No</Label2>
                            </InputsDiv2>

                            <InputsDiv2>
                                <ReactSelect
                                    isSearchable
                                    placeholder="Select Company Type"
                                    options={companyTypes.map((type) => ({
                                        label: type,
                                        value: type,
                                    }))}
                                    onChange={(selectedOption) => onChangeCompanyDetails(selectedOption?.label, 'company_type')}
                                    value={
                                        companyTypes
                                            .map((type) => ({
                                                label: type,
                                                value: type,
                                            }))
                                            .find((option) => option.value === userDetails.company_details.company_type) || null
                                    }
                                    styles={customStyles}
                                />

                                {errors.company_type &&
                                    <Error style={{ color: 'red' }}>{errors.company_type}</Error>
                                }
                            </InputsDiv2>

                            <InputsDiv2>
                                <ReactSelect
                                    isSearchable
                                    placeholder="Select a Country"
                                    options={countryRegionData.map((country) => ({
                                        label: country.countryName,
                                        value: country.countryName,
                                    }))}
                                    onChange={(selectedOption) => handleCountryChange(selectedOption?.label)}
                                    value={
                                        countryRegionData
                                            .map((country) => ({
                                                label: country.countryName,
                                                value: country.countryName,
                                            }))
                                            .find((option) => option.value === userDetails.company_details.country) || null
                                    }
                                    styles={customStyles}
                                />
                                {errors.country &&
                                    <Error style={{ color: 'red' }}>{errors.country}</Error>
                                }
                            </InputsDiv2>

                            <InputsDiv2>
                                <ReactSelect
                                    value={
                                        regionOptions?.find((option) => option.label === userDetails.company_details.province) || null
                                    }
                                    onChange={(selectedOption) => handleRegionChange(selectedOption?.label)}
                                    options={regionOptions || []}
                                    placeholder="Select a Province"
                                    isDisabled={!regionOptions?.length}
                                    style={{ border: errors.state ? '2px solid red' : '' }}
                                    styles={customStyles}
                                />
                                {errors.province &&
                                    <Error style={{ color: 'red' }}>{errors.province}</Error>
                                }
                            </InputsDiv2>

                            <InputsDiv2>
                                <Input required type="text" value={userDetails.company_details.city} onChange={(e) => onChangeCompanyDetails(e.target.value, 'city')}
                                    style={{ border: errors.city ? '2px solid red' : '' }}
                                />
                                <Label2>City</Label2>
                            </InputsDiv2>

                            <InputsDiv2>
                                <Input required type="text" maxLength='6' value={userDetails.company_details.postcode} onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const numericValue = inputValue.replace(/[^0-9]/g, '');
                                    onChangeCompanyDetails(numericValue, 'postcode')
                                }
                                }
                                    style={{ border: errors.postcode ? '2px solid red' : '' }}
                                />
                                <Label2>Post/Zipcode</Label2>
                            </InputsDiv2>

                        </UserDetailsDiv>

                        <SubscriptionDiv>
                            <Title2>Subscription Details</Title2>

                            <InputsDiv2>
                                <Input required type="text" />
                                <Label2>Subsciption</Label2>
                            </InputsDiv2>

                            <InputsDiv2>
                                <Input required type="text" />
                                <Label2>Billing Date</Label2>
                            </InputsDiv2>

                            <InputsDiv2>
                                <Input required type="text" />
                                <Label2>Renewal</Label2>
                            </InputsDiv2>

                        </SubscriptionDiv>
                    </CustomDiv>

                    <ProfilePicDiv>
                        <ProfileImage
                            src={`data:image/jpeg;base64,${userDetails.profile_picture}`} // Base64 image
                            alt="Profile Picture"
                        />
                        <ImgLabel htmlFor='profilePic'><FaPencil /></ImgLabel>
                        <ImgInput id='profilePic' type='file' accept='image/jpg'/>
                    </ProfilePicDiv>

                    
                    <Btn type='button' onClick={onSubmitUser}>Edit / Save</Btn>

                </BodyDiv>

                <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />

            </ContentContainer>


        </MainContainer>
    )
}

export default Profile