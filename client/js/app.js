var app = angular.module('TangerineApp', ['ngRoute']);

app.value('userData', {});

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/public/js/partials/indexView.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
})

app.service('User', function($http) {

  this.getProfile = function() {
    return $http.get('/auth/profile');
  }

  this.logout = function() {
    return $http.get('/auth/logout');
  }

});

app.controller('MainCtrl', function($scope, userData) {

  $scope.userData = userData;

});

app.controller('NavbarCtrl', function($scope, User, userData) {


  var updateUserData = function() {
    User.getProfile().success(function(response) {
      if(response._id) {
        console.log('response is: ' + response);
        $scope.userData = response;
      }
    });
  };

  updateUserData();

  $scope.logout = function() {
    User.logout().success(function(response) {
      userData = {};
    });
  }
});
