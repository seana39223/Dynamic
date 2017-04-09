angular.module('profile.controllers', ['ionic', 'ngCordova'])
.controller('myProfileCtrl', function($scope, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $ionicLoading, $http, $ionicActionSheet) {
  //Below code for taking picture based of https://devdactic.com/how-to-capture-and-store-images-with-ionic/
  $scope.images = [];
  //Runs when user clicks to change profile photo.
  $scope.takePhoto = function(photo) {
  	//If user wants to take a new photo.
    if (photo=='new') {
	  var options = {
		quality:80,
		sourceType : Camera.PictureSourceType.CAMERA,
		encodingType: Camera.EncodingType.PNG,
	  };
	}
    //If user wants to use a photo from device's library.
	if (photo=='old') {
      var options = {
	    quality:80,
		sourceType :  Camera.PictureSourceType.PHOTOLIBRARY, 
		encodingType: Camera.EncodingType.PNG,
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
	      $ionicLoading.hide();
	      popUp('Photo added succesfully');
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
});