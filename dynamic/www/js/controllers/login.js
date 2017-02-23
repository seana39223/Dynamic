angular.module('login.controllers', [])
.controller('LoginCtrl', function($scope, $ionicModal, $http, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  //Used http://www.nikola-breznjak.com/blog/codeproject/posting-data-from-ionic-app-to-php-server/?ckattempt=1 as guide point for following code.
  $scope.doLogin = function() {
    var api = "http://seananderson.co.uk/api/test.php";
    var details = {email : $scope.loginData.email, pass: $scope.loginData.password};
    details = JSON.stringify(details);
    $http.post(api, "details", {
       headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    }).then(function (res){
      console.log(JSON.stringify(res));
    });
  $state.go('app.home');
  };
})
