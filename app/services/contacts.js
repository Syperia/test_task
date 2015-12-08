angular.module("angServices")
    .service('contacts', ['$rootScope', '$http', function($rootScope, $http) {
        var serverUrl = config('serverUrl');

        this.saveContacts = function(contacts) {
            return $http.post(serverUrl + '/post', contacts);
        }
    }]);