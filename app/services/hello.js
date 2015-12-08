angular.module("angServices")
    .service('hello', ['$rootScope', function($rootScope) {

        hello.init({
            yahoo: 'dj0yJmk9bjJ0T0llWVYzYlBRJmQ9WVdrOWVuZGFXazlPTXpJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1kMg--',
            windows: '000000004817BB00',
            google: '466181853079-1bou7kke656f4ondlaf4v1bvl9cvlnof.apps.googleusercontent.com'
        }, {
            redirect_uri: 'index.html'
        });

        hello.on('auth.login', function() {

        });

        this.login = function(network) {
            if(network == 'yahoo') {
                hello(network).login();
            }
            return hello(network).login({scope: 'friends'});
        };

        this.getContacts = function(network) {
            var method = 'me/contacts';
            if(network == 'yahoo') {
                method = 'me'
            }
            return hello(network).api(method);
        }
}]);