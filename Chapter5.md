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

Notes:

* We've used `ngModel` in Angular and we know it uses `$scope` to bind back to the controller code.


### The History Controller

Notes:

* We configure highcharts here and it does its __Magic__.
* Highcharts uses a csv version of the bitcoinaverage API, which makes things much easier.
* You can specify parameters for a state using this syntax: `state?parameter` (i.e. `/history?currency`)

```javascript
angular.module('App')
.controller('HistoryController', function ($scope, $http, $state, $stateParams, Currencies) {

  $scope.history = {
    currency: $stateParams.currency || 'USD'
  };
  $scope.currencies = Currencies;

  $scope.changeCurrency = function () {
    $state.go('tabs.history', { currency: $scope.history.currency });
  };

  $scope.chart = {
    options: {
      chart: {
        type: 'line'
      },
      legend: {
        enabled: false
      }
    },
    title: {
      text: null
    },
    yAxis: {
      title: null
    },
    xAxis: {
      type: 'datetime'
    },
    series: []
  };

  $http.get('https://api.bitcoinaverage.com/history/' + $scope.history.currency + '/per_hour_monthly_sliding_window.csv').success(function (prices) {

    prices = prices.split(/\n/);
    var series = {
      data: []
    };

    angular.forEach(prices, function (price, index) {
      price = price.split(',');
      var date = new Date(price[0].replace(' ', 'T')).getTime();
      var value = parseFloat(price[3]);
      if (date && value > 0) {
        series.data.push([date, value]);
      }
    });

    $scope.chart.series.push(series);
  });

  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.history = {
      currency: $stateParams.currency || 'USD'
    };
  });
});

```

Running the app at this point is highly impressive.  Highcharts is pretty cool.

## Chapter 5: Step 8

`git checkout -f step8`

In this step, we present a selectable and re-orderable list such that the user can configure the currency list.

![Using Lists](http://i39.photobucket.com/albums/e188/ahuimanu/Figure5-9_zpsv2nrsj4d.png "Using Lists")

Notes: 

* `ionReorderButton` works with an ionList directive.
* The `ionList` component uses the `show-reorder` attribute to determine whether the `ionReorderButton` should be shown
* The `on-reorder` method allows for the specification of what method should handle reordering
    * `$fromIndex` and `$toIndex` makes it possible to keep track of the reordering the users makes
* `ionToggle` provides a UI for manipulating values in an `ngModel` such as `currency.selected`.

### The Currencies Template

```html
<ion-view view-title="Currencies">
  <ion-nav-buttons side="primary">
    <button class="button" ng-click="state.reordering = !state.reordering">Reorder</button>
  </ion-nav-buttons>
  <ion-content>
    <ion-list show-reorder="state.reordering">
      <ion-item class="item-toggle" ng-repeat="currency in currencies">
        {{currency.code}} - {{currency.text}}
        <label class="toggle toggle-balanced">
        <input type="checkbox" ng-model="currency.selected">
          <div class="track">
            <div class="handle"></div>
          </div>
        </label>
        <ion-reorder-button class="ion-navicon" on-reorder="move(currency, $fromIndex, $toIndex)"></ion-reorder-button>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-view>

```

### The Currencies Controller

Notes:
* Notice the older way that all of this code uses `$scope` directly.
* We listen for the `$stateChangeStart` event on the `$scope` in order to disable reordering when the tab loses focus.
* The `move()` method handles the reordering by dealing with the `$scope.currencies` array directly
* Note the use of our Currencies service
    * All controllers will share/use this service.
    * Reordering the list in the currencies controller will now be reflected when any other controller uses the service.

```javascript
angular.module('App')
.controller('CurrenciesController', function ($scope, Currencies) {
  $scope.currencies = Currencies;
  $scope.state = {
    reordering: false
  };

  $scope.$on('$stateChangeStart', function () {
    $scope.state.reordering = false;
  });

  $scope.move = function(currency, fromIndex, toIndex) {
    $scope.currencies.splice(fromIndex, 1);
    $scope.currencies.splice(toIndex, 0, currency);
  };
});

```

At this point the app is complete.

