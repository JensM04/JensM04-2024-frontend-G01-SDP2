/* eslint-disable no-undef */

describe('Test bestellingen overzicht ingelogd', () => {
    beforeEach(() => {
      cy.loginLeverancier("leverancier5_bedrijf1", "wachtwoord")
    })

    it("Zou eerste 10 bestellingen moeten tonen", () => {
      cy.visit("http://localhost:5173/bestellingen?pagina=0&rijen=10");
      cy.getCy("bestelling").should("have.length", 10);
    })

    it("Zou 25 bestellingen moeten tonen op 2e pagina", () => {
      cy.visit("http://localhost:5173/bestellingen?pagina=1&rijen=25");
      cy.getCy("bestelling").should("have.length", 25);
    });

    it("Zou 1 bestelling moeten tonen met id", () => {
      cy.visit("http://localhost:5173/bestellingen?pagina=0&rijen=10");
      cy.getCy("id_filter").type("ae13c0d1");
      cy.getCy("filter_confirm").click();
      cy.getCy("bestelling").should("have.length", 1);
    })

    it("Zou 1 bestellingen moeten tonen met totaalbedrag", () => {
      cy.visit("http://localhost:5173/bestellingen?pagina=0&rijen=10");
      cy.getCy("bedrag_filter").type("71.87");
      cy.getCy("filter_confirm").click();
      cy.getCy("bestelling").should("have.length", 1);
    })

    it("Zou 2 bestellingen moeten tonen met bestellingstatus verzonden en betaalstatus betaald", () => {
      cy.visit("http://localhost:5173/bestellingen?pagina=0&rijen=10");
      cy.visit("http://localhost:5173/bestellingen?rijen=10&pagina=0&bestellingstatus=5&betaalstatus=2")
      cy.getCy("bestelling").should("have.length", 8);
    });

    it("Zou 10 bestellingen moeten tonen na resetten filters", () => {
      cy.visit("http://localhost:5173/bestellingen?pagina=0&rijen=10");
      cy.getCy("id_filter").type("cb7f3bbd");
      cy.getCy("filter_confirm").click();
      cy.getCy("filter_reset").click();
      cy.getCy("bestelling").should("have.length", 10);
    })
})

describe ('Test bestellingen overzicht niet ingelogd', () => {
  it("Zou niet mogen bestellingen tonen", () => {
    cy.visit("http://localhost:5173/bestellingen?pagina=0&rijen=10");
    cy.url().should("include", "http://localhost:5173/login");
  })
});