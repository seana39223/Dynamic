angular.module('register.controllers', [])
.controller('RegisterCtrl', function($scope, $ionicModal, $http, $state, $ionicPopup) {
  var api = "http://seananderson.co.uk/api/listgenre.php";
  $http.get(api).then(function(res) {
    var length = (res['data']).length;
    var select = angular.element(document.querySelector('#genre'));
    for (i=0;i<length;i++) {
      select.append('<option>' + res['data'][i] + '</option>');
    }
  })

 // Form data for the login modal
  $scope.register = {};

  //Generic popup as there may need to be multiple popups for this page. Code is based of ionic documentation for popup.
  popUp = function(title, message) {
  	var alertPopup = $ionicPopup.alert({
  		title: title,
  		template: message
  	});
  	alertPopup.then(function(res) {
  	});
  }

  //Function which checks validation for 
  $scope.doValidation = function() {
    //Array which will has the type of everything the user should have entered.
  	var check = ['name', 'email', 'type', 'password', 'cpassword'];
    //TODO: Complete this code.
  }

  //Function for when the user clicks the validation button.
  $scope.doRegistration = function() {
  	//$scope.doValidation();
    //TODO: Change below code once validation function has been made properly.
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
    		password: $scope.register.password,
    	}
    	$http.post(api, data).then(function (res){
        var apiReturns = JSON.stringify(res);
        console.log(apiReturns);
        if (apiReturns.includes('New user added succesfully')>=0) {
          localStorage.setItem('email', $scope.register.email);
          $scope.registerGenre();
          $state.go('app.home');
        }
      })
    }
    else {
    	popUp('Passwords do not match', 'The confirmation password is not the same as the initial password you entered');
    }
	}

  $scope.registerGenre = function() {
    var api = "http://seananderson.co.uk/api/registergenre.php";
    var data = {
      email: $scope.register.email,
      genre: $scope.register.genre
    }
    $http.post(api, data).then(function(res) {
      console.log(res);
    })
  }

  //Return to login page i.e user has decided they dont need to register.
	$scope.returnToLogin = function() {
		$state.go('login');
	}
})
