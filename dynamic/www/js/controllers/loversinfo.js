angular.module('loversInfo.controllers', [])
.controller('LoversInfoCtrl', function($scope, $http) {
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

});
