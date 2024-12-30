//MODULE IMPORTS
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import getTimeZone from "../RetriveTimezone";
import axios from "axios";
import timezoneCurrencyMap from "../../../../utils/formatChartData/CurrencyData";
import "react-phone-input-2/lib/style.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import countryRegionData from "country-region-data/dist/data-umd";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Modal from "react-modal";
import Cookies from "universal-cookie";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

// STYLE IMPORTS
import {
    MainContainer,
    BannerContainer,
    ContentContainer,
    Form,
    Title,
    InnerContainer,
    Btn,
    Span,
    Title2,
    InputsDivs,
    InputsDiv2,
    InputGroup,
    Input,
    Label2,
    PhoneNumInput,
    BackBtn,
    Error,
    ValidateBtn,
    TermsCheckBox,
    TermsLabel,
    CustomBtn,
    EyeBtn,
    LogoImg,
    Img,
    HashTag,
    Logoimg,
    TagLine,
    LogoAndTitleContainer,
} from "./StyledComponents";
import { ReactSelect, CustomStyles, Loader } from "../../DefaultData/StyledComponents";

import {
    ModalMainContainer,
    MainHeading,
    CustomPara,
    Heading2,
    CustomSpan,
    CustomBr,
    CustomOl,
    CustomLi,
    CustomPara2,
    CustomSpan2,
    modalStyles,
    CustomLi2,
    CustomSpan3,
} from "../../MyCompany/StyledComponents";

// COMPONENT IMPORTS
import {
    allSubCategories,
    industryTypes,
    companyTypes,
} from "../../DefaultData/DefaultData";

const CreateAccount = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const savedToken = cookies.get("WonBillsUserToken");
    const apiUrl = import.meta.env.VITE_API_URL;
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isCnfPwdvisible, setisCnfPwdvisible] = useState(false);
    const [IsModalOpen, setModalOpen] = useState(false);
    const [signupState, setSignupState] = useState("Create Account"); //Create Account Business Profile
    const [userDetails, setUserDetails] = useState({
        full_name: "",
        phone: { number: "", countryCode: "", dialCode: "" },
        email: "",
        password: "",
        confirm_password: "",
        company_details: {
            company_name: "",
            company_number: "",
            company_tax_number: "",
            company_type: "",
            company_category: "",
            company_subcategory: "",
            country: "",
            province: "",
            city: "",
            postcode: "",
        },
        profile_picture: "",
        timezone: "",
        agreed_to_terms: false,
    });

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null); // To store selected category
    const [selectedSubCategory, setSelectedSubCategory] = useState(null); // To store selected sub-category
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(0); // 2 min
    const [otpSendCount, setOtpSendCount] = useState(0)
    const [loading, setLoading] = useState(false)

    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isOTPVerified, setOtpVerified] = useState(false);

    // VALIDATION STATES
    const [errors, setErrors] = useState({
        full_name: "",
        phone: "",
        email: "",
        password: "",
        business_name: "",
        business_category: "",
        business_type: "",
        country: "",
        state: "",
        district: "",
        city: "",
        pincode: "",
    });

    useEffect(() => {
        // fetchTimezoneData();
        console.log('this is gettinhg')
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) return; // Stop when time reaches 0
        console.log('heeee')

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1); // Decrease time by 1 second
        }, 1000); // Run every second

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [timeLeft, otpSendCount]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const fetchTimezoneData = async () => {
        try {
            const timezone = await getTimeZone();
            setUserDetails((prev) => ({
                ...prev,
                timezone: timezone,
            }));
        } catch (error) {
            console.error("Error fetching time zone:", error);
        }
    };

    // VALIDATION FUNCTIONS
    const validatePhoneNumber = (phoneNumber) => {
        // ALLOW ONLY DIGITS AND CHECK LENGTH
        const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, "");
        return (
            sanitizedPhoneNumber.length >= 10 && sanitizedPhoneNumber.length <= 15
        );
    };

    const validateEmail = (email) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const validatePassword = (password) => {
        // 1. AT LEAST ONE UPPERCASE LETTER (A-Z)
        // 2. AT LEAST ONE DIGIT (0-9)
        // 3. AT LEAST ONE SPECIAL CHARACTER (!@#$%^&*()_+[]{}|;:',.<>?/ etc.)
        // 4. MINIMUM LENGTH OF 6 CHARACTERS
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        return regex.test(password);
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

    // HANDLE MOBILE NUMBER CHANGE
    const handlePhoneNumberChange = (key, value, country) => {
        const numberWithoutDialCode = value.startsWith(country.dialCode)
            ? value.slice(country.dialCode.length)
            : value;

        setUserDetails((prev) => ({
            ...prev,
            phone: {
                number: numberWithoutDialCode,
                countryCode: country.countryCode.toLowerCase(),
                dialCode: country.dialCode,
            },
        }));

        const format = country.format || "";
        const isValid = validatePhoneNumber(value, format);
        const msg = isValid ? "" : "Invalid phone number format";
        setErrors((prev) => ({
            ...prev,
            phone: numberWithoutDialCode.length === 0 ? "" : msg,
        }));
    };

    // HANDLE COUNTRY CHANGE
    const handleCountryChange = (selectedOption) => {
        console.log(selectedOption);
        setSelectedCountry(selectedOption);
        onChangeBusinessDetails("country", selectedOption);
        setSelectedRegion(null); // RESET THE REGION WHEN A NEW COUNTRY IS SELECTED
    };

    // HANDLE PROVINCE CHANGE
    const handleRegionChange = (selectedOption) => {
        setSelectedRegion(selectedOption);
        onChangeBusinessDetails("province", selectedOption);
    };

    // HANDLE INPUT CHANGE
    const onChangeInput = (key, value, country) => {
        console.log(key, value);

        setUserDetails((prev) => ({
            ...prev,
            [key]: value,
        }));

        validateField(key, value)

    };

    // HANDLE BUSINESS DETAILS CHANGE
    const onChangeBusinessDetails = (key, value) => {
        console.log(key, value);
        setUserDetails((prev) => ({
            ...prev,
            company_details: { ...prev.company_details, [key]: value },
        }));
    };

    // VALIDATE FORM
    const validateField = (key, value) => {
        let error = "";

        switch (key) {
            case "full_name":
                if (!value.trim()) {
                    error = "Full name is required";
                }
                break;

            case "email":
                if (!validateEmail(value)) {
                    error = "Invalid email format";
                }
                break;

            case "password":
                if (!validatePassword(value)) {
                    error =
                        "Password: 6+ chars, 1 uppercase, 1 digit, 1 special char.";
                }
                break;

            case "confirm_password":
                if (value !== userDetails.password) {
                    error = "Passwords must match.";
                }
                break;

            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [key]: error,
        }));
    };

    const Validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!userDetails.full_name) {
            newErrors.full_name = "Full name is required";
            isValid = false;
        }

        if (
            !userDetails.phone.number ||
            !validatePhoneNumber(
                userDetails.phone.dialCode + userDetails.phone.number,
                userDetails.phone.format || ""
            )
        ) {
            newErrors.phone = "Invalid phone number";
            isValid = false;
        }

        if (!validateEmail(userDetails.email)) {
            newErrors.email = "Invalid email format";
            isValid = false;
        }

        if (!isOTPVerified) {
            newErrors.email = "Email is not verified";
            isValid = false;
        }

        if (!validatePassword(userDetails.password)) {
            newErrors.password =
                "Password: 6+ chars, 1 uppercase, 1 digit, 1 special char.";
            isValid = false;
        }

        if (!validatePassword(userDetails.confirm_password)) {
            newErrors.confirm_password = "Password must match.";
            isValid = false;
        }

        // ADD ADDITIONAL VALIDATION CHECKS AS NEEDED FOE BUSINESS DETAILS
        if (isValid) {
            setSignupState("Business Profile");
        }
        setErrors(newErrors); // ERRORS ARE UPDATED ONLY AFTER ALL CHECKS
        return isValid;

    };


    // VALIDATE BUSINESS DETAILS
    const validateBusinessDetails = () => {
        const newErrors = {};

        if (userDetails.agreed_to_terms !== true) {
            newErrors.agreed_to_terms = "Accept Terms and Conditions to Proceed";
        }

        if (!userDetails.company_details.company_name) {
            newErrors.company_name = "Business name is required";
        }

        if (!userDetails.company_details.company_number) {
            newErrors.company_number = "Business Reg No is required";
        }

        if (!userDetails.company_details.company_tax_number) {
            newErrors.company_tax_number = "Business Reg tax No is required";
        }

        if (!userDetails.company_details.company_type) {
            newErrors.company_type = "Company Type is required";
        }

        if (!userDetails.company_details.company_category) {
            newErrors.company_category = "Company Category is required";
        }

        if (!userDetails.company_details.company_subcategory) {
            newErrors.company_subcategory = "Company Sub-Category is required";
        }

        if (!userDetails.company_details.country) {
            newErrors.country = "Country is required";
        }

        if (!userDetails.company_details.province) {
            newErrors.province = "Province is required";
        }

        if (!userDetails.company_details.city) {
            newErrors.city = "City is required";
        }

        if (
            !userDetails.company_details.postcode ||
            !/^\d+$/.test(userDetails.company_details.postcode)
        ) {
            newErrors.postcode = "Invalid pincode";
        }

        console.log(newErrors);

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // HANDLE SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        // FIRST, VALIDATE BUSINESS DETAILS
        if (!validateBusinessDetails()) {
            console.log("Business details validation failed");
            return;
        }

        // CHECK IF TIMEZONE IS EMPTY
        // if (userDetails.timezone === "") {
        //     enqueueSnackbar("Please Allow Access for Location to Continue.", {
        //         variant: "warning",
        //     });
        //     return;
        // }

        // Set the currency based on timezone or default to 'INR'
        const currencyPreference =
            timezoneCurrencyMap[userDetails.timezone] || "INR";

        // CREATE A JSON OBJECT TO HOLD THE FORM DATA
        const formData = {
            full_name: userDetails.full_name || "",
            email: userDetails.email || "",
            password: userDetails.password || "",
            phone: JSON.stringify(userDetails.phone) || "",
            company_details: JSON.stringify(userDetails.company_details) || "",
            currency_preference: currencyPreference || "INR",
            timezone: userDetails.timezone || "",
            agreed_to_terms: userDetails.agreed_to_terms || "",
        };

        // PROCEED WITH FORM SUBMISSION IF ALL VALIDATIONS PASS
        const url = `${apiUrl}/register-user`;

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Sending JSON data
                Authorization: `Bearer ${savedToken}`, // Bearer token for authentication
            },
            body: JSON.stringify(formData), // Convert formData object to JSON string
        };

        try {
            const response = await fetch(url, options);

            if (response.ok) {
                enqueueSnackbar("Account Created Successfully!", {
                    preventDuplicate: true,
                    variant: "success",
                    autoHideDuration: 1000,
                });
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                console.error("Error Creating Account", response.statusText);
                enqueueSnackbar(`Error Creating Account: ${response.statusText}`, {
                    variant: "error",
                });
            }
        } catch (error) {
            console.error("Error:", error.message);
            enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
        }
    };

    // FUNCTION TO SEND OTP
    const SendOTP = async () => {
        const email = userDetails.email;
        const newErrors = {};
        let isValid = true;

        if (!email) {
            newErrors.email = "Email Required!";
            isValid = false;
            setErrors(newErrors); // SET ERRORS IF THE EMAIL IS INVALID
            return isValid;
        }

        // VALIDATE EMAIL FORMAT
        if (!validateEmail(email)) {
            newErrors.email = "Invalid email format";
            isValid = false;
            setErrors(newErrors); // SET ERRORS IF THE EMAIL IS INVALID
            return isValid; // EXIT EARLY IF EMAIL IS INVALID
        }
        setLoading(true)

        try {
            const response = await axios.post(`${apiUrl}/send-otp`, { email });

            // SUCCESS: OTP SENT SUCCESSFULLY
            enqueueSnackbar("OTP Sent Successfully!", {
                preventDuplicate: true,
                variant: "success",
                autoHideDuration: 1000,
            });
            setIsOtpSent(true); // ENABLE OTP INPUT FIELD
            setOtpSendCount(prev => {
                prev + 1
            })
            setTimeLeft(120)
            setErrors({}); // CLEAR ANY PREVIOUS ERRORS SINCE OTP IS SENT SUCCESSFULLY
        } catch (error) {
            console.error(error);
            if (
                error.response &&
                error.response.data.message === "User exists with this email already."
            ) {
                newErrors.email = "User exists with this email already.";
            } else {
                newErrors.email = "Error sending OTP, please try again.";
            }

            setErrors(newErrors); // SET ERRORS IN CASE OF FAILURE
            enqueueSnackbar(newErrors.email, { variant: "warning" });
        } finally {
            setLoading(false)
        }

        return isValid;
    };

    // VERIFY OTP WITH BACKEND
    const verifyOtp = async () => {
        const email = userDetails.email;

        try {
            const response = await axios.post(`${apiUrl}/verify-otp`, { email, otp });
            setOtpVerified(true); // MARK OTP AS VERIFIED
            enqueueSnackbar(`${response.data.message}`, {
                preventDuplicate: true,
                variant: "success",
                autoHideDuration: 1000,
            });
            setErrors({}); // CLEAR PREVIOUS OTP-RELATED ERRORS ONCE VERIFIED
        } catch (error) {
            enqueueSnackbar("Error verifying OTP, please try again.", {
                variant: "warning",
            });
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const OpenTermsModal = () => {
        return (
            <Modal
                isOpen={IsModalOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                ariaHideApp={false}
                style={{
                    overlay: { zIndex: 1000 },
                    content: modalStyles,
                }}
            >
                <ModalMainContainer>
                    <MainHeading> NOWIT SERVICES - Privacy Policy</MainHeading>

                    <CustomPara>
                        Nowit Services is committed to safeguarding user privacy on the{" "}
                        <span>WONPlus Bills</span> web app. This policy outlines how we
                        handle data collection, usage, and security.
                    </CustomPara>

                    <Heading2>
                        <CustomSpan>App Name:</CustomSpan> WONPlus Bills (Web App)
                    </Heading2>
                    <Heading2>
                        <CustomSpan>Developer:</CustomSpan> NOWIT SERVICES Pvt Ltd
                    </Heading2>
                    <Heading2>
                        <CustomSpan>Document:</CustomSpan> Terms & conditions, Privacy
                        policy, Refund Policy
                    </Heading2>

                    <CustomBr />

                    <CustomOl>
                        <CustomLi>
                            <CustomPara2>General Terms</CustomPara2>
                            <CustomSpan2>
                                This Privacy Policy forms part of the Terms of Service for this
                                web app. By accessing or using this service, you accept these
                                terms. If you do not agree, please refrain from using the app.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Modification of Terms</CustomPara2>
                            <CustomSpan2>
                                Our Terms may change over time. Continued use of the web app
                                after updates indicates acceptance of any changes. Please review
                                our Terms and Privacy Policy periodically.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Services Provided</CustomPara2>
                            <CustomSpan2>
                                This web app provides online billing, invoicing, and basic
                                accounting tools for small and medium businesses. Accessible
                                through web browsers, it allows for secure cloud-based storage
                                of billing records. Users are responsible for compliance with
                                any relevant legal and regulatory requirements.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Charges</CustomPara2>
                            <ul>
                                <CustomLi2>
                                    <CustomSpan3>Transaction Fees:</CustomSpan3>A charge of 1%
                                    will be applicable per transaction processed through the web
                                    app. This fee applies to all transactions made via the app
                                    unless otherwise stated.
                                </CustomLi2>

                                <CustomLi2>
                                    <CustomSpan3>Payment Method:</CustomSpan3> The charge will be
                                    deducted automatically from the transaction amount at the time
                                    of payment processing. The exact charges applicable to your
                                    transaction will be clearly displayed before completing the
                                    transaction.
                                </CustomLi2>

                                <CustomLi2>
                                    <CustomSpan3>Future Changes:</CustomSpan3> We reserve the
                                    right to modify or update the transaction charges at any time.
                                    Users will be notified of any changes prior to their next
                                    transaction.
                                </CustomLi2>
                            </ul>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Data Collection and Permissions</CustomPara2>
                            <CustomSpan2>
                                Initially a free web app, the service collects minimal data to
                                improve the user experience, including:
                            </CustomSpan2>

                            <ul>
                                <CustomLi2>
                                    <CustomSpan3>Contact Information:</CustomSpan3> For invoicing,
                                    client records, and account management.
                                </CustomLi2>

                                <CustomLi2>
                                    <CustomSpan3>Usage Data:</CustomSpan3> Includes session times,
                                    IP addresses, and device/browser details for analytics and
                                    security.
                                </CustomLi2>

                                <CustomLi2>
                                    <CustomSpan3>Uploaded Documents:</CustomSpan3> Any bills or
                                    invoices you upload are stored securely to enable easy access
                                    across devices.
                                </CustomLi2>

                                <CustomLi2>
                                    <CustomSpan3>Location Data:</CustomSpan3> Used to verify your
                                    business location and prevent fraud; collected only during
                                    active sessions.
                                </CustomLi2>
                            </ul>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Data Security and Ownership</CustomPara2>
                            <CustomSpan2>
                                Your data is securely stored, and you retain full ownership of
                                all billing and transaction records. The service provider uses
                                this data only for providing and improving the service.
                                Industry-standard security protocols, including encryption and
                                firewall protections, are employed.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Data Retention & Deletion</CustomPara2>
                            <CustomSpan2>
                                Your data will be retained only as long as needed for service
                                provision or as required by law. You may request deletion of
                                your account and data by contacting our support team.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2> Notifications and Communication</CustomPara2>
                            <CustomSpan2>
                                As a free service, the app may send periodic notifications and
                                promotional content to registered users, in accordance with our
                                Terms.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Refund Policy</CustomPara2>
                            <CustomSpan2>
                                Since this is a free web app, no fees or payments are required
                                to access its features. Therefore, no refunds are applicable for
                                using this service.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Future Paid Services</CustomPara2>
                            <CustomSpan2>
                                If any paid features are introduced in the future, a clear
                                refund policy specific to those features will be provided and
                                communicated to users in advance.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Transaction Fees</CustomPara2>
                            <CustomSpan2>
                                Any transaction fees charged per transaction are non-refundable,
                                even in the case of cancellations or refunds of the main
                                transaction.
                            </CustomSpan2>
                        </CustomLi>
                    </CustomOl>
                </ModalMainContainer>
            </Modal>
        );
    };

    // Handle category change and update sub-categories accordingly
    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption); // Set selected category
        setSubCategoryOptions(allSubCategories[selectedOption.value] || []); // Set sub-category options based on selected category
        onChangeBusinessDetails("company_category", selectedOption.value);
        setSelectedSubCategory(null); // Reset sub-category when category changes
    };

    // Handle sub-category change
    const handleSubCategoryChange = (selectedOption) => {
        setSelectedSubCategory(selectedOption); // Set selected sub-category
        onChangeBusinessDetails("company_subcategory", selectedOption.value);
    };

    const renderButton = () => {
        if (loading) {
            return (
                <span type="button">
                    <Loader />
                </span>
            );
        }
        return (
            <Btn type="button" onClick={SendOTP}>
                {otpSendCount === 0 ? 'Send OTP' : 'Resend OTP'}
            </Btn>
        );
    };

    return (
        <MainContainer>
            {signupState === "Create Account" && (
                <ContentContainer>
                    <InnerContainer>
                        <LogoAndTitleContainer>
                            <Logoimg src="https://res.cloudinary.com/dca9sij3n/image/upload/v1733729311/byzix14hmpmktsb4g8ln.jpg" />

                            <div>
                                <Title>SIGN UP</Title>
                                <TagLine>Your Next Invoice is Just a Click Away!</TagLine>
                            </div>
                        </LogoAndTitleContainer>

                        <Form style={{ justifyContent: "center", height: "70%" }}>
                            <InputGroup>
                                <Input
                                    type="text"
                                    onChange={(e) =>
                                        onChangeInput("full_name", e.target.value, "")
                                    }
                                    value={userDetails.full_name}
                                />
                                <Label2>Full Name *</Label2>
                                {errors.full_name && (
                                    <Error style={{ color: "red" }}>{errors.full_name}</Error>
                                )}
                            </InputGroup>

                            <InputGroup>
                                <PhoneNumInput
                                    country={userDetails.phone.countryCode || "in"}
                                    enableSearch
                                    disableSearchIcon
                                    onChange={(value, country) =>
                                        handlePhoneNumberChange("phone", value, country)
                                    }
                                    value={userDetails.phone.dialCode + userDetails.phone.number}
                                    inputStyle={{
                                        width: "100%",
                                        borderRadius: "0.7rem",
                                        fontSize: "16px",
                                        border: "none",
                                        background: "inherit",
                                    }}
                                    containerStyle={{
                                        width: "100%",
                                        height: "2.4rem",
                                    }}
                                    buttonClass="custom-dropdown-button"
                                    dropdownStyle={{
                                        height: "8rem",
                                        borderRadius: "0.4rem",
                                        overflow: "auto",
                                        background: "inherit",
                                    }}
                                />
                                <Label2>Mobile *</Label2>
                                {errors.phone && (
                                    <Error style={{ color: "red" }}>{errors.phone}</Error>
                                )}
                            </InputGroup>

                            <InputGroup>
                                <Input
                                    type="text"
                                    // required
                                    onChange={(e) =>
                                        onChangeInput("email", e.target.value.toLowerCase(), "")
                                    }
                                    value={userDetails.email}
                                />
                                <Label2>Email *</Label2>
                                {errors.email && (
                                    <Error style={{ color: "red" }}>{errors.email}</Error>
                                )}

                            </InputGroup>

                            <InputGroup>
                                <Input
                                    type={isPasswordVisible ? "text" : "password"}
                                    // required
                                    onChange={(e) =>
                                        onChangeInput("password", e.target.value, "")
                                    }
                                    value={userDetails.password}
                                />
                                <Label2>Password *</Label2>
                                {userDetails.password !== '' && isPasswordVisible ? (
                                    <EyeBtn
                                        type="button"
                                        onClick={() => setPasswordVisible(false)}
                                    >
                                        {" "}
                                        <FaRegEye />{" "}
                                    </EyeBtn>
                                ) : (
                                    <EyeBtn
                                        type="button"
                                        onClick={() => setPasswordVisible(true)}
                                    >
                                        {" "}
                                        <FaRegEyeSlash />{" "}
                                    </EyeBtn>
                                )}
                                {errors.password && (
                                    <Error style={{ color: "red" }}>{errors.password}</Error>
                                )}
                            </InputGroup>

                            <InputGroup>
                                <Input
                                    type={isCnfPwdvisible ? "text" : "password"}
                                    // required
                                    onChange={(e) =>
                                        onChangeInput("confirm_password", e.target.value, "")
                                    }
                                    value={userDetails.confirm_password}
                                />
                                <Label2>Confirm Password *</Label2>
                                {userDetails.confirm_password !== '' && isCnfPwdvisible ? (
                                    <EyeBtn
                                        type="button"
                                        onClick={() => setisCnfPwdvisible(false)}
                                    >
                                        {" "}
                                        <FaRegEye />{" "}
                                    </EyeBtn>
                                ) : (
                                    <EyeBtn
                                        type="button"
                                        onClick={() => setisCnfPwdvisible(true)}
                                    >
                                        {" "}
                                        <FaRegEyeSlash />{" "}
                                    </EyeBtn>
                                )}
                                {errors.confirm_password && (
                                    <Error style={{ color: "red" }}>
                                        {errors.confirm_password}
                                    </Error>
                                )}
                            </InputGroup>

                            {isOtpSent && (
                                <InputGroup style={{ alignItems: "flex-start" }}>
                                    <Input
                                        type="text"
                                        onChange={(e) => setOtp(e.target.value)}
                                        value={otp}
                                        readOnly={isOTPVerified}
                                    />
                                    <Label2>OTP</Label2>
                                    <Error>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Error>
                                    {isOTPVerified ? (
                                        <ValidateBtn
                                            style={{
                                                fontSize: "1.5rem",
                                                color: "green",
                                                width: "fit-content",
                                                padding: "0",
                                                height: "fit-content",
                                                border: "none",
                                                background: "transparent",
                                            }}
                                        >
                                            {" "}
                                            <IoCheckmarkCircleSharp />{" "}
                                        </ValidateBtn>
                                    ) : (
                                        <ValidateBtn type="button" onClick={verifyOtp}>
                                            verify OTP
                                        </ValidateBtn>
                                    )}
                                </InputGroup>
                            )}

                            {timeLeft === 0 && renderButton()}


                            {isOTPVerified && (
                                <Btn type="button" onClick={Validate}>
                                    Save & Continue
                                </Btn>
                            )}

                            <Span>
                                Already have an Account? <Link to="/login">Sign in</Link>
                            </Span>
                            <HashTag>#OneclickwithWONBILLS</HashTag>
                        </Form>
                    </InnerContainer>
                </ContentContainer>
            )
            }

            {
                signupState === "Business Profile" && (
                    <ContentContainer style={{ width: "45vw" }}>
                        <Logoimg
                            src="https://res.cloudinary.com/dca9sij3n/image/upload/v1733729311/byzix14hmpmktsb4g8ln.jpg"
                            alt="logo"
                            style={{ top: "5%" }}
                        />
                        <InnerContainer>
                            <BackBtn
                                type="button"
                                onClick={() => setSignupState("Create Account")}
                            >
                                <IoArrowBackCircleOutline />
                            </BackBtn>

                            <Title>{signupState.toUpperCase()}</Title>
                            <TagLine>Build Your Profile, Build Your Success!</TagLine>

                            <Form
                                onSubmit={handleSubmit}
                                style={{ justifyContent: "center", padding: "1rem" }}
                            >
                                <InputsDivs>
                                    <InputsDiv2>
                                        <Input
                                            type="text"
                                            // required
                                            onChange={(e) =>
                                                onChangeBusinessDetails("company_name", e.target.value)
                                            }
                                            value={userDetails.company_details.company_name}
                                        />
                                        <Label2>Company Reg Name *</Label2>
                                        {errors.company_name && (
                                            <Error style={{ color: "red" }}>
                                                {errors.company_name}
                                            </Error>
                                        )}
                                    </InputsDiv2>

                                    <InputsDiv2>
                                        <Input
                                            type="text"
                                            onChange={(e) =>
                                                onChangeBusinessDetails("company_number", e.target.value)
                                            }
                                            value={userDetails.company_details.company_number}
                                        />
                                        <Label2>Company Reg No *</Label2>
                                        {errors.company_number && (
                                            <Error style={{ color: "red" }}>
                                                {errors.company_number}
                                            </Error>
                                        )}
                                    </InputsDiv2>
                                </InputsDivs>

                                <InputsDivs>
                                    <InputsDiv2>
                                        <Input
                                            type="text"
                                            onChange={(e) =>
                                                onChangeBusinessDetails(
                                                    "company_tax_number",
                                                    e.target.value
                                                )
                                            }
                                            value={userDetails.company_details.company_tax_number}
                                        />
                                        <Label2>Ref Tax No *</Label2>
                                        {errors.company_tax_number && (
                                            <Error style={{ color: "red" }}>
                                                {errors.company_tax_number}
                                            </Error>
                                        )}
                                    </InputsDiv2>

                                    <InputsDiv2>
                                        <ReactSelect
                                            isSearchable
                                            options={companyTypes}
                                            onChange={(selectedOption) =>
                                                onChangeBusinessDetails(
                                                    "company_type",
                                                    selectedOption?.value
                                                )
                                            }
                                            value={companyTypes.find(
                                                (option) =>
                                                    option.value ===
                                                    userDetails.company_details.company_type
                                            )}
                                            styles={CustomStyles}
                                        />
                                        <Label2>Business *</Label2>
                                        {errors.company_type && (
                                            <Error style={{ color: "red" }}>
                                                {errors.company_type}
                                            </Error>
                                        )}
                                    </InputsDiv2>
                                </InputsDivs>

                                <InputsDivs>
                                    <InputsDiv2>
                                        <ReactSelect
                                            isSearchable
                                            options={industryTypes}
                                            onChange={handleCategoryChange} // Handle category selection
                                            value={selectedCategory || null} // Set the selected category
                                            styles={CustomStyles}
                                        />
                                        <Label2>Category *</Label2>
                                        {errors.company_category && (
                                            <Error style={{ color: "red" }}>
                                                {errors.company_category}
                                            </Error>
                                        )}
                                    </InputsDiv2>

                                    <InputsDiv2>
                                        {selectedCategory?.value === "others" ? (
                                            <Input
                                                type="text"
                                                // required
                                                onChange={(e) =>
                                                    onChangeBusinessDetails(
                                                        "company_subcategory",
                                                        e.target.value
                                                    )
                                                }
                                                value={userDetails.company_details.company_subcategory || null}
                                                maxLength='20'
                                            />
                                        ) : (
                                            <ReactSelect
                                                value={selectedSubCategory || null} // Set the selected sub-category
                                                onChange={handleSubCategoryChange} // Handle sub-category selection
                                                options={subCategoryOptions || []} // Set the sub-category options dynamically
                                                isDisabled={!subCategoryOptions?.length} // Disable if no sub-categories available
                                                styles={CustomStyles}
                                            />
                                        )}

                                        <Label2>Sub Category *</Label2>
                                        {errors.company_subcategory && (
                                            <Error style={{ color: "red" }}>
                                                {errors.company_subcategory}
                                            </Error>
                                        )}
                                    </InputsDiv2>
                                </InputsDivs>

                                <InputsDivs>
                                    <InputsDiv2>
                                        <ReactSelect
                                            isSearchable
                                            options={countryRegionData.map((country) => ({
                                                label: country.countryName,
                                                value: country.countryName,
                                            }))}
                                            onChange={(selectedOption) =>
                                                handleCountryChange(selectedOption?.value)
                                            }
                                            value={
                                                countryRegionData
                                                    .map((country) => ({
                                                        label: country.countryName,
                                                        value: country.countryName,
                                                    }))
                                                    .find((option) => option.value === selectedCountry) ||
                                                null
                                            }
                                            styles={CustomStyles}
                                        />
                                        <Label2>Country *</Label2>
                                        {errors.country && (
                                            <Error style={{ color: "red" }}>{errors.country}</Error>
                                        )}
                                    </InputsDiv2>

                                    <InputsDiv2>
                                        <ReactSelect
                                            value={
                                                regionOptions?.find(
                                                    (option) => option.label === selectedRegion
                                                ) || null
                                            }
                                            onChange={(selectedOption) =>
                                                handleRegionChange(selectedOption?.label)
                                            }
                                            options={regionOptions || []}
                                            isDisabled={!regionOptions?.length}
                                            styles={CustomStyles}
                                        />
                                        <Label2>Province *</Label2>
                                        {errors.province && (
                                            <Error style={{ color: "red" }}>{errors.province}</Error>
                                        )}
                                    </InputsDiv2>
                                </InputsDivs>

                                <InputsDivs>
                                    <InputsDiv2>
                                        <Input
                                            type="text"
                                            // required
                                            onChange={(e) =>
                                                onChangeBusinessDetails("city", e.target.value)
                                            }
                                            value={userDetails.company_details.city}
                                        />
                                        <Label2>City *</Label2>
                                        {errors.city && (
                                            <Error style={{ color: "red" }}>{errors.city}</Error>
                                        )}
                                    </InputsDiv2>

                                    <InputsDiv2>
                                        <Input
                                            type="text"
                                            // required
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                // ALLOW ONLY NUMBERS AND HANDLE THE INPUT
                                                if (/^\d*$/.test(value)) {
                                                    onChangeBusinessDetails("postcode", value);
                                                }
                                            }}
                                            value={userDetails.company_details.postcode}
                                            maxLength="6"
                                        />
                                        <Label2>Post/Zipcode *</Label2>
                                        {errors.postcode && (
                                            <Error style={{ color: "red" }}>{errors.postcode}</Error>
                                        )}
                                    </InputsDiv2>
                                </InputsDivs>

                                <InputsDivs>
                                    <InputsDiv2
                                        style={{
                                            width: "100%",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TermsCheckBox
                                            type="checkbox"
                                            onChange={(e) =>
                                                onChangeInput("agreed_to_terms", e.target.checked, "")
                                            }
                                            checked={userDetails.terms_and_conditions}
                                        />
                                        <TermsLabel>
                                            I have read and agree to the{" "}
                                            <CustomBtn type="button" onClick={() => setModalOpen(true)}>
                                                Terms and Conditions
                                            </CustomBtn>
                                        </TermsLabel>
                                        {errors.agreed_to_terms && (
                                            <Error style={{ color: "red" }}>
                                                {errors.agreed_to_terms}
                                            </Error>
                                        )}
                                    </InputsDiv2>
                                </InputsDivs>
                                {IsModalOpen && OpenTermsModal()}
                                <Btn type="submit">Submit</Btn>

                                <HashTag>#OneclickwithWONBILLS</HashTag>
                            </Form>
                        </InnerContainer>
                    </ContentContainer>
                )
            }
            <SnackbarProvider
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            />
        </MainContainer>
    );
};

export default CreateAccount;
