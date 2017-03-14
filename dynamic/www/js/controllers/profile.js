angular.module('profile.controllers', ['ionic', 'ngCordova'])
.controller('myProfileCtrl', function($scope, $cordovaCamera, $cordovaFile) {


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
	  alert(imageData);
	}, 
	function(err) {
      console.log(err);
	});
  }
});