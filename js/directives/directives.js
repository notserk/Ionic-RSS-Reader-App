/**
 * Created by kshirley on 12/1/14.
 */
angular.module('feedDirectives', [])
    .directive('pressRelease', function(){
        return{
            restrict: 'E',
            templateUrl: "templates/directiveTemplates/pressRelease.html",
            link: function($scope, element, attrs){

            },
            scope: true
        };
    })
    .directive('frontLines', function(){
       return{
           restrict: 'E',
           templateUrl: "templates/directiveTemplates/frontlines.html",
           link: function($scope, element, attrs){},
           scope: true
       };
    })
    .directive('impactBlog', function(){
        return{
            restrict: 'E',
            templateUrl: "templates/directiveTemplates/impactBlogs.html",
            link: function($scope, element, attrs){},
            scope: true
        };
    })
    .directive('factSheets', function(){
        return{
            restrict: 'E',
            templateUrl: "templates/directiveTemplates/factSheets.html",
            link: function($scope, element, attrs){},
            scope: true
        };
    })
    .directive('speeches', function(){
        return{
            restrict: 'E',
            templateUrl: "templates/directiveTemplates/speeches.html",
            link: function($scope, element, attrs){},
            scope: true
        };
    })
    .directive('testimonies', function(){
        return{
            restrict: 'E',
            templateUrl: "templates/directiveTemplates/testimonies.html",
            link: function($scope, element, attrs){},
            scope: true
        };
    })
    .directive('vacancies', function(){
        return{
            restrict: 'E',
            templateUrl: "templates/directiveTemplates/vacancies.html",
            link: function($scope, element, attrs){},
            scope: true
        };
    })
    .directive('twitterLink', function(){
        return{
            restrict: 'A',
            scope: {

            },
            link: function(scope, element, attrs){

                element.on('click', function(e){

                    var twitterLink = 'https://twitter.com/USAID/status/';
                    window.open(twitterLink + attrs.url, '_system');
                    e.preventDefault();
                });
            },
            scope: true
        };
    })
    .directive('modifyTitle', function($timeout){
        return{
            restrict: 'A',
            priority: 200,
            scope: true,
            link: function(scope, element, attrs){

                //This function removes the href from the title so that it reduces redundancy with links. Read more takes you to the full article.
                $timeout(function(){

                    if(scope.feed)
                    {
                        var headline = $('div h2 > a').text();
                        $('div+div h2 ').remove();

                        $('div h2 > a').remove();
                        $('div h2').html(headline).addClass('article-title');
                    }
                    else
                    {
                        var title = element.find('h2');
                        var headlineText = title.text();
                        title.find('a').text();

                        element.find('h2').text(headlineText).addClass('article-title');
                    }
                }, 1);

                //console.log(element.find('h2').text());
            }
        }
    })
    .directive('openWindow', function(){
        return{
            restrict: 'A',
            link: function(scope, element, attrs){
                element.on('click', function(e){
                    window.open(element.attr('href'), '_blank');
                    e.preventDefault();
                })
            }
        }
    })
    .directive('addTarget',['$timeout', function(timer){
       return {
           restrict: 'A',
           priority: 100,
           //compile: function(element, attrs){
           //    // console.log('Ran from compile',element[0]);
           //    //console.log($('h2 a').text());
           //},
           link: function($scope, element, attrs, ctrl){
               //console.log(element.class);

               //I'm not comfortable with this hack I have to do more research to figure out the optimal way of doing this.
               timer(function(){
                   //This adds the target attribute to the title and the link in the body.
                   //$('h2 a').attr('target', 'blank');

                   //var url = $('h2,h4 a').attr('href');
                   //var url = $('h2 > a, h4 > a').attr('href');

                   //console.log(url);

                   //Ensures links open in new window/browser
                   //element.children('h2 > a').on('click', function(e){
                   //    //window.open(url, '_system');
                   //    e.preventDefault();
                   //});

                   //
                   //$(element).find('h2 > a').each(function(){
                   //    $(this).on('click', function(e){
                   //        window.open($(this).attr('href'), '_system');
                   //        e.preventDefault();
                   //    });
                   //    //    //window.open(url, '_system');
                   //    //    e.preventDefault();
                   //    //});
                   //});

                   //Fact Sheets, Administrators Speeches, Testimonies
                   $('h2 > a, p > a, div > a').each(function(){
                       $(this).on('click', function(e){

                           var regex = /(.+usaid.gov)/g;

                           //Check if link has usaid as prefix
                           if(regex.test($(this).attr('href'))){
                               window.open($(this).attr('href'), '_blank');
                               e.preventDefault();
                           }
                           else{

                               var usaid = 'http://www.usaid.gov';
                               var correctURL = usaid + $(this).attr('href');

                               window.open(correctURL, '_blank');
                               e.preventDefault();
                           }
                           //if not add it and go from there
                       });
                       //    //window.open(url, '_system');
                       //    e.preventDefault();
                       //});
                   });

                   //Case that handles anchors in frontlines article screen
                   $('div > h4 > a').each(function(){
                       $(this).on('click', function(e){
                           window.open($(this).attr('href'), '_blank');
                           e.preventDefault();
                       });
                   });



                   //console.log($(element));
                   //console.log(element);

                   //element.find('div > h4 > a').each(function(){
                   //    console.log($(this));
                   //});

                   //Ensures links open in a new window/browser
                   //element.children('').on('', function(e){
                   //
                   //
                   //
                   //});
                   //$('p a ').attr('target', 'blank');
                   //$('a').attr('target', 'blank');
               }, 1000);
           }
       }
    }]);
