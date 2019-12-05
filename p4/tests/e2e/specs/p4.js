// https://docs.cypress.io/api/introduction/api.html

describe('TripPlanner', () => {
  it('Visits the homepage', () => {
      cy.visit('/')
      cy.contains('h2', 'Welcome to TripPlanner!')
  })
})