# Exploring ionic

The Wilken book starts exploring ionic in Chapter 4.

The book has you downloading parts of his code from Github using the `git clone` command.

You are fairly familiar with git by now.

## Chapter 4: The Resort App

Wilken's chapter 4 example app is for a ficticious resort. Some things it does are:

* Handling navigation and routing
* Displaying icons, lists, and cards
* Using external data

## Chapter 4: Step 2

Basic ionic components include:

* `ionicNavView`
* `ionicNavBar`

### Listing 4.1

Some things to watch out for in the code.

![Wilken Listing 4.1](http://i39.photobucket.com/albums/e188/ahuimanu/Listing4-1_zpsofxp9nt2.png "Wilken Listing 4.1")

#### Views as States

A state is the current representation of an app (from ui-router):

* URL/route associated with the view
* Controller associated with the view
* template attached to the view (states are typically linked to a view)
* ui-router: [https://github.com/angular-ui/ui-router/wiki](https://github.com/angular-ui/ui-router/wiki "ui-router")

### Listing 4.2 Declaring App States

Ionic uses ui-router to handle routing. Routing is the ability to associate either a view or data by [manipulating the path portion of a URL](https://doepud.co.uk/blog/anatomy-of-a-url "Anatomy of a URL").

This is the code that does so in the `www/js/app.js` source file.

![Wilken Listing 4.2](http://i39.photobucket.com/albums/e188/ahuimanu/Listing4-2_zpsx8bvgfs6.png "Wilken Listing 4.2")

### Listing 4.3 Adding a template of the Home Views as States

The template for the home view.

```html
<ion-view view-title="Aloha Resort" hide-back-button="true"></ion-view>
```
## Chapter 4: Step 3

Adding views.

### Content container

`ionContent` is a wrapper for content in a view. It provides:

* Appropriate height/size for content based on device
* Header and footer bar integration and awareness
* Scrolling management

![Wilken Figure 4.5](http://i39.photobucket.com/albums/e188/ahuimanu/Figure4-5_zps8zgvujcm.png "Wilken Figure 4.5")

### CSS for styling

Much as we'd use bootstrap, we'll use some of Ionic's built-in classes to help specify the desired styles for our UI elements.
