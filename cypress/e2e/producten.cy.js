/* eslint-disable no-undef */

describe('Test producten overzicht', () => {
    it("Zou 16 producten moeten ophalen en pagina 1", () => {
        cy.visit("http://localhost:5173/producten?pagina=0&rijen=16")
        cy.getCy("product").should("have.length", 16);
        cy.checkMobilePagination(1);
    });

    it("Zou 10 producten moeten ophalen en pagina 2", () => {
        cy.visit("http://localhost:5173/producten?pagina=1&rijen=10")
        cy.getCy("product").should("have.length", 10);
        cy.checkMobilePagination(2);
    });
});

describe('Test producten zoeken', () => {
    it("Zou product 3 moeten zoeken en eerste zoud product 3 moeten zijn", () => {
        cy.visit("http://localhost:5173/producten?pagina=0&rijen=16");
        cy.getCy("zoekbalk_veld").type("3");
        cy.getCy("zoek_knop").click();
        cy.getCy("product").get("h2").first().contains("3");
    })
    
    it("Zou product 10 moeten zoeken en eerste zoud product 10 moeten zijn", () => {
        cy.visit("http://localhost:5173/producten?pagina=0&rijen=16");
        cy.getCy("zoekbalk_veld").type("10");
        cy.getCy("zoek_knop").click();
        cy.getCy("product").get("h2").first().contains("10");
    })

    it("Zou product met naam 12 moeten zoeken via url", () => {
        cy.visit("http://localhost:5173/producten?pagina=0&rijen=16&zoek=12");
        cy.getCy("product").get("h2").first().contains("12");
    })
});

describe('Test producten paginatie', () => {
    it("Zou pagina 3 moeten openen", () => {
        cy.visit("http://localhost:5173/producten?pagina=0&rijen=16");
        cy.get('[data-cy=mobile_pagination] button').contains("3").first().click();
        cy.checkMobilePagination(3);
    })
})