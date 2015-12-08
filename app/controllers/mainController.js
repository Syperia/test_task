angular.module("angControllers").controller("mainController", [
    '$scope',
    function ($scope) {

        function hideSplashScreen() {
            setTimeout(function () {
                $('.splash-screen').hide();
            }, 500);
        }

        hideSplashScreen();
    }]);