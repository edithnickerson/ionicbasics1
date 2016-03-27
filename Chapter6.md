# Ionic in Action - Chapter 6

Covering:

* Side menu
* Action sheets and popups
* Modals
* Scrolling

## Reminder on git

Here is a good tutorial/guide on git: [Git tutorial](https://www.atlassian.com/git/tutorials/what-is-version-control "git tutorial")

## Weather App

So, we're building this:

![Weather App](http://i39.photobucket.com/albums/e188/ahuimanu/Figure6-1_zps8csoxjxg.png "Weather App")

## Side Menus

`git checkout -f step2`

Keeps a menu available on demand, rather than cluttering the main view.

We use `ionSideMenus` components to accomplish this.

Opening:

1. (Default) swiping
2. Button (usually in the top-left corner)
3. Programmatically (using sidebar delegate service)

![Side menus in Ionic](http://i39.photobucket.com/albums/e188/ahuimanu/Figure6-2_zpsft4cgdlc.png "Side menus")

### Declaring and using Side Menus

You declare your side menu separately: `<ion-side-menus>` and `<ion-side-menu-content>` and `<ion-side-menu>`

## Searching for locations

The weather app will use Google's Geolocation API to search for locations by inputted text (ZIP code, city name, etc.).

Obtain the code:

`git checkout -f step3`

![Search for location](http://i39.photobucket.com/albums/e188/ahuimanu/Figure6-3_zps7drbtslp.png "search for location")

Add new states for this view and controller.

![Add location search state](http://i39.photobucket.com/albums/e188/ahuimanu/Listing6-2_zpsgxndodwu.png "Location search state")

Also, examine the search template in `www/views/search/search.html`

Ionic has borrowed from the `angular-ui` project in using the `ui-sref` to help build links to states:

[ui-sref](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-sref "ui-sref")

### Controller

Note that the `$http` service is used directly within the controller again. Also, the `$scope` is used directly.

## Settings View and Data Services

`git checkout -f step4`

We'll provide some settings for the user:

* Units (F or C)
* How many days in the forecast
* List of favorite stations

### Services

We'll create services to:

1. Keep favorite locations
2. Keep settings

Recall that we use an Angular service in order to:

1. Share data and functions between controllers
2. Any changes made in the service data are immediately available across all services
3. Access external capabilities

#### The Settings service

```javascript
.factory('Settings', function () {
  var Settings = {
    units: 'us',
    days: 8
  };
  return Settings;
})
```

#### The Locations service

```javascript
.factory('Locations', function () {
  var Locations = {
    data: [{
      city: 'Chicago, IL, USA',
      lat: 41.8781136,
      lng: -87.6297982
    }],
    getIndex: function (item) {
      var index = -1;
      angular.forEach(Locations.data, function (location, i) {
        if (item.lat == location.lat && item.lng == location.lng) {
          index = i;
        }
      });
      return index;
    },
    toggle: function (item) {
      var index = Locations.getIndex(item);
      if (index >= 0) {
        Locations.data.splice(index, 1);
      } else {
        Locations.data.push(item);
      }
    },
    primary: function (item) {
      var index = Locations.getIndex(item);
      if (index >= 0) {
        Locations.data.splice(index, 1);
        Locations.data.splice(0, 0, item);
      } else {
        Locations.data.unshift(item);
      }
    }
  };
```

The Locations service is injected straight into the side menu using a new controller created in the app.js file:

```javascript
.controller('LeftMenuController', function ($scope, Locations) {
  $scope.locations = Locations.data;
})
```

This is then added to the `<ion-side-menu>`

We haven't seent his yet in Ionic as we've handled all controllers and views as states.  However, the sidemenu isn't a state, so we add the controller directly to it.

We use an `ng-repeat` to show the favorites in the side menu in the `index.html` main template:

```html
<ion-list>
    <ion-item class="item-icon-left" ui-sref="search" menu-close><span class="icon ion-search"></span> Find a City</ion-item>
    <ion-item class="item-icon-left" ui-sref="settings" menu-close><span class="icon ion-ios-cog"></span> Settings</ion-item>
    <ion-item class="item-divider">Favorites</ion-item>
    <ion-item class="item-icon-left" ui-sref="weather({city: location.city, lat: location.lat, lng: location.lng})" menu-close ng-repeat="location in locations"><span class="icon ion-ios-location"></span> {{location.city}}</ion-item>
</ion-list>
```

### Settings Template

The settings template provides:

1. A radio list to select temperature units `ionRadio`
2. A range to configure the number of days to show in the forecast - HTML5 range
3. A list to manage favorite locations - `ionList`

![Settings View](http://i39.photobucket.com/albums/e188/ahuimanu/Figure6-4_zpsz2zwecaa.png "settings")

```html
<ion-view view-title="Settings">
  <ion-content>
    <ion-list>
      <ion-item class="item-divider">Units</ion-item>
      <ion-radio ng-model="settings.units" ng-value="'us'">Imperial (Fahrenheit)</ion-radio>
      <ion-radio ng-model="settings.units" ng-value="'si'">Metric (Celsius)</ion-radio>
      <div class="item item-divider">Days in forecast <span class="badge badge-dark">{{settings.days - 1}}</span></div>
      <div class="item range range-positive">
        2 <input type="range" name="days" ng-model="settings.days" min="2" max="8" value="8"> 8
      </div>
      <div class="item item-button-right">Favorites <button class="button button-small" ng-click="canDelete = !canDelete">{{canDelete ? 'Done' : 'Edit'}}</button></div>
    </ion-list>
    <ion-list show-delete="canDelete">
      <ion-item ng-repeat="location in locations">
        <ion-delete-button class="ion-minus-circled" ng-click="remove($index)"></ion-delete-button>
        {{location.city}}
      </ion-item>
    </ion-list>
    <p class="padding">Weather data powered by <a href="https://developer.forecast.io/docs/v2">Forecast.io</a> and geocoding powered by <a href="https://developers.google.com/maps/documentation/geocoding/">Google</a>.</p>
  </ion-content>
</ion-view>
```

#### Settings controller

```javascript
angular.module('App')
.controller('SettingsController', function ($scope, Settings, Locations) {

    //setting default values
    $scope.settings = Settings;
    $scope.locations = Locations.data;
    $scope.canDelete = false;
    
    //accommodates removing a favorite
    $scope.remove = function (index) {
        Locations.toggle(Locations.data[index]);
    };
});

```

#### Settings state

in app.js:

```javascript
.state('settings', {
    url: '/settings',
    controller: 'SettingsController',
    templateUrl: 'views/settings/settings.html'
})
```

## The Weather View

Shows the current weather and forecast for a location.

`git checkout -f step5`

![Weather View](http://i39.photobucket.com/albums/e188/ahuimanu/Figure6-5_zpssabhxlc2.png "weather view")

## Forecast IO

As we did with weather underground, we'll need to get a forecast.io API key in order to continue with this example.

We can do so by visiting [https://develoeper.forecast.io](https://develoeper.forecast.io).

As with all of these services, there is a free tier beyond which you have to pay for use.

## CORS

Cross-origin resource sharing is mentioned in the book and can be further examined here [CORS](http://enable-cors.org).

Some services we'll consume won't support CORS and your attempt to make an API call from a RESTful service from a site that doesn't support CORS will fail.

When developing, the Ionic CLI provides a means to create a proxy to consume the non-CORS REST API and allow you to use it.  When your app is deployed on a device, however, you'll need to either 
provide your own proxy, or use JSONP.

### ionic.project proxy

You set the Ionic CLI proxy this way (in the ionic.project file):

```javascript
{
  "name": "chapter6",
  "app_id": "",
  "proxies": [
    {
      "path": "/api/forecast",
      "proxyUrl": "https://api.forecast.io/forecast/<your-forecast.io-key-here>/"
    }
  ]
}
```

The proxy setting is set in the ionic.project file that accompanies your project.

This proxy will be in effect when we run:

* `ionic serve`
* `ionic emulate`
* `ionic run`

### Weather View Template

The template is currently rather simple

```html
<ion-view view-title="{{params.city}}">
  <ion-content>
    <h3>Current Conditions</h3>
    <p>{{forecast.currently.temperature | number:0}}&deg;</p>
  </ion-content>
</ion-view>
```

### Weather View Controller

The controller is fairly simple as well and uses the built-in `$stateParams` service to obtain lat and lon.

```javascript
angular.module('App')
.controller('WeatherController', function ($scope, $http, $stateParams, Settings) {
    $scope.params = $stateParams;
    $scope.settings = Settings;

    $http.get('/api/forecast/' + $stateParams.lat + ',' + $stateParams.lng, {params: {units: Settings.units}}).success(function (forecast) {
        $scope.forecast = forecast;
    });
});
```

### Add the state

We then add the state:

```javascript
.state('weather', {
  url: '/weather/:city/:lat/:lng',
  controller: 'WeatherController',
  templateUrl: 'views/weather/weather.html'
})
```

## ionScroll

We further explore `ionScroll` and other additions to improve the appearance of the app.

`git checkout -f step6`

### The Weather View

![The ionScroll Weather View](http://i39.photobucket.com/albums/e188/ahuimanu/Figure6-6_zpsuxdoyohp.png "weather view")

#### IonScroll

`ionScroll` provides more scrolling capabilities than `ionContent`.

However, `ionScroll` requires that you tell it how large the viewing area will be (based on the size of the screen).

We'll do this as `ionScroll` will help us scroll by the page.

![Ion Scroll Paging](http://i39.photobucket.com/albums/e188/ahuimanu/Figure6-7_zpsehwsh0mt.png "ionScroll Paging")

`ionScroll` will work by creating a page that includes a current page, and the next and previous pages.

#### Weather View Template

The template reveals how the calculations that `ionScroll` requires are performed:

```html
<ion-view view-title="{{params.city}}">
  <ion-content>
    <ion-scroll direction="y" paging="true" ng-style="{width: getWidth(), height: getHeight()}">
      <div ng-style="{height: getTotalHeight()}">
        <div class="scroll-page center" ng-style="{width: getWidth(), height: getHeight()}">
```

The rest of the template uses Ionic's styling extensively, including a grid system which is common in CSS frameworks, such as bootstrap.

#### Weather View Controller

Note how we are determining view sizes in order to faciliate the use of ionScroll.

```javascript
angular.module('App')
.controller('WeatherController', function ($scope, $http, $stateParams, Settings) {
  $scope.params = $stateParams;
  $scope.settings = Settings;

  $http.get('/api/forecast/' + $stateParams.lat + ',' + $stateParams.lng, {params: {units: Settings.units}}).success(function (forecast) {
    $scope.forecast = forecast;
  });

  var barHeight = document.getElementsByTagName('ion-header-bar')[0].clientHeight;
  $scope.getWidth = function () {
    return window.innerWidth + 'px';
  };
  $scope.getTotalHeight = function () {
    return parseInt(parseInt($scope.getHeight()) * 3) + 'px';
  };
  $scope.getHeight = function () {
    return parseInt(window.innerHeight - barHeight) + 'px';
  };
});

```

#### CSS

Wilken adds some of his own CSS to make things look snappier:

```css
.scroll-page .icon:before {
  padding-right: 5px;
}
.scroll-page .row + .row {
  margin-top: 0;
  padding-top: 5px;
}
.scroll-page .row:nth-of-type(odd) {
  background: #fafafa;
}
.scroll-page .row:nth-of-type(even) {
  background: #f3f3f3;
}
.scroll-page .wind-icon {
  display: inline-block;
}
.scroll-page.center {
  text-align: center;
}
.scroll-page .primary {
  margin: 0;
  font-size: 100px;
  font-weight: lighter;
  padding-left: 30px;
}
.scroll-page .secondary {
  margin: 0;
  font-size: 150px;
  font-weight: lighter;
}
.scroll-page .has-header {
  position: relative;
}

```

## Custom Filters for the Forecast Data

Ionic provides the ability to use filters to modify and control how data is presented in a view.

Also, since we're dealing with time, we'll use the [MomentJS](http://momentjs.com/) timezone library.

`ionic add moment-timezone`

As these chapter notes assume you are using the `git checkout` method of following the book, Wilken has already installed momentjs.

Remember, filters are for changing how data is viewed without transforming the original data.

### Filter for handling timezones

Uses MomentJS and your browser to detect local time versus UTC.

```javascript
.filter('timezone', function () {
  return function (input, timezone) {
    if (input && timezone) {
      var time = moment.tz(input * 1000, timezone);
      return time.format('LT');
    }
    return '';
  };
})
```

### Filter for showing the chance of percipitation

Rounds the change of percipitation value to be to the multiple of 10.

```javascript
.filter('chance', function () {
  return function (chance) {
    if (chance) {
      var value = Math.round(chance * 10);
      return value * 10;
    }
    return 0;
  };
})
```

### Filter for showing ionicons to correspond to weather

Uses Ionicon styles for weather conditions.

```javascript
.filter('icons', function () {
    var map = {
        'clear-day': 'ion-ios-sunny',
        'clear-night': 'ion-ios-moon',
        rain: 'ion-ios-rainy',
        snow: 'ion-ios-snowy',
        sleet: 'ion-ios-rainy',
        wind: 'ion-ios-flag',
        fog: 'ion-ios-cloud',
        cloudy: 'ion-ios-cloudy',
        'partly-cloudy-day': 'ion-ios-partlysunny',
        'partly-cloudy-night': 'ion-ios-cloudy-night'
    };
    return function (icon) {
        return map[icon] || '';
    }
})
```

## Action Sheets

These are used to show a list of options to a user.

`git checkout -f step7`

An action sheet acts as a model dialog which we slide into the view. As a modal dialog, it is temporary and must be cancelled/dismissed to get the dialog to go away.

Platform specificity: iOS has a feature like this, but Android lacks it.

![Action Sheet](http://i39.photobucket.com/albums/e188/ahuimanu/Figure6-8_zpsmpn8gnho.png "Action Sheet")

### Action Sheet Services

We'll not use a template for the Action Sheet as it will run entirely from the built-in `$ionicActionSheet` service.

Rather, we create a list of buttons and a specification for what should happen when each of those buttons is selected.

#### Adding the action sheet button

We use a common `ion-more` icon to trigger the action sheet.

```html
<ion-nav-buttons side="right">
    <button class="button button-icon" ng-click="showOptions()"><span class="icon ion-more"></span></button>
</ion-nav-buttons>
```
#### Adding the $ionicActionSheet to the Weather View Controller

We inject the $ionicActionSheet into the controller and us it.

The `showOptions` method is called by the more button in the UI.

Also notice that we use an `if...else` to detect which of the buttons was clicked.

```javascript
$scope.showOptions = function () {
var sheet = $ionicActionSheet.show({
  buttons: [
    {text: 'Toggle Favorite'},
    {text: 'Set as Primary'},
    {text: 'Sunrise Sunset Chart'}
  ],
  cancelText: 'Cancel',
  buttonClicked: function (index) {
    if (index === 0) {
      Locations.toggle($stateParams);
    }
    if (index === 1) {
      Locations.primary($stateParams);
    }
    if (index === 2) {
      $scope.showModal();
    }
    return true;
  }
});
};
```

## ionModal for sunrise and sunset

We can create a modal dialog also with `ionModal`.  These are temporary dialogs which take control of the UI until you dismiss them.  We sometimes call modal dialogs "pop ups."

`git checkout -f step8`

Modals are useful to show something contextual without leaving the underlying view.

![ionModal](http://i39.photobucket.com/albums/e188/ahuimanu/Figure6-9_zpsmj5bzccz.png "ionModal")

On smaller devices, modals usualy cover the entire screen. On larger devices, it might be centered.

You can use CSS to control this as the modal will vary in size depending on the device.

### Modal setup

We'll set up the modal after injecting it w ith the `$ionicModal` service.  As with the popover, we'll have to clean up the modal as it is not part of a template/view/state.

#### Updating the Weather View Controller

We include three methods in the controller to help work with the modal dialog:

```javascript
  $scope.showModal = function () {
    if ($scope.modal) {
      $scope.modal.show();
    } else {
      $ionicModal.fromTemplateUrl('views/weather/modal-chart.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.modal = modal;
        var days = [];
        var day = Date.now();
        for (var i = 0; i < 365; i++) {
          day += 1000 * 60 * 60 * 24;
          days.push(SunCalc.getTimes(day, $scope.params.lat, $scope.params.lng));
        }
        $scope.chart = days;
        $scope.modal.show();
      });
    }
  };
  $scope.hideModal = function () {
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
```

#### Modal dialog template

We also create a template for the modal.  Another important aspect of using modals is to keep in mind that a modal dialog creates a child scope for you to use.

This means that if we want a modal to be attached to the view that we used to call it, you should tell the modal that the scope for that view is its parent scope.

In keeping with the asynchronous programming inherent in web and mobile programming, template loading for the modal utilizes a promise, which uses a `then()` method to be called when the template has been loaded.

We also need to listen for the `$destroy` event on the scope in order to clean up the resources that the modal requires.

NOTE: As with the popovers from chapter 5, we must take steps to reclaim the resources allocated for both modals and popovers.  This is partially because we use controller code to create these rather than the templating system.

#### Modal template for the sunrise and sunset charts

Our `ionicModal` uses an HTML template to compose the modal dialog's visual elements.

We use the `ionModalView` directive to accomplish this.

```html
<ion-modal-view>
  <ion-header-bar class="bar-dark">
    <h1 class="title">Sunrise, Sunset Chart</h1>
    <button class="button button-clear" ng-click="hideModal()">Close</button>
  </ion-header-bar>
  <ion-content>
    <div class="list">
      <div class="item" collection-repeat="day in chart">
        {{day.sunrise | date:'MMM d'}}: {{day.sunrise | date:'shortTime'}}, {{day.sunset | date:'shortTime'}}
      </div>
    </div>
  </ion-content>
</ion-modal-view>
```

### Showing the sunrise/sunset data

The book makes a good point that, if we were to show sunrise and sunset data, we'd have to potentially show the entire year if we didn't try to filter the data somehow.

Instead, we use the _*Collection Repeat*_ feature which works on a collection of items to show only a portion of those items.  This is good for scrolling through large data sets.

Considerations:

* You can only work with arrays of items
* You must define the exact height and width of the items
* The collection repeat takes up the entirety of its container

![Understanding Collection Repeat](http://i39.photobucket.com/albums/e188/ahuimanu/Figure6-10_zpsuwib4p60.png "Collection Repeat")

