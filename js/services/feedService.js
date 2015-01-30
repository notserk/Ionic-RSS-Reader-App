angular.module('RSSFeedService', [])
    .factory('FeedService',function($http, $q, DSCacheFactory, $cordovaNetwork){
        return {
            parseFeed : function(url){

                var deferred = $q.defer();
                var cacheFeed = DSCacheFactory.get("FeedStorage");

                //Check if cache exists, if not then fetch data via http.
                if(cacheFeed.get(url)){
                    deferred.resolve(cacheFeed.get(url));
                    console.log("Data from cache", cacheFeed.get(url));
                }
                else{
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
                }
                return deferred.promise;
            },

            getAllFeeds: function(){

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