angular.module('register.controllers', [])
.controller('RegisterCtrl', function($scope, $ionicModal, $http, $state, $ionicPopup) {
  var apiReturns;
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

  //Return to login page i.e user has decided they dont need to register.
  $scope.returnToLogin = function() {
    $state.go('login');
  }

  //Function which checks to make sure all fields on the form have been filled in.
  $scope.checkFields = function() {
    if ($scope.register.fName==undefined){
      popUp("Field Missing", "First Name Field Was Not Entered");
      return false;
    }

    if ($scope.register.lName==undefined) {
      popUp("Field Missing", "Last Name Field Was Not Entered.");
      return false;
    }

    if ($scope.register.email==undefined) {
      popUp("Field Missing", "Email address as not entered.");
      return false;
    }

    if ($scope.register.password==undefined) {
      popUp("Field Missing", "Password was not entered");
      return false
    }

    if ($scope.register.cPassword==undefined) {
      popUp("Field Missing", "Confirmation password was not entered");
      return false;
    }

    if ($scope.register.pCode==undefined) {
      popUp("Field Missing", "Postcode was not entered");
      return false;
    }

    if ($scope.register.dName==undefined) {
      popUp("Field Missing", "Display Name was not entered");
      return false;
    }

    if ($scope.register.userType==undefined) {
      popUp("Field Missing", "User Type was not selected.");
      return false;
    }

    if ($scope.register.genre===undefined) {
      popUp("Field Missing", "You haven't selected your favoruite genre of music.");
      return false;
    }
    else {
      return true;
    }
  }

  //Function for regsitering genre of music which user likes.
  $scope.registerGenre = function() {
    var api = "http://seananderson.co.uk/api/registergenre.php";
    $scope.register.genre.forEach(function(genre) {
    var data = {
      email: $scope.register.email,
      genre: genre
      }
      $http.post(api, data).then(function(res) {
        console.log(res);
      })
    })
  }

  //Function which valides that the users postcode they have entered is correct.
  $scope.checkPostcode = function() {
    var postcode = $scope.register.pCode;
    $scope.register.pCode = postcode.replace(/[\s]/g, '');
    if ($scope.register.pCode.length!=6) {
      if ($scope.register.pCode.length!=7) {
        if ($scope.register.pCode.length!=8) {
          popUp("Postcode is incorrect length must be 6,7 or 8 characters.")
          return false;
        }
      }
    }
    return true;
  }

  $scope.checkPassword = function() {
    if ($scope.register.password.length<6) {
      popUp("Password Invalid", "Password length must be 6 or greater.");
      return false;
    }
    return true;
  }


  //Function for when the user clicks the validation button.
  $scope.doRegistration = function() {
    //Checks all necessary fields have values.
    if ($scope.checkFields()==false){
      return;
    }
    if($scope.checkPostcode()==false) {
      return;
    }

    if ($scope.checkPassword()==false) {
      return;
    }

    //Validates email address is a new email.
    var api= "http://seananderson.co.uk/api/checkemail.php";
    var data = {
      email: $scope.register.email
    }
    $http.post(api,data).then(function(res) {
      var apiResponse = JSON.stringify(res);
      console.log(apiResponse);
      var correct = "This email is fine"
      if (apiResponse.includes(correct)) {
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
          var api = "http://seananderson.co.uk/api/displayname.php";
          var data = {
            dName: $scope.register.dName
          }

          //Checks Display Name isn't already being used.
          $http.post(api, data).then(function(res) {
            apiReturns = JSON.stringify(res);
            var incorrect = "This user name has already been used";
            if (apiReturns.includes(incorrect)) {
              popUp('This display name has already been used please choose another display name.');
            }
    	      else {
              var api = "http://seananderson.co.uk/api/register.php";
    	        var data = {
    		        firstName: $scope.register.fName,
    		        lastName: $scope.register.lName,
    		        email: $scope.register.email,
    		        type: type,
    		        password: $scope.register.password,
                postcode: $scope.register.pCode,
                dName: $scope.register.dName
    	        }
    	        $http.post(api, data).then(function(res){
                apiReturns = JSON.stringify(res);
                if (apiReturns.includes('New user added succesfully')>=0) {
                  localStorage.setItem('email', $scope.register.email);
                  if ($scope.registerGenre!=undefined) {
                    $scope.registerGenre();
                  }
                  $state.go('app.home');
                }
              })
            }
          })
        }
        else {
    	    popUp('Passwords do not match', 'The confirmation password is not the same as the initial password you entered');
        }
      }
      else {
        popUp("Email is not valid", "Please use a valid email address which hasn't already been used");
      }
    })
  }
})
