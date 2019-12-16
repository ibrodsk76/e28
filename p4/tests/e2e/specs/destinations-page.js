describe('destinations-page', () => {

    let destination = {
        name: 'Paris, France'
      }

    it('shows all the destinations', () => {
        // go to destinations page
        cy.visit('/destinations')
        // check the title  
        cy.contains('h2', "Choose Your Destination")
        // check destination name   
        cy.contains('[data-test="destination-name"]', destination.name)
        // check how many destinations, should be 3
        cy.get('[data-test="destination-name"]').should('have.length', 3)
        // click on the first destination
        cy.get('[data-test="destination-name"]').first().click();
        // verify that made it to correct destination page
        cy.contains('h2', destination.name)
  })
})