import React, { useState } from "react";
import axios from "axios";
// import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function ImageUploader2() {
    const [postImage, setPostImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [uploadedImageId, setUploadedImageId] = useState("");

    const url = "http://localhost:3001/uploads";
    const createImage = (newImage) => axios.post(url, newImage);

    const createPost = async (post) => {
        try {
            const response = await createImage(post);
            const { id } = response.data.createdPost;
            setUploadedImageId(id); // Store the uploaded image ID
            setImageUrl(`http://localhost:3001/uploads/${id}`); // Update image URL
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (postImage) {
            createPost(postImage);
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result.split(',')[1]); // Extract base64 string without the data URL prefix
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ myFile: base64 });
    };

    return (
        <div>
            {/* <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    label="Image"
                    name="myFile"
                    accept=".jpeg, .png, .jpg"
                    onChange={(e) => handleFileUpload(e)}
                />
                <button type="submit">Submit</button>
            </form>
            {imageUrl && <img src={imageUrl} alt="Uploaded" />} */}


            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                        label="With Time Clock"
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                        }}
                    />
                    <DateTimePicker
                        label="Without view renderers"
                        viewRenderers={{
                            hours: null,
                            minutes: null,
                            seconds: null,
                        }}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
}
