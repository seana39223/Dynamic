angular.module('artists.controllers', [])
.controller('ArtistsCtrl', function($scope, $http) {

  $scope.artists={};
  $scope.artistList = [];
  //Gets the list of all artists.
  var api = "http://seananderson.co.uk/api/listartists.php";
  var feed = angular.element(document.querySelector('#artists'));
  var data = { 
    email: localStorage.getItem('email')
  }


  $http.post(api, data).then(function(res){
  	res['data'].forEach(function(user) {
      $scope.artistList.push(user);
        var userNumber = user['id'];
        feed.append('<div id = " ' + userNumber + '" class="users">' + '<h2>' + user['displayname'] + '</h2> </br>' + '<img <img  height="50 px" width="50 px" src = "' +  user['picture'] + ' "></img></br><a href="#/app/loversinfo?lover=' + userNumber + '">More Info</a></div></br>');
  	});
  });
$scope.searchArtists = function() {

  if ($scope.artists.search == "Close to your home") {
    var loversArray = new Array();
    var api = "http://seananderson.co.uk/api/getpostcode.php";
    var data = {
      email: localStorage.getItem('email')
    }
    $http.post(api, data).then(function(res) {
      var homePostcode = res['data'];
      api = "http://api.postcodes.io/postcodes/" + homePostcode ;
      var latHome;
      var longHome;
      $http.get(api).then(function(res) {
        latHome = (res['data']['result']['latitude']);
        longHome = (res['data']['result']['longitude']);
        $scope.artistList.forEach(function(artist) {
          api = "http://api.postcodes.io/postcodes/" + artist['postcode'];
          var latEvent;
          var longEvent;
          $http.get(api).then(function(res) {
            console.log(res);
            latEvent = (res['data']['result']['latitude']);
            longEvent = (res['data']['result']['longitude']);
            api = "http://seananderson.co.uk/api/distance.php";
            data = {
              lat1: latHome,
              lon1: longHome,
              lat2: latEvent,
              lon2: longEvent
            }
            $http.post(api, data).then(function(res) {
              miles = (res['data']);
              var artistsInfo = [artist, miles];
              loversArray.push(artistsInfo);
               loversArray.sort(function(a,b){
                return a[1] - b[1];
              });
            })
            console.log(loversArray);
            var feed = angular.element(document.querySelector('#artists'));
            feed.html('<div id="lovers"></div>');
            loversArray.forEach(function(lover) {
            console.log(lover[0]);
            var userNumber = lover[0]['id']
            feed.append('<div id = " ' + userNumber + '" class="users">' + '<h2>' + lover[0]['displayname'] + '</h2> <img  height="50 px" width="50 px" src="'+lover[0]['picture']+'"></img></br><a href="#/app/loversinfo?lover=' + userNumber + '">More Info</a></div></br>');
          });
          })
        });
      })
    });
  }
    if ($scope.artists.search == "Newly Joined") {
      console.log("I'm here yes");
      $scope.lovers = {};
      $scope.loversList = [];
      var api = "http://seananderson.co.uk/api/listartists.php?random=" + Math.random();
      var feed = angular.element(document.querySelector('#artists'));
      var data = { 
        email: localStorage.getItem('email')
      }
      feed.html('<div id="artists"></div>')
      $http.post(api, data).then(function(res){
        res['data'].forEach(function(user) {
          console.log("In here");
          var userNumber = user['id'];
          feed.append('<div id = " ' + userNumber + '" class="users">' + '<h2>' + user['displayname'] + '</h2> <img  height="50 px" width="50 px" src="'+user['picture']+'"></img></br><a href="#/app/loversinfo?lover=' + userNumber + '">More Info</a></div></br>');
        });
      });
    }
}
});