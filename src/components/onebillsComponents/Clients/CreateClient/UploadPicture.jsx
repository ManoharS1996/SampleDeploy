import { useState } from 'react';
import axios from 'axios';
import { SlUserFollow } from 'react-icons/sl';
import { enqueueSnackbar } from 'notistack';
import {
    ImgInput, ImgLabel, Imgicon, ImgDiv, ImgTag, ErrorText
} from './StyledComponents'

const ImageUpload = ({ id, fetchClientData, defaultImg, setParentErrors, view }) => {
    const [profilePictureObj, setProfilePictureObj] = useState('');
    const [errors, setErrors] = useState({});
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type === 'image/jpeg') {
            setProfilePictureObj(selectedFile);
            await uploadFile(selectedFile);
        } else {
            const errorMsg = 'Please select a JPEG image.';
            setErrors({ profile_picture: errorMsg });
            setParentErrors({ profile_picture: errorMsg });
        }
    };

    const uploadFile = async (file) => {
        let errorMessages = null;

        if (!file || file.type !== 'image/jpeg') {
            errorMessages = { profile_picture: 'File is not a JPEG image.' };
            setErrors(errorMessages);
            setParentErrors(errorMessages);
            return;
        }

        const formData = new FormData();
        formData.append('profile_picture', file);

        try {
            const response = await axios.put(`${apiUrl}/upload-client-img/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (view === 'detail') {
                fetchClientData();
            }

            enqueueSnackbar('Profile Pic uploaded successfully!', { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 });
            console.log('File uploaded successfully:', response.data.message);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'An error occurred during upload.';
            errorMessages = { profile_picture: errorMsg };
            setErrors(errorMessages);
            setParentErrors(errorMessages);
        }
    };

    return (
        <ImgDiv style={{ position: 'relative' }}>
            <ImgLabel title='upload image' htmlFor='Profile' style={{ border: errors['profile_picture'] ? '2px solid red' : '' }}>
                {profilePictureObj !== '' ? (
                    <ImgTag src={URL.createObjectURL(profilePictureObj)} alt='profilePic' />
                ) : defaultImg ? (
                    <ImgTag src={`data:image/jpeg;base64,${defaultImg}`} alt='profilePic' />
                ) : (
                    <Imgicon >
                        <SlUserFollow />
                    </Imgicon>
                )}
                {errors['profile_picture'] && (
                    <ErrorText style={{ bottom: '-1rem' }}>{errors['profile_picture']}</ErrorText>
                )}
            </ImgLabel>

            <ImgInput
                id='Profile'
                type='file'
                accept='.jpg, .jpeg'
                onChange={handleFileChange}
            />
        </ImgDiv>
    );
};

export default ImageUpload;




