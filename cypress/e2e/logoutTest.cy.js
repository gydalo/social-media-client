/* eslint-disable */
// Had to disable because I couldn't find a way to make EsLint understand Cypress. Will look more into it later.

import { logout } from '../../src/js/api/auth/logout';

describe('Logout functionality', () => {
  beforeEach(() => {
    window.localStorage.setItem('token', 'fake-token');
    window.localStorage.setItem('profile', 'fake-profile');

    cy.visit('http://127.0.0.1:5500/');
  });

  it('removes token and profile from localStorage when logout is called', () => {
    logout();

    cy.window().its('localStorage.token').should('be.undefined');
    cy.window().its('localStorage.profile').should('be.undefined');
  });
});
