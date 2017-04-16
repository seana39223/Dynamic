angular.module('events.controllers', [])
.controller('EventsCtrl', function($scope, $cordovaGeolocation, $http, $compile, $state, $ionicLoading) {
  $scope.events = {};
  $scope.eventsList = [];
  var api = "http://seananderson.co.uk/api/listevents.php?random=" + Math.random();
  $http.get(api).then(function(res){
    $scope.listData=[];
    res['data'].forEach(function(event2) {
      $scope.eventsList.push(event2);
    })
    $ionicLoading.show();
    var eventDiv = angular.element(document.querySelector('#events'));
    eventDiv.html('<div id="events"></div>');
    $scope.eventsList.forEach(function(event) {
      eventDiv.append('<div id= " ' + event['event_id'] + '" class="events"><h2>' + event['event_name'] + '</h2>' +'<p>' + event['event_name'] + '</p>' + '</br> <a href="#/app/eventinfo?event=' + event['event_id'] + '">More Info</a></div></br>');
    })
    $scope.eventsList.length = 0;
    $ionicLoading.hide();
    $scope.eventsList.length=0;
  });
  //Ran when user clicks to sort.
  $scope.searchEvents = function() {
    var api = "http://seananderson.co.uk/api/listevents.php";
    $http.get(api).then(function(res){
      $scope.listData=[];
      res['data'].forEach(function(event2) {
        $scope.eventsList.push(event2);
      })
    });

    if ($scope.events.search == "Recommended Events") {
    }

    else if ($scope.events.search == "Nearby Events") {
      $ionicLoading.show();
      var eventDiv = angular.element(document.querySelector('#events'));
      eventDiv.html('<div id="events"></div>');
      var eventsArray = new Array();
      //Below code uses plugin and is based  of http://ngcordova.com/docs/plugins/geolocation/
      var posOptions = {timeout: 3000};
    	$cordovaGeolocation .getCurrentPosition(posOptions) .then(function(position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude
        $scope.eventsList.forEach(function(event) {
          api = "http://api.postcodes.io/postcodes/" + event['postcode'];
          var latEvent;
          var longEvent;
          $http.get(api).then(function(res) {
            latEvent = (res['data']['result']['latitude']);
            longEvent = (res['data']['result']['longitude']);
            api = "http://seananderson.co.uk/api/distance.php";
            data = {
              lat1: lat,
              lon1: long,
              lat2: latEvent,
              lon2: longEvent
            }
            $http.post(api, data).then(function(res) {
              miles = (res['data']);
              var eventInfo = [event, miles];
              eventsArray.push(eventInfo);
              var eventInfo =[];
              //Below code is taken from http://stackoverflow.com/questions/3524827/sort-a-2d-array-by-the-second-value
              //Code works by comparing second element rather than first element in the array.
              eventsArray.sort(function(a,b){
                return a[1] - b[1];
              });
              var eventDiv = angular.element(document.querySelector('#events'));
              eventDiv.html('<div id="events"></div>');
              
              eventsArray.forEach(function(event) {
                eventDiv.append('<div id= " ' + event[0]['event_id'] + '" class="events"> <h2>' + event[0]['event_name'] + '</h2>' +'<p>' + event[0]['event_name'] + '</p>' + '</br> <a href="#/app/eventinfo?event=' + event[0]['event_id'] + '">More Info</a></div></br>');
              })
            })
          });
        })
        $scope.eventsList.length = 0;
        $ionicLoading.hide();

      }, function(err) {
           alert("Error: Please make sure you have GPS enabled");
      });
    }
    	
    else if ($scope.events.search == "Near Your Home") {
      var eventsArray = new Array();
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
        })
        $scope.eventsList.forEach(function(event) {
        api = "http://api.postcodes.io/postcodes/" + event['postcode'];
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
              var eventInfo = [event, miles];
              eventsArray.push(eventInfo);
              //Below code is taken from http://stackoverflow.com/questions/3524827/sort-a-2d-array-by-the-second-value
              //Code works by comparing second element rather than first element in the array.
              eventsArray.sort(function(a,b){
                return a[1] - b[1];
              });
              var eventDiv = angular.element(document.querySelector('#events'));
              eventDiv.html('<div id="events"></div>');
              eventsArray.forEach(function(event) {
                eventDiv.append('<div id= " ' + event[0]['event_id'] + '" class="events"> <h2>' + event[0]['event_name'] + '</h2>' +'<p>' + event[0]['event_name'] + '</p>' + '</br> <a href="#/app/eventinfo?event=' + event[0]['event_id'] + '">More Info</a></div></br>');
                })
              })
            });
          })
          $scope.eventsList.length = 0;
          $ionicLoading.hide();
        })
      }

    	else if ($scope.events.search == "Date of Events") {
        $ionicLoading.show();
        var eventDiv = angular.element(document.querySelector('#events'));
        eventDiv.html('<div id="events"></div>');
        $scope.eventsList.forEach(function(event) {
          eventDiv.append('<div id= " ' + event['event_id'] + '" class="events"> <h2>' + event['event_name'] + '</h2>' +'<p>' + event['event_name'] + '</p>' + '</br> <a href="#/app/eventinfo?event=' + event['event_id'] + '">More Info</a></div></br>');
        })
        $scope.eventsList.length = 0;
        $ionicLoading.hide();
    	}
        $scope.eventsList.length=0;
    }
});
