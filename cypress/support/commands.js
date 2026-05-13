Cypress.Commands.add('adminLogin', () => { 
    cy.get('[name="login"]')
      .type('0100123')
    cy.get('[name="password"]')
      .type('123456')
    cy.get('#login-button')
      .click() 
})

Cypress.Commands.add('DPGLogin', () => { 
    cy.get('[name="login"]')
      .type('0100789')
    cy.get('[name="password"]')
      .type('123456')
    cy.get('#login-button')
      .click() 
})

Cypress.Commands.add('DPFLogin', () => { 
    cy.get('[name="login"]')
      .type('0700989')
    cy.get('[name="password"]')
      .type('123456')
    cy.get('#login-button')
      .click() 
})

Cypress.Commands.add('OperadorLogin', () => { 
    cy.get('[name="login"]')
      .type('0601321')
    cy.get('[name="password"]')
      .type('123456')
    cy.get('#login-button')
      .click() 
})