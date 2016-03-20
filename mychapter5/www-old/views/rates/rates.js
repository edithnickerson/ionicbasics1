angular.module('App')
.controller('RatesController', ['$scope','$http', 'Currencies',
  function ($scope, $http, Currencies) {
  
    var rc = this;
  
    rc.currencies = Currencies;
  
    rc.load = function () {
      $http.get('https://api.bitcoinaverage.com/ticker/all').success(function (tickers) {
        
        //angular foreach method with callback for each element in the array
        angular.forEach(rc.currencies, function (currency) {
          currency.ticker = tickers[currency.code];
          currency.ticker.timestamp = new Date(currency.ticker.timestamp);
        });
      });
    };
  
    rc.load();
}]);
