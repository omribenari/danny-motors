
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
    cy.get('input[type="checkbox"]');
    cy.get('button[type="submit"]');
  });

  it('submit request successfully', () => {

    cy.get('#full-name').type('omri ben ari');
    cy.get('#email').type('omri79@gmail.com');
    cy.get('#phone').type('123123123123');
    cy.get('#select-selectedCarMake')
      .click()
      .then(() => {
        cy.get('li[data-value="Jaguar"]').click();
      });
    cy.get('#select-selectedModel')
      .click()
      .then(() => {
        cy.get('li[data-value="XJ"]').click();
      });
    cy.get('#car-year').type('2008');
    cy.get('#car-km').type('100000');
    cy.get('#car-lp').type('23-567-00');
    cy.get('#note').type(
      'khsf kfhskjdfh ksjdhfkjshdfkjshfkjsdhf sdkjfh  skjdfh skdjfhks dfksj hfkjshfkjsdhf dsk',
    );
    cy.get('input[type="checkbox"]').click();

    cy.get('button[type="submit"]').click();

    cy.contains('Your service request form submit successfully.');

  });
});