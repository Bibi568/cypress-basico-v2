/// <reference types="Cypress" />///

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('input[name="firstName"]').type('Bianca', {delay: 25})
    cy.get('input[name="lastName"]').type('Gomes Pinto')
    cy.get('input[id="email"]').type('bianca.tester@gmail.com.br')
    cy.get('input[id="phone"]').type('95981818181')
    cy.get('[id="open-text-area"]').type('loren-ipsum')
    cy.contains('Enviar').click()
    //cy.get('button[type="submit"]').click()
})
