angular.module('register.controllers', [])
.controller('RegisterCtrl', function($scope, $ionicModal, $http, $state, $ionicPopup) {

 // Form data for the login modal
  $scope.register = {};

  noDetailsEntered = function() {
  	var alertPopup 
  }

  passwordMissmatch = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Passwords do not match',
      template: 'The confirmation password is not the same as the initial password you entered'
    });
    alertPopup.then(function(res) {
    });
  };

  noType = function() {
  	var alertPopup = $ionicPopup.alert({
  	  title: 'No User Type',
  	  template: 'No user type has been selected.'
  	});
  	alertPopup.then(function(res) {
  	});
  };

  invalidEmail = function() {
  	var alertPopup = $ionicPopup.alert({
      title: 'Invalid Email',
      template: 'The email address is not valid.'
    });
    alertPopup.then(function(res) {
    });
  }

  alreadyUsedEmail = function() {
  	var alertPopup = $ionicPopup.alert({
      title: 'Email already registered',
      template: 'This email has already been registered to create an account of this type.'
    });
    alertPopup.then(function(res) {
    });
  }

  $scope.doRegistration = function() {
    if ($scope.register.password==$scope.register.cPassword) {
    	if($scope.register.userType=="Music Lover") {
    		var type = 1;
    	}
    	else if ($scope.register.userType=="Artist") {
    		var type = 2;
    	}
    	else if ($scope.register.userType=="Venue Owner") {
    		var type = 3;
    	}
    	else {
    		noType();
    	}
    	var api = "http://seananderson.co.uk/api/register.php";
    	var data = {
    		firstName: $scope.register.fName,
    		lastName: $scope.register.lName,
    		email: $scope.register.email,
    		type: type,
    		password: $scope.register.password 
    	}
    	$http.post(api, data).then(function (res){
          var res = JSON.stringify(res);
          if (res.indexOf('New user added succesfully')>=0) {
        	$state.go('app.home');
          }
        })
    }
    else {
    	passwordMissmatch();
    }
	}
})
