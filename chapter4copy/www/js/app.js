angular.module('App', ['ionic'])

///// WEATHER SERVICE FACTORY //////////////////////////////////////////////////
.factory('weatherService',['$http', function($http){
  
  //create service object
  var weatherService = {};
  
    //get current rest conditions
  weatherService.getWeather = function(){
    return $http.get('https://ionic-in-action-api.herokuapp.com/weather');
  };

  /*    
    //factory allows us to specify an object to send back
    var weatherService = {};
    
    //weather underground API key
    var key = "e0d2934addfbff88";

    //get current rest conditions
    weatherService.getCurrentConditions = function(city){
        
        //for the API
        var url = "https://api.wunderground.com/api/" +
                  key + 
                  "/conditions/q/" + 
                  city.state + "/" +
                  city.url_name + ".json" + "?callback=JSON_CALLBACK";
        
        console.log(url);
        
        return $http.jsonp(url);

    };
    */
    
    return weatherService;

}])
.factory("localStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'current-weather') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('current-weather', val);
            return this;
        },
        getData: function() {
            
            var val = $window.localStorage && $window.localStorage.getItem('current-weather');
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
})
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
      //see Aaron Saunder's post: https://forum.ionicframework.com/t/controlleras/6091/2
      controller: 'WeatherController as wc', 
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
    })
    .state('directions',{
      url: '/directions',
      templateUrl: 'views/directions/directions.html'
    });

  $urlRouterProvider.otherwise('/tour');

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
