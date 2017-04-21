angular.module('eventFav.controllers', [])
.controller('EventFavCtrl', function($scope, $ionicModal, $http, $state, $ionicPopup) {
  //Gets the id.
  var url = window.location.href;
  var id = url.substring(url.indexOf("=") + 1);
  var api = "http://seananderson.co.uk/api/eventfav.php";
  var data = {
    email : localStorage.getItem('email'),
    eventid : id
  }
  //Makes the event a users favoruite.
  $http.post(api, data).then(function(res) {
    popUp("Favoruite Added", "Event added to favoruites");
    $state.go('app.events');
  });

})
