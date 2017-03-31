angular.module('events.controllers', [])
.controller('EventsCtrl', function($scope, $cordovaGeolocation, $http) {
	$scope.events = {};
	$scope.eventsList = [];
    $scope.searchEvents = function() {
    	var api = "http://seananderson.co.uk/api/listevents.php";
    	$http.get(api).then(function(res){
    		//console.log(res['data']['postcode']);
    		$scope.listData=[];
            res['data'].forEach(function(event2) {
          		$scope.eventsList.push(event2);
            })
    	});

    	if ($scope.events.search == "Recommended Events") {
    		console.log("Recommended Events Selected");
    	}

    	else if ($scope.events.search == "Nearby Events") {
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
                    //Below code is taken from http://stackoverflow.com/questions/3524827/sort-a-2d-array-by-the-second-value
                    //Code works by comparing second element rather than first element in the array.
                    eventsArray.sort(function(a,b){
                      return a[1] - b[1];
                    });
                  })
                });
            })
            console.log(eventsArray);

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
                  console.log(latHome);
                  console.log(longHome); 
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
                  })
                });
            })
            console.log(eventsArray);

            })
    	}

    	else if ($scope.events.search == "Date of Events") {
    		console.log($scope.eventsList);
    	}
    }
});