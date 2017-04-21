angular.module('listEventFav.controllers', [])
.controller('ListEventFavCtrl', function($scope, $cordovaGeolocation, $http, $compile, $state, $ionicLoading) {
  $scope.events = {};
  $scope.eventsList = [];
  var api = "http://seananderson.co.uk/api/listeventfav.php?random=" + Math.random();
  data = {
    email: localStorage.getItem('email')
  }
  $http.post(api,data).then(function(res){
    console.log(res['data']);
    $scope.listData=[];
    var eventDiv = angular.element(document.querySelector('#events'));
    res['data'].forEach(function(event) {
      console.log(event['event_id'])
      var api = "http://seananderson.co.uk/api/geteventinfo.php"
      var data = {
        id : event['event_id']
      }
      $http.post(api, data).then(function(res){
        event = res['data'];
       eventDiv.append('<div id= " ' + event['event_id'] + '" class="events"><h2>' + event['event_name'] + '</h2>' +'<p>' + event['event_name'] + '</p>' + '</br> <a href="#/app/eventinfo?event=' + event['event_id'] + '">More Info</a></div></br>');
    })
    })
    })
});
