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
  this.userData = false;

  this.getProfile = function() {
    $http.get('/auth/profile').success(function(response) {
      this.userData = response;
      return this.userData;
    });
  }

  this.logout = function() {
    return $http.get('/auth/logout');
  }

});

app.controller('MainCtrl', function($scope, User) {

  $scope.userData = User.userData;

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
      User.userData = false;
    });
  }
});
