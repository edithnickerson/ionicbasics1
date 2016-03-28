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

## Install Ionic for every project

For every C9 ionic project you'll need to install `ionic` and `cordova`:

`npm install -g ionic`
 
 and 
 
 `npm install -g cordova`

### Things to remember about Cloud 9

Since we'll run the web version of our apps for testing, recall that you must specify the port for ionic to run on this way on Cloud 9:

`ionic serve -p $PORT --nolivereload`

You'll notice two things when after running this command:
1. You'll see that the ionic CLI mode is invoked where you are expected to enter server commands
2. You'll get a running notice from Cloud 9

Running notice:

![Cloud9 Running Notice](http://i39.photobucket.com/albums/e188/ahuimanu/Cloud9-RunningNotice_zpsohxygrzo.png "Cloud9 Running Notice")

Ionic CLI:

![Ionic CLI](http://i39.photobucket.com/albums/e188/ahuimanu/Ionic%20CLI_zpsrbusjuox.png "Ionic CLI")

### Updating Ionic Libraries

Update Ionic library files, which are found in the www/lib/ionic directory. If bower is being used
by the project, this command will automatically run bower update ionic, otherwise this command updates
the local static files from Ionic’s CDN.

`$ ionic lib update`

### CLI options

Ionic's live reload service will behave oddly on C9.  You can turn it off:

`ionic serve -p $PORT --nolivereload`

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

## Running Wilken's Code

All of the [book's](https://www.manning.com/books/ionic-in-action "Ionic in Action") code is at: [https://github.com/ionic-in-action](https://github.com/ionic-in-action "ionic in action")

You'll notice throughout the chapters that Wilken uses `git` commands so that you can
`clone` and `checkout` phases or steps of each chapter as you read along.  I __HIGHLY__ recommend you follow along in the book in this manner.

## git clone, checkout, and branch

At the beginning of every chapter, Wilken really gives you two options:

1. start a new ionic app and follow along by typing the code from the book into your own project
   
`ionic start <project_name>`

2. clone and checkout his project incrementally as he progresses through a chapter
   
`git clone <git_url>`
`git checkout -f <stepn>` where stepn is the increment from the chapter

At the end of each chapter, the last checkout from Wilken will give you hsi completed project.

Now, run this command to get your copy:

`git checkout -b <mybranch> <stepn>` again, `<stepn>` is Wilken's branch. You are not specifying the -f switch in this case as you don't want to remove your work.

If you don't want to move the HEAD around, then you can just type: `git checkout -b <mybranch>`

A good tutorial on all things `git` is here: [Git tutorial](https://www.atlassian.com/git/tutorials/what-is-version-control "Git tutorial")

## Ionic Platform and Ionic Lab

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

