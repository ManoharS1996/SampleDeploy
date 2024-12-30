import { useState, useMemo } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

import { MainContainer, InnerContainer, ContenContainer, Title, CustomDiv2, Btn2, InputTag, Text } from './StyledComponents'
const apiUrl = import.meta.env.VITE_API_URL;

const PasskeyMfa = () => {
    const [passkey, setPasskey] = useState('')
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate();
    const cookies = useMemo(() => new Cookies(), []);

    const onChangePasskey = (val) => {
        setPasskey(val)
    }

    const onSubmitPassKey = async () => {
        try {
            const url = `${apiUrl}/api/verify-passkey`
            const response = await axios.post(url, { passkey, userId })
            if (response.status === 200) {
                console.log(response.data)
                enqueueSnackbar(
                    response.data.message || "An error occurred. Please try again.",
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
            } else {
                enqueueSnackbar(
                    response.data.message || "An error occurred. Please try again.",
                    { variant: "error" }
                );
            }
        } catch (err) {
            console.log('error verifying passkey: ', err)
            enqueueSnackbar(
                err.response.data.message || "An error occurred. Please try again.",
                { variant: "error" }
            );
        }
    }

    return (
        <MainContainer>
            <InnerContainer>
                <ContenContainer>
                    <Title>Multi-factor Authentication(MFA) - PASSKEY</Title>
                    <Text>Dear User, please verify your identity using the passkey below to keep your account secure.</Text>

                    <CustomDiv2>
                        <InputTag type='number' value={passkey} onChange={(e) => onChangePasskey(e.target.value)} />
                        <Btn2 type='button' onClick={onSubmitPassKey} >Submit</Btn2>
                    </CustomDiv2>
                </ContenContainer>
            </InnerContainer>
            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
        </MainContainer>
    )
}

export default PasskeyMfa