import axios from 'axios'; 

import { getById } from './index';

const baseUrl = import.meta.env.VITE_API_URL + '/notificaties';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
}

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

export const getNotificatieById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response;
};

export const getEerste5Notificaties = async () => {
    const response = await axios.get(`${baseUrl}/recent`);
    return response;
  };

 export const getLaatsteNotificatie = async (url) => {
    const data = await getById(url);
    return data
  }
  




