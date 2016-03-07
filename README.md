# Exploring ionic

The Wilken book starts exploring ionic in Chapter 4.

The book has you downloading parts of his code from Github using the `git clone` command.

You are fairly familiar with git by now.

# Notes About Running Ionic Apps

Here are some notes to keep in mind about running ionic apps from now on.  Generally, we are concerned with:

* Developing and running ionic apps on Cloud9
* Chrome Developer Tools
* Using Wilken's code
* Using Ionic Platform and Ionic Lab
* Previewing the App in the View App
* Ionic Creator

## Developing on Cloud9

Cloud 9 has been a great IDE and runtime environment so far.  We can do almost 
everything on Cloud9 short of actually deploying to your device.

##Install Ionic for every project

For every C9 ionic project you'll need to install `ionic` and `cordova`:

`npm install -g ionic`
 
 and 
 
 `npm install -q cordova`

### Things to remember about Cloud 9

Since we'll run the web version of our apps for testing, recall that you must specify the port for ionic to run on this way on Cloud 9:

`ionic serve -p $PORT`

You'll notice two things when after running this command:
1. You'll see that the ionic CLI mode is invoked where you are expected to enter server commands
2. You'll get a running notice from Cloud 9

Running notice:

![Cloud9 Running Notice](http://i39.photobucket.com/albums/e188/ahuimanu/Cloud9-RunningNotice_zpsohxygrzo.png "Cloud9 Running Notice")

Ionic CLI:

![Ionic CLI](http://i39.photobucket.com/albums/e188/ahuimanu/Ionic%20CLI_zpsrbusjuox.png "Ionic CLI")

## Chrome Developer Tools

`Ctrl + Shift + I` (on windows) will open Chrome's developer tools when in the Chrome browser (recommended).  
You can also open this up from the "hamburger" menu on the upper right-hand corner 
of Chrome.  Look under `More Tools` >> `Developer Tools`.

![Chrome Developer Tools](http://i39.photobucket.com/albums/e188/ahuimanu/Chrome-Developer-Tools_zps8sfpqiad.png "Chrome Developer Tools")

### Previewing Mobile Device

Perhaps the neatest tool offered in Chrome's Developer Tools is the Device Mode. With this, 
you can preview your ionic page as though it were on the device.

Chrome Developer Tools Device Mode:

![Chrome Developer Tools Device Mode](http://i39.photobucket.com/albums/e188/ahuimanu/Chrome-Developer-Tools-Device-Mode_zpsletlgav7.png "Chrome Developer Tools Device Mode")

## Runnig Wilken's Code

All of the [book's](https://www.manning.com/books/ionic-in-action "Ionic in Action") code is at: [https://github.com/ionic-in-action](https://github.com/ionic-in-action "ionic in action")

You'll notice throughout the chapters that Wilken uses `git` commands so that you can
`clone` and `checkout` phases or steps of each chapter as you read along.  I __HIGHLY__ recommend you follow along in the book in this manner.

##Ionic Platform and Ionic Lab

Ionic also offers free app hosting using their `ionic platform` service.

You can sign up for free at [https://apps.ionic.io](https://apps.ionic.io "ionic platform").

What you get from IONIC platform is;

* Security profiles
* Users and Authentication
* Push notification service
* Deployment services
* Analytics services
* Packaging
* API
 
For now, the biggest benefit is to be able to host outside of Cloud9 and for other deployment benefits.

### Ionic Lab

[Ionic Lab](http://lab.ionic.io/ "Ionic Lab")

[![Ionic Lab](http://lab.ionic.io/images/touch/chrome-touch-icon-192x192.png "Ionic Lab")](http://lab.ionic.io/)

Ionic Lab is a desktop app available to greatly simplify the process of building, testing and deploying your app.

We may or may not use this later.  We most likely __WON'T__ need this as we'll be using the CLI tools.

## Previewing in the Ionic Viewer

Both the Android and Ios App stores have an app from Ionic availbale which lets you 
download your app from the Ionic Platform and preview your app on your device.

This is awesome as it will behave as though it were your native app.

This will be very handy: [Ionic View App](http://view.ionic.io/ "Ionic View App")

[![Ionic View Logo](http://view.ionic.io/ionicview-logo.png "Ionic View Logo")](http://view.ionic.io/)

## Ionic Creator

I'm not sure if I can recommend this as, although this is free, it is barely free.

Ionic Creator is a mostly-for-pay service that allows you to use a browser to 
assist in the GUI/WYSIWYG creation of an Ionic app.

[Ionic Creator](https://creator.ionic.io "Ionic Creator")

[![Ionic Creator](https://creator.ionic.io/img/creator-preview.png "Ionic Creator")](https://creator.ionic.io)

What seems potentially interesting about this is the ability to export back to CLI.  When you pay, it seems that 
it can export to native.

The primarily utility to this app seems to be the potential for collaboration and for its graphical UI designer.

# Hawaii Resort App

What is nice about the [Wilken Book](https://www.manning.com/books/ionic-in-action "Jeremy Wilken") is that it is easy to follow.

[![Jeremy Wilken - Ionic In Action](https://images.manning.com/310/310/crop/book/c/273c2c8-7fd6-4956-b1ea-e2c95b647a2a/Wilken-Ionic-HI.png "Ionic in Action")](https://www.manning.com/books/ionic-in-action)

Wilkien will walk us through the creation of an App for a ficticious Hawaii Resort.

![Wilken Figure 4.2](http://i39.photobucket.com/albums/e188/ahuimanu/Figure4-2_zpsjtb3h9cc.png "Wilken Figure 4.2")

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

This file has been called reservation.js and is actually placed along with its view.  This is the author's preference.

#### Reservation View Template

Notice some of the new Ionic directives used in this template.

![Wilken Listing 4.8](http://i39.photobucket.com/albums/e188/ahuimanu/Listing4-8_zps9qtekzdi.png "Wilken Listing 4.8")

## Chapter 4: Step 5

`git checkout -f step5`

### Reviewing States

We have a reservation state for navigation to the reservation template and controller.

We'll also make a new state in order to load exernal data into the app regarding the weather.

Here is what the code would look like by now:

```javascript
.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html'
    })
    .state('reservation', {
      url: '/reservation',
      controller: 'ReservationController',
      templateUrl: 'views/reservation/reservation.html'
    })
    .state('weather', {
      url: '/weather',
      controller: 'WeatherController',
      templateUrl: 'views/weather/weather.html'
    });

  $urlRouterProvider.otherwise('/home');

})
```

Also, since the reservation controller was declared in a separate file, we'll need to included
a reference to it in our index.html file:

```html
<script src="views/reservation/reservation.js"></script>
```

### Weather View

[Much like work we've done together in AngularJS](https://github.com/ahuimanu/cidm4385-2016sp-angular-services "Calling weather services"),

Wilken utilizes a web service API to grab weather for the ficticious Hawaii Resort app.  While we've used the [WeatherUnderground API](https://www.wunderground.com/weather/api/ "Weather Underground API")
previously, the Wilken book uses [Open Weather Map Api](http://openweathermap.org/api "Open Weather Map API").

The process for obtaining an API key at Open Weather Map is similar to the process for Weather Underground.

Some features at this stage:

* using a web service within your app
* translating some of the web service values to be more readable
* showing a loading screen to the user while fetching an exernal resource (`$ionicLoading`)

![Wilken Figure 4.7](http://i39.photobucket.com/albums/e188/ahuimanu/Figure4-7_zpsi4qmmmnl.png "Wilken Figure 4.7")

Here's what a weather view would look like to show the weather from the Open Weather Map service:

```html
<ion-view view-title="Current Weather">
  <ion-content>
    <div class="list">
      <div class="item">Current Conditions: {{weather.weather[0].main}}</div>
      <div class="item">Current Temperature: {{weather.main.temp}}&deg;</div>
      <div class="item">Humidity: {{weather.main.humidity}}%</div>
      <div class="item">Today's High: {{weather.main.temp_max}}&deg;</div>
      <div class="item">Today's Low: {{weather.main.temp_min}}&deg;</div>
      <div class="item">Wind: {{weather.wind.speed}}mph, {{getDirection(weather.wind.deg)}}</div>
    </div>
  </ion-content>
</ion-view>

```

#### Wilken's API vs Open Weather Map

Since Wilken would have to reveal his API key in order to make this app work, he's actually 
created a proxy service of his own that the code in the chapter calls.

He's set this up to statically call only one location:

[https://ionic-in-action-api.herokuapp.com/weather](https://ionic-in-action-api.herokuapp.com/weather "Wilken's weather service")

What is nice is that Wilken is also demonstrating a nice Platform-as-a-Service option you'd have for hosting your own services: 
[Heroku](https://www.heroku.com/ "Heroku Cloud Application Hosting").

#### Using the $http service

We've used the AngularJS [$http](https://docs.angularjs.org/api/ng/service/$http "$http service") service previously.

However, the Wilken code differs from ours in that Wilken uses $http directly in his controller:

![Wilken Listing 4.11](http://i39.photobucket.com/albums/e188/ahuimanu/Listing4-11_zps2saikqkw.png "Wilken Listing 4.11")

Also, you could replace his service URL with YOUR Open Weather Map API.  Also note that Wilken is using the older version
of the `$http.get` method that uses `success` and `error` rather than `then`.

#### Add the Weather view state to www/js/app.js

```javascript
.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html'
    })
    .state('reservation', {
      url: '/reservation',
      controller: 'ReservationController',
      templateUrl: 'views/reservation/reservation.html'
    })
    .state('weather', {
      url: '/weather',
      controller: 'WeatherController',
      templateUrl: 'views/weather/weather.html'
    });

  $urlRouterProvider.otherwise('/home');

})
```

Also be sure to add a reference to the Weather controller in your index.html main template.

```html
<script src="views/weather/weather.js"></script>
```

### Adding a Loading Indicator

You are familiar with the tendency for mobile apps, web pages, and even desktop apps to given some indication to the user that
background work is being performed. We'll use the `$ionicLoading` service to do this.

![Wilken Figure 4.8](http://i39.photobucket.com/albums/e188/ahuimanu/Figure4-8_zpszmasgdki.png "Wilken Figure 4.8")

#### show() and hide()

We'll use the show and hide components of the `$ionicLoading` service to help manage this display.

* `show()` is be used while your background loading is underway
* `hide()` is to be used to hide the loading UI component when the background work is complete

See how this is handled in the controller:

![Wilken Listing 4.13](http://i39.photobucket.com/albums/e188/ahuimanu/Listing4-13_zpsggsyv9rh.png "Wilken Listing 4.13")

## Chapter 4: Step 6

`git checkout -f step6`

## Infinite Scrolling

Next, Wilken shows us how to use the concept of UI "cards," used like a list, to help to create a common UI technique called infinite scrolling.

![Wilken Figure 4.9](http://i39.photobucket.com/albums/e188/ahuimanu/Figure4-9_zpsxamwsaw3.png "Wilken Figure 4.9")

You obtain the card by specifying a class for a DIV to use within the `ion-content` directive.

```html
<ion-view view-title="Local Restaurants">
  <ion-content>
    <div class="list card" ng-repeat="restaurant in restaurants">
      <div class="item">
        <h2>{{restaurant.name}}</h2>
        <p>{{restaurant.address}}, {{restaurant.city}}</p>
      </div>
      <div class="item item-image">
        <img ng-src="{{restaurant.image_url}}" />
      </div>
    </div>
    <ion-infinite-scroll on-infinite="getRestaurants()" ng-if="total > page" immediate-check="false"></ion-infinite-scroll>
  </ion-content>
</ion-view>
```

How `ion-infinite-scroll` works:

* If the component is within 1% distance of the view area (about to be shown)
* Then the method declared in the `on-infinite` attribute will be called
* A loading indicator is shown at first as no restaurants are yet loaded
* The `nfIf` is there to determine how infinite scroll will be disabled
* Some of the logic for infinite scroll is handled in the controller

### Restaurants View Controller

![Wilken Listing 4.15](http://i39.photobucket.com/albums/e188/ahuimanu/Listing4-15_zps34dcchea.png "Wilken Listing 4.15")

The controller is created in a separate JS file along with the view.

The steps above:

1. Variables used to track paing - `page`,`total`, and `restaurants`
2. Method to call to fetch a restaurant - `getRestaurants()`
3. Increment page value and make `$http` request
4. Store request results into the end of an array of restaurants
5. Set the total value of restaurants found
6. Use `$scope.$broacast` to let infinite scroll that the loading of restaurants is complete
7. Handle any `$http` errors
8. Start the data loading via the `getRestaurants()` method

We must also add this view state to the app:

```javascript
.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html'
    })
    .state('reservation', {
      url: '/reservation',
      controller: 'ReservationController',
      templateUrl: 'views/reservation/reservation.html'
    })
    .state('weather', {
      url: '/weather',
      controller: 'WeatherController',
      templateUrl: 'views/weather/weather.html'
    })
    .state('restaurants', {
      url: '/restaurants',
      controller: 'RestaurantsController',
      templateUrl: 'views/restaurants/restaurants.html'
    });

  $urlRouterProvider.otherwise('/home');

})
```

And also add this controller to the index. html file:

```html
<script src="views/restaurants/restaurants.js"></script>
```

## Chapter 4: Step 7

`git checkout -f step7`

## SlideBox component for the App Intro

We can create a simple slideshow with `ionSlideBox` for the "splash" page of our app.

![Wilken Figure 4.10](http://i39.photobucket.com/albums/e188/ahuimanu/Figure4-10_zpsr20ohwca.png "Wilken Figure 4.10")

We'll use the `$ionSlideBoxDelegate` service to programmatically control the slidebox. We'll also use CSS to assist in specifying how the slidebox works.

### The Tour View Template

![Wilken Listing 4.16](http://i39.photobucket.com/albums/e188/ahuimanu/Listing4-16_zpsbofxourm.png "Wilken Listing 4.16")

Some supplemental CSS for each slide:

```css
#tour-view .slider {
  height: 100%;
}
#tour-view .slider-slide {
  padding-top: 100px;
  text-align: center;
}
#tour-view .icon-slide {
  font-size: 20em;
  display: inline-block;
}

```

Ensure that these CSS styles are referenced in our index.html master template:

```html
<link href="views/tour/tour.css" rel="stylesheet">
```

Also, update the Tour state in app.js

```javascript
.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html'
    })
    .state('reservation', {
      url: '/reservation',
      controller: 'ReservationController',
      templateUrl: 'views/reservation/reservation.html'
    })
    .state('weather', {
      url: '/weather',
      controller: 'WeatherController',
      templateUrl: 'views/weather/weather.html'
    })
    .state('restaurants', {
      url: '/restaurants',
      controller: 'RestaurantsController',
      templateUrl: 'views/restaurants/restaurants.html'
    })
    .state('tour', {
      url: '/tour',
      templateUrl: 'views/tour/tour.html'
    });

  $urlRouterProvider.otherwise('/tour');

})
```