const formatter = new Intl.DateTimeFormat('nl-BE', {day: '2-digit', month: '2-digit', year: 'numeric'});

export function formatDate(dateObject) {
    return formatter.format(dateObject);
}