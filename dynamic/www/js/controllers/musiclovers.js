angular.module('musiclovers.controllers', ['ionic'])
.controller('musicLoversCtrl', function($scope, $http) {
  var test;
  var api = "http://seananderson.co.uk/api/listusers.php";
  var feed = angular.element(document.querySelector('#users'));
  var data = { 
    email: localStorage.getItem('email')
  }
  $http.post(api, data).then(function(res){
  	res['data'].forEach(function(user) {
        var userNumber = user['id'];
  	    //feed.append('<tr ng-form="followUser'+userNumber+'">' + '<td>' + user['displayname'] + '</td><td><button class="button button-icon" id='+user['id'] +' ng-click="follow()" data='+ userNumber +'> Follow User</button></td></tr>');
        feed.append('<table><tr ng-form="myForm"><td>' + user['displayname'] + '</td><td><button class="button button-icon" id='+user['id'] +' ng-click="follow()" data='+ userNumber +'> Follow User</button></td></tr></table>');
  	});
  });
  
  $scope.follow = function(){
    console.log(userNumber);
  }
});