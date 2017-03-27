angular.module('venue.controllers', [])
.controller('VenueCtrl', function($scope, $ionicModal, $http, $state, $ionicPopup) {

 // Form data for the login modal
  $scope.venue = {};

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
  $scope.venueRegister = function() {
    var api = "http://seananderson.co.uk/api/makevenue.php";
    var data = {
    	email: localStorage.getItem('email'),
    	name: $scope.venue.name,
    	first_line: $scope.venue.address1,
    	second_line: $scope.venue.address2,
    	city: $scope.venue.city,
      postcode: $scope.venue.postcode
    }
    $http.post(api, data).then(function (res){
      var apiReturns = JSON.stringify(res);
      console.log(apiReturns);
      if (apiReturns.includes('Venue created succesfully')>=0) {
        popUp("Venue added", "The venue was created succesfully");
      }
    })
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
