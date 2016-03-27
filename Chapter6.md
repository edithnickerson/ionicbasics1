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

## Declaring and using

You declare your side menu separately: `<ion-side-menus>` and `<ion-side-menu-content>` and `<ion-side-menu>`

## Searching for locations

The weather app will use Google's Geolocation API to search for locations by inputted text (ZIP code, city name, etc.).

Obtain the code:

`git checkout -f step3`

![Search for location](http://i39.photobucket.com/albums/e188/ahuimanu/Figure6-3_zps7drbtslp.png "search for location")

Add new states for this view and controller.

![Add location search state](http://i39.photobucket.com/albums/e188/ahuimanu/Listing6-2_zpsgxndodwu.png "Location search state")