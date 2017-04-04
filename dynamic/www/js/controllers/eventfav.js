angular.module('eventFav.controllers', [])
.controller('EventFavCtrl', function($scope, $ionicModal, $http, $state, $ionicPopup) {
  var url = window.location.href;
  var id = url.substring(url.indexOf("=") + 1);
  console.log(id);
  var api = "http://seananderson.co.uk/api/eventfav.php";
  var data = {
    email : localStorage.getItem('email'),
    eventid : id
  }
  $http.post(api, data).then(function(res) {
    popUp("Favoruite Added", "Event added to favoruites");
    $state.go(app.events);
  });

})
