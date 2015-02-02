/**
 * Created by kshirley on 1/28/15.
 */
angular.module('articleController', ['FeedUtilities', 'RSSFeedService'])
//Controller that handles the article screen
.controller('FeedStoryCtrl', function($scope, $stateParams, FeedService, Util) {

    var feed = $stateParams.feed;
    var id = $stateParams.id;

    switch(feed)
    {
        case 'administrator':
            //The administrator feed needed no formatting!
            FeedService.parseFeed('http://www.usaid.gov/rss/1891/related_content.xml')
                .then(function(response){
                    $scope.stories = response[id].content;
                    $scope.feedTitle = response[id].title;
                    $('#loading').hide();
                }, function(error){
                    //Indicate an error
                });
            break;

        case 'releases':
            //Formatting needed to get rid of "Language Undefined" and
            //add proper USAID link.
            FeedService.parseFeed('http://www.usaid.gov/rss/press-releases.xml')
                .then(function(response){
                    var html =  response[id].content;
                    $scope.stories = Util.FormatHTML(html);
                    $scope.feedTitle = response[id].title;
                    $scope.link = false;
                }, function(error){
                    //Indicate an error
                });
            break;

        case 'frontlines':
            FeedService.parseFeed('http://www.usaid.gov/news-information/frontlines/46331/rss/')
                .then(function(response){
                    var html = response[id].content;
                    $scope.stories = Util.FormatHTML(html);
                    $scope.feedTitle = response[id].title;
                    $scope.link = response[id].link;
                    $('#loading').hide();
                }, function(error){
                    //Indicate an error
                });
            break;

        case 'vacancies':
            FeedService.parseFeed('http://www.usaid.gov/work-with-us/careers/vacancy-announcements.xml')
                .then(function(response){
                    var html = response[id].content;
                    $scope.stories = Util.FormatHTML(html);
                    $scope.feedTitle = response[id].title;
                    $scope.link = response[id].link;
                    $('#loading').hide();
                }, function(error){
                    //Indicate an error
                });
            break;

        case 'testimonies':
            FeedService.parseFeed('http://www.usaid.gov/rss/congressional-testimony.xml')
                .then(function(response){
                    var html = response[id].content;
                    $scope.stories = Util.FormatHTML(html);
                    $scope.feedTitle = response[id].title;
                    $scope.link = false;
                    $('#loading').hide();
                }, function(error){
                    //Indicate an error
                });
            break;

        case 'speeches':
            FeedService.parseFeed('http://www.usaid.gov/rss/speeches.xml')
                .then(function(response){
                    var html = response[id].content;
                    $scope.stories = Util.FormatHTML(html);
                    $scope.feedTitle = response[id].title;
                    $scope.link = false;
                    $('#loading').hide();
                }, function(error){
                    //Indicate an error
                });
            break;

        case 'facts':
            FeedService.parseFeed('http://www.usaid.gov/rss/fact-sheets.xml')
                .then(function(response){
                    var html = response[id].content;
                    $scope.stories = Util.FormatHTML(html);
                    $scope.feed = feed;
                    $scope.feedTitle = response[id].title;
                    $scope.link = response[id].link;
                    $scope.loader = function(){
                        if($scope.stories)
                        {
                            return false;
                        }
                    };
                }, function(error){
                    //Indicate an error
                });
            break;

        case 'blogs':
            FeedService.parseFeed('http://blog.usaid.gov/feed/')
                .then(function(response){
                    var html = response[id].content;
                    $scope.stories = Util.FormatHTML(html);
                    $scope.feedTitle = response[id].title;
                    $scope.link = response[id].link;
                    $scope.loader = function(){
                        if($scope.stories)
                        {
                            return false;
                        }
                    };
                }, function(error){
                    //Indicate an error
                });
            break;
    }
})