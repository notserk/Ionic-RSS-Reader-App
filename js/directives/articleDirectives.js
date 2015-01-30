angular.module('ArticleDirectives',[])
.directive('pressReleaseArticle', function(){
        return{
            restrict: 'E',
            templateUrl: "templates/articleDirectives/pressReleaseArtScreen.html",
            scope: true,
            link: function(){

            },
            controller: function(FeedService, $stateParams, $scope){
                var feed = $stateParams.feed;

                $scope.feed = feed;
                var id = $stateParams.id;

                $scope.feed = feed;

                FeedService.parseFeed('http://www.usaid.gov/rss/press-releases.xml')
                    .then(function(response){
                        var html =  response[id].content;
                        html = html.replace(/(href="(.+)")/g, 'href=\"http://www.usaid.gov' + '$2' + '\"');
                        html = html.replace(/<div>\n.+\n.+\n<\/div>/g, "");
                        //html = Util.ReleasesContent(html);
                        $scope.stories = html;
                        $scope.feedTitle = response[id].title;
                    }, function(error){
                        //Indicate an error
                    });
            }
        };
    });

