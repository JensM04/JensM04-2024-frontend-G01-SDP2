import axios from 'axios'; 

const baseUrl = import.meta.env.VITE_API_URL;

const getAuthToken = () => {
    return localStorage.getItem('jwtToken');
  };


export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

export const getByBestellingId = async (id) => {
    const authToken = getAuthToken();
    const response = await axios.get(`${baseUrl}/bestellingen/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response;
};

export const getProductenInBestelling = async (bestellingid) =>{
    const authToken = getAuthToken();
    const producten = await axios.get(`${baseUrl}/productenBestelling/${bestellingid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return producten;
}

export const getByKlantId = async (id) => {
    const response = await axios.get(`${baseUrl}/bestellingen/klant/${id}`);
    return response;
};

export const getByLeverancierId = async (id) => {
    const response = await axios.get(`${baseUrl}/bestellingen/leverancier/${id}`);
    return response;
};





