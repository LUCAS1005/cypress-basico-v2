/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', function() {
    cy.title()
      .should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function(){
    cy.get('#firstName')
      .type('Lucas')
    cy.get('#lastName')
      .type('Souza')
    cy.get('#email')
      .type('Lucas@mail.com')
    cy.get('#open-text-area')
      .type('Lorem ipsum dolor sit amet. Et internos voluptas eos velit voluptatem et',{delay:0})
    cy.contains('button', 'Enviar')
      .click()
    cy.get('.success')
      .should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    cy.get('#firstName')
      .type('Lucas')
    cy.get('#lastName')
      .type('Souza')
    cy.get('#email')
      .type('Lucasmailcom')
    cy.get('#open-text-area')
      .type('Lorem ipsum dolor sit amet. Et internos voluptas eos velit voluptatem et',{delay:0})
    cy.contains('button', 'Enviar')
      .click()
    cy.get('.error')
      .should('be.visible')
  })

  it('verifica se somente numeros podem se digitados no campo de telefone', function(){
    cy.get('#phone')
      .type('lkdwerios')
      .should('have.text','')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName')
      .type('Lucas')
    cy.get('#lastName')
      .type('Souza')
    cy.get('#email')
      .type('Lucas@mail.com')
    cy.get('#phone-checkbox')
      .check()
    cy.get('#open-text-area')
      .type('Lorem ipsum dolor sit amet. Et internos voluptas eos velit voluptatem et',{delay:0})
    cy.contains('button', 'Enviar')
      .click()
    cy.get('.error')
      .should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
      .type('Lucas')
      .should('have.value','Lucas')
      .clear().should('have.value', '')
    cy.get('#lastName')
      .type('Souza')
      .should('have.value','Souza')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('Lucas@mail.com')
      .should('have.value','Lucas@mail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('11980168830')
      .should('have.value','11980168830')
      .clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar')
      .click()

    cy.get('.error')
      .should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
  })

  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })
  it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]')
      //Verifica a quantide de elementos que o seletor retornou
      .should('have.length', 3)
      //Recebe cada um dos elementos retornados
      .each(function($radio){
        cy.wrap($radio)
          .check()
        cy.wrap($radio)
          .should('be.checked')
      })
  })
  it('marca ambos checkboxes, depois desmarca o último"', function(){
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .then(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
      .should(function(input){
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
      .should(function(input){
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture("example.json").as('arquivoexemplo')
    cy.get('input[type="file"]')
      .selectFile('@arquivoexemplo', {action: "drag-drop"})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
    cy.get('#privacy a')
      //Remove o atributo target fazendo com que o link seja aberto na mesma aba
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('CAC TAT - Política de privacidade').should('be.visible')
  })
})
