import { getAll } from "../../api";

const formatBestelling = (bestelling) => {
    const formattedBestelling = {
        ...bestelling,
        datum: new Date(bestelling.datum),
        bedrag: parseFloat(bestelling.bedrag),
    };

    return formattedBestelling;
}

export const getAllBestellingen = async (url) => {
    const data = await getAll(url);

    return {
        ...data,
        items: data.items.map(formatBestelling),
    };
};