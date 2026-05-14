describe('Realizando o login', () => {

  beforeEach(() => {
    cy.visit('http://planilhadev.rededamas.com.br/')
  });

  it('Acessar Sem Digitar Matrícula e Senha', () => {
    cy.title().should('eq', 'Folha+ | Login - Folha+')
   
    cy.get('#login-button')
      .click()
 
  // Verificando que ainda está na mesma página e os campos estão em branco.
    cy.url().should('eq', 'http://planilhadev.rededamas.com.br/login')
    cy.get('[name="login"]')
      .should('have.value', '')
    cy.get('[name="password"]')
      .should('have.value', '')
  })
  it('Acessar apenas com a Matrícula', () => {

    cy.get('[name="login"]')
      .type('123456')

    cy.get('#login-button')
      .click() 

    // Verificando que ainda está na mesma página e os campos estão em branco.
    cy.url().should('eq', 'http://planilhadev.rededamas.com.br/login')
    cy.get('[name="login"]')
      .should('have.value', '123456')
    cy.get('[name="password"]')
      .should('have.value', '')
  })

  it('Acessar apenas com a Senha', () => {

    cy.get('[name="password"]')
      .type('123456')

    cy.get('#login-button')
      .click() 

    // Verificando que ainda está na mesma página e os campos estão em branco.
    cy.url().should('eq', 'http://planilhadev.rededamas.com.br/login')
    cy.get('[name="login"]')
      .should('have.value', '')
    cy.get('[name="password"]')
      .should('have.value', '123456')
  })

  it('Acessar com Matrícula Válida e Senha Inválida', () => {

    cy.get('[name="login"]')
      .type('0100123')
   
    cy.get('[name="password"]')
      .type('000000')

    cy.get('#login-button')
      .click() 

    // Verificando que ainda está na mesma página e os campos estão em branco.
    cy.url().should('eq', 'http://planilhadev.rededamas.com.br/login')
    cy.get('.alert')
      .should('be.visible')
      .and('contain', 'Matrícula ou senha incorretos.')
  })

    it('Acessar com Matrícula Inválida e Senha Válida', () => {

    cy.get('[name="login"]')
      .type('11111111')
   
    cy.get('[name="password"]')
      .type('123456')

    cy.get('#login-button')
      .click() 

    // Verificando que ainda está na mesma página e os campos estão em branco.
    cy.url().should('eq', 'http://planilhadev.rededamas.com.br/login')
    cy.get('.alert')
      .should('be.visible')
      .and('contain', 'Matrícula ou senha incorretos.')
  })

  it('Acessar com Matrícula Válida e Senha Válida', () => {

    cy.get('[name="login"]')
      .type('0100123')
   
    cy.get('[name="password"]')
      .type('123456')

    cy.get('#login-button')
      .click() 

    // Verificando que ainda está na mesma página e os campos estão em branco.
    cy.url().should('eq', 'http://planilhadev.rededamas.com.br/dashboard')
    cy.get('.sidebar-brand-text')
      .should('be.visible')
      .and('contain', 'Folha+')

    cy.get('#sidebar')
      .scrollTo('bottom')
      
    cy.get('.btn > .bi')
      .click()
    cy.url().should('eq', 'http://planilhadev.rededamas.com.br/login')
  })

  it.only('Acessar a página de Dashboard de forma Direta', () => {

    cy.get('[name="login"]')
      .type('0100123')
   
    cy.get('[name="password"]')
      .type('123456')

    cy.get('#login-button')
      .click() 

    // Verificando que ainda está na mesma página e os campos estão em branco.
    cy.url().should('eq', 'http://planilhadev.rededamas.com.br/dashboard')
    cy.get('.sidebar-brand-text')
      .should('be.visible')
      .and('contain', 'Folha+')

    cy.get('#sidebar')
      .scrollTo('bottom')
      
    cy.get('.btn > .bi')
      .click()
    cy.url().should('eq', 'http://planilhadev.rededamas.com.br/login')

    cy.visit('http://planilhadev.rededamas.com.br/dashboard')
  })
    
})