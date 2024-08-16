# G01 - Software Development Project II - Front-End Web Applicatie

## Studenten

| Naam                  | E-mail                                    | StudentenNr |
| --------------------- | ----------------------------------------- | ----------- |
| Michiel Van Hoorebeke | <michiel.vanhoorebeke2@student.hogent.be> | 202293204   |
| Jens Meersschaert     | <jens.meersschaert@student.hogent.be>     | 202289299   |
| Corneel Verstraeten   | <corneel.verstraeten@student.hogent.be>   | 202184154   |
| Kevin Wauman          | <kevin.wauman@student.hogent.be>          |             |
| Viktor Huygebaert     | <viktor.huygebaert@student.hogent.be>     | 202290063   |

## Doel van de applicatie

Het doel van deze applicatie is een interface te voorzien voor klanten en leveranciers om hun geplaatste bestellingen en/of bestellingen bij hen geplaatst te gaan raadplegen.

Hiernaast kan dit portaal ook gebruikt worden om betalingen uit te voeren, alsook om, indien ingelogd als leverancier, notificaties te sturen naar klanten.

## Minimum vereisten

Volgende software is reeds geïnstalleerd:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

Volgende software draait reeds online of lokaal:

- [Bijhorende API](https://github.com/HoGentProjectenII/2024-backend-g01-24)

## Opstarten van de applicatie

1. `.env` bestand aanmaken
   - VITE_API_URL="http://localhost:9000/api"
   - VITE_SOCKET_URL="http://localhost:3000"
2. In terminal:
   1. Dependencies installeren:
      - `yarn`
   2. Applicatie opstarten:
      - `yarn dev`

## Testen van de applicatie

1. `yarn test`

Vervolgens komt u op het dashboard van Cypress

2. Selecteer `E2E Testing`
3. Selecteer een browser naar keuze
4. Selecteer een test-suite om uit te voeren
