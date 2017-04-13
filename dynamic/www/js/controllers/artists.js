angular.module('artists.controllers', [])
.controller('ArtistsCtrl', function($scope, $http) {
  //Gets the list of all artists.
  var api = "http://seananderson.co.uk/api/listartists.php";
  var feed = angular.element(document.querySelector('#artists'));
  var data = { 
    email: localStorage.getItem('email')
  }

  $http.post(api, data).then(function(res){
  	res['data'].forEach(function(user) {
        var userNumber = user['id'];
        feed.append('<div id = " ' + userNumber + '" class="users">' + '<h2>' + user['displayname'] + '</h2> </br>' + '<img src = "' +  user['picture'] + ' "></img></br><a href="#/app/loversinfo?lover=' + userNumber + '">More Info</a></div></br>');
  	});
  });

});