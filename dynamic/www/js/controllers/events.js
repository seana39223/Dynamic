angular.module('events.controllers', [])
.controller('EventsCtrl', function($scope, $cordovaGeolocation, $http) {
	$scope.events = {};
	$scope.eventsList = [];
    $scope.searchEvents = function() {
    	var api = "http://seananderson.co.uk/api/listevents.php";
    	$http.get(api).then(function(res){
    		console.log(res['data']);
    		$scope.listData=[];
            res['data'].forEach(function(event2) {
            	console.log(event2);
          		$scope.eventsList.push(event2);
            })
    	});

    	if ($scope.events.search == "Recommended Events") {
    		console.log("Recommended Events Selected");
    	}

    	else if ($scope.events.search == "Nearby Events") {
    		//Below code uses plugin and is based  of http://ngcordova.com/docs/plugins/geolocation/
            var posOptions = {timeout: 3000};
    		$cordovaGeolocation .getCurrentPosition(posOptions) .then(function (position) {
            var lat  = position.coords.latitude
            var long = position.coords.longitude

            $scope.eventsList.forEach(function(event) {
            	api = "http://api.postcodes.io/postcodes/" + event['postcode'];
            	$http.get(api).then(function(res) {
            	    console.log(res['data']['result']['latitude']);
            	    console.log(res['data']['result']['longitude'])
                })
            })
        }, function(err) {
          alert("Error: Please make sure you have GPS enabled");
    });
    	}

    	else if ($scope.events.search == "Near Your Home") {
    		console.log("Near your home selected");
    	}

    	else if ($scope.events.search == "Date of Events") {
    		console.log("Dates of event selected");
    	}
    }
});