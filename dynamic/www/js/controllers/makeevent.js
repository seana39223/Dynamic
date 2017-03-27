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
    var select = angular.element(document.querySelector('#venue'));
    for (i=0;i<length;i++) {
      select.append('<option>' + res['data'][i] + '</option>');
    }
  })

 // Form data for the login modal
  $scope.event = {};

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
      }
      else {
        popUp("error", apiReturns);
      }
    })
  }

})
