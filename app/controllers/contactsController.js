angular.module("angControllers").controller("contactsController", [
    '$rootScope', '$scope', '$timeout', '$q', 'hello', 'contacts',
    function ($rootScope, $scope, $timeout, $q, hello, contacts) {
        console.log('hello world');

        $scope.providers = [
            {name: 'windows', signedIn: false, contacts: []},
            {name: 'google', signedIn: false, contacts: []},
            {name: 'yahoo', signedIn: false, contacts: []}
        ];

        $scope.login = function(provider) {
            hello.login(provider.name).then(function (data) {
                    console.log('LOGGED IN!');

                    $timeout(function() {
                        provider.signedIn = true;
                    }, 300);
                },
                function (e) {
                    console.log('NOT LOGGED IN!');
                    console.log(e)
                })
        };

        $scope.getContacts = function(provider) {

            if(provider.requestInProgress) {
                return;
            }

            provider.requestInProgress = true;
            hello.getContacts(provider.name).then(function (res) {
                    console.log('GOT CONTACTS!');

                    $timeout(function() {
                        for (var i = 0; i < res.data.length; i++) {
                            provider.contacts.push({ name: res.data[i].name, email: res.data[i].email });
                        }
                        provider.requestInProgress = false;
                    }, 300);
                },
                function (e) {
                    console.log('DIDN"T GET CONTACTS!');
                    console.log(e);
                    provider.requestInProgress = false;
                })
        };

        $scope.saveContacts = function() {
            $scope.isSaving = true;

            var data = [];
            for (var i = 0; i < $scope.providers.length; i++) {
                //collect all contacts
                if($scope.providers[i].contacts.length) {
                    Array.prototype.push.apply(data, $scope.providers[i].contacts);
                }
            }
            contacts.saveContacts(data).then(function(){
                    console.log('SAVED!');

                    var json = JSON.stringify(data);
                    var blob = new Blob([json], {type: "application/json"});
                    window.open(URL.createObjectURL(blob), 'contacts.json');

                    $scope.isSaving = false;
                },
                function (e) {
                    console.log('NOT SAVED!');
                    console.log(e);

                    $scope.isSaving = false;
                });
        }
    }]);