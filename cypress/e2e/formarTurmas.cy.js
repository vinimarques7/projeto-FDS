Cypress.Commands.add('deleteAllUsersP', () => {
    cy.exec('python delete_usersP.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('deleteAllUsersA', () => {
    cy.exec('python delete_usersA.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('registerProfessor', () => {
    cy.deleteAllUsersP();
    cy.get('.btn-secondary').click(); // Botão de cadastro do professor
    cy.get('.cadastro-section > .btn').click(); // Acessa a página de cadastro
    cy.get('#nome').type('teste testador');
    cy.get('#celular').type('987654321');
    cy.get('#email').type('teste@gmail.com');
    cy.get('#senha').type('queijo');
    cy.get('#male').check();
    cy.get(':nth-child(5) > .dropdown > .btn').click();
    cy.get('input[name="materia"][value="Matemática"]').check();
    cy.get('input[name="materia"][value="Português"]').check();
    cy.get(':nth-child(5) > .dropdown > .btn').click(); // Fecha dropdown
    cy.get(':nth-child(6) > .dropdown > .btn').click();
    cy.get('input[name="comunicacao"][value="Discord"]').check();
    cy.get(':nth-child(6) > .dropdown > .btn').click(); // Fecha dropdown
    cy.get(':nth-child(7) > .dropdown > .btn').click();
    cy.get('input[name="nivel_ensino"][value="Ensino-Fundamental"]').check();
    cy.get(':nth-child(7) > .dropdown > .btn').click(); // Fecha dropdown
    cy.get('.mt-4.text-center > .btn').click(); // Envia o formulário de cadastro

    // Login após cadastro
    cy.get('#loginEmail').type('teste@gmail.com');
    cy.get('#loginSenha').type('queijo');
    cy.get('form > .btn').click();
});

Cypress.Commands.add('registerAluno', () => {
    cy.deleteAllUsersA();
    cy.get('.btn-primary').click(); // Botão de cadastro do aluno
    cy.get('.cadastro-section > .btn').click(); // Acessa a página de cadastro
    cy.get('#nome').type('Aluno Barros da Silva');
    cy.get('#celular').type('347543875');
    cy.get('#email').type('aluno@gmail.com');
    cy.get('#senha').type('senha');
    cy.get('#male').check();
    cy.get('#customRange3')
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: 30 })
        .trigger('mouseup'); // Interação com o controle de faixa (range)

    cy.get('.dropdown > .btn').click(); // Abre dropdown de nível de ensino
    cy.get('input[name="nivel_ensino"][value="Ensino-Fundamental"]').check();
    cy.get('.dropdown > .btn').click(); // Fecha dropdown
    cy.get('.mt-4.text-center > .btn').click(); // Envia o formulário de cadastro
});

describe('Test suite Login', () => {
    it('Deve formar turma com sucesso', () => {
        cy.visit('/');
        cy.registerAluno(); // Registra o aluno no banco de dados
        cy.visit('/');
        cy.registerProfessor(); // Registra o professor no banco de dados

        // Abre o modal para criar turma
        cy.get('[data-toggle="modal"]').click();

        // Preenche o nome da turma
        cy.get('.modal-body input[name="nome_turma"]').type('Logaritmo');

        // Seleciona a matéria (seleciona o primeiro dropdown com eq(0))
        cy.get('.modal-body .dropdown > .btn').eq(0).click();
        cy.get('input[name="materia"][value="Matemática"]').check();
        cy.get('.modal-body .dropdown > .btn').eq(0).click(); // Fecha o dropdown de matéria

        // Abre o dropdown para selecionar alunos com {force: true}
        cy.get('.modal-body .dropdown-toggle').contains('Selecione os alunos').click({ force: true });

        // Verifica se o dropdown de alunos está visível
        cy.get('.dropdown-menu').should('be.visible');

        // Espera até que os checkboxes de alunos sejam preenchidos
        cy.get('input[name="alunos"]', { timeout: 10000 }).should('exist');

        // Aqui vamos verificar o valor correto do input gerado para os alunos
        cy.get('.dropdown-menu').then(($menu) => {
            cy.log($menu.html()); // Isso vai exibir o HTML no log do Cypress para você inspecionar
        });

        // Ajuste o value correto após verificar no HTML
        cy.get('.dropdown-menu input[name="alunos"]').eq(0).check({ force: true });// Exemplo: usando o ID 1, ajuste conforme o valor correto

        // Fecha o dropdown de alunos
        cy.get('.modal-body .dropdown-toggle').contains('Selecione os alunos').click({ force: true });

        // Confirma a criação da turma
        cy.get('.modal-footer .btn-primary').click();

        // Verifica se a turma foi criada com sucesso
        cy.get('.panel-body.bio-graph-info').should('contain', 'Logaritmo');
        cy.get('.panel-body.bio-graph-info').should('contain', 'Matemática');
        cy.get('.panel-body.bio-graph-info').should('contain', 'Aluno Barros da Silva'); // Verifica se o aluno está listado na turma
    });
});
