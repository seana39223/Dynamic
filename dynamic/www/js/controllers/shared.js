angular.module('shared.controllers', [])
.controller('AppCtrl', function($scope, $stateParams, $state) {
  //Logout function which can be called by any of the pages other than the register and login pages.
  $scope.logOut = function() {
  	localStorage.removeItem('email');
    $state.go('login');
  }
});
