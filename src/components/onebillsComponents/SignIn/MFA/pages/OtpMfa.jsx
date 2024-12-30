import { useState, useMemo } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import axios from "axios";
import Cookies from 'universal-cookie';
import Spinner from "../../../../../../shared/UIElements/Loaderspinner";
import Timer from "../../../../../../shared/UIElements/Countdown";

import updateLogincount from "../../../../../../shared/updateloginCount";

import {
    MainContainer, InnerContainer, ContenContainer,
    Title, InputTag, Btn, InputDiv, Label,VerifyOtp
} from './StyledComponents'

const OtpMfa = (props) => {
    const { email, user_name } = props
    const cookies = useMemo(() => new Cookies(), []);
    const { userId } = useParams();

    const [otpSendCount, setOtpSendCount] = useState(0)
    const [showLoader, setShowLoader] = useState(false)
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [otpTimer, setOtpTimer] = useState(0)
    const userEmail = localStorage.getItem('userEmail')

    const [otp, setOtp] = useState('')

    // enqueueSnackbar('No internet connection. Please reconnect to continue.', { variant: 'error' });
    const onChangeOtp = (val) => {
        setOtp(val)
    };

    const sendEmailOtp = async () => {
        try {
            const payload = {
                email: userEmail
            }
            setShowLoader(true)
            const response = await axios.post(`${apiUrl}/send-otp-change-password`, payload);
            console.log(response)

            if (response.status === 200) {
                enqueueSnackbar(
                    response.data?.message || "An error occurred. Please try again.",
                    { variant: "success" }
                );

                setOtpSendCount(prev => prev + 1)
            }
            setShowLoader(false)
            setOtpTimer(1)
        } catch (err) {
            console.log('err sending otp:', err)
            enqueueSnackbar(
                err.message || "An error occurred. Please try again.",
                { variant: "error" }
            );
        }
    }

    const handleSentOtp = () => {
        switch (otpSendCount) {
            case 0:
                return sendEmailOtp()
            default:
                return sendEmailOtp()
        }
    }

    const VerifyEmailOtp = async () => {
        try {
            const payload = {
                email: userEmail,
                otp: otp
            }
            // setShowLoader(true)
            const response = await axios.post(`${apiUrl}/verify-login-otp`, payload);
            console.log(response)

            if (response.status === 200) {
                enqueueSnackbar(
                    response.data?.message || "An error occurred. Please try again.",
                    { variant: "success" }
                );
                cookies.set(
                    'WonBillsUserToken',
                    response.data.token,
                    { path: '/', maxAge: 86400 }
                );
                sessionStorage.removeItem('jwt')
                updateLogincount(userId)
                navigate('/Dashboard')

                // setOtpSendCount(prev => prev + 1)
            }
            // setShowLoader(false)
            // setOtpTimer(1)
        } catch (err) {
            console.log('err verifying otp:', err)
            enqueueSnackbar(
                err.message || "An error occurred. Please try again.",
                { variant: "error" }
            );
        }
    }

    return (
        <MainContainer>
            <InnerContainer>
                <ContenContainer>
                    <Title style={{ marginBottom: '1rem' }}>Multi-factor Authentication (MFA) - OTP</Title>
                    <div style={{
                        display: 'flex',
                        gap: '2rem',
                        flexDirection: 'column'
                    }}>
                        {otpTimer === 0 ?
                            <Btn
                                type="button"
                                onClick={handleSentOtp}
                                style={{
                                    width: 'fit-content',
                                    borderRadius: '0.3rem',
                                    transition: '0.7s all ease',
                                    alignSelf: 'center',
                                    backgroundColor: `${showLoader ? 'transparent' : ''}`,
                                    border: `${showLoader ? 'none' : ''}`
                                }}
                            >
                                {showLoader ? <Spinner /> : otpSendCount === 0 ? 'Send Email OTP' : 'Resend Otp'}
                            </Btn> :
                            <p>Resend otp in:  <Timer durationInMinutes={otpTimer} onComplete={() => { setOtpTimer(0) }} /></p>

                        }
                        <InputDiv
                            style={{ display: 'flex', width: '100%', gap: '1rem' }}
                        >
                            <InputTag
                                type="number"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter your OTP"
                            />
                            <Label>OTP</Label>
                            <VerifyOtp
                                type="button"
                                onClick={VerifyEmailOtp}
                            >
                                Verify
                            </VerifyOtp>
                        </InputDiv>
                    </div>
                </ContenContainer>
            </InnerContainer>
            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
        </MainContainer>
    )
};

export default OtpMfa;