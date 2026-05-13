describe('Validando Visulizações e Permissões dos Perfis', () => {
    
    beforeEach(() => {
        cy.visit('http://planilhadev.rededamas.com.br/')
    });

    it.only('Validar Perfil de Administrador', () => {
       
        // Acessando o Sistema com o Acesso do Administrador
        cy.adminLogin()
        cy.url().should('include', '/dashboard')

        // Validando de Acordo os Itens da Tela
        cy.get('.sidebar-nav').should('be.visible')
            .and('contain', 'Lançamentos')
            .and('contain', 'Coligadas')
            .and('contain', 'Relatórios')
            .and('contain', 'Operadores')
            .and('contain', 'Logs SOAP')
            .and('contain', 'Envelopes SOAP')

        cy.get('.user-name')
            .should('be.visible')
            .and('contain', 'Administrador')
        
        // Validando Acesso a Funcionalidades Específicas do Administrador
        cy.get('.sidebar-nav').contains('Lançamentos')
            .click()
        cy.url().should('include', '/lancamentos')
        cy.get('#selectCompetencia')
            .select([2])
            .invoke('val')
            .should('deep.equal', '54')
        
        cy.get('#selectColigada')
            .select([1])
            .invoke('val')
            .should('deep.equal', '20')
        
        cy.get('#selectFilial')
            .select([2])
            .invoke('val')
            .should('deep.equal', '4')
                
        cy.get('#selectCompAnterior')
            .select([4])
            .invoke('val')
            .should('deep.equal', '32')
        
        cy.get('#btnCopiarCompSim')
            .click()

        cy.get('#modalFeedback.modal.fade')
            .should('contain', 'Lançamentos copiados')
            .get('#modalFeedback > .modal-dialog > .modal-content > .modal-footer > .btn')
            .should('be.visible')
            .click()
            .press(Cypress.Keyboard.Keys.ESC)
        
        cy.get('#modalFeedback > .modal-dialog > .modal-content > .modal-footer > .btn')
            .click()
            .press(Cypress.Keyboard.Keys.ESC)
        
        cy.get('tr[data-linha="4"] > :nth-child(3) > .nome-func')
            .invoke('text')
            .as('namefunc')
            .then((name => {
                cy.get('#btnSearch > .bi').type(name).press(Cypress.Keyboard.Keys.ENTER)
                cy.get('tr[data-linha="4"] > :nth-child(3) > .nome-func')
                    .should('have.text', name)
                cy.get('#searchClose > .bi').click()
            }))
          
        cy.get('#btnLimpar').click()
        cy.get('#modalLimparTudo > .modal-dialog > .modal-content > .modal-body')
            .contains('Deseja limpar as linhas da planilha?')
        cy.get('#modalLimparTudo > .modal-dialog > .modal-content > .modal-footer > .btn-outline-secondary')
            .should('be.visible')
            .click({force: true}) 
        cy.get('#modalLimparTudo > .modal-dialog > .modal-content > .modal-body')
            .should('not.exist')

    })

    it('Validando Perfil de Dp Geral', () => {

    })

    it('Validando Perfil de DP Filial', () => {

    })

    it('Validando Perfil de Operador', () => {

    })
});