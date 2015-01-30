angular.module('TwitterCtrl', ['TwitterService'])

    //Controller that handles Twitter Screen
    .controller('TwitterCtrl', function($http, $scope, TwitterLib, $ionicLoading){
        $ionicLoading.show({template: '<i class=\"ion-refreshing\"></i>'});
        var options =
        {
            url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
            //url: "/v1",
            data: {
                'screen_name': "usaid",
                'count': "25"
            }
        };

        var twitterCall = function(){
            TwitterLib.apiGetCall(options).then(function (_data) {
                //alert("doStatus success");

                $scope.items = _data;
                $scope.feedTitle = 'Twitter Feed';
                $ionicLoading.hide();
                $scope.loaded = true;
                $scope.failed = false;

            }, function (_error) {
                //alert("doStatus error" + JSON.stringify(_error));
                $ionicLoading.hide();
                $scope.loaded = false;
                $scope.failed = true;


            });
        };
        twitterCall();
    });