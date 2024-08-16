import axios from 'axios'; 
import { getById } from '.';

const baseUrl = import.meta.env.VITE_API_URL;

const getAuthToken = () => {
    return localStorage.getItem('jwtToken');
};

export const getBedrijf = async () => {
    const authToken = getAuthToken();
    const response = await axios.get(`${baseUrl}/bedrijven/`, {
      headers: {
          Authorization: `Bearer ${authToken}`,
      },

    });
    return response;
};

export const getBedrijfById = async (url) => {
    // const authToken = getAuthToken();
    // const response = await axios.get(`${baseUrl}/bedrijven/${id}`, {
    //     headers: {
    //         Authorization: `Bearer ${authToken}`,
    //     },
    // });
    // return response;
  const data = await getById(url);
  return data;

}

export const updateBedrijfById = async (id, data) => {
  const authToken = getAuthToken();

  const formattedData = {
      BEDRIJFID: id,
      EMAIL: data.email,
      NAAM: data.naam,
      SECTOR: data.sector,
      TELEFOONNUMMER: data.telefoonnummer,
      WEBSITEURL: data.website,
      GEMEENTE: data.adres.gemeente,
      HUISNUMMER: data.adres.huisnummer,
      POSTCODE: data.adres.postcode,
      STRAAT: data.adres.straat
  };

  const response = await axios.post(`${baseUrl}/bedrijven/`, formattedData, {
      headers: {
          Authorization: `Bearer ${authToken}`,
      },
  });
  return response;
};

export const confirmUpdateById = async (id) => {
    const authToken = getAuthToken();
    const response = await axios.put(
      `${baseUrl}/bedrijven/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response;
};



export const getUserById = async (id) => {
    const authToken = getAuthToken();
    const response = await axios.get(`${baseUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    return response;
}

export const updateUserById = async (id,userData) => {
    const authToken = getAuthToken();
    const response = await axios.put(`${baseUrl}/users/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    return response;
}