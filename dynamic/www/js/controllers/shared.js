angular.module('shared.controllers', [])
.controller('AppCtrl', function($scope, $stateParams, $state, $ionicPopup) {
  //Logout function which can be called by any of the pages other than the register and login pages.
  $scope.logOut = function() {
  	localStorage.removeItem('email');
    $state.go('login');
    window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
    $window.location.reload();
  }

    //Generic popup as there may need to be multiple popups for this page. Code is based of ionic documentation for popup.
  popUp = function(title, message) {
  	var alertPopup = $ionicPopup.alert({
  		title: title,
  		template: message
  	});
  	alertPopup.then(function(res) {
  	});
  }
});
