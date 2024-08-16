/* eslint-disable no-undef */

describe('Test bestellingen overzicht ingelogd', () => {
  beforeEach(() => {
    cy.loginLeverancier("leverancier5_bedrijf1", "wachtwoord")
  })

  it("Zou bestelling moeten tonen", () => {
    cy.visit("http://localhost:5173/bestellingen?pagina=0&rijen=10");
    cy.getCy("bestelling").first().click();
    cy.getCy("algemene_gegevens_list").should('exist');
    cy.getCy("klantgegevens_list").should('exist');
    cy.getCy("leveringsadres_list").should('exist');
  })

  it("Zou bestelling niet moeten tonen bij verkeerde id", () => {
    cy.visit("http://localhost:5173/bestellingen/12dads3");
    cy.getCy("error_component").should('exist');
  })
})