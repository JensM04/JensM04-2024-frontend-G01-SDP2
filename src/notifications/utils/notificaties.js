import { getAll, getById } from "../../api";

export const getAllNotifs = async (url) => {
    const data = await getAll(url);
    return data;
}

export const getNotifById = async (url) => {
    const data = await getById(url);
    return data;
}

// export const createNotif = async (url, bestellingId, leverancierId, klantId) => {
//     const data = await createNotif(url, bestellingId, leverancierId, klantId);
//     return data;
// }