it('verifica o título da aplicação', function() {
    cy.visit('./src/privacy.html')
    cy.contains('CAC TAT - Política de privacidade').should('be.visible')
  })