// MODULE IMPORTS
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

//STYLE IMPORTS
import {
    MainContainer, ContentContainer, BodyDiv, CreateDiv, TitleDiv, Title, CloseBtn, DetailsForm, Legend, InputTag, FieldSet, InputsContainer,
    CustomDiv, Label, SaveBtn, TextAreaTag, ImgInput, ImgDiv, DateInputTag, ImgLabel, Imgicon, ImgTag, ErrorText,
    Label2
} from './StyledComponents'
import { ReactSelect, CustomStyles, StatusDIv, Customstyles2,Loader } from '../../DefaultData/StyledComponents'

// COMPONENT IMPORTS
import SideNav from '../../SideNav/SideNav'
import Header from '../../Header/Header';
import WonBillsContext from '../../../../context/WonBillsContext';
import { savedToken } from '../../DefaultData/DefaultData';

// ICON IMPORTS
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { TiImage } from "react-icons/ti";

const ProductDetailView = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const PathText = location.pathname.split('/')
    const { setPathText, setActiveTab } = useContext(WonBillsContext)
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);

    const [formInputs, setFormInputs] = useState({
        'Item Details': [
            { name: 'product_id', label: 'ID *', inputType: 'input', type: 'text', placeholder: 'ID', ReadOnly: true, require: true },
            { name: 'product_name', label: 'Name *', inputType: 'input', type: 'text', placeholder: 'Product Name', ReadOnly: false, require: true },
            { name: 'category', label: 'Category *', inputType: 'dropdown', type: 'text', placeholder: 'Category', options: ['Product', 'Service', 'Expense'], ReadOnly: false, require: true },
            { name: 'serial_number', label: 'Serial Number *', inputType: 'input', type: 'number', placeholder: 'Serial Number', ReadOnly: false, require: true },
            { name: 'total_stock', label: 'Total Stock *', inputType: 'input', type: 'number', placeholder: 'Total Stock', ReadOnly: false, require: true },
            { name: 'in_stock', label: 'In Stock *', inputType: 'input', type: 'number', placeholder: 'In Stock', ReadOnly: false, require: true },
            { name: 'value', label: 'Original Price *', inputType: 'input', type: 'number', placeholder: 'Value', ReadOnly: false, require: true },
            { name: 'discount', label: 'Discount(%)', inputType: 'input', type: 'number', placeholder: 'Discount in %', ReadOnly: false, require: false },
            { name: 'valid_from', label: 'Valid From *', inputType: 'Date', type: 'date', placeholder: 'Select Date', ReadOnly: false, require: true },
            { name: 'valid_until', label: 'Valid Until *', inputType: 'Date', type: 'date', placeholder: 'Select Date', ReadOnly: false, require: true },
            { name: 'price', label: 'Discount Price *', inputType: 'input', type: 'number', placeholder: 'Price', ReadOnly: false, require: true },
            { name: 'description', label: 'Description', inputType: 'textarea', type: 'text', placeholder: 'Description', ReadOnly: false, require: false },
            { name: 'notes', label: 'Notes', inputType: 'textarea', type: 'text', placeholder: 'Notes', ReadOnly: false, require: false },
        ]
    });

    const [formData, setFormData] = useState({
        'Service Details': {}
    })

    const [trySubmit, setTrySubmit] = useState(false)
    const [profilePictureObj, setProfilePictureObj] = useState('')
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setPathText('')
        setActiveTab(PathText[1])
        fetchProductsData()
    }, [])

    // FUNCTION TO FETCH PRODUCT/SERVICE/EXPENCE DATA BY ID
    const fetchProductsData = async () => {
        setLoading(true);
        try {
            const url = `${apiUrl}/product/${id}`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${savedToken}`,
                }
            }

            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                setFormData(mapApiDataToFormData(data))
            } else {
                console.error('Error fetching client data:', response.statusText)
            }
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setLoading(false)
        }
    }

    // FUNCTION TO CONVERT API DATA TO FORM FORMAT
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
        const imageDetails = parseJson(data.image) || ''

        // FUNCTION TO FORMAT ISO DATE STRING TO YYYY-MM-DD
        const formatDate = (isoDateString) => {
            const date = new Date(isoDateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        return {
            product_id: data.product_id || '',
            product_name: data.product_name || '',
            category: data.category || '',
            valid_from: formatDate(data.valid_from) || '',
            valid_until: formatDate(data.valid_until) || '',
            value: data.value || '',
            total_stock: data.total_stock || '',
            serial_number: data.serial_number || '',
            in_stock: data.in_stock || '',
            discount: data.discount || '0',
            price: data.price || '',
            description: data.description || '',
            notes: data.notes || '',
            created_date: data.created_date || '',
            image: imageDetails.image || '',
            last_modified_date: data.last_modified_date || '',
            status: data.status
        }
    }

    // FUNCTION TO HANDLE BACK BUTTON
    const OnBack = () => {
        navigate('/Items')
    }

    // FUNCTION TO HANDLE INPUT CHANGE
    const OnChangeInputValue = (value, key) => {
        if (key === 'value') {
            const originalPrice = parseFloat(value) || 0;
            const discount = parseFloat(formData.discount) || 0;
            let discountedPrice = originalPrice - (originalPrice * (discount / 100));
            setFormData(prev => ({
                ...prev,
                price: discountedPrice,  // ENSURE PRICE IS ALWAYS A FLOAT
                [key]: originalPrice
            }));
        } else if (key === 'discount') {
            setFormData(prev => {
                // ENSURE PRICE IS A VALID NUMBER BEFORE APPLYING DISCOUNT
                const originalPrice = parseFloat(prev.value) || 0;

                // PARSE THE DISCOUNT VALUE AS A FLOAT TO HANDLE BOTH INTEGER AND FLOAT INPUTS
                const discount = parseFloat(value) || 0;

                // CALCULATING DISCOUNTED PRICE
                let discountedPrice = originalPrice - (originalPrice * (discount / 100));

                // ENSURE THE DISCOUNTED PRICE HAS TWO DECIMALS
                discountedPrice = parseFloat(discountedPrice.toFixed(2));

                return {
                    ...prev,
                    [key]: value,             // UPDATING THE DISCOUNT FIELD
                    price: discountedPrice    // UPDATING PRICE WITH THE DISCOUNTED PRICE (2 DECIMALS)
                };
            });
        } else if (key === 'total_stock') {
            setFormData(prev => ({
                ...prev,
                [key]: value,
                ['in_stock']: value
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [key]: value
            }));
        }
    };

    // HANDLE IMAGE FILE CHANGE 
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type === 'image/jpeg') {
            setProfilePictureObj(selectedFile);
            uploadFile(selectedFile) // CALLING UPLOADFILE FUNCTION 
        } else {
            console.error('Please select a JPEG image.');
        }

    };

    // FUNCTION TO UPLOAD THE PRODUCT/SERVICE/EXPENCE IMAGE TO DATABASE IN BASE 64 FORM
    const uploadFile = async (file) => {
        let errors = null; // INITIALIZE ERRORS

        // VALIDATE FILE INPUT
        if (!file) {
            errors = { image: 'No file selected or file is not a JPEG image.' };
            setErrors(errors);
            return;
        }

        // CHECK IF THE FILE IS A JPEG IMAGE
        if (file.type !== 'image/jpeg') {
            errors = { image: 'File is not a JPEG image.' };
            setErrors(errors);
            return;
        }

        const form = new FormData();
        form.append('image', file); // ADJUSTED THE FIELD NAME TO 'IMAGE' TO MATCH THE API

        try {
            const response = await axios.put(`${apiUrl}/upload-product-img/${id}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${savedToken}`,
                },
            });
            enqueueSnackbar('Image uploaded Successfully!', { preventDuplicate: true, variant: 'success', autoHideDuration: 500 });
            fetchProductsData()
        } catch (error) {
            enqueueSnackbar('Error uploading Image', { preventDuplicate: true, variant: 'error', autoHideDuration: 500 });
            console.error('Error uploading file:', error);
            errors = { image: error.response?.data?.message || 'An error occurred during upload.' };
            setErrors(errors); // SET THE ERROR STATE
        }
    };

    // FUNCTION TO VALIDATE FORM DATA
    const validateForm = () => {
        let formErrors = {};

        // VALIDATE FORM FIELDS
        Object.keys(formInputs).forEach((section) => {
            formInputs[section].forEach((input) => {
                const { name, require, type } = input;
                const value = formData[name] || '';
                const category = formData['category']; // Get the category field value

                // REQUIRED FIELD VALIDATION
                if (require && !value) {
                    // Skip validation for `in_stock`, `value`, and `total_stock` if category is NOT 'product'
                    if (['in_stock', 'total_stock'].includes(name) && category !== 'product') {
                        return;
                    }
                    formErrors[name] = `${input.label} is required`;
                }

                // NUMBER VALIDATION (TWO DECIMAL PLACES)
                if (['number'].includes(type) && value) {
                    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                        formErrors[name] = `${input.label} must be a valid number`;
                    }
                }

                // DATE VALIDATION
                if (['Date'].includes(input.inputType) && value) {
                    const date = new Date(value);
                    if (isNaN(date.getTime())) {
                        formErrors[name] = `${input.label} must be a valid date`;
                    }
                }

                // CHECKING THAT 'VALID_UNTIL' IS AFTER 'VALID_FROM'
                if (name === 'valid_until' && formData['valid_from'] && new Date(value) <= new Date(formData['valid_from'])) {
                    formErrors[name] = 'Valid Until must be after Valid From';
                }
            });
        });

        // CHECKING IN_STOCK IS LESS THAN OR EQUAL TO TOTAL_STOCK
        const category = formData['category']; // Re-check category here for clarity
        if (category === 'product') {
            const inStock = parseFloat(formData['in_stock']) || 0;  // DEFAULT TO 0 IF NOT SET
            const totalStock = parseFloat(formData['total_stock']) || 0;  // DEFAULT TO 0 IF NOT SET

            if (inStock > totalStock) {
                formErrors['in_stock'] = 'In Stock value must be less than or equal to Total Stock';
            }
        }

        // SET THE ERRORS AND RETURN WHETHER THE FORM IS VALID
        setErrors(formErrors);
        console.log('form error', formErrors)
        return Object.keys(formErrors).length === 0;
    };

    // FUNCTION TO HANDLE SUBMIT RECORD
    const OnSave = async (e) => {
        e.preventDefault();
        setTrySubmit(true);

        // VALIDATE THE FORM BEFORE PROCEEDING
        const isFormValid = validateForm();
        if (!isFormValid) {
            console.error('Form is not valid, aborting submission');
            return; // ABORT SUBMISSION IF THE FORM IS NOT VALID
        }

        // CREATE A COPY OF FORMDATA WITHOUT THE 'IMAGE' KEY
        const { image, ...dataToSend } = formData; // DESTRUCTURE TO EXCLUDE 'IMAGE'

        // PROCEED WITH THE API CALL IF VALIDATION PASSES
        const url = `${apiUrl}/update-product/${id}`;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${savedToken}`,
            },
            body: JSON.stringify(dataToSend) // USE THE MODIFIED DATA
        };

        try {
            const response = await fetch(url, options);

            if (response.ok) {
                enqueueSnackbar('Product Updated Successfully!', { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });
                setTimeout(() => {
                    navigate('/Items');
                }, 1000);
            } else {
                enqueueSnackbar('Error Updating Product', { preventDuplicate: true, variant: 'error', autoHideDuration: 1000 });
                console.error("Error Updating Product", response.statusText);

            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <MainContainer>
            <Header />
            <ContentContainer>
                <SideNav />
                <BodyDiv>
                    {loading ? (
                        <CreateDiv style={{alignItems:'center'}}>
                            <Loader />
                        </CreateDiv>) : 
                        (<CreateDiv>
                            <TitleDiv>
                                <Title>Item Details</Title>
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

                            <DetailsForm onSubmit={(e) => OnSave(e)}>
                                <ImgDiv>
                                    <ImgLabel htmlFor='Profile' style={{ border: trySubmit && errors['image'] ? '2px solid red' : '' }}>
                                        {profilePictureObj && !formData.image ? (
                                            <ImgTag src={URL.createObjectURL(profilePictureObj)} alt='profilePic' />
                                        ) : formData.image ? (
                                            <ImgTag
                                                src={`data:image/jpeg;base64,${formData.image || ''}`} // BASE64 IMAGE WITH FALLBACK FOR EMPTY VALUES
                                                alt='profilePic' />
                                        ) : (
                                            <Imgicon>
                                                <TiImage />
                                            </Imgicon>
                                        )}

                                        {errors['image'] && (
                                            <ErrorText style={{ bottom: '-1rem' }}>{errors['image']}</ErrorText>
                                        )}
                                    </ImgLabel>

                                    <ImgInput
                                        id='Profile'
                                        type="file"
                                        accept='.jpg, .jpeg'
                                        onChange={(e) => handleFileChange(e)}
                                    />
                                </ImgDiv>

                                {Object.entries(formInputs).map(([category, fields], index) => (
                                    <FieldSet key={index}>
                                        <Legend>{category}</Legend>
                                        <CustomDiv>
                                            {fields.map((field, idx) => {
                                                // Default field rendering based on inputType
                                                if (field.inputType === 'textarea') {
                                                    return (
                                                        <InputsContainer key={idx} style={{ width: '100%' }}>
                                                            <TextAreaTag
                                                                onChange={(e) => OnChangeInputValue(e.target.value, field.name)}
                                                                value={formData[field.name]}
                                                            />
                                                            <Label2>{field.label}</Label2>
                                                            {errors[field.name] && (
                                                                <ErrorText>{errors[field.name]}</ErrorText>
                                                            )}
                                                        </InputsContainer>
                                                    );
                                                } else if (field.inputType === 'dropdown') {
                                                    return (
                                                        <InputsContainer key={idx}>
                                                            <ReactSelect
                                                                isSearchable
                                                                placeholder={field.placeholder}
                                                                options={field.options.map(option => ({
                                                                    label: option,
                                                                    value: option.toLowerCase(),
                                                                }))}
                                                                onChange={(e) => OnChangeInputValue(e.value, field.name)}
                                                                value={field.options
                                                                    .map(option => ({
                                                                        label: option,
                                                                        value: option.toLowerCase(),
                                                                    }))
                                                                    .find(option => option.value === formData[field.name]) || null}
                                                                styles={{
                                                                    ...CustomStyles,
                                                                    ...Customstyles2
                                                                }}
                                                            />
                                                            <Label2>{field.label}</Label2>
                                                            {errors[field.name] && (
                                                                <ErrorText>{errors[field.name]}</ErrorText>
                                                            )}
                                                        </InputsContainer>
                                                    );
                                                } else if (field.inputType === 'Date') {
                                                    return (
                                                        <InputsContainer key={idx} style={{ width: '25%', alignItems: 'flex-start' }}>
                                                            <ImgDiv style={{ background: 'transparent', padding: '0 0rem', justifyContent: 'space-between', width: '100%' }}>
                                                                <Label style={{ marginLeft: '0', fontWeight: '550' }}>{field.label}</Label>
                                                                <DateInputTag
                                                                    type={field.type}
                                                                    onChange={(e) => OnChangeInputValue(e.target.value, field.name)}
                                                                    value={formData[field.name]}
                                                                />
                                                            </ImgDiv>
                                                            {errors[field.name] && (
                                                                <ErrorText>{errors[field.name]}</ErrorText>
                                                            )}
                                                        </InputsContainer>
                                                    );
                                                } else {
                                                    // Handle default case with conditional checks
                                                    if (
                                                        formData.category !== 'product' &&
                                                        ['in_stock', 'total_stock'].includes(field.name)
                                                    ) {
                                                        return null; // Skip rendering for these fields
                                                    }
                                                    return (
                                                        <InputsContainer key={idx}>
                                                            <InputTag
                                                                type={field.type}
                                                                readOnly={field.ReadOnly}
                                                                onChange={(e) => OnChangeInputValue(e.target.value, field.name)}
                                                                value={formData[field.name] || ''}
                                                            />
                                                            <Label2>{field.label}</Label2>
                                                            {errors[field.name] && (
                                                                <ErrorText>{errors[field.name]}</ErrorText>
                                                            )}
                                                        </InputsContainer>
                                                    );
                                                }
                                            })}
                                        </CustomDiv>
                                    </FieldSet>
                                ))}
                                <SaveBtn type='submit'>Save</SaveBtn>
                            </DetailsForm>
                        </CreateDiv>)
                    }

                </BodyDiv>
                <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
            </ContentContainer>
        </MainContainer>
    )
}

export default ProductDetailView