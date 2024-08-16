import axios from 'axios'; 
import { getById } from '../../api';

const baseUrl = import.meta.env.VITE_API_URL;

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

export const getByBestellingId = async (url) => {
    const data = await getById(url);
    return data;
};

export const getProductenInBestelling = async (url) =>{
    const data = await getById(url);
    return data;
}

export const getByKlantId = async (id) => {
    const response = await axios.get(`${baseUrl}/bestellingen/klant/${id}`);
    return response;
};

export const getByLeverancierId = async (id) => {
    const response = await axios.get(`${baseUrl}/bestellingen/leverancier/${id}`);
    return response;
};





