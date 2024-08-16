import { formatBedrag } from "./bedrag"
import { formatDate } from "./date"

export function formatBestelling({id, datum, bedrag, ...rest}) {
    return {
        id: id.split('-').slice(-1).toString().toUpperCase(),
        datum: formatDate(new Date(datum)),
        bedrag: formatBedrag(bedrag),
        ...rest
    }
}