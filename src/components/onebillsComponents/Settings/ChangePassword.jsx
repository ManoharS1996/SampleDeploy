// MODULE IMPORTS
import { useState } from "react";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from "react-icons/md";

// STYLES IMPORT
import {
    CustomDiv, InputTag2, Label3, InputsContainer, Btn, Theme, Eye, Errors, Label4
} from './StyledComponents';

// ICON IMPORTS
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

import { savedToken } from '../DefaultData/DefaultData';

const ChangePassword = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const UserID = localStorage.getItem('userId');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showconfirmPassword, setShowConfirmPassword] = useState(false)

    const [errors, setErrors] = useState('')

    // FUNCTION TO VALIDATE PASSWORD 
    const validateForm = () => {
        let isValid = true;

        //  ENSURE PASSWORDS MATCH
        if (password !== confirmPassword) {
            setErrors('Passwords do not match');
            isValid = false;
            return isValid;
        }

        // MINIMUM 6 CHARACTERS, WITH AT LEAST ONE LETTER AND ONE NUMBER, AND ALLOWING SPECIAL CHARACTERS
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrors('Password must be at least 6 characters long and contain both letters and numbers');
            isValid = false;
            return isValid;
        }

        setErrors(null);

        return isValid;
    };

    // FUNCTION TO UPDATE PASSWORD
    const onUpdate = async () => {
        // VALIDATE THE FORM DATA BEFORE PROCEEDING
        const isValid = validateForm();

        // IF FORM VALIDATION FAILS, SHOW AN ERROR NOTIFICATION AND STOP THE PROCESS
        if (!isValid) {
            enqueueSnackbar('Please fix the errors before submitting.', {
                variant: 'error',
                autoHideDuration: 2000,
                preventDuplicate: true
            });
            return; // EXIT THE FUNCTION IF VALIDATION FAILS
        }

        // PREPARE THE DATA TO BE SENT TO THE SERVER (HERE, ONLY THE PASSWORD)
        const payload = {
            password,
        };

        // CONSTRUCT THE API URL WITH THE USERID TO UPDATE THE SPECIFIC USER PROFILE DATA
        const url = `${apiUrl}/update-user-profileData/${UserID}`;

        // CONFIGURE OPTIONS FOR THE FETCH REQUEST, USING THE PUT METHOD TO UPDATE DATA
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${savedToken}`
            },
            body: JSON.stringify(payload)
        };

        try {
            // MAKE AN ASYNCHRONOUS FETCH REQUEST TO THE API WITH THE SPECIFIED OPTIONS
            const response = await fetch(url, options);

            // CHECK IF THE RESPONSE FROM THE SERVER IS SUCCESSFUL
            if (response.ok) {
                setPassword('')
                setConfirmPassword('')
                setShowConfirmPassword(false)
                setShowPassword(false)
                // IF THE UPDATE IS SUCCESSFUL, SHOW A SUCCESS NOTIFICATION
                enqueueSnackbar('Password Updated Successfully!', {
                    preventDuplicate: true,
                    variant: 'success',
                    autoHideDuration: 1000
                });
            } else {
                // IF THE RESPONSE IS NOT SUCCESSFUL, EXTRACT ERROR DETAILS FROM THE RESPONSE
                const errorData = await response.json();
                console.error("Error Updating User Password:", errorData); // LOG THE ERROR DETAILS

                // SHOW AN ERROR NOTIFICATION WITH THE STATUS TEXT FROM THE RESPONSE
                enqueueSnackbar(`Error Updating User Password: ${response.statusText}`, {
                    variant: 'error',
                    autoHideDuration: 3000,
                    preventDuplicate: true
                });
            }
        } catch (error) {
            // IF THERE IS AN ERROR DURING THE FETCH REQUEST, LOG THE ERROR MESSAGE
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
                    <Typography>Change Pasword</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <CustomDiv>
                        <InputsContainer>
                            <InputTag2
                                required
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Label4>New Password</Label4>
                            {password &&
                                <Eye type="button" onClick={() => { setShowPassword(!showPassword) }}>
                                    {showPassword ?
                                        <IoIosEye /> :
                                        <IoIosEyeOff />
                                    }
                                </Eye>
                            }

                        </InputsContainer>

                        <InputsContainer>
                            <InputTag2
                                required
                                type={showconfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setShowPassword(false)
                                    setConfirmPassword(e.target.value)
                                }
                                }
                            />
                            <Label4>Confirm New Password</Label4>
                            {confirmPassword &&
                                <Eye type="button" onClick={() => { setShowConfirmPassword(!showconfirmPassword) }}>
                                    {showconfirmPassword ?
                                        <IoIosEye /> :
                                        <IoIosEyeOff />
                                    }
                                </Eye>
                            }

                        </InputsContainer>

                        <Errors>{errors}</Errors>
                        <Btn type='button' onClick={onUpdate}>Update</Btn>
                    </CustomDiv>
                </AccordionDetails>
            </Accordion>
            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
        </ThemeProvider>
    )
}

export default ChangePassword