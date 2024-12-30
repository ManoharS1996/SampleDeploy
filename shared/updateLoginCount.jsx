import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const updateLogincount = async (userId) => {
    const url = `${apiUrl}/api/update-login-count`;

    try {
        const response = await axios.post(url, { userId });
        console.log('Login count updated:', response.data);
        return response.data; // Return response data for further handling
    } catch (err) {
        console.error('Error updating login count:', err.message);
        return { error: err.message }; // Return an error object for handling
    }
};
export default updateLogincount