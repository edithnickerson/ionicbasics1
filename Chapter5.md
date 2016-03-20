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

The discussion here is to add tabs and navigation.

Notes:

* You can't place `ionTabs` into an `ionContent`
* You place an `ionTab` within an `ionTabs` container
* We generally place an `ionNavVeiw` within each `ionTab`
* Using an `ionNavView` within each tab has the advantage of being able to cycle through a stack of views much as we would use a browser tab to move through several websites

![Wilken Figure 5.3](http://i39.photobucket.com/albums/e188/ahuimanu/Figure5-3_zpsuwuda247.png "Giving tabs individual histories with ionViews")

## Chapter 5: Step 3

Notes:

* We'll use the `name` attribute of each `ion-view` to be able to call the tab/view by name
* We'll use the `ui-sref` attribute that uses tab icons as buttons
* 
![Wilken Figure 5.4](http://i39.photobucket.com/albums/e188/ahuimanu/Figure5-4_zpsskkoelqi.png "Tabs with individual titles and histories")

* You can create a `parent.child` relationship among states
* you can set the `abstract` property on a parent such that it can't be an active/concrete state
* Child routes are appended onto the parent route
* create the views and contents for each tab
 
## Chapter5: Step 4

Notes:

* uses the [BitcoinAverage API](https://bitcoinaverage.com "BitcoinAverage API")