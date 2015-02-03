// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('news', ['ionic', 'TwitterCtrl', 'FeedController', 'articleController', 'ngSanitize', 'feedDirectives', 'angular-data.DSCacheFactory', 'ngCordova'])

.run(function($ionicPlatform, DSCacheFactory, $rootScope, $cordovaNetwork) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
        var offlineState = networkState;
        alert(offlineState);
    });


        //$cordovaSplashscreen.hide();
  DSCacheFactory("FeedStorage",
  {
    storageMode: "localStorage",
    maxAge: 900000,
    //maxAge: 1000,
    deleteOnExpire: "aggressive"
  });


})
.constant('myAppConfig', {
    oauthSettings: {
        consumerKey: 'jaUFRc0g7TInsO3hA4Syj5wEc',
        consumerSecret: 'LgsKRpxD90YLSKHh6jXc82NIUXmcMaHWeHs56FQD6RiCyVDPv0',
        requestTokenUrl: '565289580-b4PX6nTzQEZSDhnqJBPDWXgYWeG7NO0LjUDMaKih',
        authorizationUrl: "https://api.twitter.com/oauth/authorize",
        accessTokenUrl: "https://api.twitter.com/oauth/access_token",
        callbackUrl: "callbackUrl"
    }
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html"//,
      //controller: 'AppCtrl'
    })    
    .state('app.feeds', {
      url: "/feeds/:feed",
      views: {
        'menuContent' :{
          templateUrl: "templates/feeds.html",
          controller: 'AllFeedCtrl'
        }
      }
    })    
    .state('app.single', {
      url: "/feeds/:feed/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/feedStory.html",
          controller: 'FeedStoryCtrl'
        }
      }
    })
    .state('app.twitter', {
      url: "/twitter",
      views: {
        'menuContent' :{
          templateUrl: "templates/twitterFeed.html",
          controller: 'TwitterCtrl'
        }
      }
    });  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/feeds/releases');
});

