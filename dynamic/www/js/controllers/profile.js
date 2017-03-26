angular.module('profile.controllers', ['ionic', 'ngCordova'])
.controller('myProfileCtrl', function($scope, $cordovaCamera, $cordovaFile, $cordovaFileTransfer) {


  //Below code for taking picture based of https://devdactic.com/how-to-capture-and-store-images-with-ionic/
  $scope.images = [];
 
  $scope.takePhoto = function(photo) {
    if (photo=='new') {
	  var options = {
		quality:80,
		sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
		encodingType: Camera.EncodingType.PNG,
	  };
	}

	if (photo=='old') {
      var options = {
	    quality:80,
		sourceType :  Camera.PictureSourceType.PHOTOLIBRARY, 
		encodingType: Camera.EncodingType.PNG,
	  }
	}
	
	$cordovaCamera.getPicture(options).then(function(imageData) {
	  var url = "http:/seananderson.co.uk/api/imageupload.php";
	  var file = imageData;
	  var filename = imageData;
	  var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': filename}
      };
$cordovaFileTransfer.upload(url, file, options).then(function (result) {
     console.log("SUCCESS: " + JSON.stringify(result.response));
 }, function (err) {
     console.log("ERROR: " + JSON.stringify(err));
 }, function (progress) {
     // PROGRESS HANDLING GOES HERE
 });

	}, 
	function(err) {
      console.log(err);
	});
  }
});