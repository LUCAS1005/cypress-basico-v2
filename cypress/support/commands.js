Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('Lucas@mail.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet. Et internos voluptas eos velit voluptatem et',{delay:0})
    cy.contains('button', 'Enviar').click()
})