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