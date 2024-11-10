Cypress.Commands.add('deleteAllUsersP', () => {
    cy.exec('python delete_usersP.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('deleteAllUsersA', () => {
    cy.exec('python delete_usersA.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('deleteAllAvaliacoes', () => {
    cy.exec('python delete_avaliacoes.py', { failOnNonZeroExit: false })
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

it('Aula avaliada com sucesso', () => {
    cy.deleteAllAvaliacoes();
    cy.visit('/');
    cy.registerLoginP();
    cy.visit('/');
    cy.registerLoginA();
    // Seleciona um card de professor
    cy.get('.professor-card a').first().click();
   // Clique para abrir o modal
    cy.get('button[data-toggle="modal"][data-target="#confirmModal"]').click();

    // Aguarde o modal aparecer
    cy.get('#confirmModal', { timeout: 10000 }).should('be.visible');

    // Interaja com os elementos dentro do modal
    cy.get('#confirmModal .modal-footer a.btn-primary').click();
    cy.get('#estrela-5').check({ force: true });
    cy.get('#comentario').type('Excelente aula!');
    cy.get('.btn-primary').click();
    cy.contains('Sua avaliação foi enviada com sucesso!').should('be.visible');
});

it('Avaliação sem seleção de estrelas', () => {
    cy.deleteAllAvaliacoes();
    cy.visit('/');
    cy.registerLoginP();
    cy.visit('/');
    cy.registerLoginA();
    // Seleciona um card de professor
    cy.get('.professor-card a').first().click();
    // Clica no botão de avaliar no perfil do professor
    cy.get('button[data-toggle="modal"][data-target="#confirmModal"]').click();
    // Confirma que teve uma aula
    cy.get('#confirmModal .modal-footer a.btn-primary').click();
    cy.get('#comentario').type('Muito boa aula, mas esqueci de marcar as estrelas.');
    cy.get('.btn-primary').click();
    cy.contains('Avaliação não enviada: por favor, forneça uma avaliação de estrelas.').should('be.visible');
});

it('Avaliação sem comentário', () => {
    cy.deleteAllAvaliacoes();
    cy.visit('/');
    cy.registerLoginP();
    cy.visit('/');
    cy.registerLoginA();
    // Seleciona um card de professor
    cy.get('.professor-card a').first().click();
    // Clica no botão de avaliar no perfil do professor
    cy.get('button[data-toggle="modal"][data-target="#confirmModal"]').click();
    // Confirma que teve uma aula
    cy.get('#confirmModal .modal-footer a.btn-primary').click();
    cy.get('#estrela-5').check({ force: true });
    cy.get('.btn-primary').click();
    cy.contains('Avaliação não enviada: por favor, forneça um comentário.').should('be.visible');
});

it('Comentário sem avaliação', () => {
    cy.deleteAllAvaliacoes();
    cy.visit('/');
    cy.registerLoginP();
    cy.visit('/');
    cy.registerLoginA();
    // Seleciona um card de professor
    cy.get('.professor-card a').first().click();
    // Clica no botão de avaliar no perfil do professor
    cy.get('button[data-toggle="modal"][data-target="#confirmModal"]').click();
    // Confirma que teve uma aula
    cy.get('#confirmModal .modal-footer a.btn-primary').click();
    cy.get('#comentario').type('Gostei muito da aula, mas não marquei as estrelas.');
    cy.get('.btn-primary').click();
    cy.contains('Avaliação não enviada: por favor, forneça uma avaliação de estrelas.').should('be.visible');
});

it('Avaliação duplicada', () => {
    cy.deleteAllAvaliacoes();
    cy.visit('/');
    cy.registerLoginP();
    cy.visit('/');
    cy.registerLoginA();
    // Seleciona um card de professor
    cy.get('.professor-card a').first().click();
   // Clique para abrir o modal
    cy.get('button[data-toggle="modal"][data-target="#confirmModal"]').click();

    // Aguarde o modal aparecer
    cy.get('#confirmModal', { timeout: 10000 }).should('be.visible');

    // Interaja com os elementos dentro do modal
    cy.get('#confirmModal .modal-footer a.btn-primary').click();
    cy.get('#estrela-5').check({ force: true });
    cy.get('#comentario').type('Excelente aula!');
    cy.get('.btn-primary').click();
    // Tenta avaliar o mesmo professor novamente
   // Clique para abrir o modal
    cy.get('button[data-toggle="modal"][data-target="#confirmModal"]').click();

    // Aguarde o modal aparecer
    cy.get('#confirmModal', { timeout: 10000 }).should('be.visible');

    // Interaja com os elementos dentro do modal
    cy.get('#confirmModal .modal-footer a.btn-primary').click();
    cy.contains('Você já enviou uma avaliação para este professor.').should('be.visible');
    

});
