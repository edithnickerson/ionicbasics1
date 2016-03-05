# Exploring ionic

The Wilken book starts exploring ionic in Chapter 4.

The book has you downloading parts of his code from Github using the `git clone` command.

You are fairly familiar with git by now.

## Chapter 4: The Resort App

First, you'll want to make a new cloud9 project and execute these commands within it:

`git clone https://github.com/ionic-in-action/chapter4.git`

`cd chapter4`

`git checkout -f step1`

`ionic serve -p $PORT` this is to run on Cloud9

we'll use the above variation of `ionic serve` several times in the future.

Wilken's chapter 4 example app is for a ficticious resort. Some things it does are:

* Handling navigation and routing
* Displaying icons, lists, and cards
* Using external data

## Chapter 4: Step 2

`git checkout -f step2`

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

`git checkout -f step3`

Adding views.

### Content container

`ionContent` is a wrapper for content in a view. It provides:

* Appropriate height/size for content based on device
* Header and footer bar integration and awareness
* Scrolling management

![Wilken Figure 4.5](http://i39.photobucket.com/albums/e188/ahuimanu/Figure4-5_zps8zgvujcm.png "Wilken Figure 4.5")

### CSS for styling

Much as we'd use bootstrap, we'll use some of Ionic's built-in classes to help specify the desired styles for our UI elements.

You will notice some of these classes in the following listing.

![Wilken Listing 4.5](http://i39.photobucket.com/albums/e188/ahuimanu/Listing4-5_zpszgyelsuh.png "Wilken Listing 4.5")

Many Ionic components use either CSS or JavaScript to get the UI to look and behave in a specified manner.

### Ionic Icons

Adding standardized icons for your UI is fairly common for both mobile apps and websites.

You can review the icons that come with Ionic here: [https://ionicons.com](https://ionicons.com "Ionic icons").

It would be possible to use some other font icon library, such as [Font Awesome](http://fortawesome.github.io/Font-Awesome/ "Font Awesome"), but the standard ionic/angular icons should do.

![Wilken Listing 4.6](http://i39.photobucket.com/albums/e188/ahuimanu/Listing4-6_zpsbha2vsac.png "Wilken Listing 4.6")

## Chapter 4: Step 4

`git checkout -f step4`

### Creating a Controller

Since Ionic is based on Angular, a controller should be familiar.

Among many things, Ionic uses an Angular controller to access the `$scope` service for data binding and other goodies.

![Wilken Figure 4.6](http://i39.photobucket.com/albums/e188/ahuimanu/Figure4-6_zpsmlzmersk.png "Wilken Figure 4.6")

#### A Reservation Controller

Since we're making a resort app, we'll model a reservation at the resort.  Notice that these examples access the `$scope`
object directly.

![Wilken Listing 4.7](http://i39.photobucket.com/albums/e188/ahuimanu/Listing4-7_zpsu6rj3gg5.png "Wilken Listing 4.7")

#### Reservation View Template

Notice some of the new Ionic directives used in this template.

![Wilken Listing 4.8](http://i39.photobucket.com/albums/e188/ahuimanu/Listing4-8_zps9qtekzdi.png "Wilken Listing 4.8")