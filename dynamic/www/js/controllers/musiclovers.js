angular.module('musiclovers.controllers', [])
.controller('musicLoversCtrl', function($scope, $http) {
  var test;
  var api = "http://seananderson.co.uk/api/listusers.php";
  var feed = angular.element(document.querySelector('#feed #feeds tbody'));
  console.log(feed);
  var data = { 
    email: localStorage.getItem('email')
  }
  $http.post(api, data).then(function(res){
  	console.log(res['data']);
  	res['data'].forEach(function(user) {
  		console.log(user);
  	});
  });
});