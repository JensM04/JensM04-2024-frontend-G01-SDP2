/* eslint-disable no-undef */

describe('Test notificaties overzicht ingelogd', () => {
  beforeEach(() => {
    cy.loginLeverancier("leverancier5_bedrijf1", "wachtwoord")
  })

  it("Zou eerste 10 notificaties moeten tonen", () => {
    cy.visit("http://localhost:5173/notificaties?pagina=0&rijen=10");
    cy.getCy("notificatie").should("have.length", 10);
  })

  it("Zou 25 bestellingen moeten tonen op 2e pagina", () => {
    cy.visit("http://localhost:5173/notificaties?pagina=1&rijen=25");
    cy.getCy("notificatie").should("have.length", 25);
  });

  it("Zou 2 notificaties moeten tonen met inhoud 294", () => {
    cy.visit("http://localhost:5173/notificaties?pagina=0&rijen=10");
    cy.getCy("content_filter").type("294");
    cy.getCy("filter_confirm").click();
    cy.getCy("notificatie").should("have.length", 4);
  })

  it("Zou 2 notificaties moeten tonen met id 181", () => {
    cy.visit("http://localhost:5173/notificaties?pagina=0&rijen=10");
    cy.getCy("bestelling_filter").type("181");
    cy.getCy("filter_confirm").click();
    cy.getCy("notificatie").should("have.length", 2);
  })

  it("Zou geen notificaties moeten tonen bij betalingsherrinering filter als leverancier", () => {
    cy.visit("http://localhost:5173/notificaties?pagina=0&rijen=10&notificatieSoort=0");
    cy.getCy("geen_notifs").should("exist");
  })

  it("Zou 10 bestellingen moeten tonen na resetten filters", () => {
    cy.visit("http://localhost:5173/notificaties?pagina=0&rijen=10");
    cy.getCy("bestelling_filter").type("181");
    cy.getCy("filter_confirm").click();
    cy.getCy("filter_reset").click();
    cy.getCy("notificatie").should("have.length", 10);
  })
})

describe ('Test notificaties overzicht niet ingelogd', () => {
it("Zou niet mogen motificaties tonen", () => {
  cy.visit("http://localhost:5173/notificaties?pagina=0&rijen=10");
  cy.url().should("include", "http://localhost:5173/login");
})
});