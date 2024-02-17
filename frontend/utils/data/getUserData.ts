import axios from "axios";

export const getSupplierData = async (authId: string) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/supplier/${authId}`)
        return response
    } catch (error) {
        console.error('Error posting supplier data:', error);
    }
}

export const getCharityData = async (authId: string) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/charity/${authId}`)
        return response
    } catch (error) {
        console.error('Error posting supplier data:', error);
    }
}