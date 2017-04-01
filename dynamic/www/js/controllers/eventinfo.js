angular.module('eventInfo.controllers', [])
.controller('EventInfoCtrl', function($scope) {
	var url = window.location.href;
	var str = url.substring(url.indexOf("=") + 1);
	console.log(str);

});
