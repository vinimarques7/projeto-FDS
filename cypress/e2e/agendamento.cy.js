Cypress.Commands.add('deleteAllUsersP', () => {
    cy.exec('python delete_usersP.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('deleteAllUsersA', () => {
    cy.exec('python delete_usersA.py', { failOnNonZeroExit: false })
});


Cypress.Commands.add('registerLoginP', () => {
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
    cy.get('input[name="recebimento"][value="Boleto"]').check();
    cy.get(':nth-child(7) > .dropdown > .btn').click(); // Fecha dropdown
    cy.get('.mt-4.text-center > .btn').click(); // Envia o formulário de cadastro
});

Cypress.Commands.add('registerLoginA', () => {
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
    cy.visit('/');
    cy.get('.btn-primary').click(); // Botão de login
    cy.get('#loginEmail').type('aluno@gmail.com');
    cy.get('#loginSenha').type('senha');
    cy.get('.btn-primary').click(); // Envia o formulário de login
});

    it('Agendamento de aula com sucesso', () => {
        cy.visit('/');
        cy.registerLoginP();
        cy.visit('/');
        cy.registerLoginA();
        cy.get('.professor-card a').first().click(); // Seleciona o professor
        cy.get('a.btn-info').contains('Agendar').click();
        cy.get('#data-selecionada').type('2024-11-15'); 
        cy.get('#meio-transmissao').select('Discord'); // Seleciona diretamente o valor no campo <select>
        cy.get('#meio-pagamento').select('Boleto'); // Seleciona o meio de pagamento
        cy.get('#comentarios').type('Gostaria de focar em gramática.'); // Adiciona comentário
        cy.get('.btn-primary').click(); // Envia o formulário
        cy.contains('Agendamento realizado com sucesso!').should('be.visible');
    });

    it('Erro ao agendar aula sem selecionar data e hora', () => {
        cy.visit('/');
        cy.registerLoginP();
        cy.visit('/');
        cy.registerLoginA();
        cy.get('.professor-card a').first().click();
        cy.get('a.btn-info').contains('Agendar').click();

        cy.get('#meio-transmissao').select('Discord');
        cy.get('#meio-pagamento').select('Boleto');
        cy.get('#comentarios').type('Gostaria de focar em gramática.');
        cy.get('.btn-primary').click();
        cy.contains('Por favor, selecione um dia para o agendamento.').should('be.visible');
    });

    it('Erro ao agendar aula sem selecionar meio de transmissão', () => {
        cy.visit('/');
        cy.registerLoginP();
        cy.visit('/');
        cy.registerLoginA();
        cy.get('.professor-card a').first().click();
        cy.get('a.btn-info').contains('Agendar').click();

        cy.get('#data-selecionada').type('2024-11-15');
        cy.get('#meio-pagamento').select('Boleto');
        cy.get('#comentarios').type('Gostaria de focar em gramática.');
        cy.get('.btn-primary').click();
        cy.contains('Por favor, selecione um meio de transmissão para o agendamento.').should('be.visible');
    });

    it('Erro ao agendar aula sem selecionar meio de pagamento', () => {
        cy.visit('/');
        cy.registerLoginP();
        cy.visit('/');
        cy.registerLoginA();
        cy.get('.professor-card a').first().click();
        cy.get('a.btn-info').contains('Agendar').click();

        cy.get('#data-selecionada').type('2024-11-15');
        cy.get('#meio-transmissao').select('Discord');
        cy.get('#comentarios').type('Gostaria de focar em gramática.');
        cy.get('.btn-primary').click();
        cy.contains('Por favor, selecione um meio de pagamento para o agendamento.').should('be.visible');
    });

    it('Erro ao agendar aula sem comentário', () => {
        cy.visit('/');
        cy.registerLoginP();
        cy.visit('/');
        cy.registerLoginA();
        cy.get('.professor-card a').first().click();
        cy.get('a.btn-info').contains('Agendar').click();

        cy.get('#data-selecionada').type('2024-11-15');
        cy.get('#meio-transmissao').select('Discord');
        cy.get('#meio-pagamento').select('Boleto');
        cy.get('.btn-primary').click();
        cy.contains('Por favor, insira um comentário para o professor.').should('be.visible');
    });

    it('Erro ao agendar aula sem preencher todos os campos obrigatórios', () => {
        cy.visit('/');
        cy.registerLoginP();
        cy.visit('/');
        cy.registerLoginA();
        cy.get('.professor-card a').first().click();
        cy.get('a.btn-info').contains('Agendar').click();

        cy.get('.btn-primary').click();
        cy.contains('Por favor, preencha todos os campos obrigatórios.').should('be.visible');
    });