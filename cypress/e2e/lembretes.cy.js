Cypress.Commands.add('deleteAllUsers', () => {
    cy.exec('python delete_users.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('registerLoginP', () =>{
    cy.deleteAllUsers();
    cy.get('.btn-primary').click()
    cy.get('.cadastro-section > .btn').click()
    cy.get('#nome').type('teste testador do teste')
    cy.get('#celular').type('987654321')
    cy.get('#email').type('jimin@gmail.com')
    cy.get('#senha').type('kim')
    cy.get('#male').check();
    cy.get('#customRange3')
      .invoke('val', 50) // Define o valor do range para 50 (por exemplo)
      .trigger('input');
    // Abrir dropdown e selecionar níveis de ensino
    cy.get('.dropdown-toggle').click(); // Abre o dropdown
    cy.get('input[name="nivel_ensino"][value="Ensino-Fundamental"]').check(); // Marca Ensino Fundamental
    cy.get('.dropdown-toggle').click()
    cy.get('.mt-4.text-center > .btn').click()
    cy.get('#loginEmail').type('teste@gmail.com')
    cy.get('#loginSenha').type('queijo')
    cy.get('form > .btn').click()
    
})

describe('test suite Filtrar', () => {
    it('filtrar com sucesso', () => {
        //steps do cenario1
        cy.visit('/');
        cy.registerLoginA();
        
    })

    it('cenario2', () => {
        //steps do cenario2
    })

    it('cenario3', () => {
        //steps do cenario3
    })
})