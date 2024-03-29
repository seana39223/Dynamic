//Below code was initially generated when I created the project (when I ran ionic start sidemenu). I have added my own code to it.
angular.module('starter', ['ionic', 'ngCordova', 'login.controllers', 'register.controllers', 'home.controllers', 'events.controllers', 'artists.controllers', 'shared.controllers', 'profile.controllers', 'musiclovers.controllers', 'venue.controllers', 'makeEvent.controllers', 'eventInfo.controllers', 'loversInfo.controllers', 'followUser.controllers', 'unFollowUser.controllers', 'eventFav.controllers', 'eventUnFav.controllers', 'listEventFav.controllers', 'listFollowing.controllers'])

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
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'views/profile.html',
        controller: 'myProfileCtrl'
      }
    }
  })

  .state('app.lovers', {
    url: '/lovers',
    views: {
      'menuContent': {
        templateUrl: 'views/lovers.html',
        controller: 'musicLoversCtrl'
      }
    }
  })

  .state('app.venue', {
    url: '/makevenue',
    views: {
      'menuContent': {
        templateUrl: 'views/makevenue.html',
        controller: 'VenueCtrl'
      }
    }
  })

  .state('app.makeEvent', {
    url: '/makeevent',
    views: {
      'menuContent': {
        templateUrl: 'views/makeevent.html',
        controller: 'MakeEventCtrl'
      }
    }
  })

  .state('app.eventInfo', {
    url: '/eventinfo',
    views: {
      'menuContent': {
        templateUrl: 'views/eventinfo.html',
        controller: 'EventInfoCtrl'
      }
    }
  })

  .state('app.loversInfo', {
    url: '/loversinfo',
    views: {
      'menuContent': {
        templateUrl: 'views/loversinfo.html',
        controller: 'LoversInfoCtrl'
      }
    }
  })

  .state('app.followUser', {
    url: '/followuser',
    views: {
      'menuContent': {
        templateUrl: 'views/followuser.html',
        controller: 'FollowUserCtrl'
      }
    }
  })

  .state('app.unFollowUser', {
    url: '/unfollowuser',
    views: {
      'menuContent': {
        templateUrl: 'views/unfollowuser.html',
        controller: 'UnFollowUserCtrl'
      }
    }
  })

  .state('app.eventFav', {
    url: '/eventfav',
    views: {
      'menuContent': {
        templateUrl: 'views/eventfav.html',
        controller: 'EventFavCtrl'
      }
    }
  })

    .state('app.eventUnFav', {
    url: '/eventunfav',
    views: {
      'menuContent': {
        templateUrl: 'views/eventunfav.html',
        controller: 'EventUnFavCtrl'
      }
    }
  })

    .state('app.listFavEvents', {
      url: '/listfavevents',
      views: {
        'menuContent': {
          templateUrl: 'views/listeventfav.html',
          controller: 'ListEventFavCtrl'
        }
      }
    })

    .state('app.listFollowing', {
      url: '/listfollowing',
      views: {
        'menuContent' : {
          templateUrl: 'views/listfollowing.html',
          controller: 'ListFollowingCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});