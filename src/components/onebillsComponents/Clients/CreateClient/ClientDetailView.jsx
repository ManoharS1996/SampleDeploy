// LIBRARY IMPORTS
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import countryRegionData from "country-region-data/dist/data-umd";

// STYLE IMPORTS
import {
    MainContainer,
    ContentContainer,
    BodyDiv,
    CreateDiv,
    TitleDiv,
    Title,
    CloseBtn,
    DetailsForm,
    Legend,
    InputTag,
    FieldSet,
    InputsContainer,
    CustomDiv,
    Label,
    SameAsBillingDiv,
    SaveBtn,
    TextAreaTag,
    ImgInput,
    ImgLabel,
    Imgicon,
    ImgDiv,
    DateInputTag,
    ImgTag,
    Label2,
    Label3,
    ErrorText,
    StatusDIv,
    PhoneNumInput,
} from "./StyledComponents";

import {
    ReactSelect,
    CustomStyles,
    Customstyles2,
} from "../../DefaultData/StyledComponents";

// COMPONENT IMPORTS
import SideNav from "../../SideNav/SideNav";
import Header from "../../Header/Header";
import WonBillsContext from "../../../../context/WonBillsContext";
import ImageUpload from "./UploadPicture";
import { savedToken } from "../../DefaultData/DefaultData";
import { Loader } from "../../DefaultData/StyledComponents";

// ICON IMPORTS
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ClientDetailView = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const PathText = location.pathname.split("/");
    const { setPathText, setActiveTab } = useContext(WonBillsContext);
    const apiUrl = import.meta.env.VITE_API_URL;

    const [formInputs, setFormInputs] = useState({
        "Client Details": [
            {
                name: "client_id",
                label: "ID *",
                inputType: "input",
                type: "text",
                placeholder: "Client Number",
                required: true,
                ReadOnly: true,
            },
            {
                name: "client_name",
                label: "Client Name *",
                inputType: "input",
                type: "text",
                placeholder: "Client Name",
                required: true,
                ReadOnly: false,
            },
            {
                name: "trading_name",
                label: "Trading Name *",
                inputType: "input",
                type: "text",
                placeholder: "Trading Name",
                required: true,
                ReadOnly: false,
            },
            {
                name: "registration_number",
                label: "Company Registration Number *",
                inputType: "input",
                type: "text",
                placeholder: "Registration Number",
                required: true,
                ReadOnly: false,
            },
            {
                name: "work_number",
                label: "Primary Contact *",
                inputType: "phone",
                type: "text",
                placeholder: "Primary Contact",
                maxLength: 10,
                required: true,
                ReadOnly: false,
            },
            {
                name: "mobile_number",
                label: "Secondary Contact *",
                inputType: "phone",
                type: "text",
                placeholder: "Secondary Contact",
                maxLength: 10,
                required: true,
                ReadOnly: false,
            },
            {
                name: "email",
                label: "Email*",
                inputType: "input",
                type: "email",
                placeholder: "Email",
                required: true,
                ReadOnly: false,
            },
            {
                name: "gst_reference",
                label: "GST Number",
                inputType: "input",
                type: "text",
                placeholder: "GST Reference",
                required: true,
                ReadOnly: false,
            },
            {
                name: "date_of_birth",
                label: "Date Of Birth*",
                inputType: "date",
                type: "date",
                placeholder: "DOB",
                required: true,
                ReadOnly: false,
            },
            {
                name: "notes",
                label: "Notes",
                inputType: "textarea",
                type: "textarea",
                placeholder: "Notes",
                required: false,
                ReadOnly: false,
            },
        ],
        "Office Address": [
            {
                name: "flat_no",
                label: "Flat No *",
                inputType: "input",
                type: "text",
                placeholder: "House/Flat No",
                required: true,
            },
            {
                name: "street_name",
                label: "Street Name *",
                inputType: "input",
                type: "text",
                placeholder: "Street Name",
                required: true,
            },
            {
                name: "country",
                label: "Country *",
                inputType: "Countrydropdown",
                type: "text",
                placeholder: "Country",
                required: true,
            },
            {
                name: "province",
                label: "Province *",
                inputType: "Statedropdown",
                type: "text",
                placeholder: "Province",
                required: true,
            },
            {
                name: "city",
                label: "City *",
                inputType: "input",
                type: "text",
                placeholder: "City",
                required: true,
            },
            {
                name: "zip_code",
                label: "Zip Code *",
                inputType: "input",
                type: "text",
                placeholder: "Post/Zipcode",
                maxLength: 6,
                required: true,
            },
            {
                name: "phone_number",
                label: "Phone Number *",
                inputType: "phone",
                type: "text",
                placeholder: "Phone Number",
                maxLength: 10,
            },
        ],
        "Billing Address": [
            {
                name: "flat_no",
                label: "Flat No *",
                inputType: "input",
                type: "text",
                placeholder: "House/Flat No",
                required: true,
            },
            {
                name: "street_name",
                label: "Street Name *",
                inputType: "input",
                type: "text",
                placeholder: "Street Name",
                required: true,
            },
            {
                name: "country",
                label: "Country *",
                inputType: "Countrydropdown",
                type: "text",
                placeholder: "Country",
                required: true,
            },
            {
                name: "province",
                label: "Province *",
                inputType: "Statedropdown",
                type: "text",
                placeholder: "Province",
                required: true,
            },
            {
                name: "city",
                label: "City *",
                inputType: "input",
                type: "text",
                placeholder: "City",
                required: true,
            },
            {
                name: "zip_code",
                label: "Zip Code *",
                inputType: "input",
                type: "text",
                placeholder: "Post/Zipcode",
                maxLength: 6,
                required: true,
            },
            {
                name: "phone_number",
                label: "Phone Number *",
                inputType: "phone",
                type: "text",
                placeholder: "Phone Number",
                maxLength: 10,
            },
        ],
    });

    const [formData, setFormData] = useState({
        "Client Details": {},
        "Office Address": {},
        "Billing Address": {},
        profile_picture: "",
        status: "active",
        same_as_address: false,
    });
    const [errors, setErrors] = useState({});
    const [trySubmit, setTrySubmit] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPathText("");
        setActiveTab(PathText[1]);
        fetchClientData();
    }, []);

    const fetchClientData = async () => {
        setLoading(true);
        try {
            const url = `${apiUrl}/client/${id}`;
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${savedToken}`,
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
        } finally {
            setLoading(false);
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

        // PARSE JSON STRINGS
        const officeAddress = parseJson(data.office_address) || {};
        const billingAddress = parseJson(data.billing_address) || {};
        const imageDetails = parseJson(data.profile_picture) || {};
        const primaryContact = parseJson(data.work_number) || {};
        const secondaryContact = parseJson(data.mobile_number) || {};

        // FUNCTION TO FORMAT ISO DATE STRING TO YYYY-MM-DD
        const formatDate = (isoDateString) => {
            const date = new Date(isoDateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };
        setSelectedCountry(officeAddress.country);
        console.log(secondaryContact.countryCode, "this is secondary n7umber");
        const SameAsAdd = data.same_as_address === "true" ? true : false;

        return {
            "Client Details": {
                client_id: data.client_id || "",
                client_name: data.client_name || "",
                trading_name: data.trading_name || "",
                registration_number: data.registration_number || "",
                work_number: primaryContact || "",
                mobile_number: secondaryContact || "",
                email: data.email || "",
                gst_reference: data.gst_reference || "",
                date_of_birth: formatDate(data.date_of_birth) || "",
                notes: data.notes || "",
            },
            "Office Address": {
                flat_no: officeAddress.flat_no || "",
                street_name: officeAddress.street_name || "",
                city: officeAddress.city || "",
                zip_code: officeAddress.zip_code || "",
                country: officeAddress.country || "",
                province: officeAddress.province || "",
                phone_number: officeAddress.phone_number || "",
            },
            "Billing Address": {
                flat_no: billingAddress.flat_no || "",
                street_name: billingAddress.street_name || "",
                city: billingAddress.city || "",
                zip_code: billingAddress.zip_code || "",
                country: billingAddress.country || "",
                province: billingAddress.province || "",
                phone_number: billingAddress.phone_number || "",
            },
            profile_picture: imageDetails.image || "",
            status: data.status,
            same_as_address: SameAsAdd,
        };
    };

    const OnBack = () => {
        navigate("/Clients");
    };

    // FIND THE REGIONS FOR THE SELECTED COUNTRY
    const regionOptions =
        selectedCountry &&
        countryRegionData
            .find((country) => country.countryName === selectedCountry)
            ?.regions.map((region) => ({
                label: region.name,
                value: region.shortCode,
            }));

    const handleCountryChange = (value, key, category) => {
        setSelectedCountry(value);
        OnChangeInputValue(value, key, category);
    };

    const handleRegionChange = (value, key, category) => {
        OnChangeInputValue(value, key, category);
    };

    const OnChangeInputValue = (value, key, category) => {
        if (category === "Office Address" && formData.same_as_address) {
            setFormData((prev) => ({
                ...prev,
                [category]: { ...prev[category], [key]: value },
                ["Billing Address"]: { ...prev[category], [key]: value },
            }));
        } else if (category) {
            setFormData((prev) => ({
                ...prev,
                [category]: { ...prev[category], [key]: value },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [key]: value,
            }));
        }
    };

    const handlePhoneNumberChange = (value, country, field, category) => {
        const numberWithoutDialCode = value.startsWith(country.dialCode)
            ? value.slice(country.dialCode.length)
            : value;

        if (category === "Office Address" && formData.same_as_address) {
            setFormData((prev) => ({
                ...prev,
                [category]: {
                    ...prev[category],
                    [field]: {
                        number: numberWithoutDialCode,
                        countryCode: country.countryCode.toLowerCase(),
                        dialCode: country.dialCode,
                    },
                },
                ["Billing Address"]: {
                    ...prev["Billing Address"],
                    [field]: {
                        number: numberWithoutDialCode,
                        countryCode: country.countryCode.toLowerCase(),
                        dialCode: country.dialCode,
                    },
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [category]: {
                    ...prev[category],
                    [field]: {
                        number: numberWithoutDialCode,
                        countryCode: country.countryCode.toLowerCase(),
                        dialCode: country.dialCode,
                    },
                },
            }));
        }
    };

    const ReflectBillingToDelivery = (Office, billing, ischecked) => {
        if (ischecked) {
            setFormData((prev) => ({
                ...prev,
                [billing]: {
                    ...Object.keys(prev[billing]).reduce((Acc, each) => {
                        Acc[each] = prev[Office][each] || "";
                        return Acc;
                    }, {}),
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [billing]: {
                    ...Object.keys(prev[billing]).reduce((Acc, each) => {
                        Acc[each] = "";
                        return Acc;
                    }, {}),
                },
            }));
        }
    };

    const transformFormData = (data) => {
        return Object.entries(data).reduce((acc, [key, object]) => {
            if (key !== "Client Details") {
                // acc[key] = object
                acc[key.toLowerCase().replace(/\s+/g, "_")] = object;
            } else if (key !== "profile_picture") {
                acc = { ...acc, ...object };
            }
            return acc;
        }, {});
    };

    // VALIDATE FORM
    const validateForm = () => {
        let formErrors = {};
        Object.keys(formInputs).forEach((section) => {
            formInputs[section].forEach((input) => {
                const { name, required, maxLength, type } = input;
                const value = formData[section][name] || ""; // ADJUST FOR NESTED STRUCTURE

                if (required && !value) {
                    formErrors[name] = `${input.label} is required`;
                }

                // EMAIL VALIDATION
                if (type === "email" && value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(value)) {
                        formErrors[name] = "Invalid email format";
                    }
                }

                if (["work_number", "mobile_number", "phone_number"].includes(name)) {
                    const phoneObject = formData[section]?.[name];

                    if (
                        phoneObject &&
                        phoneObject.number &&
                        phoneObject.dialCode &&
                        phoneObject.countryCode
                    ) {
                        const { number, dialCode, countryCode } = phoneObject;

                        // Adjust phone validation to handle international numbers
                        const phonePattern = /^[0-9]{7,15}$/; // Allows numbers with lengths between 7 and 15 digits
                        if (!phonePattern.test(number)) {
                            formErrors[
                                name
                            ] = `${input.label} must be between 7 and 15 digits`;
                        }
                    } else {
                        formErrors[name] = `${input.label} is required`;
                    }
                }

                // ZIP CODE VALIDATION
                if (name === "zip_code" && value) {
                    if (!/^\d+$/.test(value) || value.length !== 6) {
                        formErrors[name] = "Zip Code must be a 6-digit number";
                    }
                }
            });
        });

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; // RETURNS TRUE IF THERE ARE NO ERRORS
    };

    const OnSave = async (e) => {
        e.preventDefault();
        setTrySubmit(true); // INDICATE A SUBMISSION ATTEMPT

        // VALIDATE THE FORM BEFORE PROCEEDING
        const isFormValid = validateForm();
        if (!isFormValid) {
            console.log("Form validation failed", errors);
            enqueueSnackbar("Please fix the errors before submitting.", {
                variant: "error",
                autoHideDuration: 3000,
            });
            return; // STOP FURTHER EXECUTION IF THE FORM IS NOT VALID
        }

        const transformedData = transformFormData(formData);
        console.log(transformedData, "submitting data");

        const url = `${apiUrl}/update-client/${id}`;

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${savedToken}`,
            },
            body: JSON.stringify(transformedData),
        };

        try {
            const response = await fetch(url, options);

            if (response.ok) {
                console.log("Client Updated Successfully!");
                enqueueSnackbar("Client Updated Successfully!", {
                    preventDuplicate: true,
                    variant: "success",
                    autoHideDuration: 1000,
                });
                setTimeout(() => {
                    navigate("/Clients");
                }, 1000);
            } else {
                console.error("Error Updating Client", response.statusText);
                enqueueSnackbar(`Error Updating Client: ${response.statusText}`, {
                    variant: "error",
                    autoHideDuration: 3000,
                });
            }
        } catch (error) {
            console.error("Error:", error.message);
            enqueueSnackbar(`Error: ${error.message}`, {
                variant: "error",
                autoHideDuration: 3000,
            });
        }
    };

    return (
        <MainContainer>
            <Header />

            <ContentContainer>
                <SideNav />

                <BodyDiv>
                    {loading ? (
                        <CreateDiv style={{ alignItems: 'center' }}>
                            <Loader />
                        </CreateDiv>
                    ) : (
                        <CreateDiv>
                            <TitleDiv>
                                <Title>Create Client</Title>

                                <CloseBtn type="button" onClick={OnBack}>
                                    <IoArrowBackCircleOutline />
                                </CloseBtn>

                                <StatusDIv>
                                    <ReactSelect
                                        isSearchable={false} // DISABLED SEARCH AS BCAZ THERE ARE ONLY TWO OPTIONS
                                        placeholder="Select Status"
                                        options={[
                                            { label: "Active", value: "active" },
                                            { label: "Inactive", value: "inactive" },
                                        ]}
                                        onChange={(selectedOption) =>
                                            OnChangeInputValue(selectedOption?.value, "status")
                                        }
                                        value={{
                                            label:
                                                formData["status"] === "active" ? "Active" : "Inactive",
                                            value: formData["status"],
                                        }}
                                        styles={{
                                            ...CustomStyles,
                                            ...Customstyles2,
                                            option: (provided, state) => ({
                                                ...provided,
                                                borderRadius: "0.7rem",
                                                backgroundColor: state.isSelected
                                                    ? state.data.value === "inactive"
                                                        ? "red"
                                                        : "green" // GREEN BACKGROUND FOR ACTIVE, RED FOR INACTIVE
                                                    : provided.backgroundColor, // KEEP DEFAULT BACKGROUND IF NOT SELECTED

                                                color: state.isSelected
                                                    ? "white" // WHITE TEXT FOR BOTH ACTIVE AND INACTIVE WHEN SELECTED
                                                    : state.data.value === "active"
                                                        ? "green"
                                                        : "red", // TEXT COLOR FOR UNSELECTED OPTIONS (GREEN FOR ACTIVE, RED FOR INACTIVE)
                                            }),
                                            singleValue: (provided, state) => ({
                                                ...provided,
                                                color: state.data.value === "active" ? "green" : "red", // COLOR FOR THE SELECTED OPTION
                                            }),
                                        }}
                                    />
                                </StatusDIv>
                            </TitleDiv>

                            <DetailsForm onSubmit={(e) => OnSave(e)}>
                                {/* HANDLE IMAGE UPLOAD */}
                                <ImageUpload
                                    id={id}
                                    fetchClientData={fetchClientData}
                                    defaultImg={formData.profile_picture}
                                    setParentErrors={setErrors} // TO HANDLE ERRORS IN THE PARENT
                                    view="detail"
                                />
                                {errors["profile_picture"] && (
                                    <div className="error">{errors["profile_picture"]}</div>
                                )}

                                {Object.entries(formInputs).map(([category, fields], index) => (
                                    <FieldSet key={index}>
                                        <Legend>{category}</Legend>
                                        <CustomDiv>
                                            {category === "Billing Address" ? (
                                                <>
                                                    <SameAsBillingDiv>
                                                        <Label>Same as Billing Address</Label>
                                                        <InputTag
                                                            style={{ width: "1rem", height: "1rem" }}
                                                            type="checkbox"
                                                            checked={formData.same_as_address}
                                                            onChange={(e) => {
                                                                OnChangeInputValue(
                                                                    e.target.checked,
                                                                    "same_as_address"
                                                                );
                                                                ReflectBillingToDelivery(
                                                                    "Office Address",
                                                                    "Billing Address",
                                                                    e.target.checked
                                                                );
                                                            }}
                                                        />
                                                    </SameAsBillingDiv>

                                                    {!formData.same_as_address &&
                                                        fields.map((field, idx) => (
                                                            <>
                                                                {field.inputType === "number" ? (
                                                                    <InputsContainer key={idx}>
                                                                        <InputTag
                                                                            type="text"
                                                                            maxLength={field.maxLength}
                                                                            readOnly={field.ReadOnly}
                                                                            onChange={(e) => {
                                                                                const inputValue = e.target.value;
                                                                                const numericValue = inputValue.replace(
                                                                                    /[^0-9]/g,
                                                                                    ""
                                                                                ); // REMOVE NON-NUMERIC CHARACTERS
                                                                                OnChangeInputValue(
                                                                                    numericValue,
                                                                                    field.name,
                                                                                    category
                                                                                );
                                                                            }}
                                                                            value={
                                                                                formData[category][field.name] || ""
                                                                            }
                                                                        />
                                                                        <Label3>{field.label}</Label3>
                                                                        {/* DISPLAY THE ERROR MESSAGE FOR THIS FIELD */}
                                                                        {errors[field.name] && (
                                                                            <ErrorText>
                                                                                {errors[field.name]}
                                                                            </ErrorText>
                                                                        )}
                                                                    </InputsContainer>
                                                                ) : field.inputType === "Countrydropdown" ? (
                                                                    <InputsContainer key={idx}>
                                                                        <ReactSelect
                                                                            isSearchable
                                                                            placeholder="Select Country"
                                                                            options={countryRegionData.map(
                                                                                (country) => ({
                                                                                    label: country.countryName,
                                                                                    value: country.countryName,
                                                                                })
                                                                            )}
                                                                            onChange={(selectedOption) =>
                                                                                handleCountryChange(
                                                                                    selectedOption?.label,
                                                                                    field.name,
                                                                                    category
                                                                                )
                                                                            }
                                                                            value={
                                                                                countryRegionData
                                                                                    .map((country) => ({
                                                                                        label: country.countryName,
                                                                                        value: country.countryName,
                                                                                    }))
                                                                                    .find(
                                                                                        (option) =>
                                                                                            option.value ===
                                                                                            formData[category][field.name]
                                                                                    ) || null
                                                                            }
                                                                            styles={{
                                                                                ...CustomStyles,
                                                                                ...Customstyles2,
                                                                            }}
                                                                        />
                                                                        <Label3>{field.label}</Label3>
                                                                        {errors[field.name] && (
                                                                            <ErrorText>
                                                                                {errors[field.name]}
                                                                            </ErrorText>
                                                                        )}
                                                                    </InputsContainer>
                                                                ) : field.inputType === "Statedropdown" ? (
                                                                    <InputsContainer key={idx}>
                                                                        <ReactSelect
                                                                            value={
                                                                                regionOptions?.find(
                                                                                    (option) =>
                                                                                        option.label ===
                                                                                        formData[category][field.name]
                                                                                ) || null
                                                                            }
                                                                            onChange={(selectedOption) =>
                                                                                handleRegionChange(
                                                                                    selectedOption?.label,
                                                                                    field.name,
                                                                                    category
                                                                                )
                                                                            }
                                                                            options={regionOptions || []}
                                                                            placeholder="Select Province"
                                                                            isDisabled={!regionOptions?.length}
                                                                            styles={{
                                                                                ...CustomStyles,
                                                                                ...Customstyles2,
                                                                            }}
                                                                        />
                                                                        <Label3>{field.label}</Label3>
                                                                        {errors[field.name] && (
                                                                            <ErrorText>
                                                                                {errors[field.name]}
                                                                            </ErrorText>
                                                                        )}
                                                                    </InputsContainer>
                                                                ) : field.inputType === "phone" ? (
                                                                    <InputsContainer key={idx}>
                                                                        <PhoneNumInput
                                                                            country={
                                                                                formData?.[category]?.[field.name]
                                                                                    ?.countryCode || "in"
                                                                            }
                                                                            enableSearch
                                                                            disableSearchIcon
                                                                            onChange={(value, country) =>
                                                                                handlePhoneNumberChange(
                                                                                    value,
                                                                                    country,
                                                                                    field.name,
                                                                                    category
                                                                                )
                                                                            }
                                                                            value={formData?.[category]?.[field.name]
                                                                                ?.dialCode || ""
                                                                                + formData?.[category]?.[field.name]
                                                                                    ?.number || ""
                                                                            }
                                                                            inputStyle={{
                                                                                width: "100%",
                                                                                borderRadius: "1rem",
                                                                                fontSize: "16px",
                                                                                border: "none",
                                                                            }}
                                                                            containerStyle={{
                                                                                width: "100%",
                                                                            }}
                                                                            buttonClass="custom-dropdown-button"
                                                                            dropdownStyle={{
                                                                                height: "8rem",
                                                                                borderRadius: "0.8rem",
                                                                                overflow: "auto",
                                                                            }}
                                                                        />
                                                                        <Label3>{field.label}</Label3>
                                                                        {errors[field.name] && (
                                                                            <ErrorText>
                                                                                {errors[field.name]}
                                                                            </ErrorText>
                                                                        )}
                                                                    </InputsContainer>
                                                                ) : (
                                                                    <InputsContainer key={idx}>
                                                                        <InputTag
                                                                            type={field.type}
                                                                            // required
                                                                            readOnly={field.ReadOnly}
                                                                            onChange={(e) =>
                                                                                OnChangeInputValue(
                                                                                    e.target.value,
                                                                                    field.name,
                                                                                    category
                                                                                )
                                                                            }
                                                                            value={formData[category][field.name]}
                                                                        />
                                                                        <Label3>{field.label}</Label3>
                                                                        {/* DISPLAY THE ERROR MESSAGE FOR THIS FIELD */}
                                                                        {errors[field.name] && (
                                                                            <ErrorText>
                                                                                {errors[field.name]}
                                                                            </ErrorText>
                                                                        )}
                                                                    </InputsContainer>
                                                                )}
                                                            </>
                                                        ))}
                                                </>
                                            ) : (
                                                fields.map((field, idx) => (
                                                    <>
                                                        {field.type === "textarea" ? (
                                                            <InputsContainer>
                                                                <TextAreaTag
                                                                    onChange={(e) =>
                                                                        OnChangeInputValue(
                                                                            e.target.value,
                                                                            field.name,
                                                                            category
                                                                        )
                                                                    }
                                                                    value={formData[category][field.name]}
                                                                />
                                                                <Label3>{field.label}</Label3>
                                                                {/* DISPLAY THE ERROR MESSAGE FOR THIS FIELD */}
                                                                {errors[field.name] && (
                                                                    <ErrorText>{errors[field.name]}</ErrorText>
                                                                )}
                                                            </InputsContainer>
                                                        ) : field.inputType === "date" ? (
                                                            <InputsContainer key={idx}>
                                                                <ImgDiv
                                                                    style={{
                                                                        background: "transparent",
                                                                        padding: "0.1rem",
                                                                        justifyContent: "space-between",
                                                                    }}
                                                                >
                                                                    <Label
                                                                        style={{
                                                                            marginLeft: "0",
                                                                            fontWeight: "550",
                                                                        }}
                                                                    >
                                                                        {field.label}
                                                                    </Label>
                                                                    <DateInputTag
                                                                        type={field.type}
                                                                        placeholder={field.placeholder}
                                                                        onChange={(e) =>
                                                                            OnChangeInputValue(
                                                                                e.target.value,
                                                                                field.name,
                                                                                category
                                                                            )
                                                                        }
                                                                        value={
                                                                            formData[category][field.name] ||
                                                                            new Date().toISOString().split("T")[0]
                                                                        }
                                                                    />
                                                                </ImgDiv>
                                                            </InputsContainer>
                                                        ) : field.inputType === "number" ? (
                                                            <InputsContainer key={idx}>
                                                                <InputTag
                                                                    type="text"
                                                                    maxLength={field.maxLength}
                                                                    // required
                                                                    readOnly={field.ReadOnly}
                                                                    onChange={(e) => {
                                                                        const inputValue = e.target.value;
                                                                        const numericValue = inputValue.replace(
                                                                            /[^0-9]/g,
                                                                            ""
                                                                        ); // REMOVE NON-NUMERIC CHARACTERS
                                                                        OnChangeInputValue(
                                                                            numericValue,
                                                                            field.name,
                                                                            category
                                                                        );
                                                                    }}
                                                                    value={formData[category][field.name] || ""}
                                                                />
                                                                <Label3>{field.label}</Label3>
                                                                {/* DISPLAY THE ERROR MESSAGE FOR THIS FIELD */}
                                                                {errors[field.name] && (
                                                                    <ErrorText>{errors[field.name]}</ErrorText>
                                                                )}
                                                            </InputsContainer>
                                                        ) : field.inputType === "Countrydropdown" ? (
                                                            <InputsContainer key={idx}>
                                                                <ReactSelect
                                                                    isSearchable
                                                                    placeholder="Select Country"
                                                                    options={countryRegionData.map((country) => ({
                                                                        label: country.countryName,
                                                                        value: country.countryName,
                                                                    }))}
                                                                    onChange={(selectedOption) =>
                                                                        handleCountryChange(
                                                                            selectedOption?.label,
                                                                            field.name,
                                                                            category
                                                                        )
                                                                    }
                                                                    value={
                                                                        countryRegionData
                                                                            .map((country) => ({
                                                                                label: country.countryName,
                                                                                value: country.countryName,
                                                                            }))
                                                                            .find(
                                                                                (option) =>
                                                                                    option.value ===
                                                                                    formData[category][field.name]
                                                                            ) || null
                                                                    }
                                                                    styles={{
                                                                        ...CustomStyles,
                                                                        ...Customstyles2,
                                                                    }}
                                                                />
                                                                <Label3>{field.label}</Label3>
                                                                {errors[field.name] && (
                                                                    <ErrorText>{errors[field.name]}</ErrorText>
                                                                )}
                                                            </InputsContainer>
                                                        ) : field.inputType === "Statedropdown" ? (
                                                            <InputsContainer key={idx}>
                                                                <ReactSelect
                                                                    value={
                                                                        regionOptions?.find(
                                                                            (option) =>
                                                                                option.label ===
                                                                                formData[category][field.name]
                                                                        ) || null
                                                                    }
                                                                    onChange={(selectedOption) =>
                                                                        handleRegionChange(
                                                                            selectedOption?.label,
                                                                            field.name,
                                                                            category
                                                                        )
                                                                    }
                                                                    options={regionOptions || []}
                                                                    placeholder="Select Province"
                                                                    isDisabled={!regionOptions?.length}
                                                                    styles={{
                                                                        ...CustomStyles,
                                                                        ...Customstyles2,
                                                                    }}
                                                                />
                                                                <Label3>{field.label}</Label3>
                                                                {errors[field.name] && (
                                                                    <ErrorText>{errors[field.name]}</ErrorText>
                                                                )}
                                                            </InputsContainer>
                                                        ) : field.inputType === "phone" ? (
                                                            <InputsContainer key={idx}>
                                                                <PhoneNumInput
                                                                    country={
                                                                        formData?.[category]?.[field.name]
                                                                            ?.countryCode
                                                                    }
                                                                    enableSearch
                                                                    disableSearchIcon
                                                                    onChange={(value, country) =>
                                                                        handlePhoneNumberChange(
                                                                            value,
                                                                            country,
                                                                            field.name,
                                                                            category
                                                                        )
                                                                    }
                                                                    value={`${formData?.[category]?.[field.name]
                                                                        ?.dialCode || ""
                                                                        }${formData?.[category]?.[field.name]
                                                                            ?.number || ""
                                                                        }`}
                                                                    inputStyle={{
                                                                        width: "100%",
                                                                        borderRadius: "1rem",
                                                                        fontSize: "16px",
                                                                        border: "none",
                                                                    }}
                                                                    containerStyle={{
                                                                        width: "100%",
                                                                    }}
                                                                    buttonClass="custom-dropdown-button"
                                                                    dropdownStyle={{
                                                                        height: "8rem",
                                                                        borderRadius: "0.8rem",
                                                                        overflow: "auto",
                                                                    }}
                                                                />
                                                                <Label3>{field.label}</Label3>
                                                                {errors[field.name] && (
                                                                    <ErrorText>{errors[field.name]}</ErrorText>
                                                                )}
                                                            </InputsContainer>
                                                        ) : (
                                                            <InputsContainer key={idx}>
                                                                <InputTag
                                                                    type={field.type}
                                                                    readOnly={field.ReadOnly}
                                                                    onChange={(e) => {
                                                                        const value =
                                                                            field.name === "email"
                                                                                ? e.target.value.toLowerCase()
                                                                                : e.target.value;
                                                                        OnChangeInputValue(
                                                                            value,
                                                                            field.name,
                                                                            category
                                                                        );
                                                                    }}
                                                                    value={
                                                                        field.name === "email"
                                                                            ? formData[category][
                                                                                field.name
                                                                            ]?.toLowerCase() || ""
                                                                            : formData[category][field.name] || ""
                                                                    }
                                                                />
                                                                <Label3>{field.label}</Label3>
                                                                {/* DISPLAY THE ERROR MESSAGE FOR THIS FIELD */}
                                                                {errors[field.name] && (
                                                                    <ErrorText>{errors[field.name]}</ErrorText>
                                                                )}
                                                            </InputsContainer>
                                                        )}
                                                    </>
                                                ))
                                            )}
                                        </CustomDiv>
                                    </FieldSet>
                                ))}

                                <SaveBtn type="submit">Save</SaveBtn>
                            </DetailsForm>
                        </CreateDiv>
                    )}
                </BodyDiv>
                {/* CALLING POPUP */}
                <SnackbarProvider
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                />
            </ContentContainer>
        </MainContainer>
    );
};

export default ClientDetailView;
