angular.module('musiclovers.controllers', ['ionic'])
.controller('musicLoversCtrl', function($scope, $http) {
  $scope.lovers = {};
  $scope.loversList = [];
  var api = "http://seananderson.co.uk/api/listusers.php?random=" + Math.random();
  var feed = angular.element(document.querySelector('#lovers'));
  var data = { 
    email: localStorage.getItem('email')
  }
  $http.post(api, data).then(function(res){
  	res['data'].forEach(function(user) {
      $scope.loversList.push(user);
      var userNumber = user['id'];
      feed.append('<div id = " ' + userNumber + '" class="users">' + '<h2>' + user['displayname'] + '</h2> <img  height="50 px" width="50 px" src="'+user['picture']+'"></img></br><a href="#/app/loversinfo?lover=' + userNumber + '">More Info</a></div></br>');
  	});
  });
  $scope.searchLovers = function() {
    console.log("Button has been pressed");

  if ($scope.lovers.search == "Close to your home") {
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
        $scope.loversList.forEach(function(lover) {
          api = "http://api.postcodes.io/postcodes/" + lover['postcode'];
          var latEvent;
          var longEvent;
          $http.get(api).then(function(res) {
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
              var loversInfo = [lover, miles];
              loversArray.push(loversInfo);
               loversArray.sort(function(a,b){
                return a[1] - b[1];
              });
            })
            feed.html('<div id="lovers"></div>');
            loversArray.forEach(function(lover) {
            console.log(lover[0])
            var userNumber = lover[0]['id']
            feed.append('<div id = " ' + userNumber + '" class="users">' + '<h2>' + lover[0]['displayname'] + '</h2> <img  height="50 px" width="50 px" src="'+lover[0]['picture']+'"></img></br><a href="#/app/loversinfo?lover=' + userNumber + '">More Info</a></div></br>');
          });
          })
        });
      })
      console.log("test");
    });
  }
}
});