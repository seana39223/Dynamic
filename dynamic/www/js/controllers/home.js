angular.module('home.controllers', [])
.controller('HomeCtrl', function($scope, $http, $state) {
  $scope.status = {};
  $scope.$on("$ionicView.beforeEnter", function() {
  //Gets the email address from local storage which is then sent in the post.
    var data = { 
      email: localStorage.getItem('email')
    }
    //Below code checks what the user type is, if they are a venue owner it adds buttons to the home page.
    var api = "http://seananderson.co.uk/api/type.php?random=" + Math.random();
    $http.post(api,data).then(function(res) {
      var apiReturn = JSON.stringify(res['data']);
      console.log(apiReturn);
      if(apiReturn == '"The user type is 3"'){
        var venue = angular.element(document.querySelector('#venue-owner'));
        venue.append('<a class="button button-block button-royal" href="#/app/makevenue">Add a venue</button>');
        venue.append('<a class="button button-block button-royal" href="#/app/makeevent">Make an Event</button>')
      }
    })
    //Below code loads feeds in as soon as home controller is called i.e. when home page is clicked on by user.
    var api = "http://seananderson.co.uk/api/feed.php";
    var feed = angular.element(document.querySelector('#feeds'));
  //Actually retrieves the data and then adds it to the appropriate div.
    $http.post(api, data).then(function(res){
	    var res = JSON.stringify(res);
	    var feedData = res.replace('{"data":', '');
	    feedData =  feedData.substring(0, feedData.indexOf(']'));
	    feedData = feedData.replace('[','');
	    var amountOfFeeds = feedData.split('},{').length;
      console.logamountOfFeeds>0 
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
          feed.append('<div class="post"><h2>' + user + '</h2>' + '<p>' + text + '</p></br></div>')
          feedData = feedData.split('},{').pop();
	      }
      //}
      //else {
        //feed.remove();
      //}
    });
  });

  //Below code is called when the user creates a post from the home page.
  $scope.postStatus = function() {
    console.log($scope.status.text);
    //console.log(emojiText.convert($scope.status.text));
    var email = localStorage.getItem('email');
  	var api = "http://seananderson.co.uk/api/status.php";
  	var data = {
  	  email: localStorage.getItem('email'),
  	  text: $scope.status.text
  	}
  	$http.post(api, data).then(function(res){
  	  popUp("Post posted", "Post has been posted.");
      $state.go('app.home');
  	})
  }
  
});