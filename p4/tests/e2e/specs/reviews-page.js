describe('reviews-page', () => {
    let destination = {
        id: 1,
        name: 'Paris, France'
      }
    
    let myreview = {
        user: 'John Smith',
        title: 'My Review',
        review: 'This is my review from Cypress',
        date: null
      } 

    it('writes a review', () => {
        // go to destination page
        cy.visit('/destination/' + destination.id)
        // click 'write review' for first place
        cy.get('[data-test="write-review"]').first().click();
        // fill out the review form
        cy.get('[data-test="user-name-input"]').type(myreview.user);
        cy.get('[data-test="title-input"]').type(myreview.title);
        cy.get('[data-test="place-review-textarea"]').type(myreview.review);
        // click 'add review' button
        cy.get('[data-test="add-review-button"]').click();
        // go to reviews link
        cy.get('[data-test="reviews-link"]').first().click();  
        // verify the new review is there
        cy.contains('[data-test="review-title"]', myreview.title);
      })
})