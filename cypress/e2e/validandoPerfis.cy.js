describe('Validando Visulizações e Permissões dos Perfis', () => {
    
    beforeEach(() => {
        cy.visit('http://planilhadev.rededamas.com.br/')
    });

    it('Validar Perfil de Administrador', () => {
       
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
        
        // Validando Acessos Específicos do Administrador
        cy.get('.sidebar-nav').contains('Lançamentos')
            .click()
        cy.url().should('include', '/lancamentos')
        cy.get('.card-header')
            .contains('Planilha de Lançamento')
        
        cy.get('.sidebar-nav').contains('Coligadas')
            .click()
        cy.url().should('include', '/coligadas')

        cy.get('.sidebar-nav').contains('Relatórios')
            .click()
        cy.url().should('include', '/relatorios')
        cy.get('#selectColigada')
            .select([2])
            .invoke('val')
            .should('deep.equal', '1')
        cy.get('#selectFilial')
            .select([2])
            .invoke('val')
            .should('deep.equal', '13')
        cy.get('#selectCompetencia')
            .select([3])
            .invoke('val')
            .should('deep.equal', '52')
        cy.get('#btnFiltrar')
            .click()

        cy.get('#selectCompetencia').invoke('text').then((nameComp) =>{
            cy.get(':nth-child(1) > .sorting_1').invoke('text').then((nameCompPlan => {
                expect(nameComp).to.contains(nameCompPlan)
            }))
        })

        cy.get('#selectFilial').invoke('text').then((nameFilialFilt) =>{
            cy.get('tbody > :nth-child(1) > :nth-child(2)').invoke('text').then((nameFilialPlan => {
                expect(nameFilialFilt).to.contains(nameFilialPlan)
            }))
        })

        cy.get('.sidebar-nav').contains('Operadores')
            .click()
        cy.url().should('include', '/operadores')
        cy.get('.card-header')
            .contains('Operadores do Sistema')
        cy.get(':nth-child(2) > .sorting_1').invoke('text').then((namefunc) => {
            cy.get('label > .form-control').type(namefunc).press(Cypress.Keyboard.Keys.ENTER)
            cy.get(':nth-child(1) > .sorting_1').invoke('text').then((namefunc01) => {
                expect(namefunc01).to.equal(namefunc)
            })
        })
        
        cy.get('.sidebar-nav').contains('Logs SOAP')
            .click()
        cy.url().should('include', '/logs-soap')
        cy.get('.card-header')
            .contains('Registro de Chamadas SOAP')
        cy.get('tbody > :nth-child(1) > :nth-child(3)').invoke('text').then((nameUser) => {
            cy.get('.form-control').type(nameUser).press(Cypress.Keyboard.Keys.ENTER)
            cy.get('tbody > :nth-child(1) > :nth-child(3)').invoke('text').then((nameRes) => {
                expect(nameUser).to.contains(nameRes)
            })
        })
        cy.get('.form-control').clear()

        cy.get('.form-control').type('Erro').press(Cypress.Keyboard.Keys.ENTER)
        cy.get('.form-control').invoke('val').then((nameStatus) =>{
            cy.get('tbody > :nth-child(1) > :nth-child(6)').invoke('text').then((nameStatus01) => {
                expect(nameStatus).to.equal(nameStatus01)
            })
        })
        cy.get('.form-control').clear()

        cy.get('.form-control').type('Sucesso').press(Cypress.Keyboard.Keys.ENTER)
        cy.get('.form-control').invoke('val').then((nameStatus02) =>{
            cy.get('tbody > :nth-child(1) > :nth-child(6)').invoke('text').then((nameStatus03) => {
                expect(nameStatus02).to.equal(nameStatus03)
            })
        })
        cy.get('.form-control').clear()

        cy.get('.form-control').type('TESTE').press(Cypress.Keyboard.Keys.ENTER)
        cy.get('tbody > :nth-child(1) > :nth-child(3)').invoke('text').then((nameUser02) =>{
            cy.get('.form-control').invoke('val').then((nameUser03) => {
                expect(nameUser02).to.contains(nameUser03)
            })
        })
        cy.get('.form-control').clear()

        cy.get('.user-profile-btn').click()
        cy.get(':nth-child(3) > .dropdown-item').click()
        cy.url().should('include', '/login')
    })

    it.only('Validando Perfil de Dp Geral', () => {

        // Acessando o Sistema com o Acesso do Administrador
        cy.DPGLogin()
        cy.url().should('include', '/relatorios')

        // Validando de Acordo os Itens da Tela
        cy.get('.sidebar-nav').should('be.visible')
            .and('contain', 'Relatórios')

        //Fechando o Sidebar
        cy.get('#sidebarToggle > .bi').click()

        //Validando a Visualização da Página de Relatório
        cy.url().should('include', '/relatorios')
        cy.get('#selectColigada')
            .select([2])
            .invoke('val')
            .should('deep.equal', '1')
        cy.get('#selectFilial')
            .select([2])
            .invoke('val')
            .should('deep.equal', '13')
        cy.get('#selectCompetencia')
            .select([3])
            .invoke('val')
            .should('deep.equal', '52')
        cy.get('#btnFiltrar')
            .click()

        cy.get('#selectCompetencia').invoke('text').then((nameComp) =>{
            cy.get(':nth-child(1) > .sorting_1').invoke('text').then((nameCompPlan => {
                expect(nameComp).to.contains(nameCompPlan)
            }))
        })

        cy.get('#selectFilial').invoke('text').then((nameFilialFilt) =>{
            cy.get('tbody > :nth-child(1) > :nth-child(2)').invoke('text').then((nameFilialPlan => {
                expect(nameFilialFilt).to.contains(nameFilialPlan)
            }))
        })

        cy.get(':nth-child(2) > .sorting_2').invoke('text').then((chapa) => {
            cy.get('label > .form-control').type(chapa).press(Cypress.Keyboard.Keys.ENTER)
            cy.get('label > .form-control').invoke('val').then((buscaChapa) =>{
                    expect(chapa).to.contains(buscaChapa)
            })
        })
        cy.get('label > .form-control').clear()

        //Exportando Relatório
        cy.get('#btnExportar')
            .click()
        cy.get('#modalExportar > .modal-dialog > .modal-content > .modal-header > .modal-title')
            .should('have.text', 'Exportar Relatório')

        // Executa a tarefa de download no Node
        cy.contains('a', 'PDF')
            .invoke('removeAttr', 'target')
            .click({force: true})
        cy.url().should('include', '/pdf?id_coligada=1&id_filial=13&id_competencia=52')
        cy.visit('http://planilhadev.rededamas.com.br/departamento-pessoal/relatorios')

        cy.get('#modalExportar > .modal-dialog > .modal-content > .modal-header > .modal-title')
            .should('have.text', 'Exportar Relatório')
        cy.get('#selectColigada')
            .select([2])
            .invoke('val')
            .should('deep.equal', '1')
        cy.get('#selectFilial')
            .select([2])
            .invoke('val')
            .should('deep.equal', '13')
        cy.get('#selectCompetencia')
            .select([3])
            .invoke('val')
            .should('deep.equal', '52')
        cy.get('#btnFiltrar').click()
        
        cy.get('#btnExportar').click()
        cy.contains('a', 'Excel')
            .invoke('removeAttr', 'target')
            .click() 
        cy.readFile('cypress/downloads/Relatorio_Lancamentos_14_05_2026.xlsx').should('exist')
        cy.contains('a', 'CSV')
            .invoke('removeAttr', 'target')
            .click() 
        cy.readFile('cypress/downloads/Relatorio_Lancamentos_14_05_2026.csv').should('exist')
        cy.contains('a', 'TXT')
            .invoke('removeAttr', 'target')
            .click({force: true}) 
        cy.readFile('cypress/downloads/Relatorio_Lancamentos_14_05_2026.txt').should('exist')
        
        cy.get('#btnEnviarTotvs').click()
        cy.get('#modalEnviarTotvs')
            .contains('Enviar Lançamentos ao TOTVS')
        cy.get('#btnConfirmarEnvioTotvs').click().press(Cypress.Keyboard.Keys.ESC)
        cy.get('input[id="inputCodGrupoLanc"]').click({force: true}).type('123457')
        cy.get('#btnConfirmarGrupoEventos').click()
/*        cy.get('#modalAlertaTitulo')
            .contains('Envio Concluído')
        cy.get('#modalAlerta > .modal-dialog > .modal-content > .modal-footer > .btn').click()
        cy.get('#modalEnviarTotvs > .modal-dialog > .modal-content > .modal-header > .btn-close').click()
*/    })

    it('Validando Perfil de DP Filial', () => {

    })

    it('Validando Perfil de Operador', () => {

    })
});