describe('test suite Login', () => {
    it('Formar turma com sucesso', () => {
    cy.visit('/');
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
})