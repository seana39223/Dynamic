angular.module('loversInfo.controllers', [])
.controller('LoversInfoCtrl', function($scope, $http) {
  $scope.$on("$ionicView.beforeEnter", function() {
  var url = window.location.href;
  var id = url.substring(url.indexOf("=") + 1);
  var api = "http://seananderson.co.uk/api/getloversinfo.php";
  var data = {
    id : id
  }
  $http.post(api, data).then(function(res){
	var result = res
	var api = "http://seananderson.co.uk/api/getgenre.php "
	$http.post(api, data).then(function(res){
	  var loversTitle = angular.element(document.querySelector('#lovers-title'));
	  loversTitle.append('<h1>'+result['data']['displayname'] + '</h1>' );
	  })
	})

   var api = "http://seananderson.co.uk/api/getusersposts.php";
   var postDiv = angular.element(document.querySelector('#lovers-posts'));
	$http.post(api, data).then(function(res) {
		res['data'].forEach(function(post) {
            postDiv.append('<p>'+ post['text'] + '</p>');
        })
	})

	var api = "http://seananderson.co.uk/api/checkfollowing.php";
	var data = {
		email: localStorage.getItem('email'),
		id : id
	}
	$http.post(api, data).then(function(res) {
		var apiResponse = (res['data']);
		console.log(apiResponse);
		if(apiResponse.indexOf("This user does not follow the current user")>=0){
			postDiv.append('<button ng-click="test()">Follow</button>');
		}
		if(apiResponse.indexOf("The user does indeed follow already")>=0){
			postDiv.append('<button ng-click="test()">Un Follow</button');
		}
	})
  })

  test = function(){
  	console.log("test");
  }

});
