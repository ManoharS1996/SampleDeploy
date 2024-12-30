import React, { useState,useEffect} from "react";
import axios from "axios";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";  // For date manipulation
import moment from 'moment-timezone';

export default function ImageUploader3() {
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [retrievedDateTime, setRetrievedDateTime] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    // Fetch date-time on component mount
    useEffect(() => {
        fetchDateTime();
    }, []);

    // Function to handle date change
    const handleDateChange = (newValue) => {
        setSelectedDateTime(newValue);
    };

    // Function to send the selected date-time to the backend
    const submitDateTime = async () => {
        // if (selectedDateTime) {
        //     // Convert the date to UTC before sending it to the backend
        //     const utcDateTime = selectedDateTime.utc().format();

        //     try {
        //         const response = await axios.post(`${apiUrl}/save-datetime`, { dateTime: utcDateTime });
        //         alert("Date and time saved successfully!");
        //     } catch (error) {
        //         console.error("There was an error saving the date and time!", error);
        //     }
        // } else {
        //     alert("Please select a date and time!");
        // }

        if (selectedDateTime) {
            // Convert selected IST time to UTC
            const utcDateTime = moment.tz(selectedDateTime, "Asia/Kolkata").utc().format("YYYY-MM-DD HH:mm:ss");
            
            // Send to backend
            try {
                await axios.post(`${apiUrl}/schedule-payment`, { utcDateTime });
                alert("Payment scheduled successfully!");
            } catch (error) {
                console.error("Error scheduling payment:", error);
            }
        }
    };

    // Fetch the stored date-time and convert it to the local timezone
    const fetchDateTime = async () => {
        try {
            // console.log('thissssss')
            const response = await axios.get(`${apiUrl}/get-datetime`);
            console.log(response.data.utcDateTime,'the date')
            setRetrievedDateTime(response.data.localDateTime);  // Set the retrieved local time
        } catch (error) {
            console.error("There was an error fetching the date and time!", error);
        }
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                        label="With Time Clock"
                        value={selectedDateTime}
                        onChange={handleDateChange}
                    />
                </DemoContainer>
            </LocalizationProvider>

            {/* Button to submit the selected date-time */}
            <button onClick={submitDateTime}>Submit Date-Time</button>

            {/* Display the retrieved date-time in local timezone */}
            {retrievedDateTime && (
                <div>
                    <h3>Retrieved Date-Time (Local Time): {retrievedDateTime}</h3>
                </div>
            )}
        </div>
    );
}
