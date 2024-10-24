Cypress.Commands.add('deleteAllUsersP', () => {
    cy.exec('python delete_usersP.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('deleteAllUsersA', () => {
    cy.exec('python delete_usersA.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('registerLoginA', () =>{
    cy.deleteAllUsersA();
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
    cy.get('input[name="materia"][value="Matemática"]').check();
    cy.get('input[name="materia"][value="Português"]').check();
    cy.get(':nth-child(5) > .dropdown > .btn').click()
    cy.get(':nth-child(6) > .dropdown > .btn').click()
    cy.get('input[name="comunicacao"][value="Discord"]').check();
    cy.get(':nth-child(6) > .dropdown > .btn').click()
    cy.get(':nth-child(7) > .dropdown > .btn').click()
    cy.get('input[name="nivel_ensino"][value="Ensino-Fundamental"]').check();
    cy.get(':nth-child(7) > .dropdown > .btn').click()
})

describe('test suite Filtrar', () => {
    it('filtrar com sucesso', () => {
  
        cy.visit('/');
        cy.registerLoginP();
        cy.visit('/')
        cy.registerLoginA();
        cy.visit('busca/')
        
    })

    it('cenario2', () => {
        //steps do cenario2
    })

    it('cenario3', () => {
        //steps do cenario3
    })
})