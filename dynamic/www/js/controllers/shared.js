angular.module('shared.controllers', [])
.controller('AppCtrl', function($scope, $stateParams, $state) {
  $scope.logOut = function() {
    $state.go('login');
  }
});
