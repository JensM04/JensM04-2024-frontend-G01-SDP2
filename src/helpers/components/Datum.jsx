const formatter = new Intl.DateTimeFormat("nl-BE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function formatDate(dateObject) {
  return formatter.format(dateObject);
}

export default function Datum({ datum }) {
  return <>{formatDate(datum)}</>;
}
