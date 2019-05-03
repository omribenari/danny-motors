import React from 'react';

describe('Service request page', () => {

  beforeEach(() => {
    cy.visit('service-req');
  });

  it('loads successfully', () => {
    cy.contains('Request a service');
    cy.contains('Request a service');
    cy.get('#full-name');
    cy.get('#email');
    cy.get('#phone');
    cy.get('#select-selectedCarMake');
    cy.get('#select-selectedModel');
    cy.get('#car-year');
    cy.get('#car-km');
    cy.get('#car-lp');
    cy.get('#note');
    cy.get('span[data-cy="checkbox-accept"]');
    cy.get('button[type="submit"]');
  });
});