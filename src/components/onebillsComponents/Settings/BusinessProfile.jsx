// MODULE IMPORTS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from "react-icons/md";
import countryRegionData from 'country-region-data/dist/data-umd';

//COMPOENT IMPORTS
import UploadLogoSign from './UploadLogoSign'
import { allSubCategories, industryTypes, companyTypes, savedToken } from '../DefaultData/DefaultData'

// STYLES IMPORT
import { CustomDiv, InputTag2, Label3, InputsContainer, Btn, Theme, ReactSelect, Error, Label4 } from './StyledComponents';
import { CustomStyles, Loader,Customstyles2 } from '../DefaultData/StyledComponents';

const BusinessProfile = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const UserID = localStorage.getItem('userId');

    const [loader, setLoader] = useState(false)

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [businessDetails, setBusinessDetails] = useState({
        'company_details': {
            'company_name': '',
            'company_number': '',
            'company_tax_number': '',
            'company_type': '',
            'country': '',
            'province': '',
            'city': '',
            'postcode': ''
        }

    })

    const [errors, setErrors] = useState({
        'company_name': '',
        'company_number': '',
        'company_tax_number': '',
        'company_type': '',
        'country': '',
        'province': '',
        'city': '',
        'postcode': ''
    });

    const [selectedCategory, setSelectedCategory] = useState(null); // To store selected category
    const [selectedSubCategory, setSelectedSubCategory] = useState(null); // To store selected sub-category
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);

    useEffect(() => {
        getUserData()
    }, [])

    // FUNCTION TO FETCH THE USERS DATA 
    const getUserData = async () => {
        setLoader(true)
        try {
            const result = await axios.get(`${apiUrl}/user/${UserID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${savedToken}`
                }
            });
            const Data = result.data.company_details
            setBusinessDetails({
                'company_details': {
                    'company_name': Data.company_name,
                    'company_number': Data.company_number,
                    'company_tax_number': Data.company_tax_number,
                    'company_type': Data.company_type,
                    'company_category': Data.company_category,
                    'company_subcategory': Data.company_subcategory,
                    'country': Data.country,
                    'province': Data.province,
                    'city': Data.city,
                    'postcode': Data.postcode
                }

            });
            setSelectedCategory(Data.company_category); // Set selected category
            setSubCategoryOptions(allSubCategories[Data.company_category] || []);
            setSelectedCountry(Data?.country)

        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoader(false)
        }
    };

    // FIND THE REGIONS FOR THE SELECTED COUNTRY
    const regionOptions =
        selectedCountry &&
        countryRegionData.find(
            (country) => country.countryName === selectedCountry
        )?.regions.map((region) => ({
            label: region.name,
            value: region.shortCode,
        }));


    // Handle category change and update sub-categories accordingly
    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption); // Set selected category
        setSubCategoryOptions(allSubCategories[selectedOption.value] || []); // Set sub-category options based on selected category
        onChangeCompanyDetails(selectedOption.value, 'company_category')
        setSelectedSubCategory(null); // Reset sub-category when category changes
    };

    // Handle sub-category change
    const handleSubCategoryChange = (selectedOption) => {
        setSelectedSubCategory(selectedOption); // Set selected sub-category
        onChangeCompanyDetails(selectedOption.value, 'company_subcategory')
    };

    // FUNCTION TO HANDLE COUNTY CHANGE
    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        onChangeCompanyDetails(selectedOption, 'country')
    };

    // FUNCTION TO HANDLE PROVINCE CHANGE
    const handleRegionChange = (selectedOption) => {
        onChangeCompanyDetails(selectedOption, 'province')
    };

    // FUNCTION TO HANDLE INPUT CHANGE
    const onChangeCompanyDetails = (value, key) => {
        setBusinessDetails(prev => ({
            ...prev,
            'company_details': { ...prev['company_details'], [key]: value }
        }))
    }

    // FUNCTION TO VALIDATE FORM
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // VALIDATE COMPANY_NAME
        if (!businessDetails.company_details.company_name) {
            newErrors.company_name = 'Company name is required';
            isValid = false;
        }

        // VALIDATE COMPANY_NUMBER
        if (!businessDetails.company_details.company_number) {
            newErrors.company_number = 'Company number is required';
            isValid = false;
        }

        // VALIDATE COMPANY_TAX_NUMBER
        if (!businessDetails.company_details.company_tax_number) {
            newErrors.company_tax_number = 'Company tax number is required';
            isValid = false;
        }

        // VALIDATE COMPANY_TYPE
        if (!businessDetails.company_details.company_type) {
            newErrors.company_type = 'Company type is required';
            isValid = false;
        }

        if (!businessDetails.company_details.company_category) {
            newErrors.company_category = 'Company category is required';
            isValid = false;
        }

        if (!businessDetails.company_details.company_subcategory) {
            newErrors.company_subcategory = 'Company sub-category is required';
            isValid = false;
        }

        // VALIDATE COUNTRY
        if (!businessDetails.company_details.country) {
            newErrors.country = 'Country is required';
            isValid = false;
        }

        // VALIDATE PROVINCE
        if (!businessDetails.company_details.province) {
            newErrors.province = 'Province is required';
            isValid = false;
        }

        // VALIDATE CITY
        if (!businessDetails.company_details.city) {
            newErrors.city = 'City is required';
            isValid = false;
        }

        // VALIDATE POSTCODE
        if (!businessDetails.company_details.postcode || businessDetails.company_details.postcode.length !== 6) {
            newErrors.postcode = 'Postcode is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // FUNCTION TO UPDATE BUSINESS DETAILS
    const onUpdate = async () => {
        // VALIDATE THE FORM BEFORE PROCEEDING WITH THE UPDATE
        const isValid = validateForm();

        // IF THE FORM IS NOT VALID, SHOW AN ERROR NOTIFICATION AND STOP THE PROCESS
        if (!isValid) {
            enqueueSnackbar('Please fix the errors before submitting.', {
                variant: 'error',
                autoHideDuration: 3000,
                preventDuplicate: true
            });
            return;
        }

        // DEFINE THE API ENDPOINT TO UPDATE THE USER PROFILE DATA
        const url = `${apiUrl}/update-user-profileData/${UserID}`;

        // DEFINE THE OPTIONS FOR THE FETCH REQUEST, USING THE PUT METHOD AND INCLUDING THE BUSINESS DETAILS IN THE REQUEST BODY
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" }, // SET THE REQUEST CONTENT TYPE TO JSON
            body: JSON.stringify(businessDetails) // CONVERT BUSINESS DETAILS TO A JSON STRING
        };

        try {
            // MAKE AN ASYNCHRONOUS FETCH REQUEST TO UPDATE USER DATA
            const response = await fetch(url, options);

            // CHECK IF THE RESPONSE IS SUCCESSFUL (STATUS CODE IN THE 200 RANGE)
            if (response.ok) {
                // SHOW A SUCCESS NOTIFICATION IF THE UPDATE WAS SUCCESSFUL
                enqueueSnackbar('Business Details Updated Successfully!', {
                    preventDuplicate: true,
                    variant: 'success',
                    autoHideDuration: 1000
                });
            } else {
                // IF THE RESPONSE IS NOT SUCCESSFUL, EXTRACT THE ERROR DATA
                const errorData = await response.json();
                console.error("Error Updating User:", errorData); // LOG THE ERROR DETAILS IN THE CONSOLE

                // SHOW AN ERROR NOTIFICATION WITH THE RESPONSE'S STATUS TEXT
                enqueueSnackbar(`Error Updating User: ${response.statusText}`, {
                    variant: 'error',
                    autoHideDuration: 3000,
                    preventDuplicate: true
                });
            }
        } catch (error) {
            // IF AN ERROR OCCURS DURING THE FETCH REQUEST, LOG THE ERROR MESSAGE IN THE CONSOLE
            console.error("Error:", error.message);

            // SHOW AN ERROR NOTIFICATION WITH THE ERROR MESSAGE
            enqueueSnackbar(`Error: ${error.message}`, {
                variant: 'error',
                autoHideDuration: 3000,
                preventDuplicate: true
            });
        }
    };

    return (
        <ThemeProvider theme={Theme}>
            <Accordion sx={{ border: 'none', boxShadow: 'none', borderRadius: '1rem' }}>
                <AccordionSummary expandIcon={<MdExpandMore style={{ fontSize: '2rem' }} />}>
                    <Typography>Business Profile</Typography>
                </AccordionSummary>

                {loader ?
                    <CustomDiv style={{padding:'0',justifyContent:'center',alignItems:'center',height:'4rem'}}>
                        <Loader />
                    </CustomDiv>

                    :

                    <AccordionDetails>
                        <CustomDiv>
                            <InputsContainer>
                                <InputTag2 required type="text" value={businessDetails.company_details.company_name}
                                    onChange={(e) => onChangeCompanyDetails(e.target.value, 'company_name')}
                                    readOnly
                                />
                                <Label3>Business Reg Name</Label3>
                                {errors.company_name &&
                                    <Error style={{ color: 'red' }}>{errors.company_name}</Error>
                                }
                            </InputsContainer>

                            <InputsContainer>
                                <InputTag2
                                    required
                                    type="text"
                                    readOnly
                                    value={businessDetails.company_details.company_number}
                                    onChange={(e) => onChangeCompanyDetails(e.target.value, 'company_number')}
                                />
                                <Label3>Business Reg No</Label3>
                                {errors.company_number &&
                                    <Error style={{ color: 'red' }}>{errors.company_number}</Error>
                                }
                            </InputsContainer>

                            <InputsContainer>
                                <InputTag2 required type="text" value={businessDetails.company_details.company_tax_number}
                                    onChange={(e) => onChangeCompanyDetails(e.target.value, 'company_tax_number')}
                                    readOnly
                                />
                                <Label3>Reg Tax No</Label3>
                                {errors.company_tax_number &&
                                    <Error style={{ color: 'red' }}>{errors.company_tax_number}</Error>
                                }
                            </InputsContainer>

                            <InputsContainer>
                                <ReactSelect
                                    isSearchable
                                    placeholder="Company Type"
                                    options={companyTypes}
                                    onChange={(selectedOption) => onChangeCompanyDetails(selectedOption?.value, 'company_type')}
                                    value={companyTypes.find((option) => option.value === businessDetails.company_details.company_type)}
                                    styles={{...CustomStyles,...Customstyles2}}
                                    isDisabled
                                />
                                <Label4>Company Type</Label4>
                                {errors.company_type &&
                                    <Error style={{ color: 'red' }}>{errors.company_type}</Error>
                                }
                            </InputsContainer>

                            <InputsContainer>
                                <ReactSelect
                                    isSearchable
                                    placeholder="Category"
                                    options={industryTypes || []}
                                    onChange={handleCategoryChange} // Handle category selection
                                    value={industryTypes.find((option) => option.value === businessDetails.company_details.company_category)}
                                    styles={{...CustomStyles,...Customstyles2}}
                                    isDisabled
                                />
                                <Label4>Business Type</Label4>
                                {errors.company_type &&
                                    <Error style={{ color: 'red' }}>{errors.company_type}</Error>
                                }
                            </InputsContainer>

                            <InputsContainer>
                                <ReactSelect
                                    isSearchable
                                    placeholder="Sub Category"
                                    options={subCategoryOptions || []}
                                    onChange={handleSubCategoryChange} // Handle category selection
                                    value={subCategoryOptions.find((option) => option.value === businessDetails.company_details.company_subcategory)}
                                    styles={{...CustomStyles,...Customstyles2}}
                                    isDisabled
                                />
                                <Label4>Business Type</Label4>
                                {errors.company_type &&
                                    <Error style={{ color: 'red' }}>{errors.company_type}</Error>
                                }
                            </InputsContainer>

                            <InputsContainer>
                                <ReactSelect
                                    isSearchable
                                    placeholder="Country"
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
                                            .find((option) => option.value === businessDetails.company_details.country) || null
                                    }
                                    styles={{...CustomStyles,...Customstyles2}}
                                    isDisabled
                                />
                                <Label4>Country</Label4>
                                {errors.country &&
                                    <Error style={{ color: 'red' }}>{errors.country}</Error>
                                }
                            </InputsContainer>

                            <InputsContainer >
                                <ReactSelect
                                    value={
                                        regionOptions?.find((option) => option.label === businessDetails.company_details.province) || null
                                    }
                                    onChange={(selectedOption) => handleRegionChange(selectedOption?.label)}
                                    options={regionOptions || []}
                                    placeholder="Province"
                                    styles={{...CustomStyles,...Customstyles2}}
                                    isDisabled

                                />
                                <Label4>Province</Label4>
                                {errors.province &&
                                    <Error style={{ color: 'red' }}>{errors.province}</Error>
                                }
                            </InputsContainer>

                            <InputsContainer>
                                <InputTag2 required type="text" value={businessDetails.company_details.city}
                                    onChange={(e) => onChangeCompanyDetails(e.target.value, 'city')}
                                    readOnly
                                />
                                <Label3>City</Label3>
                                {errors.province &&
                                    <Error style={{ color: 'red' }}>{errors.province}</Error>
                                }
                            </InputsContainer>

                            <InputsContainer>
                                <InputTag2 required type="text" value={businessDetails.company_details.postcode}
                                    maxLength={6}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const numericValue = inputValue.replace(/[^0-9]/g, '');
                                        onChangeCompanyDetails(numericValue, 'postcode');
                                    }}
                                    readOnly
                                />
                                <Label3>Post/Zipcode</Label3>
                                {errors.postcode &&
                                    <Error style={{ color: 'red' }}>{errors.postcode}</Error>
                                }
                            </InputsContainer>
                            <UploadLogoSign /> 
                        </CustomDiv>
                    </AccordionDetails>
                }
            </Accordion>
            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
        </ThemeProvider>
    )
}

export default BusinessProfile