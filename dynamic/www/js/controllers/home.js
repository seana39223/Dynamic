angular.module('home.controllers', [])
.controller('HomeCtrl', function($scope, $http) {
  var test;
  var api = "http://seananderson.co.uk/api/feed.php";
  var feed = angular.element( document.querySelector( '#feed #feeds' ) );
  var data = { 
    email: localStorage.getItem('email')
  }
  $http.post(api, data).then(function(res){
	var res = JSON.stringify(res);
	var feedData = res.replace('{"data":', '');
	feedData =  feedData.substring(0, feedData.indexOf(']'));
	feedData = feedData.replace('[','');
	var amountOfFeeds = feedData.split('},{').length;
	console.log(amountOfFeeds);
	for (i=0;i<amountOfFeeds;i++) {
	  var text = feedData.substring(0, feedData.indexOf(',"'));
	  text = text.replace('{"text":', '');
	  text = text.replace('"text":', '');
	  feed.append('<tr>');
	  feed.append('<td">');
	  feed.append(text);
	  feed.append('</td>')
	  var user = feedData.substring(0, feedData.indexOf('}'));
	  user = user.split('display_name":').pop(); 
	  feed.append('<td>');
	  feed.append(user);
	  feed.append('</td>');
	  feed.append('</tr');
	  feedData = feedData.split('},{').pop();
	}

  });
});