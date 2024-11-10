// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora o erro específico de 'addEventListener'
    if (err.message.includes("Cannot read properties of null (reading 'addEventListener')")) {
        return false; // Impede que o Cypress falhe o teste
    }
    // Permite que outros erros não relacionados causem falhas
});
// Alternatively you can use CommonJS syntax:
// require('./commands')