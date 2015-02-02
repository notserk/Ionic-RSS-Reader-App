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
                    else{
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

            $scope.feedTitle = "Vacancy Announcements";

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

    .controller('AllFeedCtrl', function ($scope, $stateParams, $ionicLoading, FeedService, Util) {
        //Make a call to get all feeds
        var feed = $stateParams.feed;
        $scope.feed = feed;

        var cachedFeed = DSCacheFactory.get("FeedStorage");

        //FeedService.getAllFeeds()
        //    .then(
        //        function(data){
        //            switch(feed)
        //            {
        //                case 'releases':
        //
        //                    if(cachedFeed.get('releases'))
        //                    {
        //
        //                    }
        //                    else
        //                    {
        //
        //                    }
        //                    $scope.stories = data[0];
        //
        //                    $scope.feedTitle = "USAID Press Releases";
        //
        //                    $scope.parseHTML = function (text) {
        //                        var html = Util.ReleasesHTML(text);
        //                        return html;
        //                    };
        //
        //                    $scope.formatDate = function(date){
        //                        return Util.FormatDate(date);
        //                    };
        //
        //                    $scope.reloadFeed = function(){
        //                        FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/rss/press-releases.xml')
        //                            .then(function(refreshedData){
        //                                    $scope.stories = refreshedData;
        //                                },
        //                                function(errorData){
        //                                    console.error()
        //                                })
        //                            .finally(function() {
        //                                // Stop the ion-refresher from spinning
        //                                $scope.$broadcast('scroll.refreshComplete');
        //                            });
        //                    };
        //                    break;
        //                case 'frontlines':
        //
        //                    $scope.stories = data[1];
        //
        //                    $scope.feedTitle = "Frontlines";
        //
        //                    $scope.reloadFeed = function(){
        //                        FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/news-information/frontlines/46331/rss/')
        //                            .then(function(refreshedData){
        //                                $scope.stories = refreshedData;
        //                            },
        //                            function(errorData){
        //                                console.error()
        //                            })
        //                            .finally(function() {
        //                                // Stop the ion-refresher from spinning
        //                                $scope.$broadcast('scroll.refreshComplete');
        //                            });
        //                    };
        //
        //                    $scope.formatDate = function(date){
        //                        return Util.FormatDate(date);
        //                    };
        //                    break;
        //                case 'blogs':
        //                    $scope.stories = data[2];
        //
        //                    $scope.feedTitle = "Impact Blog";
        //
        //                    $scope.reloadFeed = function(){
        //                        FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/news-information/frontlines/46331/rss/')
        //                            .then(function(refreshedData){
        //                                $scope.stories = refreshedData;
        //                            },
        //                            function(errorData){
        //                                console.error()
        //                            })
        //                            .finally(function() {
        //                                // Stop the ion-refresher from spinning
        //                                $scope.$broadcast('scroll.refreshComplete');
        //                            });
        //                    };
        //
        //                    $scope.formatDate = function(date){
        //                        return Util.FormatDate(date);
        //                    };
        //
        //                    break;
        //                case 'facts':
        //                    $scope.stories = data[3];
        //
        //                    $scope.feedTitle = "Fact Sheets";
        //
        //                    $scope.reloadFeed = function(){
        //                        FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/news-information/frontlines/46331/rss/')
        //                            .then(function(refreshedData){
        //                                $scope.stories = refreshedData;
        //                            },
        //                            function(errorData){
        //                                console.error()
        //                            })
        //                            .finally(function() {
        //                                // Stop the ion-refresher from spinning
        //                                $scope.$broadcast('scroll.refreshComplete');
        //                            });
        //                    };
        //
        //                    $scope.formatDate = function(date){
        //                        return Util.FormatDate(date);
        //                    };
        //
        //                    break;
        //                case 'speeches':
        //                    $scope.stories = data[4];
        //
        //                    $scope.feedTitle = "Administrator Speeches";
        //
        //                    $scope.reloadFeed = function(){
        //                        FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/news-information/frontlines/46331/rss/')
        //                            .then(function(refreshedData){
        //                                $scope.stories = refreshedData;
        //                            },
        //                            function(errorData){
        //                                console.error()
        //                            })
        //                            .finally(function() {
        //                                // Stop the ion-refresher from spinning
        //                                $scope.$broadcast('scroll.refreshComplete');
        //                            });
        //                    };
        //
        //                    $scope.formatDate = function(date){
        //                        return Util.FormatDate(date);
        //                    };
        //
        //                    break;
        //                case 'testimonies':
        //                    $scope.stories = data[5];
        //
        //                    $scope.feedTitle = "Congressional Testimonies";
        //
        //                    $scope.reloadFeed = function(){
        //                        FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/news-information/frontlines/46331/rss/')
        //                            .then(function(refreshedData){
        //                                $scope.stories = refreshedData;
        //                            },
        //                            function(errorData){
        //                                console.error()
        //                            })
        //                            .finally(function() {
        //                                // Stop the ion-refresher from spinning
        //                                $scope.$broadcast('scroll.refreshComplete');
        //                            });
        //                    };
        //
        //                    $scope.formatDate = function(date){
        //                        return Util.FormatDate(date);
        //                    };
        //
        //                    break;
        //                case 'vacancies':
        //                    $scope.stories = data[6];
        //
        //                    $scope.feedTitle = "Vacancy Announcements";
        //
        //                    $scope.reloadFeed = function(){
        //                        FeedService.reloadFeed($scope.feed, 'http://www.usaid.gov/news-information/frontlines/46331/rss/')
        //                            .then(function(refreshedData){
        //                                $scope.stories = refreshedData;
        //                            },
        //                            function(errorData){
        //                                console.error()
        //                            })
        //                            .finally(function() {
        //                                // Stop the ion-refresher from spinning
        //                                $scope.$broadcast('scroll.refreshComplete');
        //                            });
        //                    };
        //
        //                    $scope.formatDate = function(date){
        //                        return Util.FormatDate(date);
        //                    };
        //
        //                    break;
        //            }
        //        },
        //    function(error){
        //        console.error(error)
        //    });

    });