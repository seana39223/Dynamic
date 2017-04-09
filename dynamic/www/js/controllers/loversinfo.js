angular.module('loversInfo.controllers', [])
.controller('LoversInfoCtrl', function($scope, $http, $ionicLoading) {
  $scope.$on("$ionicView.beforeEnter", function() {
  var url = window.location.href;
  var id = url.substring(url.indexOf("=") + 1);
  var api = "http://seananderson.co.uk/api/getloversinfo.php";
  var data = {
    id : id
  }
  $http.post(api, data).then(function(res){
  	$ionicLoading.show();
	var result = res
	var api = "http://seananderson.co.uk/api/getgenre.php "
	$http.post(api, data).then(function(res){
	  var loversTitle = angular.element(document.querySelector('#lovers-title'));
	  loversTitle.append('<h1>'+result['data']['displayname'] + '</h1>' );
	  var photoDiv = angular.element(document.querySelector('#lovers-image'));
	  photoDiv.append('<img  height="110 px" width="100 px" src="' + result['data']['picture'] + '"</img>');
	  console.log(result['data']['bio']);
	  var bioDiv = angular.element(document.querySelector('#lovers-bio'));
	  if (result['data']['bio']) {
	  	bioDiv.append('<p>Users Bio: ' + result['data']['bio'] + '</p>');
	  }
	  else {
	    bioDiv.append('<p>This user has not entered a bio </p>');
	  }
	})
	$ionicLoading.hide();
   })

   var api = "http://seananderson.co.uk/api/getusersposts.php";
   var postDiv = angular.element(document.querySelector('#lovers-posts'));
	$http.post(api, data).then(function(res) {
		console.log(res['data'].length);
		if (res['data'].length==0) {
			postDiv.append('<div class="post><p>This user has not posted yet.</p></div>')
		}
		else {
		  res['data'].forEach(function(post) {
            postDiv.append('<div class="post"> <p>'+ post['text'] + '</p></div>');
          })
        }
	})

	var api = "http://seananderson.co.uk/api/checkfollowing.php";
	var data = {
		email: localStorage.getItem('email'),
		id : id
	}
	$http.post(api, data).then(function(res) {
		var apiResponse = (res['data']);
		console.log(apiResponse);
		var followingDiv = angular.element(document.querySelector('#lovers-following'));
		if(apiResponse.indexOf("This user does not follow the current user")>=0){
			followingDiv.append('<a class="button button-block button-royal" href="#/app/followuser?id=' + id + '">Follow</button>');
		}
		if(apiResponse.indexOf("The user does indeed follow already")>=0){
			followingDiv.append('<a class="button button-block button-royal" href="#/app/unfollowuser?id=' + id + '">Un Follow</button>');
		}
	})
	$ionicLoading.hide();
  })


});
