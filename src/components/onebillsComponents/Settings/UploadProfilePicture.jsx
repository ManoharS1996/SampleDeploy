// MODULE IMPORTS
import { useState, useEffect } from "react";
import axios from "axios";
import { enqueueSnackbar } from 'notistack';

// ICON IMPORTS
import { RiUploadCloud2Fill } from "react-icons/ri";
import { FaUserLarge } from "react-icons/fa6";
import { savedToken } from '../DefaultData/DefaultData';

import { InputTag, Upload, LogoLabel, ImgTag, InputsContainer, ProfileIcon } from './StyledComponents';

const UploadProfilePicture = () => {
    const storedUserId = localStorage.getItem('userId');
    const apiUrl = import.meta.env.VITE_API_URL;
    const [message, setMessage] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    // URL FOR FETCHING THE USER'S PROFILE PICTURE
    const fetchProfilePictureUrl = `${apiUrl}/user-profile-picture/${storedUserId}`;

    useEffect(() => {
        fetchProfilePicture(); // FETCH PROFILE PICTURE WHEN COMPONENT MOUNTS
    }, []);

    // FUNCTION TO FETCH PROFILE PICTURE
    const fetchProfilePicture = async () => {
        try {
            const response = await axios.get(fetchProfilePictureUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${savedToken}`
                }
            });
            console.log(response.data.profile_picture);
            setProfilePicture(response.data.profile_picture); // SET THE PROFILE PICTURE STATE
        } catch (error) {
            console.error("Error fetching profile picture:", error.message);
        }
    };

    // FUNCTION TO HANDLE PROFILE PICTURE IMAGE CHANGE
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type === 'image/jpeg') {
            uploadFile(selectedFile);
        } else {
            enqueueSnackbar(`Please select a JPEG image.`, { preventDuplicate: true, variant: 'error', autoHideDuration: 1000 });
        }
    };

    const uploadFile = async (file) => {
        if (!file) {
            setMessage('No file selected or file is not a JPEG image.');
            return;
        }

        const formData = new FormData();
        formData.append('profile_picture', file);

        try {
            const response = await axios.post(`${apiUrl}/upload-profile-picture/${storedUserId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
            enqueueSnackbar(`Profile Picture Updated Successfully!`, { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });
            fetchProfilePicture(); // REFRESH PROFILE PICTURE AFTER UPLOAD
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <InputsContainer style={{ justifyContent: 'flex-start',alignItems:'flex-end' }}>
                <InputTag id='logo'
                    type="file"
                    accept='.jpg, .jpeg'
                    onChange={handleFileChange}
                />

                <Upload >
                    {profilePicture ? (
                        <ImgTag
                            src={`data:image/jpeg;base64,${profilePicture.image}`} // BASE64 IMAGE
                            alt="Profile Picture"
                        />
                    ) : (
                        <ProfileIcon>
                            <FaUserLarge />
                        </ProfileIcon>
                    )}


                </Upload>

                <LogoLabel htmlFor="logo">Upload
                    <RiUploadCloud2Fill size={20} style={{ margin: '0 0 0 0.9rem' }} />
                </LogoLabel>


            </InputsContainer>
        </>
    );
};

export default UploadProfilePicture;
