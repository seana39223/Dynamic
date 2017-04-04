angular.module('eventInfo.controllers', [])
.controller('EventInfoCtrl', function($scope, $http) {
	var url = window.location.href;
	var id = url.substring(url.indexOf("=") + 1);
	var api = "http://seananderson.co.uk/api/geteventinfo.php";
	var data = {
		id : id
	}
	$http.post(api, data).then(function(res){
		var result = res
		var api = "http://seananderson.co.uk/api/getgenre.php "
		$http.post(api, data).then(function(res){
			var eventTitle = angular.element(document.querySelector('#event-title'));
		    eventTitle.append('<h1>'+result['data']['event_name'] + ' - ' + res['data'].replace(/['"]+/g, '') + '</h1>' );
		})
	})

	var api = "http://seananderson.co.uk/api/getvenueinfo.php";
	$http.post(api, data).then(function(res) {
		console.log(res['data']);
		var eventDetails = angular.element(document.querySelector('#event-information'));
		eventDetails.append('<p>' + res['data']["name"] + '</p>');
		eventDetails.append('<p>' + res['data']['first_line'] + '</p>')
		if (res['data']['second_line']!="") {
			eventDetails.append('<p>' + res['data']['second_line'] +  '</p>');
		}
		eventDetails.append('<p>' + res['data']['city'] + '</p>');
		eventDetails.append('<p>' + res['data']['postcode'] + '</p>');
		var api = "http://seananderson.co.uk/api/checkfav.php";
		var data = {
			event_id: id,
			email: localStorage.getItem('email')
		}
		$http.post(api,data).then(function(res){
			console.log(res['data']);
			var apiResult = JSON.stringify(res['data']);
			if (apiResult.indexOf("This is not already a fav.")>=0) {
			  eventDetails.append('<a href="#/app/eventfav?event=' + id + '">Add event to favoruites</a>');
			}
			else {
				eventDetails.append('<a href="#/app/eventunfav?event=' + id + '">Remove event from favoruites</a>');
			}
		})

	})

});
