## Project 4

+ By: *Irene Brodskiy*

+ Production URL: <http://p4.hesibrodsk.me>

## Improvements based on P3 peer review feedback
+ Changed the "Trips" menu item to "My Trips", it does make more sence.
+ When all places removed from the itinerary changed "No places." message to "No places in your itinerary. Click the link above to start planning your trip."
+ When no trips have been created changed "No trips" message to "You don't have any trips. Select a destination to start building your itinerary." and provided a link to all destinations.
+ I chose not to implement the number of itineraries/trips next to the My Trips link. I felt if I show the number of trips, I would also need to show the number of places in each trip, and that would get cumbersome.


## Notes for instructor
Additional feature in the application to demonstrate form validation and submission, and also to demonstrate the persisting data to the database - submitting and viewing the reviews.
+ To test submitting a review go to the Destination page. Inside each landmarks' box there is a link to "Write a review". Fill out the review and click "Submit Review". The user name field is not require to allow a user to post anonymous review. Title and review itself are the required fields. User name and title have to be at least 4 characters, the review itself has to be at least 10 characters.
+ Back on the destination page above the "Write a review" link there is a "Reviews" link with the number of reviews for this place in parantheses. Click on the link to see all the reviews, and to verify that your review has been added.