import axios from 'axios';

const getTimeZone = async () => {
    try {
        const fetchTimeZone = async (latitude, longitude) => {
            const apiKey = 'V66WO7E5MJHQ'; 

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
                return response.data.zoneName;
            } else {
                throw new Error(response.data.message);
            }
        };

        const getLocation = () => {
            return new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            const { latitude, longitude } = position.coords;
                            resolve({ latitude, longitude });
                        },
                        error => reject('Error fetching location.')
                    );
                } else {
                    reject('Geolocation not supported by this browser.');
                }
            });
        };

        const location = await getLocation();
        const timeZone = await fetchTimeZone(location.latitude, location.longitude);
        return timeZone;
    } catch (error) {
        throw new Error(error);
    }
};

export default getTimeZone;
