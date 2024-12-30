import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TimeZoneComponent = () => {
    const [timeZone, setTimeZone] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimeZone = async (latitude, longitude) => {
            try {
                const apiKey = 'V66WO7E5MJHQ'; // Replace with your API key

                const response = await axios.get('https://api.timezonedb.com/v2.1/get-time-zone', {
                    params: {
                        key: apiKey,
                        format: 'json',
                        by: 'position',
                        lat: latitude,
                        lng: longitude,
                    },
                });

                if (response.data.status === 'OK') {
                    setTimeZone(response.data.zoneName);
                } else {
                    throw new Error(response.data.message);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        fetchTimeZone(latitude, longitude);
                    },
                    error => {
                        setError('Error fetching location.');
                    }
                );
            } else {
                setError('Geolocation not supported by this browser.');
            }
        };

        getLocation();
    }, []);

    return (
        <div>
            <h1>Current Time Zone</h1>
            {error ? <p>Error: {error}</p> : <p>{timeZone ? `Your time zone is: ${timeZone}` : 'Loading...'}</p>}
        </div>
    );
};

export default TimeZoneComponent;
