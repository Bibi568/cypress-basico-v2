/// <reference types="Cypress" />///
describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000

    beforeEach(() => {
        cy.visit('./src/index.html')
    });

    it('Check application title', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Fill in the required fields and send the form', () => {
        cy.clock()
        
        cy.get('input[name="firstName"]').type('Bianca', {delay: 25})
        cy.get('input[name="lastName"]').type('Gomes Pinto')
        cy.get('input[id="email"]').type('bianca.tester@gmail.com.br')
        cy.get('input[id="phone"]').type('95981818181')
        cy.get('[id="open-text-area"]').type('loren-ipsum')
        cy.contains('Enviar').click()
        // cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    });

    it('Displays error message when submitting the form with an email with invalid formatting', () => {
        cy.clock()

        cy.get('input[name="firstName"]').type('Bianca', {delay: 25})
        cy.get('input[name="lastName"]').type('Gomes Pinto')
        cy.get('input[id="email"]').type('bianca.testergmail.com.br')
        cy.get('input[id="phone"]').type('95981818181')
        cy.get('[id="open-text-area"]').type('loren-ipsum')
        cy.contains('Enviar').click()
        //cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    });

    Cypress._.times(3, function() {
      it('Phone field only accepts numbers', () => {
        cy.get('input[id="phone"]')
        .type('abcde')
        .should('have.value', '');
      });
    })
    

    it('Displays error message when phone becomes mandatory but not filled in before form submission', () => {
        cy.clock()

        cy.get('input[name="firstName"]').type('Bianca', {delay: 25})
        cy.get('input[name="lastName"]').type('Gomes Pinto')
        cy.get('input[id="email"]').type('bianca.tester@gmail.com.br')
        cy.get('#phone-checkbox').check();
        cy.get('[id="open-text-area"]').type('loren-ipsum')
        cy.contains('Enviar').click()
        //cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    });

    it('Fill in and clean the first name, last name, email and phone fields', () => {
        cy.get('input[name="firstName"]')
        .type('Bianca')
        .should('have.value', 'Bianca')
        .clear()
        .should('have.value', '');

        cy.get('input[name="lastName"]')
        .type('Gomes Pinto')
        .should('have.value', 'Gomes Pinto')
        .clear()
        .should('have.value', '');

        cy.get('input[id="email"]')
        .type('bianca.tester@gmail.com.br')
        .should('have.value', 'bianca.tester@gmail.com.br')
        .clear()
        .should('have.value', '');

        cy.get('input[id="phone"]')
        .type('95981818181')
        .should('have.value', '95981818181')
        .clear()
        .should('have.value', '');
    });

    it('Displays error message when submitting the form without filling in the required fields', () => {
        cy.clock()

        cy.contains('Enviar').click()
        //cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    });

    it('Submit the form successfully using a custom command', () => {
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    });

    it('Selects a product (YouTube) by its text', () => {
        cy.get('select')
          .select('YouTube')
          .should('have.value', 'youtube')

    });

    it('Selects a product (Mentorship) by its value (value)', () => {
        cy.get('select')
          .select('mentoria')
          .should('have.value', 'mentoria')
    });

    it('Selects a product (Blog) by its index', () => {
        cy.get('select')
          .select(1)
          .should('have.value', 'blog')
    });

    it('Mark the service type "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
    });

    it('Mark each type of service', () => {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function ($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    });

    it('Check both checkboxes, then uncheck the last one', () => {
        cy.get('input[type="checkbox"]')
          .each(function ($checkbox) {
            cy.wrap($checkbox).check()
            cy.wrap($checkbox).should('be.checked')
          })
        cy.get('input[type="checkbox"]')
          .last()
          .uncheck()
          .should('not.be.checked')
    });

    it('Selects a file from the fixtures folder', () => {
        cy.get('#file-upload')
          .selectFile('./cypress/fixtures/example.json')
          .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    });

    it('Selects a file simulating a drag-and-drop', () => {
      cy.get('#file-upload')
          .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
          .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    });

    it('Selects a file using a fixture that has been given an alias', () => {
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file')
        .selectFile('@sampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        }) 
    });

    it('Verifies that the privacy policy opens in another tab without the need for a click', () => {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('Access the privacy policy page by removing the target and then clicking on the link', () => {
      cy.get('#privacy a').invoke('removeAttr', 'target').click()
      cy.contains('Talking About Testing').should('be.visible')
    });

    it('Display and hide success and error messages using .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('Fills the text area using the invoke command', () => {
      const  longText = Cypress._.repeat('0123456789', 20)

      cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
    });

    it('Make an HTTP request', () => {
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
          const { status, statusText, body} = response
          expect(status).to.equal(200)
          expect(statusText).to.equal('OK')
          expect(body).to.include('CAC TAT')
        })
    });

    it.only('encontra o gato escondido', () => {
      cy.get('#cat')
        .invoke('show')
        .should('be.visible')
      cy.get('#title')
        .invoke('text', 'CAT TAT')
      cy.get('#subtitle')
        .invoke('text', 'Eu ❤️ gatos!')
    });
})
