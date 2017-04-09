angular.module('musiclovers.controllers', ['ionic'])
.controller('musicLoversCtrl', function($scope, $http) {
  var api = "http://seananderson.co.uk/api/listusers.php";
  var feed = angular.element(document.querySelector('#lovers'));
  var data = { 
    email: localStorage.getItem('email')
  }
  $http.post(api, data).then(function(res){
  	res['data'].forEach(function(user) {
        var userNumber = user['id'];
        feed.append('<div id = " ' + userNumber + '" class="users">' + '<h2>' + user['displayname'] + '</h2> <a href="#/app/loversinfo?lover=' + userNumber + '">More Info</a></div></br>');
  	});
  });
});