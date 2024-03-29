angular.module('eventUnFav.controllers', [])
.controller('EventUnFavCtrl', function($scope, $ionicModal, $http, $state, $ionicPopup) {
  //Gets id of event to unfav.
  var url = window.location.href;
  var id = url.substring(url.indexOf("=") + 1);
  var api = "http://seananderson.co.uk/api/eventunfav.php";
  var data = {
    email : localStorage.getItem('email'),
    event_id : id
  }

  //Actualy posts the event un fav to api.
  $http.post(api, data).then(function(res) {
    popUp("Event Unfavoruited", "Event has been removed from your favoruites.");
    $state.go('app.events');
  });

})
