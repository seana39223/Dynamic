angular.module('makeEvent.controllers', [])
.controller('MakeEventCtrl', function($scope, $ionicModal, $http, $state, $ionicPopup) {
  var api = "http://seananderson.co.uk/api/listgenre.php";
  $http.get(api).then(function(res) {
    var length = (res['data']).length;
    var select = angular.element(document.querySelector('#genre'));
    for (i=0;i<length;i++) {
      select.append('<option>' + res['data'][i] + '</option>');
    }
  })

  api = "http://seananderson.co.uk/api/listvenue.php";
  var data = {
    email: localStorage.getItem('email')
  }
  $http.post(api, data).then(function(res) {
    var length = (res['data']).length;
    if (length == 0) {
      var div = angular.element(document.querySelector('#makeevent'));
      div.html("<div id='novenue'><p>You do not have any venues set up please create a venue first.</div>");
    }
    else {
      var select = angular.element(document.querySelector('#venue'));
      for (i=0;i<length;i++) {
        select.append('<option>' + res['data'][i] + '</option>');
      }
    }

    api = "http://seananderson.co.uk/api/listartists.php";
    $http.get(api).then(function(res) {
      var length = (res['data']).length;
      var select = angular.element(document.querySelector('#artists'));
      for (i=0;i<length;i++) {
        select.append('<option>' + res['data'][i] + '</option>');
      }
    })
  })


  //Generic popup as there may need to be multiple popups for this page. Code is based of ionic documentation for popup.
  popUp = function(title, message) {
  	var alertPopup = $ionicPopup.alert({
  		title: title,
  		template: message
  	});
  	alertPopup.then(function(res) {
  	});
  }

  //Function for when the user clicks the validation button.
  $scope.eventRegister = function() {
    console.log($scope.event.genre.length);
    var api = "http://seananderson.co.uk/api/makeevent.php";
    var data = {
    	genre: $scope.event.genre,
    	event_name: $scope.event.name,
    	venue: $scope.event.venue,
    	date: $scope.event.date,
      start_time: $scope.event.startTime,
      end_time: $scope.event.endTime
    }
    $http.post(api, data).then(function (res){
      console.log(res);
      var apiReturns = JSON.stringify(res);
      if (apiReturns.includes('Event created successfully')>=0) {
        popUp("Event Created", "The event was created succesfully");
        var length = $scope.event.genre.length;
      }
      else {
        popUp("error", apiReturns);
      }
    })
  }

})
