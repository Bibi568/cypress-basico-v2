it('Independently test the privacy policy page', () => {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')

});