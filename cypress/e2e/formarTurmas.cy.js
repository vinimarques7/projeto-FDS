Cypress.Commands.add('deleteAllUsersP', () => {
    cy.exec('python delete_usersP.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('deleteAllUsersA', () => {
    cy.exec('python delete_usersA.py', { failOnNonZeroExit: false })
});


Cypress.Commands.add('registerProfessor', () =>{
    cy.deleteAllUsersP();
    cy.get('.btn-secondary').click()
    cy.get('.cadastro-section > .btn').click()
    cy.get('#nome').type('teste testador')
    cy.get('#celular').type('987654321')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#senha').type('queijo')
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
    cy.get('.mt-4.text-center > .btn').click()
    cy.get('#loginEmail').type('teste@gmail.com')
    cy.get('#loginSenha').type('queijo')
    cy.get('form > .btn').click()
    
})

Cypress.Commands.add('registerAluno', () =>{
    cy.deleteAllUsersA();
    cy.get('.btn-primary').click()
    cy.get('.cadastro-section > .btn').click()
    cy.get('#nome').type('Aluno Barros da Silva')
    cy.get('#celular').type('347543875')
    cy.get('#email').type('aluno@gmail.com')
    cy.get('#senha').type('senha')
    cy.get('#male').check();
    cy.get('#customRange3')
    .trigger('mousedown', { which: 1 })
    .trigger('mousemove', { clientX: 30 })
    .trigger('mouseup');
    cy.get('.dropdown > .btn').click()
    cy.get('input[name="nivel_ensino"][value="Ensino-Fundamental"]').check();
    cy.get('.dropdown > .btn').click()
    cy.get('.mt-4.text-center > .btn').click()
    
})


describe('test suite Login', () => {
    it('Formar turma com sucesso', () => {
    cy.visit('/');
    cy.registerAluno();
    cy.visit('/');
    cy.registerProfessor();
    cy.get('[data-toggle="modal"]').click();
    cy.get('.modal-body > .form-control').type('Logaritmo')
    cy.get('.modal-body > :nth-child(3) > .btn').click()
    cy.get('input[name="materia"][value="Matemática"]').check();
    cy.get('.modal-body > :nth-child(3) > .btn').click()
    cy.get(':nth-child(5) > .btn').click()

    })
})