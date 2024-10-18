/* eslint-disable */
// Had to disable because I couldn't find a way to make EsLint understand Cypress.

describe('Login Test', function () {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('logs the user in with valid credentials', () => {
    cy.intercept('post', '**/social/auth/login', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          accessToken: 'fake-token',
          username: 'validUser',
          email: 'validUser@stud.noroff.no',
        },
      });
    }).as('loginRequest');

    cy.get('#loginEmail').type('validUser@stud.noroff.no');
    cy.get('#loginPassword').type('validPassword123');
    cy.get('#loginBtn').click();

    cy.wait('@loginRequest').its('request.body').should('deep.equal', {
      email: 'validUser@stud.noroff.no',
      password: 'validPassword123',
    });
  });

  it('cant login the user with invalid credentials', () => {
    cy.intercept('post', '**/social/auth/login', (req) => {
      req.reply({
        statusCode: 401,
        body: {
          message: 'Wrong username or password',
        },
      });
    }).as('loginRequest');

    cy.get('#loginEmail').type('invalidUser@stud.noroff.no');
    cy.get('#loginPassword').type('invalidPassword123');
    cy.get('#loginBtn').click();

    cy.wait('@loginRequest');

    cy.on('window:alert', (string) => {
      expect(string).to.equal(
        'Either your username was not found or your password is incorrect',
      );
    });
  });
});
