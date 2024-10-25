Cypress.Commands.add('deleteAllUsersP', () => {
    cy.exec('python delete_usersP.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('registerLoginP', () =>{
    cy.deleteAllUsersP();
    cy.get('.btn-secondary').click()
    cy.get('.cadastro-section > .btn').click()
    cy.get('#nome').type('teste testador')
    cy.get('#celular').type('987654321')
    cy.get('#email').type('joaokook@gmail.com')
    cy.get('#senha').type('btslover200k')
    cy.get('#male').check();
    cy.get(':nth-child(5) > .dropdown > .btn').click()
    cy.get('input[name="materia"][value="Português"]').check();
    cy.get(':nth-child(5) > .dropdown > .btn').click()
    cy.get(':nth-child(6) > .dropdown > .btn').click()
    cy.get('input[name="comunicacao"][value="Discord"]').check();
    cy.get(':nth-child(6) > .dropdown > .btn').click()
    cy.get(':nth-child(7) > .dropdown > .btn').click()
    cy.get('input[name="nivel_ensino"][value="Ensino-Fundamental"]').check();
    cy.get(':nth-child(7) > .dropdown > .btn').click()
    cy.get('.mt-4.text-center > .btn').click()
    cy.get('#loginEmail').type('joaokook@gmail.com')
    cy.get('#loginSenha').type('btslover200k')
    cy.get('form > .btn').click()
})

describe('test suite Filtrar', () => {
    it('Deve adicionar um lembrete com sucesso', () => {
        //steps do cenario1
        cy.visit('/');
        cy.registerLoginP();
        

        // Encontra o campo de texto do lembrete e digita o texto
        cy.get('textarea[name="lembrete_texto"]').type('Este é um lembrete de teste');
    
        // Clica no botão para adicionar o lembrete
        cy.get('button').contains('Adicionar Lembrete').click();
    
        // Verifica se o lembrete foi adicionado corretamente à lista de lembretes
        cy.get('.list-group-item').should('contain', 'Este é um lembrete de teste');
    
        // Verifica se a mensagem de sucesso aparece (se houver)
        cy.get('.alert').should('contain', 'Lembrete adicionado com sucesso');
    
        
    })

    it('cenario2', () => {
        //steps do cenario2
    })

    it('cenario3', () => {
        //steps do cenario3
    })
})