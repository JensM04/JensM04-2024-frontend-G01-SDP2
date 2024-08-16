export function formatBedrag(bedrag) {
    if(typeof bedrag === 'string') {
        bedrag = parseFloat(bedrag);
    } 

    return `\u20AC ${bedrag.toFixed(2)}`;
}