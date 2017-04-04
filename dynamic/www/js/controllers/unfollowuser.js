angular.module('unFollowUser.controllers', [])
.controller('UnFollowUserCtrl', function($scope, $ionicModal, $http, $state, $ionicPopup) {
  var url = window.location.href;
  var id = url.substring(url.indexOf("=") + 1);
  var api = "http://seananderson.co.uk/api/unfollow.php";
  var data = {
    email : localStorage.getItem('email'),
    followid : id
  }
  $http.post(api, data).then(function(res) {
    popUp("Followed", "User unfollowed");
    $state.go('app.lovers');
  });

})
