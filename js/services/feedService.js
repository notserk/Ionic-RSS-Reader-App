angular.module('RSSFeedService', [])
    .factory('FeedService',function($http, $q, DSCacheFactory, $cordovaNetwork){
        return {
            parseFeed : function(url, feed){

                var deferred = $q.defer();
                var cacheFeed = DSCacheFactory.get("FeedStorage");

                //Check if cache exists, if not then fetch data via http.
                if(cacheFeed.get(feed))
                {
                    deferred.resolve(cacheFeed.get(feed));
                }
                else
                {
                    $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=100&callback=JSON_CALLBACK&q=' + encodeURIComponent(url),
                        {
                            timeout: 9000
                            //timeout: 1000
                        })
                        .then(function(response){
                            cacheFeed.put(feed, response.data.responseData.feed.entries);
                            deferred.resolve(cacheFeed.get(feed));
                        }, function(error){
                            deferred.reject('Connection Failed');
                        });
                }
                return deferred.promise;
            },

            getAllFeeds: function(){

                var urls = [
                    {
                        name: 'releases',
                        url: 'http://www.usaid.gov/rss/press-releases.xml'
                    },
                    {
                        name: 'frontlines',
                        url: 'http://www.usaid.gov/news-information/frontlines/46331/rss/'
                    },
                    {
                        name: 'blogs',
                        url: 'http://blog.usaid.gov/feed/'
                    },
                    {
                        name: 'facts',
                        url: 'http://www.usaid.gov/rss/fact-sheets.xml'
                    },
                    {
                        name: 'speeches',
                        url: 'http://www.usaid.gov/rss/speeches.xml'
                    },
                    {
                        name: 'testimonies',
                        url: 'http://www.usaid.gov/rss/congressional-testimony.xml'
                    },
                    {
                        name: 'vacancies',
                        url: 'http://www.usaid.gov/work-with-us/careers/vacancy-announcements.xml'
                    }
                ];

                var promiseObject = {};


                angular.forEach(urls, function(url){
                    var deffered = $q.defer();
                    $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=100&callback=JSON_CALLBACK&q=' + encodeURIComponent(url.url), {
                        timeout: 15000
                        //timeout: 1000
                    })
                    .then(function(response){
                        //cacheFeed.put(url.name, response.data.responseData.feed.entries);
                        deffered.resolve(response.data.responseData.feed.entries);

                    }, function(error){
                        deffered.reject(error);
                    });

                    //promises.push(deffered.promise);
                    promiseObject[url.name] = deffered.promise;
                });

                return $q.all(promiseObject);
            },

            reloadFeed: function(name, url){

                var deferred = $q.defer();
                var cacheFeed = DSCacheFactory.get("FeedStorage");

                $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=100&callback=JSON_CALLBACK&q=' + encodeURIComponent(url),
                    {
                        timeout: 9000
                        //timeout: 1000
                    })
                    .then(function(response){
                        cacheFeed.put(url, response.data.responseData.feed.entries);
                        console.dir(response);
                        deferred.resolve(cacheFeed.get(url));
                    }, function(error){
                        deferred.reject('Connection Failed');
                    });

                return deferred.promise;
            },

            checkNetwork: function(){

                //var deferred = $q.defer();
                //
                //if($cordovaNetwork.isOnline()){
                //
                //    deferred.resolve(true);
                //}
                //else
                //{
                //    deffered.reject(false);
                //}
                //
                //return deferred.promise;

                //var deferred = $q.defer();


                if($cordovaNetwork.isOnline()){

                    return true;
                }
                else
                {
                    return false;
                }

            }
        }
    });