/**
 * Created by kshirley on 1/28/15.
 */
angular.module('FeedController', ['FeedUtilities', 'RSSFeedService'])

    .controller('FeedCtrl', function($scope, $stateParams, $ionicLoading, FeedService, Util, DSCacheFactory) {

        var feed = $stateParams.feed;
        $scope.feed = feed;

        var feeds = [];
        var feedData;

        $scope.loaded = true;

        FeedService.getAllFeeds()
            .then(
            function(data){
                console.dir(data);
            },
                function(){

            })

        var loadFeed = function(feed){
            switch(feed)
            {
                case 'administrator':
                    $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                    $scope.loaded = false;
                    speechesFeed();
                    break;

                case 'releases':
                    $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                    $scope.loaded = false;
                    pressReleaseFeed();
                    break;

                case 'frontlines':
                    $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                    frontlinesFeed();
                    break;

                case 'vacancies':
                    $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                    vacancyFeed();
                    break;

                case 'testimonies':
                    $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                    testimoniesFeed();
                    break;

                case 'speeches':
                    $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                    speechesFeed();
                    break;

                case 'facts':
                    $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                    factsFeed();
                    break;

                case 'blogs':
                    $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                    blogFeed();
                    break;
            }
        };

        //Check if the phone has internet connection.
        //If it does, fetch the

        var pressReleaseFeed = function(){

            //$ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
            //$scope.online = online;
            //$scope.networkStats = FeedService.checkNetwork();
            //$scope.feedTitle = "USAID Press Releases";

            $scope.feedTitle = "USAID Press Releases";

            FeedService.parseFeed('http://www.usaid.gov/rss/press-releases.xml')
                //Success
                .then(function (res) {
                    $ionicLoading.hide();
                    //Uncomment when pushing to device

                    $scope.loaded = true;
                    $scope.stories = res;

                    //Parse HTML to remove unnecessary HTML elements
                    $scope.parseHTML = function (text) {
                        var html = Util.ReleasesHTML(text);
                        return html;
                    };

                    $scope.formatDate = function(date){
                        return Util.FormatDate(date);
                    };

                    if(FeedService.checkNetwork())
                    {
                        $scope.feedTitle = "USAID Press Releases";
                    }
                    else
                    {
                        $scope.feedTitle = "USAID Press Releases (Offline)";
                    }

                    $scope.class = "pressReleases";

                    $scope.loader = function () {
                        if ($scope.stories) {
                            return false;
                        }
                    };
                    //Error
                }, function (status) {
                    $ionicLoading.hide();
                    console.log(status);
                    $scope.failed = true;

                    $scope.reload = function () {
                        $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                        pressReleaseFeed();
                    };
                });

            $scope.reloadFeed = function(){
                FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/rss/press-releases.xml')
                    .then(function(refreshedData){
                            $scope.stories = refreshedData;
                        },
                        function(errorData){
                            console.error()
                        })
                    .finally(function() {
                        // Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            };
        };

        var frontlinesFeed = function (){

            //var online = $cordovaNetwork.isOnline();
            //alert(online);
            //$scope.networkStats = FeedService.checkNetwork();

            $scope.feedTitle = "Frontlines";

            FeedService.parseFeed('http://www.usaid.gov/news-information/frontlines/46331/rss/')
                .then(function(res){
                    $ionicLoading.hide();

                    //if(FeedService.checkNetwork())
                    //{
                    //    $scope.feedTitle = "Frontlines";
                    //}
                    //else {
                    //    $scope.feedTitle = "Frontlines (Offline)";
                    //}

                    $scope.loaded = true;
                    $scope.failed = false;
                    $scope.stories = res;


                    $scope.ParseHTML = function(text){

                        return Util.FormatHTML(text);

                    };

                    $scope.loader = function(){
                        if($scope.stories)
                        {
                            return false;
                        }
                    };

                    $scope.formatDate = function(date){
                        return Util.FormatDate(date);
                    }
                }, function(){
                    $ionicLoading.hide();
                    $scope.loaded = false;
                    $scope.failed = true;

                    $scope.reload = function (){
                        $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                        frontlinesFeed();
                    };
                });

            $scope.reloadFeed = function(){
                FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/news-information/frontlines/46331/rss/')
                    .then(function(refreshedData){
                        $scope.stories = refreshedData;
                    },
                    function(errorData){
                        console.error()
                    })
                    .finally(function() {
                        // Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            };
        };

        var blogFeed = function () {

            $scope.feedTitle = "Impact Blogs";

            FeedService.parseFeed('http://blog.usaid.gov/feed/')
                .then(function(response){
                    $ionicLoading.hide();

                    if(FeedService.checkNetwork())
                    {
                        $scope.feedTitle = "Impact Blogs";
                    }
                    else{
                        $scope.feedTitle = "Impact Blogs (Offline)";
                    }

                    $scope.loaded = true;
                    $scope.failed = false;
                    $scope.stories=response;

                    $scope.formatDate = function(date){
                        return Util.FormatDate(date);
                    };
                }, function(status){
                    $ionicLoading.hide();

                    $scope.loaded = false;
                    $scope.failed = true;

                    $scope.reload = function (){
                        $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                        blogFeed();
                    };
                });
            $scope.reloadFeed = function(){
                FeedService.reloadFeed($scope.feed, 'http://blog.usaid.gov/feed/')
                    .then(function(refreshedData){
                        $scope.stories = refreshedData;
                    },
                    function(errorData){
                        console.error()
                    })
                    .finally(function() {
                        // Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            };
        };

        var factsFeed = function(){

            //$scope.networkStats = FeedService.checkNetwork();
            $scope.feedTitle = "Fact Sheets";

            FeedService.parseFeed('http://www.usaid.gov/rss/fact-sheets.xml')
                .then(function(response){
                    $ionicLoading.hide();

                    if(FeedService.checkNetwork())
                    {
                        $scope.feedTitle = "Fact Sheets";
                    }
                    else{
                        $scope.feedTitle = "Fact Sheets (Offline)";
                    }

                    $scope.loaded = true;
                    $scope.failed = false;
                    $scope.stories=response;

                    $scope.loader = function(){
                        if($scope.stories)
                        {
                            return false;
                        }
                    };

                    $scope.cleanSnippet = function(text){
                        return Util.ContentSnippet(text);
                    };

                    $scope.formatDate = function(date){
                        return Util.FormatDate(date);
                    };

                }, function(error){
                    $ionicLoading.hide();
                    $scope.loaded = false;
                    $scope.failed = true;

                    $scope.errorMessage = error;

                    $scope.reload = function (){
                        $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                        factsFeed();
                    };
                });

            $scope.reloadFeed = function(){
                FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/rss/fact-sheets.xml')
                    .then(function(refreshedData){
                        $scope.stories = refreshedData;
                    },
                    function(errorData){
                        console.error()
                    })
                    .finally(function() {
                        // Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            };
        };

        var speechesFeed = function () {

            //$scope.networkStats = FeedService.checkNetwork();
            $scope.feedTitle = "Administrator Speeches";

            FeedService.parseFeed('http://www.usaid.gov/rss/speeches.xml')
                .then(function(response){

                    if(FeedService.checkNetwork())
                    {
                        $scope.feedTitle = "Administrator Speeches";
                    }
                    else{
                        $scope.feedTitle = "Administrator Speeches (Offline)";
                    }

                    $scope.loaded = true;
                    $scope.failed = false;
                    $scope.stories = response;

                    $scope.cleanSnippet = function(text){
                        return Util.ContentSnippet(text);
                    };

                    $ionicLoading.hide();

                    $scope.loader = function(){
                        if($scope.stories)
                        {
                            return false;
                        }
                    };

                    $scope.formatDate = function(date){
                        return Util.FormatDate(date);
                    };

                }, function(){
                    $ionicLoading.hide();
                    $scope.loaded = false;
                    $scope.failed = true;

                    $scope.reload = function (){
                        $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                        speechesFeed();
                    };
                });

            $scope.reloadFeed = function(){
                FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/rss/speeches.xml')
                    .then(function(refreshedData){
                        $scope.stories = refreshedData;
                    },
                    function(errorData){
                        console.error()
                    })
                    .finally(function() {
                        // Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            };
        };

        var testimoniesFeed = function(){

            $scope.feedTitle = "Congressional Testimonies";

            //$scope.networkStats = FeedService.checkNetwork();

            FeedService.parseFeed('http://www.usaid.gov/rss/congressional-testimony.xml')
                .then(function(response){
                    $ionicLoading.hide();

                    if(FeedService.checkNetwork())
                    {
                        $scope.feedTitle = "Congressional Testimonies";
                    }
                    else{
                        $scope.feedTitle = "Congressional Testimonies (Offline)";
                    }

                    $scope.loaded = true;
                    $scope.failed = false;
                    $scope.stories = response;

                    $scope.loader = function(){
                        if($scope.stories)
                        {
                            return false;
                        }
                    };

                    $scope.formatDate = function(date){
                        return Util.FormatDate(date);
                    };

                    $scope.cleanSnippet = function(text){
                        return Util.ContentSnippet(text);
                    };

                }, function(){
                    $ionicLoading.hide();
                    $scope.loaded = false;
                    $scope.failed = true;

                    $scope.reload = function (){
                        $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                        testimoniesFeed();
                    };
                });

            $scope.reloadFeed = function(){
                FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/rss/congressional-testimony.xml')
                    .then(function(refreshedData){
                        $scope.stories = refreshedData;
                    },
                    function(errorData){
                        console.error()
                    })
                    .finally(function() {
                        // Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            };
        };

        var vacancyFeed = function(){

            //$scope.feedTitle = "Vacancy Announcements";

            //$scope.networkStats = FeedService.checkNetwork();

            FeedService.parseFeed('http://www.usaid.gov/work-with-us/careers/vacancy-announcements.xml')
                .then(function(response){
                    $ionicLoading.hide();

                    if(FeedService.checkNetwork())
                    {
                        $scope.feedTitle = "Vacancy Announcements";
                    }
                    else{
                        $scope.feedTitle = "Vacancy Announcements (Offline)";
                    }

                    $scope.loaded = true;
                    $scope.failed = false;
                    $scope.stories = response;
                    // $scope.stories.forEach(function(story){
                    //     console.log(story.contentSnippet);
                    // });

                    //$('#loading').hide();
                    $scope.loader = function(){
                        if($scope.stories)
                        {
                            return false;
                        }
                    };

                    $scope.cleanSnippet = function(text){
                        return Util.ContentSnippet(text);
                    };

                    $scope.formatDate = function(date){
                        return Util.FormatDate(date);
                    };

                }, function(){
                    $ionicLoading.hide();
                    $scope.loaded = false;
                    $scope.failed = true;

                    $scope.reload = function (){
                        $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                        vacancyFeed();
                    };
                });

            $scope.reloadFeed = function(){
                FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/work-with-us/careers/vacancy-announcements.xml')
                    .then(function(refreshedData){
                        $scope.stories = refreshedData;
                    },
                    function(errorData){
                        console.error()
                    })
                    .finally(function() {
                        // Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            };
        };

        loadFeed(feed);
    })

    .controller('AllFeedCtrl', function ($scope, $stateParams, $ionicLoading, FeedService, Util, DSCacheFactory, $rootScope, $cordovaNetwork, $ionicPopup) {
        //For some reason this doesn't work. I'm speculating that it's because the libraries didn't load yet.
        //if(FeedService.checkNetwork())
        //        alert('online');

        //URL parameter that contains the feed title
        var feed = $stateParams.feed;
        $scope.feed = feed;

        //Cache object that stores the feeds for
        var cachedFeed = DSCacheFactory.get("FeedStorage");

        //Show loading screen
        $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});

        //This function encapsulates the function that either makes the http request or it's cached.
        var getFeed = function(feedTitle, url, feeds, feed){

            if(cachedFeed.get(feed))
            {
                $ionicLoading.hide();
                $scope.stories = cachedFeed.get(feed);

                $scope.parseHTML = function (text) {
                    var html = Util.ReleasesHTML(text);
                    return html;
                };

                $scope.formatDate = function(date){
                    return Util.FormatDate(date);
                };

                $scope.feedTitle = feedTitle;

                $scope.reloadFeed = function(){
                    FeedService.reloadFeed($scope.feed, url)
                        .then(function(refreshedData){
                            $scope.stories = refreshedData;
                        },
                        function(errorData){
                            console.error(errorData);
                        })
                        .finally(function() {
                            // Stop the ion-refresher from spinning
                            $scope.$broadcast('scroll.refreshComplete');
                        });
                };
            }
            else
            {
                $scope.loaded = true;
                $ionicLoading.hide();
                $scope.stories = feeds;

                cachedFeed.put(feed, feeds);

                $scope.parseHTML = function (text) {
                    var html = Util.ReleasesHTML(text);
                    return html;
                };

                $scope.formatDate = function(date){
                    return Util.FormatDate(date);
                };

                $scope.feedTitle = feedTitle;

                $scope.reloadFeed = function(){
                    FeedService.reloadFeed($scope.feed, url)
                        .then(function(refreshedData){
                            $scope.stories = refreshedData;
                        },
                        function(errorData){
                            console.error(errorData);
                        })
                        .finally(function() {
                            // Stop the ion-refresher from spinning
                            $scope.$broadcast('scroll.refreshComplete');
                        });
                };
            }
        };

        //Make a fresh Http call to set the cache
        var gatherFeeds = function () {

            FeedService.getAllFeeds()
                .then(
                function (data) {

                    //
                    $scope.online = true;

                    switch (feed)
                    {
                        case 'releases':
                            getFeed("USAID Press Releases", 'http://www.usaid.gov/rss/press-releases.xml', data.releases, feed);
                            break;
                        case 'frontlines':
                            getFeed('Frontlines', 'http://www.usaid.gov/news-information/frontlines/46331/rss/', data.frontlines, feed);
                            break;
                        case 'blogs':
                            getFeed('Impact Blogs', 'http://blog.usaid.gov/feed/', data.blogs, feed);
                            break;
                        case 'facts':
                            getFeed('Fact Sheets', 'http://www.usaid.gov/rss/fact-sheets.xml', data.facts, feed);
                            break;
                        case 'speeches':
                            getFeed('Administrator Speeches', 'http://www.usaid.gov/rss/speeches.xml', data.speeches, feed);
                            break;
                        case 'testimonies':
                            getFeed('Congressional Testimonies', 'http://www.usaid.gov/rss/congressional-testimony.xml', data.testimonies, feed)
                            break;
                        case 'vacancies':
                            getFeed('Vacancy Announcements', 'Vacancy Announcements', data.vacancies, feed);
                            break;
                    }
                },
                function (error) {
                    $ionicLoading.hide();
                    $scope.online = false;

                    $ionicPopup.confirm({
                        title: 'Internet Connection Not Detected', // String. The title of the popup.
                        cssClass: '', // String, The custom CSS class name
                        subTitle: 'Check your Intenet Connection', // String (optional). The sub-title of the popup.
                        cancelText: '', // String (default: 'Cancel'). The text of the Cancel button.
                        cancelType: 'button-light', // String (default: 'button-default'). The type of the Cancel button.
                        okText: 'Try Again', // String (default: 'OK'). The text of the OK button.
                        okType: 'button-stable' // String (default: 'button-positive'). The type of the OK button.
                    }).then(function (res) {
                        if (res) {
                            gatherFeeds();
                        }
                        else
                        {

                        }
                    });
                    //$scope.reloadFeed = function(){
                    //    $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
                    //    FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/rss/press-releases.xml')
                    //        .then(function(refreshedData){
                    //            $ionicLoading.hide();
                    //            $scope.stories = refreshedData;
                    //        },
                    //        function(errorData){
                    //            $ionicLoading.hide();
                    //            console.error(errorData);
                    //        })
                    //        .finally(function() {
                    //            // Stop the ion-refresher from spinning
                    //            $scope.$broadcast('scroll.refreshComplete');
                    //        });
                    //};
                }
            );
        };

        //Gather Feeds
        gatherFeeds();

        $scope.reloadFeed = function(){
            gatherFeeds();
        };
    });