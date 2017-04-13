angular.module('profile.controllers', ['ionic', 'ngCordova'])
.controller('myProfileCtrl', function($scope, $ionicHistory, $templateCache, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $ionicLoading, $http, $ionicActionSheet) {
    $scope.$parent.$on('$ionicView.beforeEnter', function () {
      $ionicHistory.clearCache();
      var api = "http://seananderson.co.uk/api/getprofileinfo.php";
      var data = {
        email: localStorage.getItem('email')
       }
        $http.post(api, data).then(function(res){
        //Below line is a hack justified in report.
    	var image = (res['data']['picture']) + '?random=' + Math.random();
    	var photoDiv = angular.element(document.querySelector('#profile-photo'));
    	photoDiv.html('<div id ="profile-photo"><img  height="110 px" width="100 px" src="' + image + '"</img></div>');
    	var bioDiv =  angular.element(document.querySelector('#bio'));
    	bioDiv.html('<div id = "bio"><p>' + res['data']['bio'] + '<p> </div>');
       })
      }); 

  $scope.bio = {};

  //code for taking picture based of https://devdactic.com/how-to-capture-and-store-images-with-ionic/
  $scope.images = [];
  //Runs when user clicks to change profile photo.
  $scope.takePhoto = function(photo) {
  	//If user wants to take a new photo.
    if (photo=='new') {
	  var options = {
		  quality:80,
		  targetWidth:500,
	    targetHeight:750,
		  sourceType : Camera.PictureSourceType.CAMERA,
		  encodingType: Camera.EncodingType.PNG,
		  correctOrientation: true
	  };
	}
    //If user wants to use a photo from device's library.
	if (photo=='old') {
    var options = {
	    quality:80,
	    targetWidth:500,
	    targetHeight:750,
		  sourceType :  Camera.PictureSourceType.PHOTOLIBRARY, 
		  encodingType: Camera.EncodingType.PNG,
		  correctOrientation: true
	  }
	}
	
	$cordovaCamera.getPicture(options).then(function(imageData) {
	  $ionicLoading.show();
	  var url = "http://seananderson.co.uk/api/imageupload.php";
	  var file = imageData;
	  var filename = localStorage.getItem('dName') + '.png';
	  var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': filename}
      };
      $cordovaFileTransfer.upload(url, file, options).then(function (result) {
	    var api = "http://seananderson.co.uk/api/imageprofile.php";
	    var data = {
		  dName : localStorage.getItem('dName')
	    }
	    $http.post(api,data).then(function(res){
	      $ionicLoading.hide();;
	      popUp('Photo added succesfully');
	      var api = "http://seananderson.co.uk/api/getprofileinfo.php";
          var data = {
            email: localStorage.getItem('email')
          } 
	      $http.post(api, data, { cache: false }).then(function(res){
    	    //Below line is a hack, justified in report.
    	    var image = (res['data']['picture']) + '?random=' + Math.random();
    	    var photoDiv = angular.element(document.querySelector('#profile-photo'));
    	    photoDiv.html('<div id ="profile-photo"><img  height="60 px" width="60 px" src="' + image + '"</img></div>');
        })

	    })
      }, function (err) {
 	   $ionicLoading.hide()
       console.log("ERROR: " + JSON.stringify(err));
      }, function (progress) {
    });
	}, 
	function(err) {
      console.log(err);
	});
  }

  $scope.newBio = function() {
  	var api = "http://seananderson.co.uk/api/updatebio.php"
  	var bio = $scope.bio.text
  	data = {
  		bio: bio,
  		dName: localStorage.getItem('dName')
  	}
    $http.post(api,data).then(function(res) {
    	popUp("Bio Updated");
    	var api = "http://seananderson.co.uk/api/getprofileinfo.php";
        var data = {
          email: localStorage.getItem('email')
        }
        $http.post(api,data).then(function(res) {
          var bioDiv =  angular.element(document.querySelector('#bio'));
    	  bioDiv.html('<div id = "bio"><p>Bio: ' + res['data']['bio'] + '<p> </div>')
        })
    })
  }
});