import { useState } from 'react';
import axios from 'axios';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from "react-icons/md";

// STYLES IMPORT
import { CustomDiv, InputTag2, Label4, InputsContainer, Btn2, Theme, Error } from './StyledComponents';

const Invite = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const UserID = localStorage.getItem('userId');
    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState('');

    const onChangeEmail = (value) => {
        setEmail(value);
        if (!/\S+@\S+\.\S+/.test(value)) {
            setMessage('Please enter a valid email address');
        } else {
            setMessage('');
        }
    };

    const onSend = async () => {
        if (!email || message) {
            enqueueSnackbar('Please fix errors before sending.', { variant: 'error', autoHideDuration: 2000 });
            return;
        }

        console.log('Sending Payload:', { email });
        console.log('API URL:', `${apiUrl}/send-invite/email/${UserID}`);
        console.log('UserID:', UserID);

        setLoader(true);
        try {
            const response = await axios.post(`${apiUrl}/send-invite/email/${UserID}`, { email });
            console.log('API Response:', response.data);
            enqueueSnackbar('Invitation sent successfully!', { variant: 'success', autoHideDuration: 2000 });
            setEmail('');
        } catch (error) {
            console.log('Error Response:', error.response?.data);
            enqueueSnackbar(`${error.response?.data.message}`, { variant: 'info', autoHideDuration: 2000 });
            setEmail('');
            console.error('Error sending invite:', error);
        } finally {
            setLoader(false);
        }
    };


    return (
        <ThemeProvider theme={Theme}>
            <Accordion sx={{ border: 'none', boxShadow: 'none', borderRadius: '1rem' }}>
                <AccordionSummary expandIcon={<MdExpandMore style={{ fontSize: '2rem' }} />}>
                    <Typography>Invite</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CustomDiv style={{ alignItems: 'center' }}>
                        <InputsContainer>
                            <InputTag2
                                required
                                type="email"
                                value={email}
                                onChange={(e) => onChangeEmail(e.target.value)}
                                disabled={loader}
                                placeholder="Enter email address"
                            />
                            <Label4>Email ID</Label4>
                            {message && <Error>{message}</Error>}
                        </InputsContainer>
                        <Btn2 type="button" onClick={onSend} disabled={loader}>
                            {loader ? 'Sending...' : 'Send'}
                        </Btn2>
                    </CustomDiv>
                </AccordionDetails>
            </Accordion>
            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
        </ThemeProvider>
    );
};

export default Invite
