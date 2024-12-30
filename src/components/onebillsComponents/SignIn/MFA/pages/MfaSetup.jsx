import { useState, useMemo,  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'universal-cookie';
import updateLogincount from "../../../../../../shared/updateloginCount";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import {
    MainContainer,
    InnerContainer,
    ContenContainer,
    Title,
    CustomDiv,
    Btn,
    Btn2,
    SkipBtn,
    InputTag,
    Text,
    InputDiv,
    Label,
    VerifyOtp
} from "./StyledComponents";
import { GoPasskeyFill } from "react-icons/go";
import { TbPasswordMobilePhone } from "react-icons/tb";
import axios from "axios";
import Spinner from "../../../../../../shared/UIElements/Loaderspinner";
import Timer from "../../../../../../shared/UIElements/Countdown";

const MfaSetup = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [mfaType, setMfaType] = useState("");
    const [passkey, setPasskey] = useState("");
    const [confirmPasskey, setConfirmPasskey] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSendCount, setOtpSendCount] = useState(0)
    const [showLoader, setShowLoader] = useState(false)
    const [otpTimer, setOtpTimer] = useState(0)
    const cookies = useMemo(() => new Cookies(), []);

    const userEmail = localStorage.getItem('userEmail')

    // useEffect(() => {
    //     const localMfaType = localStorage.getItem('mfaType')
    //     localMfaType && setMfaType(localMfaType)
    // }, [])

    const onChangePasskey = (val) => setPasskey(val);

    const updateMfaType = async (type) => {
        if (!userId) {
            enqueueSnackbar("User ID not found. Please try again.", {
                variant: "error",
            });
            return;
        }

        const payload = {
            mfa_type: type,
            passkey: type === "passkey" ? passkey : undefined,
            userMail: userEmail
        };

        // try{
        //     passkey===confirmPasskey
        // }catch(err){}

        try {
            if (passkey === confirmPasskey) {
                console.log("Sending payload:", payload);
                const response = await axios.put(`${apiUrl}/mfa-setup/${userId}`, payload);
                console.log('response', response)

                if (response.status === 200) {
                    enqueueSnackbar("MFA setup updated successfully.", {
                        variant: "success",
                    });
                    cookies.set('WonBillsUserToken', response.data.token, { path: '/', maxAge: 86400 });
                    updateLogincount(userId)
                    setTimeout(() => {
                        navigate("/Dashboard");
                    }, 1000);
                } else {
                    enqueueSnackbar("Failed to update MFA setup. Please try again.", {
                        variant: "error",
                    });
                }
            } else {
                enqueueSnackbar(
                    "Passkey doesn't match! Please try again.",
                    { variant: "error" }
                );
            }
        } catch (error) {
            console.log("Error updating MFA:", error);
            enqueueSnackbar(
                error.response?.data?.message || "An error occurred. Please try again.",
                { variant: "error" }
            );
        }
    }

    const handleSetup = (type) => {
        setMfaType(type);
        // if (type === "otp") updateMfaType(type); // Trigger API call immediately for OTP
    }

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
                updateMfaType('otp')
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

    const handleSentOtp = () => {
        switch (otpSendCount) {
            case 0:
                return sendEmailOtp()
            default:
                return sendEmailOtp()
        }
    }

    return (
        <MainContainer>
            <InnerContainer>
                <ContenContainer>
                    {mfaType === "" && <>
                        <Title>Enhance Your Account Security</Title>
                        <Text>
                            {`Dear user, we highly recommend setting up Multi-Factor Authentication (MFA) to add an extra layer of protection to your account.`}
                        </Text>
                    </>}

                    {mfaType === "" && (
                        <CustomDiv style={{ gap: '1rem', flexDirection: 'column' }}>
                            <Btn
                                type="button"
                                onClick={() => handleSetup("otp")}
                                style={{
                                    width: '100%',
                                    minHeight: '5rem',
                                    borderRadius: '0.3rem',
                                    transition: '0.7s all ease'
                                }}
                            >
                                <TbPasswordMobilePhone
                                    style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                                />
                                Set Up with OTP
                            </Btn>
                            <Btn
                                type="button"
                                onClick={() => handleSetup("passkey")}
                                style={{
                                    width: '100%',
                                    minHeight: '5rem',
                                    borderRadius: '0.3rem',
                                    transition: '0.7s all ease'

                                }}
                            >
                                <GoPasskeyFill
                                    style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                                />
                                Set Up with Passkey
                            </Btn>
                        </CustomDiv>
                    )}

                    {mfaType === "passkey" && (
                        <>
                            <CustomDiv
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: "1rem",
                                    justifyContent: 'space-between'
                                }}
                            >
                                <InputDiv
                                    style={{
                                        width: 'fit-content',
                                        flexGrow: '1'
                                    }}
                                >
                                    <InputTag
                                        type="number"
                                        value={passkey}
                                        onChange={(e) => onChangePasskey(e.target.value)}
                                        placeholder="Enter your passkey"

                                        style={{
                                            flexGrow: '1',
                                            borderWidth: '1px',
                                            padding: '0.4rem 0.5rem'
                                        }}
                                    />
                                    <Label>Passkey</Label>
                                </InputDiv>
                            </CustomDiv>

                            <CustomDiv
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: "1rem",
                                    borderRadius: '0.2rem',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <InputDiv
                                    style={{
                                        width: 'fit-content',
                                        flexGrow: '1',
                                    }}
                                >
                                    <InputTag
                                        type="number"
                                        value={confirmPasskey}
                                        onChange={(e) => setConfirmPasskey(e.target.value)}
                                        placeholder="Confirm your passkey"

                                        style={{
                                            flexGrow: '1',
                                            borderWidth: '1px',
                                            padding: '0.4rem 0.5rem'
                                        }}
                                    />
                                    <Label>Confirm Passkey</Label>
                                </InputDiv>
                            </CustomDiv>

                            <Btn2
                                type="button"
                                onClick={() => updateMfaType("passkey")}
                                disabled={!passkey}
                                style={{
                                    margin: '0.5rem',
                                    width: 'fit-content',
                                    padding: '0.3rem 1rem',
                                    borderRadius: '50px',
                                    alignSelf: 'center'
                                }}
                            >
                                Submit
                            </Btn2>
                            <Btn
                                type="button"
                                onClick={() => handleSetup("otp")}
                                style={{
                                    width: 'fit-content',
                                    borderRadius: '0.3rem',
                                    transition: '0.7s all ease',
                                    alignSelf: 'center',
                                    marginTop: '2rem'

                                }}
                            >
                                <TbPasswordMobilePhone
                                    style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                                />
                                Set Up with OTP
                            </Btn>
                        </>
                    )}

                    {mfaType === "otp" && (
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

                            <Btn
                                type="button"
                                onClick={() => handleSetup("passkey")}
                                style={{
                                    width: 'fit-content',
                                    borderRadius: '0.3rem',
                                    transition: '0.7s all ease',
                                    alignSelf: 'center'
                                }}
                            >
                                <GoPasskeyFill
                                    style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                                />
                                Set Up with Passkey
                            </Btn>
                        </div>)}
                    {mfaType === "" &&
                        <SkipBtn
                            type="button"
                            onClick={() => {
                                enqueueSnackbar("Skipped MFA setup.", { variant: "info" })
                                cookies.set(
                                    'WonBillsUserToken',
                                    sessionStorage.getItem('jwt'),
                                    { path: '/', maxAge: 86400 }
                                );
                                sessionStorage.removeItem('jwt')

                                navigate('/Dashboard')
                            }}
                        >
                            Skip for Now
                        </SkipBtn>}
                </ContenContainer>
            </InnerContainer>
            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
        </MainContainer>
    );
};

export default MfaSetup;

