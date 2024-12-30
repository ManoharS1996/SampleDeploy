import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const storedUserId = localStorage.getItem('userId');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    // URL for fetching the user's profile picture
    const fetchProfilePictureUrl = `http://localhost:3001/user-profile-picture/${storedUserId}`;

    useEffect(() => {
        fetchProfilePicture(); // Fetch profile picture when component mounts
    }, []);

    const fetchProfilePicture = async () => {
        try {
            const response = await axios.get(fetchProfilePictureUrl);
            console.log(response.data.profile_picture)
            setProfilePicture(response.data.profile_picture); // Set the profile picture state
        } catch (error) {
            console.log("Error fetching profile picture:", error.message);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type === 'image/jpeg') {
            setFile(selectedFile);
        } else {
            setMessage('Please select a JPEG image.');
        }
    };

    const uploadFile = async () => {
        if (!file) {
            setMessage('No file selected or file is not a JPEG image.');
            return;
        }

        const formData = new FormData();
        formData.append('profile_picture', file);

        try {
            const response = await axios.post(`http://localhost:3001/upload-profile-picture/${storedUserId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
            fetchProfilePicture(); // Refresh profile picture after upload
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Upload Profile Picture</h1>
            <input 
                type="file" 
                onChange={handleFileChange} 
                accept='.jpg, .jpeg'
            />
            <button onClick={uploadFile}>Upload File</button>
            <p>{message}</p>

            {profilePicture && (
                <div>
                    <h2>Profile Picture</h2>
                    <img
                        src={`data:image/jpeg;base64,${profilePicture.image}`} // Base64 image
                        alt="Profile Picture"
                        style={{ width: '20rem', height: '20rem', objectFit: 'contain', border: '2px solid red' }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
