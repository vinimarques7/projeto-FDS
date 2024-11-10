Cypress.Commands.add('deleteAllUsersP', () => {
    cy.exec('python delete_usersP.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('deleteAllUsersA', () => {
    cy.exec('python delete_usersA.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('deleteObjetivos', () => {
    cy.exec('python delete_objetivos.py', { failOnNonZeroExit: false })
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

it('Adicionar um novo objetivo de estudo', () => {
    cy.deleteObjetivos();
    cy.visit('/');
    cy.registerLoginP();
    cy.visit('/');
    cy.registerLoginA();
    cy.contains('.nav-link', 'Perfil').click(); // Acessa a página de perfil
    cy.get('#novo_objetivo').type('Estudar álgebra avançada'); // Insere o texto do novo objetivo
    cy.contains('Adicionar Objetivo').click(); // Clica no botão para adicionar o objetivo
    cy.contains('Objetivo de estudo adicionado com sucesso!').should('be.visible'); // Verifica a mensagem de sucesso
    cy.contains('Estudar álgebra avançada').should('be.visible'); // Verifica se o objetivo foi adicionado
});

it('Erro ao adicionar um objetivo duplicado', () => {
    cy.deleteObjetivos();
    cy.visit('/');
    cy.registerLoginP();
    cy.visit('/');
    cy.registerLoginA();
    cy.contains('.nav-link', 'Perfil').click(); // Acessa a página de perfil
    cy.get('#novo_objetivo').type('Estudar álgebra avançada');
    cy.contains('Adicionar Objetivo').click();
    cy.contains('Objetivo de estudo adicionado com sucesso!').should('be.visible');
    
    // Tenta adicionar o mesmo objetivo novamente
    cy.get('#novo_objetivo').type('Estudar álgebra avançada');
    cy.contains('Adicionar Objetivo').click();
    cy.contains('Este objetivo de estudo já foi adicionado.').should('be.visible'); // Verifica a mensagem de erro para objetivo duplicado
});

it('Adicionar uma nova tarefa a um objetivo existente', () => {
    cy.deleteObjetivos();
    cy.visit('/');
    cy.registerLoginP();
    cy.visit('/');
    cy.registerLoginA();
    cy.contains('.nav-link', 'Perfil').click(); // Acessa a página de perfil
    cy.get('#novo_objetivo').type('Estudar álgebra avançada');
    cy.contains('Adicionar Objetivo').click();
    cy.contains('Estudar álgebra avançada').should('be.visible');

    // Adiciona uma nova tarefa ao objetivo
    cy.get('input[name="nova_tarefa"]').first().type('Completar exercícios do capítulo 1'); // Adiciona a nova tarefa
    cy.contains('Adicionar Tarefa').click(); // Clica no botão para adicionar a tarefa
    cy.contains('Tarefa adicionada ao objetivo de estudo!').should('be.visible'); // Verifica a mensagem de sucesso
    cy.contains('Completar exercícios do capítulo 1').should('be.visible'); // Verifica se a tarefa foi adicionada
});

it('Erro ao adicionar uma tarefa duplicada ao objetivo', () => {
    cy.deleteObjetivos();
    cy.visit('/');
    cy.registerLoginP();
    cy.visit('/');
    cy.registerLoginA();
    cy.contains('.nav-link', 'Perfil').click(); // Acessa a página de perfil
    cy.get('#novo_objetivo').type('Estudar álgebra avançada');
    cy.contains('Adicionar Objetivo').click();
    cy.contains('Estudar álgebra avançada').should('be.visible');

    // Adiciona uma tarefa ao objetivo
    cy.get('input[name="nova_tarefa"]').first().type('Completar exercícios do capítulo 1');
    cy.contains('Adicionar Tarefa').click();
    cy.contains('Tarefa adicionada ao objetivo de estudo!').should('be.visible');

    // Tenta adicionar a mesma tarefa novamente
    cy.get('input[name="nova_tarefa"]').first().type('Completar exercícios do capítulo 1');
    cy.contains('Adicionar Tarefa').click();
    cy.contains('Esta tarefa já foi adicionada ao objetivo.').should('be.visible'); // Verifica a mensagem de erro para tarefa duplicada
});

it('Concluir uma tarefa de um objetivo', () => {
    cy.deleteObjetivos();
    cy.visit('/');
    cy.registerLoginP();
    cy.visit('/');
    cy.registerLoginA();
    cy.contains('.nav-link', 'Perfil').click(); // Acessa a página de perfil
    cy.get('#novo_objetivo').type('Estudar álgebra avançada');
    cy.contains('Adicionar Objetivo').click();
    cy.contains('Estudar álgebra avançada').should('be.visible');

    cy.get('input[name="nova_tarefa"]').first().type('Completar exercícios do capítulo 1');
    cy.contains('Adicionar Tarefa').click();
    cy.contains('Completar exercícios do capítulo 1').should('be.visible');

    // Marca a tarefa como concluída
    cy.get('button').contains('⏺').click(); // Marca a tarefa como concluída
    cy.get('span').contains('Completar exercícios do capítulo 1').should('have.class', 'text-decoration-line-through'); // Verifica se a tarefa foi concluída
});

it('Remover uma tarefa de um objetivo', () => {
    cy.deleteObjetivos();
    cy.visit('/');
    cy.registerLoginP();
    cy.visit('/');
    cy.registerLoginA();
    cy.contains('.nav-link', 'Perfil').click(); // Acessa a página de perfil
    cy.get('#novo_objetivo').type('Estudar álgebra avançada');
    cy.contains('Adicionar Objetivo').click();
    cy.contains('Estudar álgebra avançada').should('be.visible');

    cy.get('input[name="nova_tarefa"]').first().type('Completar exercícios do capítulo 1');
    cy.contains('Adicionar Tarefa').click();
    cy.contains('Completar exercícios do capítulo 1').should('be.visible');

    // Remove a tarefa
    cy.get('button').contains('Apagar').click(); // Remove a tarefa
    cy.contains('Tarefa removida com sucesso!').should('be.visible'); // Verifica a mensagem de sucesso
    cy.contains('Completar exercícios do capítulo 1').should('not.exist'); // Verifica se a tarefa foi removida
});

it('Remover um objetivo', () => {
    cy.deleteObjetivos();
    cy.visit('/');
    cy.registerLoginP();
    cy.visit('/');
    cy.registerLoginA();
    cy.contains('.nav-link', 'Perfil').click(); // Acessa a página de perfil
    cy.get('#novo_objetivo').type('Estudar álgebra avançada');
    cy.contains('Adicionar Objetivo').click();
    cy.contains('Estudar álgebra avançada').should('be.visible');

    // Remove o objetivo
    cy.get('button').contains('Remover Objetivo').click(); // Remove o objetivo
    cy.contains('Objetivo de estudo removido com sucesso!').should('be.visible'); // Verifica a mensagem de sucesso
    cy.contains('Estudar álgebra avançada').should('not.exist'); // Verifica se o objetivo foi removido
});