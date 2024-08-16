
const formatBedrag = (bedrag) => {
    if(typeof bedrag === 'string') {
        bedrag = parseFloat(bedrag);
    }

    return `\u20AC ${bedrag.toFixed(2).toString().split(".").join(",")}`;
}

export default function Bedrag({bedrag}) {
    return (<>
        {formatBedrag(bedrag)}
    </>)
}