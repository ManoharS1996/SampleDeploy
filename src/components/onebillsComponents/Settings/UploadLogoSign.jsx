// MODULE IMPORTS
import { useState, useEffect } from "react";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

// ICON IMPORTS
import { RiUploadCloud2Fill } from "react-icons/ri";
import { GoOrganization } from "react-icons/go";
import { AiFillSignature } from "react-icons/ai";

// STYLE IMPORTS
import { InputTag, Upload, LogoLabel, ImgTag, InputsContainer, ProfileIcon } from './StyledComponents';

const UploadLogoSign = () => {
    const storedUserId = localStorage.getItem('userId');
    const apiUrl = import.meta.env.VITE_API_URL;
    const [companyLogo, setCompanyLogo] = useState(null);
    const [signature, setSignature] = useState(null)

    // URL FOR FETCHING THE USER'S PROFILE PICTURE
    const fetchCompanyLogoUrl = `${apiUrl}/user-logo-sign/${storedUserId}`;

    useEffect(() => {
        fetchLogoSign(); // FETCH PROFILE PICTURE WHEN COMPONENT MOUNTS
    }, []);

    // FUNCTION TO FETCH LOGO AND SIGNATURE
    const fetchLogoSign = async () => {
        try {
            const response = await axios.get(fetchCompanyLogoUrl);
            setCompanyLogo(response.data.company_logo);
            setSignature(response.data.signature)
        } catch (error) {
            console.error("Error fetching Logo and sign:", error.message);
        }
    };

    // FUNCTION TO HANDLE LOGO IMAGE CHANGE
    const handleCompanyLogoFileChange = async (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type === 'image/jpeg') {
            uploadCompanyLogoFile(selectedFile) // CALLING uploadCompanyLogoFile TO UPLOAD
        } else {
            enqueueSnackbar(`Please select a JPEG image.`, { preventDuplicate: true, variant: 'error', autoHideDuration: 1000 });
        }

    };

    // FUNCTION TO UPLOAD LOGO IMAGE 
    const uploadCompanyLogoFile = async (file) => {
        if (!file) {
            enqueueSnackbar(`No file selected or file is not a JPEG image.`, { preventDuplicate: true, variant: 'error', autoHideDuration: 1000 });
            return;
        }

        const formData = new FormData();
        formData.append('company_logo', file);

        try {
            const response = await axios.post(`${apiUrl}/upload-company-logo/${storedUserId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            enqueueSnackbar(`${response.data.message}`, { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });
            fetchLogoSign(); // REFRESH PROFILE PICTURE AFTER UPLOAD
        } catch (error) {
            console.error(`Error: ${error.message}`)
            enqueueSnackbar(`Error: ${error.message}`, { preventDuplicate: true, variant: 'error', autoHideDuration: 1000 });
        }
    };

    // FUNCTION TO HANDLE SIGNATURE IMAGE CHANGE
    const handleSignatureFileChange = async (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type === 'image/jpeg') {
            uploadSignatureFile(selectedFile) // CALLING uploadSignatureFile TO UPLOAD
        } else {
            enqueueSnackbar(`Please select a JPEG image.`, { preventDuplicate: true, variant: 'error', autoHideDuration: 1000 });
        }

    };

    // FUNCTION TO UPLOAD SIGNATURE IMAGE
    const uploadSignatureFile = async (file) => {
        if (!file) {
            enqueueSnackbar(`No file selected or file is not a JPEG image.`, { preventDuplicate: true, variant: 'error', autoHideDuration: 1000 });
            return;
        }

        const formData = new FormData();
        formData.append('signature', file);

        try {
            const response = await axios.post(`${apiUrl}/upload-signature/${storedUserId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            enqueueSnackbar(`${response.data.message}`, { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });
            fetchLogoSign(); // REFRESH SIGNATURE IMAGE AFTER UPLOAD
        } catch (error) {
            enqueueSnackbar(`Error: ${error.message}`, { preventDuplicate: true, variant: 'error', autoHideDuration: 1000 });
        }
    };

    return (
        <>
            <InputsContainer style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                <InputTag id='companyLogo'
                    type="file"
                    accept='.jpg, .jpeg'
                    onChange={(e) => handleCompanyLogoFileChange(e)}
                />

                <Upload>
                    {companyLogo ? (
                        <ImgTag
                            src={`data:image/jpeg;base64,${companyLogo.image}`} // BASE64 IMAGE
                            alt="companyLogo"
                        />
                    ) :
                        <ProfileIcon>
                            <GoOrganization />
                        </ProfileIcon>
                    }

                </Upload>
                <LogoLabel htmlFor="companyLogo">Company Logo<RiUploadCloud2Fill size={20} style={{ margin: '0 0.5rem' }} /></LogoLabel>
            </InputsContainer>

            <InputsContainer style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>

                <InputTag id='signLogo'
                    type="file"
                    accept='.jpg, .jpeg'
                    onChange={(e) => handleSignatureFileChange(e)}
                />

                <Upload>
                    {signature ? (
                        <ImgTag
                            src={`data:image/jpeg;base64,${signature.image}`} // BASE64 IMAGE
                            alt="Sign"
                        />
                    ) :
                        <ProfileIcon>
                            <AiFillSignature />
                        </ProfileIcon>
                    }
                </Upload>
                <LogoLabel htmlFor="signLogo">Signature<RiUploadCloud2Fill size={20} style={{ margin: '0 0.5rem' }} /></LogoLabel>
            </InputsContainer>

            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
        </>
    );
};

export default UploadLogoSign;
