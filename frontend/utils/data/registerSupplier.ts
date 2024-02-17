import axios from 'axios';

export const registerSupplier = async (data: SupplierUser) => {
    try {
        const response = await axios.post('http://localhost:5000/api/supplier', data);
        return response.data;
    } catch (error) {
        console.error('Error posting supplier data:', error);
        throw error;
    }
};