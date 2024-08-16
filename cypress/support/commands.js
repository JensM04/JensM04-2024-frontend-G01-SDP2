/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getCy', (dataCy) => {
    return cy.get(`[data-cy=${dataCy}]`);
})

Cypress.Commands.add('checkMobilePagination', (equalsPage) => {
    cy.get("[data-cy=mobile_pagination] [aria-current=true]").first().should("have.text", `${equalsPage}`);
})

Cypress.Commands.add('loginLeverancier', (username, password) => {
    Cypress.log({
        displayName: 'login',
    })

    cy.intercept("/api/user/login").as("login");
    cy.visit("http://localhost:5173/login");
    cy.get("[data-cy=username_input]").type(username);
    cy.get("[data-cy=password_input]").type(password);
    cy.get('[data-cy=login_button]').click();
})

Cypress.Commands.add('logout', () => {
    cy.get("[data-cy=avatar]").click();
    cy.get("[data-cy=log uit]").click();
})