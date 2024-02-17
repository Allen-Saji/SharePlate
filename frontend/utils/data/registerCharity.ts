import axios from 'axios';

export const registerCharity = async (data: CharityUser) => {
    try {
        const response = await axios.post('http://localhost:5000/api/charity', data);
        return response.data;
    } catch (error) {
        console.error('Error posting supplier data:', error);
        throw error;
    }
};