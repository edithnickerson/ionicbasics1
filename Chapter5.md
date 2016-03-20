# Chapter 5

Covers:

* Tabs
* Tabs with individual histories
* Lists
    * Toggling
    * Reordering
* Pull-to-refresh data loading
* Mobile forms
 
## Bitcoin app

We are building this app:

![Wilken Figure 5-1](http://i39.photobucket.com/albums/e188/ahuimanu/Figure5-1_zpssfmkgyx2.png "Wilken Figure 5.1")

## Getting the App

As usual with the Wilken book, we do these steps to get started:

1) Make your own project
`ionic start mychapter5 https://github.com/ionic-in-action/starter`
2) Follow along with Wilken's solution
`git clone https://github.com/ionic-in-action/chapter5.git`
`cd chapter5`
`git checkout -f step1`
3)
Periodically run it
`ionic serve -p $PORT --nolivereload`

## Chapter 5: Step 2

`git checkout -f step2`

The discussion here is to add tabs and navigation.

Notes:

* You can't place `ionTabs` into an `ionContent`
* You place an `ionTab` within an `ionTabs` container
* We generally place an `ionNavVeiw` within each `ionTab`
* Using an `ionNavView` within each tab has the advantage of being able to cycle through a stack of views much as we would use a browser tab to move through several websites

![Wilken Figure 5.3](http://i39.photobucket.com/albums/e188/ahuimanu/Figure5-3_zpsuwuda247.png "Giving tabs individual histories with ionViews")

## Chapter 5: Step 3

`git checkout -f step3`

Notes:

* We'll use the `name` attribute of each `ion-view` to be able to call the tab/view by name
* We'll use the `ui-sref` attribute that uses tab icons as buttons

![Wilken Figure 5.4](http://i39.photobucket.com/albums/e188/ahuimanu/Figure5-4_zpsskkoelqi.png "Tabs with individual titles and histories")

* You can create a `parent.child` relationship among states
* you can set the `abstract` property on a parent such that it can't be an active/concrete state
* Child routes are appended onto the parent route
* create the views and contents for each tab
 

## Chapter 5: Step 4

`git checkout -f step4`

Notes:

* Uses the [BitcoinAverage API](https://bitcoinaverage.com "BitcoinAverage API")
* We're going to wire up to this service for our app
* Place the factory service in Listing 5.9 into your app.js code
* If you compare this [Bitcoin ticker](https://api.bitcoinaverage.com/ticker/all) to the list of currencies in app.js, the CHF (swiss franc) is not there.  You need to update this as it is a bug in the book.
* Note that in Listing 5.10, Wilken makes his service call within the controller again; these should be placed into a service
* We can use our old friend `ngRepeat` along with the `ionList` component
* `ngIf` also allows for conditional display and formatting
* ionic components: `ionContent`, `ionFooterBar`, and `ionList` (used with ngRepeat)
* Add in the controller property in your state and use the "Controller as" syntax
    * Change references to `$scope` in the view accordingly

## Chapter 5: Step 5

`git checkout -f step5`

Display a currency's details in the same tab view

Notes:

* We'll want to create details for each currency

![Wilken Figure 5.6](http://i39.photobucket.com/albums/e188/ahuimanu/Figure5-6_zpsjitd94ma.png "Currency details")

## Chapter 5: Step 6

`git checkout -f step6`

Refresh the rates and display help.

* `ionRefresher` is a component that allows users to pull down on the screen and release to trigger a data refresh
    * This is attached to any `ionContent`
    * We use the `on-refresh` property of the `ionRefresher` component
* `ionPopoverView` allows for the use of an about popup/over to show help text

![Ion Refresher](http://i39.photobucket.com/albums/e188/ahuimanu/Figure5-7_zpswuxk89cr.png "Refreshing with ionRefresher")

* In the contoller, we add a `finally()` method to the `$http.get` which uses part of the Angular __Promises__ API to broadcast a `scroll.refreshComplete` event.
    * As a part of the Promises API for callbacks and asynchronous programming, `finally()` ensures that code is called whether a refresh actually worked or not.
* The `ionicPopover` component is usually connected to a button.
    * It displays a "pop up" that is somewhat dictacted by how the underlying platform works.
    * Create the popover view template right next to the template containing the button that calls on the template.
* An `ionPopoverView` is used rather than an `ionView`
    * This is wrapped in an `ionHeaderBar` and an `ionContent` component
    * You register the popover as you would with a state, however, this is done in the Controller as the popover is not global an belongs to the view calling.


The popover management code will look like this:

```javascript
  $ionicPopover.fromTemplateUrl('views/rates/help-popover.html', {
    scope: $scope,
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.openHelp = function($event) {
    $scope.popover.show($event);
  };
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
```

* A popover, like a modal dialog, will have to have its memory reclaimed when the containing controller goes out of scope.  Otherwise, the resources allocated to the popover will never be released

We also add in the popover trigger button code in the template

```html
  <ion-nav-buttons side="primary">
    <button class="button" ng-click="openHelp($event)">About</button>
  </ion-nav-buttons>
```

## Chapter 5: Step 7

`git checkout -f step7`

Charting historical data

In this step, we look at using an external library to help with charting: [Highcharts](http://highcharts.com "http://highcharts.com")

![Using Highcharts](http://i39.photobucket.com/albums/e188/ahuimanu/Figure5-8_zpsemmp8h1v.png "Using highcharts")

### Setting up to use 3rd-Party Libraries

We'll use Bower, which is a good client-side package/library manager.

from the bash prompt in C9 (do this in your project/workspace root directory):

`npm install -g bower`

We also need to install some ionic libraries to support highcharts:

(from the book and specified for compatibility):

`ionic add highcharts-release#4.0.4 highcharts-ng#0.0.7`

These are installed in the `www\lib` directory.

You should get a response that says this:

`Bower component installed - highcharts-release#4.0.4`

and 

`Bower component installed - highcharts-ng#0.0.7`

We also need to setup references to these libraries in our `index.html` and `app.js` files.

#### index.html

```html
    <script src="lib/highcharts-release/adapters/standalone-framework.js"></script>
    <script src="lib/highcharts-release/highcharts.js"></script>
    <script src="lib/highcharts-ng/dist/highcharts-ng.js"></script>
```

#### app.js

Add highcharts-ng as a project/module dependency (dependency injection)

```javascript
angular.module('App', ['ionic', 'highcharts-ng'])
```

### The History Template

We place a select box into the history template in order to select a currency.

Tempalte:

```html
<ion-view view-title="Hourly Average Price" hide-back-button="true">
  <ion-content>
    <div class="list list-inset">
      <label class="item item-input item-select">
        <div class="input-label">
          Currency
        </div>
        <select ng-change="changeCurrency()" ng-model="history.currency">
          <option ng-repeat="currency in currencies | filter:{selected:true}" value="{{currency.code}}" ng-selected="history.currency == currency.code">{{currency.code}} - {{currency.text}}</option>
        </select>
      </label>
    </div>
    <highchart config="chart"></highchart>
  </ion-content>
</ion-view>

```