angular.module('register.controllers', [])
.controller('RegisterCtrl', function($scope, $ionicModal, $http, $state, $ionicPopup) {

 // Form data for the login modal
  $scope.register = {};

  popUp = function(title, message) {
  	var alertPopup = $ionicPopup.alert({
  		title: title,
  		template: message
  	});
  	alertPopup.then(function(res) {
  	});
  }

  $scope.doValidation = function() {
  	//TODO: Add proper validation here.

  }

  $scope.doRegistration = function() {
  	//$scope.doValidation();
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
    		popUp('No User Type', 'No user type has been selected.' );
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
    	popUp('Passwords do not match', 'The confirmation password is not the same as the initial password you entered');
    }
	}

	$scope.returnToLogin = function() {
		$state.go('login');
	}
})
