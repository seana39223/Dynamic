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
	})

});
