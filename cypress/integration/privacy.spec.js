Cypress._.times(3, function() {
    it('Independently test the privacy policy page', () => {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    
    });
})
