angular.module('home.controllers', [])
.controller('HomeCtrl', function($scope, $http) {
	var api = "http://seananderson.co.uk/api/feed.php";
	var data = { 
         email: localStorage.getItem('email')
    }
	$http.post(api, data).then(function(res){
		console.log(res);
    });
});