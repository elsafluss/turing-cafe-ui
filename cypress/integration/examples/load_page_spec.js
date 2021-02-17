/// <reference types="cypress" />

describe('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/?name=&date=&time=&number=')
  })

  it.only('should load the home page', () => {
    cy.get('.app-title')
      .contains('Turing Cafe Reservations')
      .get('form').children('input')
      .should('have.class', 'name-input')
      .should('have.class', 'date-input')
      .should('have.class', 'time-input')
      .should('have.class', 'number-input')
      .get('button')
      .should('have.class', 'submit-button')
    cy.get('.resy-container')
      .children('p')
      .should('have.class', 'resy')
  })
  
  it('.submit() - submit a form', () => {
    // https://on.cypress.io/submit
    cy.get('.action-form')
    .find('[type="text"]').type('HALFOFF')
    
    cy.get('.action-form').submit()
    .next().should('contain', 'Your form has been submitted!')
  })
  
  it('.click() - click on a DOM element', () => {
    // https://on.cypress.io/click
    cy.get('.action-btn').click()
    cy.get('#action-canvas').click()
  })
  
  it('.clear() - clears an input or textarea element', () => {
    // https://on.cypress.io/clear
    cy.get('.action-clear').type('Clear this text')
      .should('have.value', 'Clear this text')
      .clear()
      .should('have.value', '')
  })

  it('.select() - select an option in a <select> element', () => {
    // https://on.cypress.io/select

    // at first, no option should be selected
    cy.get('.action-select')
      .should('have.value', '--Select a fruit--')

    // Select option(s) with matching text content
    cy.get('.action-select').select('apples')
    // confirm the apples were selected
    // note that each value starts with "fr-" in our HTML
    cy.get('.action-select').should('have.value', 'fr-apples')

    cy.get('.action-select-multiple')
      .select(['apples', 'oranges', 'bananas'])
      // when getting multiple values, invoke "val" method first
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

    // Select option(s) with matching value
    cy.get('.action-select').select('fr-bananas')
      // can attach an assertion right away to the element
      .should('have.value', 'fr-bananas')

    cy.get('.action-select-multiple')
      .select(['fr-apples', 'fr-oranges', 'fr-bananas'])
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

    // assert the selected values include oranges
    cy.get('.action-select-multiple')
      .invoke('val').should('include', 'fr-oranges')
  })
})
