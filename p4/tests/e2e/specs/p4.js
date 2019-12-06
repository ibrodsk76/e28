// https://docs.cypress.io/api/introduction/api.html

describe('TripPlanner', () => {

  it('Visits the homepage', () => {
      cy.visit('/')
      cy.contains('h2', 'Welcome to TripPlanner!')
  })

  let destination = {
    name: 'Paris, France'
  }

  let place = {
    name: 'Eiffel Tower'
  }

  it('shows all the destinations', () => {

    cy.visit('/destinations')

    cy.contains('h2', "Choose Your Destination")

    cy.contains('[data-test="destination-name"]', destination.name)

    cy.get('[data-test="destination-name"]').should('have.length', 3)

    cy.get('[data-test="destination-name"]').first().click();

  })

  it('shows all the places', () => {

    cy.contains('h2', destination.name)

    cy.contains('[data-test="place-name"]', place.name)

    cy.get('[data-test="place-name"]').should('have.length', 4)

  })

  it('interacts with itineraries', () => {

    cy.get('[data-test="add-to-itinerary-button-1"]').click();

    cy.get('[data-test="remove-from-itinerary-button-1"]').click();

    cy.get('[data-test="add-to-itinerary-button-1"]').click();

    cy.visit('/trips')

    cy.contains('h2', "Your Trips")

    cy.contains('[data-test="destination-name"]', destination.name)

    cy.get('[data-test="destination-name"]').should('have.length', 1)

    cy.get('[data-test="destination-name"]').first().click();

    cy.contains('[data-test="place-name"]', place.name)

    cy.get('[data-test="remove-from-itinerary-button-1"]').click();

    cy.contains('[data-test="no-places"]', "No places")

  })


})