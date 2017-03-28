angular.module('home.controllers', [])
.controller('HomeCtrl', function($scope, $http, $state) {

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.doRefresh();
  });
  $scope.status = {};
  $scope.$on("$ionicView.beforeEnter", function() {
  //Below code loads feeds in as soon as home controller is called i.e. when home page is clicked on by user.
  var api = "http://seananderson.co.uk/api/feed.php";
  var feed = angular.element(document.querySelector('#feed #feeds tbody'));

  //Gets the email address from local storage which is then sent in the post.
  var data = { 
    email: localStorage.getItem('email')
  }

  //Actually retrieves the data and then adds it to the appropriate div.
  $http.post(api, data).then(function(res){
  console.log("I'm in here");
	var res = JSON.stringify(res);
	var feedData = res.replace('{"data":', '');
	feedData =  feedData.substring(0, feedData.indexOf(']'));
	feedData = feedData.replace('[','');
	var amountOfFeeds = feedData.split('},{').length;
	for (i=0;i<amountOfFeeds;i++) {
	  var text = feedData.substring(0, feedData.indexOf(',"'));
	  text = text.replace('{"text":', '');
	  text = text.replace('"text":', '');
    text = text.replace('"','');
    text = text.replace('"','');
	  var user = feedData.substring(0, feedData.indexOf('}'));
	  user = user.split('display_name":').pop(); 
    user = user.replace('"','');
    user = user.replace('"','');
	  feed.append('<tr>' + '<td>' + text + '</td>' + '<td>' + user + '</td>' + '</tr>');
	  feedData = feedData.split('},{').pop();
	}
  });
  });

  //Below code is called when the user creates a post from the home page.
  $scope.postStatus = function() {
    var email = localStorage.getItem('email');
    console.log(email);
  	var api = "http://seananderson.co.uk/api/status.php";
  	var data = {
  	  email: localStorage.getItem('email'),
  	  text: $scope.status.text
  	}
  	$http.post(api, data).then(function(res){
  	  $state.go('app.home');
  	})
  }
});