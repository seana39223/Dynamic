angular.module('listFollowing.controllers', [])
.controller('ListFollowingCtrl', function($scope, $cordovaGeolocation, $http, $compile, $state, $ionicLoading) {
  $scope.events = {};
  $scope.eventsList = [];
  var api = "http://seananderson.co.uk/api/listfollowing.php?random=" + Math.random();
  data = {
    email: localStorage.getItem('email')
  }
  $http.post(api,data).then(function(res){
    console.log(res['data']);
    $scope.listData=[];
    var feed = angular.element(document.querySelector('#feed'));
    res['data'].forEach(function(user) {
      var api = "http://seananderson.co.uk/api/getloversinfo.php"
      var data = {
        id : user['following_id']
      }
      $http.post(api, data).then(function(res){
        user = res['data'];
        if (user['email']===undefined) {
        }
        else if (user['email']==localStorage.getItem('email')) {
        }
        else{
          feed.append('<div id = " ' + user['id'] + '" class="users">' + '<h2>' + user['displayname'] + '</h2> </br>' + '<img <img  height="50 px" width="50 px" src = "' +  user['picture'] + ' "></img></br><a href="#/app/loversinfo?lover=' + user['id'] + '">More Info</a></div></br>');
        }
      })
    })
  })
});
