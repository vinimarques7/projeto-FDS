Cypress.Commands.add('deleteAllUsersP', () => {
    cy.exec('python delete_usersP.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('deleteAllLembretes', () => {
    cy.exec('python delete_lembretes.py', { failOnNonZeroExit: false })
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

Cypress.Commands.add('adicionarLembrete', () =>{
    cy.deleteAllLembretes();
    // Encontra o campo de texto do lembrete e digita o texto
    cy.get('textarea[name="lembrete_texto"]').type('Este é um lembrete de teste');
    
    // Clica no botão para adicionar o lembrete
    cy.get('button').contains('Adicionar Lembrete').click();

    // Verifica se o lembrete foi adicionado corretamente à lista de lembretes
    cy.get('.list-group-item').should('contain', 'Este é um lembrete de teste');

    // Verifica se a mensagem de sucesso aparece (se houver)
    cy.get('.alert').should('contain', 'Lembrete adicionado com sucesso');
})

describe('test suite Filtrar', () => {
    it('Deve adicionar um lembrete com sucesso', () => {
        //steps do cenario1
        cy.visit('/');
        cy.registerLoginP();
        cy.adicionarLembrete();
    
        
    })

    it('Falha ao adicionar lembrete sem texto', () => {
        //steps do cenario2
        cy.deleteAllLembretes();
        cy.visit('/');
        cy.registerLoginP();
        // Clica no botão para adicionar o lembrete
        cy.get('button').contains('Adicionar Lembrete').click();


        // Verifica se a mensagem de sucesso aparece (se houver)
        cy.get('.alert').should('contain', 'O lembrete não pode estar vazio');

    })

    it('Falha ao ultrapassar o limite de caracteres', () => {
        cy.deleteAllLembretes();
        cy.visit('/');
        cy.registerLoginP();
        cy.get('textarea[name="lembrete_texto"]').type('Não se esqueça de revisar o código do projeto de backend, garantindo que a lógica de associar comentários aos alunos e professores esteja funcionando corretamente. Além disso, certifique-se de que o sistema de avaliação com estrelas esteja totalmente integrado e testado. Lembre-se também de documentar todas as etapas, fazer commits frequentes no Git e verificar a conexão com o banco de dados antes de finalizar o envio do projeto');
        cy.get('button').contains('Adicionar Lembrete').click();
        cy.get('.alert').should('contain', 'O lembrete não pode ultrapassar 255 caracteres');
    })
})