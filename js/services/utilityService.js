/**
 * Created by kshirley on 1/28/15.
 */
angular.module('FeedUtilities', [])
    .factory('Util', function(){
        return{
            ReleasesContent: function(text){
                if(text){
                    var pattern = new RegExp("<p><span.+", "g");
                    var compressedText = pattern.exec(text);

                    return compressedText;
                }
            },
            ReleasesHTML: function(text){
                //var pattern = new RegExp("<p><span.+", "g");
                //var compressedText = pattern.exec(text);
                //console.dir(compressedText);
                //var formattedText = text;
                //formattedText = formattedText.replace(/(href="(.+)")/g, 'href=\"http://www.usaid.gov' + '$2' + '\"');
                //formattedText = formattedText.replace(/<div>\n.+\n.+\n<\/div>/g, "");

                var reg = new RegExp("(<h2><a.+</h2>).+(<span>.+?</span>).+(<p>.+</p>)\n?.+<a\\shref=(\".+\")", "g");

                var t = reg.exec(text);

                return t;

                //return compressedText[0];
            },

            //Could be reformatted to be a date filter.
            FormatDate: function(date){

                if(date){
                    var newDate = new Date(date);

                    var month = newDate.getMonth() + 1 ;
                    var day = newDate.getDay();
                    var year = newDate.getFullYear();

                    var newDateFormat = month + "/" + day + "/" + year;

                    return newDateFormat;
                }
            },

            ContentSnippet: function(text){
                if(text){

                    var cleanText = text;
                    cleanText = cleanText.replace(/.?(Language.+\n\sUndefined)/g, '');

                    return cleanText;
                }
            },

            FormatHTML: function(text){

                if(text){
                    var formattedText = text;
                    formattedText = formattedText.replace(/(href="(.+)")/g, 'href=\"http://www.usaid.gov' + '$2' + '\"');
                    formattedText = formattedText.replace(/<div>\n.+\n.+\n<\/div>/g, "");

                    if(!formattedText){
                        return 'Visit site for more information';
                    }

                    return formattedText;
                }

                else{

                    return 'Visit site for more information';
                }
            }
        }
    });