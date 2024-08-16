import {getAll} from '../../api';

export const getAllProducten = async (queryString) => {
  const response = await getAll(`producten${queryString}`)
  return response;
};
