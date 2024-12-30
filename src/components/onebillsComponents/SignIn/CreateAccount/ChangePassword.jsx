// MODULE IMPORTS
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

// STYLE IMPORTS
import {
    MainContainer, BannerContainer, ContentContainer, Title, InnerContainer, InputGroup, Input, Label2, Error, Form2, GetOtpBtn, TitleForgot
} from './StyledComponents';


const ChangePassword = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({});
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [resendOtp, setResendOtp] = useState(false)
    const [isOTPVerified, setOtpVerified] = useState(false)
    const [timeLeft, setTimeLeft] = useState(120); // 2 min
    const [isRunning, setIsRunning] = useState(false);

    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    useEffect(() => {
        if (timeLeft <= 0) return; // Stop when time reaches 0

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1); // Decrease time by 1 second
        }, 1000); // Run every second

        setResendOtp(true)

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [timeLeft, isRunning]);



    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const validatePassword = (password) => {
        // 1. AT LEAST ONE UPPERCASE LETTER (A-Z)
        // 2. AT LEAST ONE DIGIT (0-9)
        // 3. MINIMUM LENGTH OF 6 CHARACTERS
        const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        return regex.test(password);
    };

    const GetOtp = async () => {

        const newErrors = {};
        let isValid = true;
        if (!email) {
            newErrors.email = 'Email Required!';
            isValid = false;
            setErrors(newErrors); // SET ERROR IF THE EMAIL IS INVALID
            return isValid;
        }

        // VALIDATE EMAIL FORMAT
        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
            setErrors(newErrors); // SET ERROR IF THE EMAIL IS INVALID

            return isValid; // EXIT EARLY IF EMAIL IS INVALID
        }

        try {
            // MAKE THE API CALL TO REQUEST OTP
            const response = await axios.post(`${apiUrl}/send-otp-change-password`, { email });

            // SUCCESS: OTP SENT SUCCESSFULLY
            enqueueSnackbar('OTP Sent Successfully!', { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });
            setIsOtpSent(true); // ENABLE OTP INPUT FIELD
            setTimeLeft(120)
            setIsRunning(true);
            setErrors({}); // CLEAR ANY PREVIOUS ERRORS SINCE OTP IS SENT SUCCESSFULLY
        } catch (error) {
            // CHECK THE ERROR RESPONSE FROM THE BACKEND AND HANDLE ACCORDINGLY
            if (error.response && error.response.status === 404) {
                newErrors.email = 'User not found with this email.';
            } else {
                newErrors.email = 'Error sending OTP, please try again.';
            }

            setErrors(newErrors); // SET ERRORS IN CASE OF FAILURE
            enqueueSnackbar(`${newErrors.email}`, { variant: 'warning' });
        }
    }

    // VERIFY OTP WITH BACKEND
    const verifyOtp = async () => {
        const OTP = otp.trim()
        try {
            const response = await axios.post(`${apiUrl}/verify-otp-change-password`, { email, OTP });
            setOtpVerified(true); // MARK OTP AS VERIFIED
            enqueueSnackbar(`${response.data.message}`, { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });
            setErrors({}); // CLEAR PREVIOUS OTP-RELATED ERRORS ONCE VERIFIED
        } catch (error) {
            enqueueSnackbar('Error verifying OTP, please try again.', { variant: 'warning' });
        }
    };

    const ChangePassword = async () => {
        let isValid = true;

        // VALIDATE OTP
        if (!otp) {
            enqueueSnackbar('OTP is required.', { variant: 'warning', autoHideDuration: 2000 });
            isValid = false;
        }

        // CHECK IF NEWPASSWORD AND CONFIRMPASSWORD MATCH
        if (password !== password2) {
            enqueueSnackbar('Passwords do not match.', { variant: 'warning', autoHideDuration: 2000 });
            isValid = false;
        }

        // IF PASSWORDS MATCH, THEN VALIDATE PASSWORD STRENGTH
        if (isValid && !validatePassword(password)) {
            enqueueSnackbar('Password must contain at least 6 characters, one uppercase letter, and one number.', { variant: 'warning', autoHideDuration: 2000 });
            isValid = false;
        }

        if (!isValid) {
            return; // EXIT EARLY IF VALIDATION FAILED
        }

        try {
            // MAKE THE API CALL TO VERIFY OTP AND CHANGE PASSWORD
            const response = await axios.post(`${apiUrl}/forgot-password`, {
                email,
                otp,
                password
            });

            // SUCCESS: PASSWORD CHANGED SUCCESSFULLY
            enqueueSnackbar('Password changed successfully!', {
                preventDuplicate: true,
                variant: 'success',
                autoHideDuration: 1000
            });
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        } catch (error) {
            // CHECK IF THERE'S A RESPONSE WITH A SPECIFIC MESSAGE FROM THE BACKEND
            if (error.response && error.response.data.message) {
                enqueueSnackbar(error.response.data.message, { variant: 'warning', autoHideDuration: 2000 });
            } else {
                enqueueSnackbar('Error verifying OTP or changing password. Please try again.', { variant: 'warning', autoHideDuration: 2000 });
            }
        }
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;


    return (
        <MainContainer>

            <ContentContainer style={{  height: 'fit-content' }}>
                <InnerContainer >

                    <Form2>
                        <TitleForgot>Oops! Time for a password makeover!</TitleForgot>
                        <InputGroup>
                            <Input
                                type='email'
                                required
                                value={email}
                                readOnly={isOTPVerified}
                                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                            />
                            <Label2>Email</Label2>
                            {errors.email && <Error style={{ color: 'red' }}>{errors.email}</Error>}
                            {isOtpSent && timeLeft !== 0 && <Error>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Error>}
                        </InputGroup>
                        {!isOtpSent && <GetOtpBtn type='button' onClick={() => { GetOtp() }}>Get OTP</GetOtpBtn>}
                        {resendOtp && timeLeft === 0 && <GetOtpBtn type='button' onClick={() => { GetOtp(), setResendOtp(false) }}>Re-send OTP</GetOtpBtn>}
                        {(isOtpSent && !isOTPVerified) &&
                            <>
                                <InputGroup>
                                    <Input
                                        type='text'
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <Label2>OTP</Label2>
                                </InputGroup>
                                <GetOtpBtn type='button' onClick={verifyOtp}>Verify</GetOtpBtn>
                            </>
                        }

                        {isOTPVerified &&
                            <>
                                <InputGroup>
                                    <Input
                                        type='text'
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Label2>Password</Label2>
                                </InputGroup>

                                <InputGroup>
                                    <Input
                                        type='text'
                                        required
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
                                    />
                                    <Label2>Confirm Password</Label2>
                                </InputGroup>

                                <GetOtpBtn type='button' onClick={ChangePassword}>Change Password</GetOtpBtn>

                            </>
                        }

                    </Form2>
                </InnerContainer>

            </ContentContainer>
            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
        </MainContainer>
    )
}

export default ChangePassword