// MODULE IMPORTS
import { useState, useEffect, useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import axios from 'axios';
import updateLogincount from "../../../../shared/updateloginCount";

// COMPONENT IMPORTS
import WonBillsContext from "../../../context/WonBillsContext";
import { baseUrl } from "../../../config/BaseUrl";

// STYLE IMPORTS
import {
    ParentContainer, ChildDiv1, ChildDiv2, LoginForm, Title, InputsDiv2, Label2, Input, Text, HrTag, InputsCon, Btn, SpanTag, LoginBtn, SpanTag2,
    ModalMainContainer, MHeader, MNote, MButton, MButton2, MBtnDiv, Img, ImgDiv, Logoimg, HashTag, FgtPwdAndRememberMeContainer
} from './StyledComponents'


// ICON IMPORTS
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();

    // MEMOIZE COOKIES SO IT'S ONLY CREATED ONCE
    const cookies = useMemo(() => new Cookies(), []);

    const { setUserID } = useContext(WonBillsContext);
    const apiUrl = import.meta.env.VITE_API_URL;
    // console.log(apiUrl,'this is Api ur')

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [correctEmail, setCorrectEmail] = useState(false);

    useEffect(() => {
        const savedToken = cookies.get('WonBillsUserToken');
        if (savedToken) {
            navigate('/Dashboard');
        }
    }, [navigate, cookies]);

    const OnChangeCredentials = (value, key) => {
        if (key === 'email') {
            setCorrectEmail(!validateEmail(value));
        }
        setCredentials(prev => ({ ...prev, [key]: value }));
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const onLogin = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;

        // CHECK FOR EMPTY FIELDS
        if (!email || !password) {
            enqueueSnackbar('Please fill in all the required fields before proceeding.', { variant: 'warning' });
            return;
        }

        // CHECK FOR VALID EMAIL FORMAT
        if (correctEmail) {
            enqueueSnackbar('Please Enter Valid Email.', { variant: 'warning' });
            return;
        }

        // CHECK IF THE INTERNET CONNECTION IS OFF
        if (!navigator.onLine) {
            enqueueSnackbar('No internet connection. Please reconnect to continue.', { variant: 'error' });
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/UserLogin`, { email, password });
            const resData = response.data;
            console.log("login user response:", response)

            if (response.status === 200) {
                sessionStorage.setItem('isSignInCompleted', true)
                sessionStorage.setItem('userType', response.data.userType)
                if (resData.loginCount === 0) {
                    // cookies.set('WonBillsUserToken', resData.token, { path: '/', maxAge: 86400 });
                    localStorage.setItem('userId', resData?.userId);
                    localStorage.setItem('userEmail', resData?.email)
                    localStorage.setItem('loginCount', resData?.loginCount)
                    localStorage.setItem('userName', resData?.userName)
                    sessionStorage.setItem('jwt', resData?.token)

                    setUserID(resData?.userId);
                    return navigate(`/MfaSetup/${resData?.userId}`)
                }

                if (resData.isMfaEnabled) {
                    localStorage.setItem('userId', resData?.userId);
                    localStorage.setItem('userEmail', resData?.email)
                    localStorage.setItem('loginCount', resData?.loginCount)
                    localStorage.setItem('mfaType', resData?.mfaType)
                    localStorage.setItem('userName', resData?.userName)

                    return resData?.mfaType === 'otp' ? navigate('/OtpMfa') : navigate('/PasskeyMfa')
                }

                if (resData?.token) {
                    // STORE TOKEN AND USER DETAILS IN COOKIES AND LOCALSTORAGE
                    cookies.set('WonBillsUserToken', resData?.token, { path: '/', maxAge: 86400 });
                    localStorage.setItem('userId', resData?.userId);
                    updateLogincount(resData?.userId)

                    setUserID(resData?.userId);
                    navigate('/Dashboard');
                } else {
                    enqueueSnackbar('Invalid response from server.', { variant: 'warning' });
                }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';

            // HANDLE SPECIFIC ERROR SCENARIOS
            if (error.message === 'Network Error') {
                enqueueSnackbar('Network error.', { variant: 'error' });
            } else if (error.response?.status === 500) {
                enqueueSnackbar('Oops! Something went wrong. Please try again later.', { variant: 'error' });
            } else if (error.response?.status === 503) {
                enqueueSnackbar('Platform is under maintenance. Please check back shortly.', { variant: 'error' });
            } else if (error.response?.status === 404) {
                enqueueSnackbar('The server could not be reached.', { variant: 'error' });
            } else if (errorMessage.includes('User does not exist')) {
                enqueueSnackbar(errorMessage, { variant: 'warning' });
            } else {
                enqueueSnackbar('Invalid credentials. Please try again.', { variant: 'warning' });
            }
        }
    };

    return (
        <ParentContainer>
            <ChildDiv1>
                <Logoimg src='https://res.cloudinary.com/dca9sij3n/image/upload/v1733729311/byzix14hmpmktsb4g8ln.jpg' />

                <LoginForm onSubmit={onLogin}>
                    <Title>SIGN IN</Title>
                    <Text>Welcome Back – Let’s Get to Work!</Text>

                    <InputsCon>
                        <InputsDiv2>
                            <Input required type="email" onChange={(e) => OnChangeCredentials(e.target.value, 'email')} />
                            <Label2>Email</Label2>
                        </InputsDiv2>

                        <InputsDiv2>
                            <Input required type={showPassword ? 'text' : 'password'} onChange={(e) => OnChangeCredentials(e.target.value, 'password')} />
                            <Label2>Password</Label2>
                            {showPassword ?
                                <Btn type="button" onClick={() => setShowPassword(false)}> <FaRegEye /> </Btn> :
                                <Btn type="button" onClick={() => setShowPassword(true)}> <FaRegEyeSlash /> </Btn>
                            }
                        </InputsDiv2>
                    </InputsCon>

                    <FgtPwdAndRememberMeContainer>
                        <div style={{ gap: '0.5rem', display: 'flex', alignItems: 'center' }}>
                            <input type="checkbox" />
                            <label>Remember me</label>
                        </div>

                        <Link to='/ChangePassword'>
                            <SpanTag>Forget Password?</SpanTag>
                        </Link>
                    </FgtPwdAndRememberMeContainer>
                    <LoginBtn type="submit">Sign In</LoginBtn>
                    <SpanTag2>Don`t have Account <Link style={{ marginLeft: '0.5rem' }} to='/CreateAccount'>Signup</Link> </SpanTag2>

                    <HashTag >#OneclickwithWONBILLS</HashTag>
                </LoginForm>
            </ChildDiv1>

            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
        </ParentContainer>
    )
}

export default Login