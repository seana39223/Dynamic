angular.module('login.controllers', [])
.controller('LoginCtrl', function($scope, $ionicModal, $http, $state, $ionicPopup) {
  localStorage.removeItem('email');
  // Form data for the login modal
  $scope.loginData = {};

/*  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
*/
  //Function for when the user enters the wrong details.
  loginFailed = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Invalid Credentials',
      template: 'The email and/or the password you entered is not correct.'
    });
    alertPopup.then(function(res) {
    });
  };

  // Perform the login action when the user submits the login form
  //Used http://www.nikola-breznjak.com/blog/codeproject/posting-data-from-ionic-app-to-php-server/?ckattempt=1 as guide point for following code.
  $scope.doLogin = function() {
    var api = "http://seananderson.co.uk/api/login.php";
    var data = { 
      email: $scope.loginData.email,
      pass: $scope.loginData.password
    }
    $http.post(api, data).success(function(data){
      data = JSON.stringify(data);
      if (data.indexOf("not correct") >= 0) {
        loginFailed();
      }
      else {
        localStorage.setItem('email', $scope.loginData.email);
        $state.go('app.home');
      }
    });
  }

  //When the user clicks the register button.
  $scope.register = function() {
    $state.go('register');
  }
})

