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