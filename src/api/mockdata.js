export function getAllBestellingen({ paginaIndex }) {
    return {
        "items": [{
            "id": "1",
            "datum": "2024-04-17",
            "bedrag": 50.99,
            "orderstatus": "In afwachting",
            "betaalstatus": "Niet betaald"
        },
        {
            "id": "2",
            "datum": "2024-04-16",
            "bedrag": 75.49,
            "orderstatus": "Verzonden",
            "betaalstatus": "Betaald"
        },
        {
            "id": "3",
            "datum": "2024-04-15",
            "bedrag": 32.00,
            "orderstatus": "In behandeling",
            "betaalstatus": "Betaald"
        },
        {
            "id": "4",
            "datum": "2024-04-14",
            "bedrag": 120.00,
            "orderstatus": "Afgeleverd",
            "betaalstatus": "Betaald"
        },
        {
            "id": "5",
            "datum": "2024-04-13",
            "bedrag": 27.95,
            "orderstatus": "Geannuleerd",
            "betaalstatus": "Niet betaald"
        },
        {
            "id": "6",
            "datum": "2024-04-12",
            "bedrag": 99.99,
            "orderstatus": "In afwachting",
            "betaalstatus": "Niet betaald"
        },
        {
            "id": "7",
            "datum": "2024-04-11",
            "bedrag": 45.00,
            "orderstatus": "Verzonden",
            "betaalstatus": "Betaald"
        },
        {
            "id": "8",
            "datum": "2024-04-10",
            "bedrag": 65.75,
            "orderstatus": "In behandeling",
            "betaalstatus": "Betaald"
        },
        {
            "id": "9",
            "datum": "2024-04-09",
            "bedrag": 150.00,
            "orderstatus": "Afgeleverd",
            "betaalstatus": "Betaald"
        },
        {
            "id": "10",
            "datum": "2024-04-08",
            "bedrag": 37.50,
            "orderstatus": "In afwachting",
            "betaalstatus": "Niet betaald"
        },
        {
            "id": "11",
            "datum": "2024-04-07",
            "bedrag": 80.00,
            "orderstatus": "Verzonden",
            "betaalstatus": "Betaald"
        },
        {
            "id": "12",
            "datum": "2024-04-06",
            "bedrag": 22.95,
            "orderstatus": "In behandeling",
            "betaalstatus": "Betaald"
        },
        {
            "id": "13",
            "datum": "2024-04-05",
            "bedrag": 200.00,
            "orderstatus": "Afgeleverd",
            "betaalstatus": "Betaald"
        },
        {
            "id": "14",
            "datum": "2024-04-04",
            "bedrag": 15.99,
            "orderstatus": "Geannuleerd",
            "betaalstatus": "Niet betaald"
        },
        {
            "id": "15",
            "datum": "2024-04-03",
            "bedrag": 60.50,
            "orderstatus": "In afwachting",
            "betaalstatus": "Niet betaald"
        },
        {
            "id": "16",
            "datum": "2024-04-02",
            "bedrag": 90.25,
            "orderstatus": "Verzonden",
            "betaalstatus": "Betaald"
        },
        {
            "id": "17",
            "datum": "2024-04-01",
            "bedrag": 42.00,
            "orderstatus": "In behandeling",
            "betaalstatus": "Betaald"
        },
        {
            "id": "18",
            "datum": "2024-03-31",
            "bedrag": 110.00,
            "orderstatus": "Afgeleverd",
            "betaalstatus": "Betaald"
        },
        {
            "id": "19",
            "datum": "2024-03-30",
            "bedrag": 25.75,
            "orderstatus": "In afwachting",
            "betaalstatus": "Niet betaald"
        },
        {
            "id": "20",
            "datum": "2024-03-29",
            "bedrag": 75.99,
            "orderstatus": "Verzonden",
            "betaalstatus": "Betaald"
        }
        ],
        "huidigePagina": paginaIndex || 0,
        "aantalRijen": 100,
        "aantalPaginas": 5
    }

}

export function get5Notifications() {
    return {
        "notifications": [
            {
                id: 1,
                avatar: "Apple, Inc..png",
                title: "Betalingsverzoek",
                description: "Apple heeft een betaling verzocht voor bestelling #12",
                timestamp: "Nu"
            },
            {
                id: 2,
                avatar: "Proximus.png",
                title: "Ontvangen betaling",
                description: "Proximus heeft bestelling #2 betaald",
                timestamp: "2 uur geleden"
            },
            {
                id: 3,
                avatar: "Tesla, Inc..png",
                title: "Ontvangen betaling",
                description: "Tesla heeft bestelling #3 betaald",
                timestamp: "Nu"
            },
            {
                id: 4,
                avatar: "Apple, Inc..png",
                title: "Betalingsverzoek",
                description: "Apple heeft een betaling verzocht voor bestelling #13",
                timestamp: "4 uur geleden"
            },
            {
                id: 5,
                avatar: "Amazon.com, Inc..png",
                title: "Bestelling klaar",
                description: "Alle producten voor bestelling #20 zijn in stock",
                timestamp: "5 uur geleden"
            },
        ]
    };
}

export function getBestelling() {
    return {
        "bestelling": [
            {
                "id": "2",
                "datum": "2024-04-16",
                "laatsteBetalingsherinnering": "2024-04-20",
                "bedrag": 75.49,
                "orderstatus": "Verzonden",
                "betaalstatus": "Betaald",
                "bus": "A",
                "gemeente": "Brussel",
                "huisnummer": 12,
                "postcode": 9000,
                "straat": "zavelstraat",
            },
        ]
    }
}

export function getKlantGegevens() {
    return {
        "klant": [
            {
                "naam": "Verstraeten",
                "voornaam": "Corneelus",
                "email": "corneelus.verstraeten@gmail.com",
                "telefoon": "+32 483 74 50 75",
            },
        ]
    }
}


export function getAllNotification(paginaIndex) {
    if (paginaIndex === 1) {
        return {
            items: [
                {
                    id: 1,
                    avatar: "Apple, Inc..png",
                    title: "Betalingsverzoek",
                    description: "Apple heeft een betaling verzocht voor bestelling #12",
                    timestamp: "Nu",
                    
                },
                {
                    id: 2,
                    avatar: "Proximus.png",
                    title: "Ontvangen betaling",
                    description: "Proximus heeft bestelling #2 betaald",
                    timestamp: "2 uur geleden",
                    
                },
                {
                    id: 3,
                    avatar: "Tesla, Inc..png",
                    title: "Ontvangen betaling",
                    description: "Tesla heeft bestelling #3 betaald",
                    timestamp: "Nu",
                    
                },
                {
                    id: 4,
                    avatar: "Apple, Inc..png",
                    title: "Betalingsverzoek",
                    description: "Apple heeft een betaling verzocht voor bestelling #13",
                    timestamp: "4 uur geleden",
                    
                },
                {
                    id: 5,
                    avatar: "Amazon.com, Inc..png",
                    title: "Bestelling klaar",
                    description: "Alle producten voor bestelling #20 zijn in stock",
                    timestamp: "5 uur geleden",
                    
                },
                {
                    id: 11,
                    avatar: "Microsoft.png",
                    title: "Betalingsverzoek",
                    description: "Microsoft heeft een betaling verzocht voor bestelling #35",
                    timestamp: "Nu",
                    
                },
                {
                    id: 12,
                    avatar: "Netflix.png",
                    title: "Ontvangen betaling",
                    description: "Netflix heeft bestelling #8 betaald",
                    timestamp: "3 uur geleden",
                    
                },
                {
                    id: 13,
                    avatar: "Google.png",
                    title: "Ontvangen betaling",
                    description: "Google heeft bestelling #27 betaald",
                    timestamp: "Nu",
                    
                },
                {
                    id: 14,
                    avatar: "Samsung.png",
                    title: "Betalingsverzoek",
                    description: "Samsung heeft een betaling verzocht voor bestelling #42",
                    timestamp: "1 uur geleden",
                    
                },
                {
                    id: 15,
                    avatar: "Amazon.com, Inc..png",
                    title: "Bestelling klaar",
                    description: "Alle producten voor bestelling #38 zijn in stock",
                    timestamp: "6 uur geleden",
                    
                },
            ]
        };
    }
    else if (paginaIndex === 2) {
        return {
            items: [
                {
                    id: 16,
                    avatar: "Sony.png",
                    title: "Betalingsverzoek",
                    description: "Sony heeft een betaling verzocht voor bestelling #19",
                    timestamp: "Nu"
                },
                {
                    id: 17,
                    avatar: "Alibaba Group Holding Limited.png",
                    title: "Ontvangen betaling",
                    description: "Alibaba heeft bestelling #5 betaald",
                    timestamp: "4 uur geleden"
                },
                {
                    id: 18,
                    avatar: "Intel.png",
                    title: "Bestelling klaar",
                    description: "Alle producten voor bestelling #41 zijn in stock",
                    timestamp: "2 uur geleden"
                },
                {
                    id: 19,
                    avatar: "Facebook, Inc..png",
                    title: "Betalingsverzoek",
                    description: "Facebook heeft een betaling verzocht voor bestelling #28",
                    timestamp: "5 uur geleden"
                },
                {
                    id: 20,
                    avatar: "Toyota.png",
                    title: "Ontvangen betaling",
                    description: "Toyota heeft bestelling #14 betaald",
                    timestamp: "Nu"
                }
            ]
        };
    }
}

export function getNotificationById(id) {
    let items = [
        {
            id: 1,
            avatar: "Apple, Inc..png",
            title: "Betalingsverzoek",
            description: "Apple heeft een betaling verzocht voor bestelling #12",
            timestamp: "Nu",
            bestellingId: 12
        },
        {
            id: 2,
            avatar: "Proximus.png",
            title: "Ontvangen betaling",
            description: "Proximus heeft bestelling #2 betaald",
            timestamp: "2 uur geleden",
            bestellingId: 2
        },
        {
            id: 3,
            avatar: "Tesla, Inc..png",
            title: "Ontvangen betaling",
            description: "Tesla heeft bestelling #3 betaald",
            timestamp: "Nu",
            bestellingId: 3
        },
        {
            id: 4,
            avatar: "Apple, Inc..png",
            title: "Betalingsverzoek",
            description: "Apple heeft een betaling verzocht voor bestelling #13",
            timestamp: "4 uur geleden",
            bestellingId: 13
        },
        {
            id: 5,
            avatar: "Amazon.com, Inc..png",
            title: "Bestelling klaar",
            description: "Alle producten voor bestelling #20 zijn in stock",
            timestamp: "5 uur geleden",
            bestellingId: 20
        },
        {
            id: 11,
            avatar: "Microsoft.png",
            title: "Betalingsverzoek",
            description: "Microsoft heeft een betaling verzocht voor bestelling #35",
            timestamp: "Nu",
            bestellingId: 35
        },
        {
            id: 12,
            avatar: "Netflix.png",
            title: "Ontvangen betaling",
            description: "Netflix heeft bestelling #8 betaald",
            timestamp: "3 uur geleden",
            bestellingId: 8
        },
        {
            id: 13,
            avatar: "Google.png",
            title: "Ontvangen betaling",
            description: "Google heeft bestelling #27 betaald",
            timestamp: "Nu",
            bestellingId: 27
        },
        {
            id: 14,
            avatar: "Samsung.png",
            title: "Betalingsverzoek",
            description: "Samsung heeft een betaling verzocht voor bestelling #42",
            timestamp: "1 uur geleden",
            bestellingId: 42
        },
        {
            id: 15,
            avatar: "Amazon.com, Inc..png",
            title: "Bestelling klaar",
            description: "Alle producten voor bestelling #38 zijn in stock",
            timestamp: "6 uur geleden",
            bestellingId: 38
        },
        {
            id: 16,
            avatar: "Sony.png",
            title: "Betalingsverzoek",
            description: "Sony heeft een betaling verzocht voor bestelling #19",
            timestamp: "Nu",
            bestellingId: 19
        },
        {
            id: 17,
            avatar: "Alibaba Group Holding Limited.png",
            title: "Ontvangen betaling",
            description: "Alibaba heeft bestelling #5 betaald",
            timestamp: "4 uur geleden",
            bestellingId: 5
        },
        {
            id: 18,
            avatar: "Intel.png",
            title: "Bestelling klaar",
            description: "Alle producten voor bestelling #41 zijn in stock",
            timestamp: "2 uur geleden",
            bestellingId: 41
        },
        {
            id: 19,
            avatar: "Facebook, Inc..png",
            title: "Betalingsverzoek",
            description: "Facebook heeft een betaling verzocht voor bestelling #28",
            timestamp: "5 uur geleden",
            bestellingId: 28
        },
        {
            id: 20,
            avatar: "Toyota.png",
            title: "Ontvangen betaling",
            description: "Toyota heeft bestelling #14 betaald",
            timestamp: "Nu",
            bestellingId: 14
        }
    ]
    return items.find(item => item.id === id);
}

export function getProductenInBestelling() {
    return {
        "producten": [
            {
                "productid": 1,
                "productnaam": "Router",
                "voorradig": true,
                "eenheidsprijs": 5.99,
                "aantal": 2,
                "totaal": 11.98
            },
            {
                "productid": 2,
                "productnaam": "CPU",
                "voorradig": true,
                "eenheidsprijs": 7.49,
                "aantal": 3,
                "totaal": 22.47
            },
            {
                "productid": 3,
                "productnaam": "Ethernet cable",
                "voorradig": true,
                "eenheidsprijs": 9.99,
                "aantal": 1,
                "totaal": 9.99
            },
            {
                "productid": 4,
                "productnaam": "Network adapter",
                "voorradig": false,
                "eenheidsprijs": 12.99,
                "aantal": 5,
                "totaal": 64.95
            },
            {
                "productid": 5,
                "productnaam": "Switch",
                "voorradig": false,
                "eenheidsprijs": 3.75,
                "aantal": 4,
                "totaal": 15
            }
        ]
    }
}
