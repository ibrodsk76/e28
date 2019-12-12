## P3 Peer Review

+ Reviewer's name: Irene Brodskiy
+ Reviewee's name: Mamdouh Alharbi
+ URL to reviewee's Github repo: *https://github.com/mamdooh26/e28*


### Are you able to produce any errors or unexpected results?

There are no user visible errors, but I get an error in the console when removing a recipe from Favorites:
```
vue.runtime.esm.js:1888 TypeError: this.favorite.count is not a function
    at a.removeFromFavorite (FavoritePage.vue:35)
    at click (FavoritePage.vue?feb4:1)
    at ne (vue.runtime.esm.js:1854)
    at HTMLButtonElement.n (vue.runtime.esm.js:2179)
    at HTMLButtonElement.Zo.i._wrapper (vue.runtime.esm.js:6911)
```
Looks like the line that is causing the error in *removeFromFavorite* function is this:
```
app.store.cartCount = this.favorite.count();
```
It seems like there was supposed to be a *count()* function in Favorite.js, but it's not there. Also, it is unclear why we need the *cartCount* if we don't show it anywhere.
In addition to that, when a user adds the same recipe to Favorites multiple times, it increases the quantity in the localStorage, but again the quantity is not used anywhere in the application:
[{"id":1,"quantity":3}]

I supposed the count\quantity are there for future use and will be expanded on in the next phase of the development.

### Were there any parts of the interface that you found confusing or unclear?

There is no indication that the recipe is already added to the favorites. When a user clicks 'Add to Favorite" multiple times, the message 'Your favorite has been updated!' falshes every time, but the recipe only displays once under the Favorites, so it is unclear why it allows you to add it more than once.
It would be nice if there was some indication that this recipe is already in your Favorites and you don't need to add it again.

### Are there aspects of the code that you feel were not self-evident and would benefit from comments?

Some comments in the code still reference products, cart, etc. These should be removed or modified to avoid confusion. Otherwise everything is clear.

### Are there any parts of the code that you found interesting or taught you something new?

I am not very good with CSS, but I liked how the ingridients in the recipes were displayed, so I took a closer look. I haven't encountered the ":before" selector before and didn't know it could be used to add the counters to the list, very interesting. The hover over each ingirient also looks very nice.

### Are there any best practices discussed in course material that you feel were not addressed in the code?

Apache is not configured in production to run all traffic through the main index.html file, so you get a 404 error when refreshing the page. It wasn't a requirement in project 3, but would be a convinient feature. 
Other than that everything seems to be addressed.

### Do you have any additional comments not covered in the above questions?

Great application, simple and easy to navigate, nice looking. I wish there were more receipies to explore. Good job!