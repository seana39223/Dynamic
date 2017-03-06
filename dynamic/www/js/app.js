//Below code was initially generated when I created the project (when I ran ionic start sidemenu). I have added my own code to it.
angular.module('starter', ['ionic', 'ngCordova', 'login.controllers', 'register.controllers', 'home.controllers', 'events.controllers', 'artists.controllers', 'shared.controllers', 'profile.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'views/register.html',
    controller: 'RegisterCtrl'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'views/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.artists', {
    url: '/artists',
    views: {
      'menuContent': {
        templateUrl: 'views/artists.html',
        controller: 'ArtistsCtrl'
      }
    }
  })

  .state('app.events', {
    url: '/events',
    views: {
      'menuContent': {
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl'
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'views/profile.html',
        controller: 'myProfileCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
