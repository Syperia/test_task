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

            if(provider.signedIn) {
                return;
            }

            provider.requestInProgress = true;
            hello.login(provider.name).then(function (data) {
                    console.log('LOGGED IN!');

                    $timeout(function() {
                        provider.signedIn = true;
                        provider.requestInProgress = false;
                    }, 300);
                },
                function (e) {
                    console.log('NOT LOGGED IN!');
                    console.log(e)
                    provider.requestInProgress = false;
                })
        };

        $scope.getContacts = function(provider) {

            if(!provider.signedIn) {
                return;
            }

            if(provider.requestInProgress) {
                return;
            }

            provider.requestInProgress = true;
            hello.getContacts(provider.name).then(function (res) {
                    console.log('GOT CONTACTS!');

                    $timeout(function() {
                        if(res.data) {
                            for (var i = 0; i < res.data.length; i++) {
                                provider.contacts.push({ name: res.data[i].name, email: res.data[i].email });
                            }
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

        $scope.saveContacts = function(a) {
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

                    //TODO: use html5 download attribute
                    //var url  = URL.createObjectURL(blob);
                    //a.download    = "backup.json";
                    //a.href        = url;
                    $scope.isSaving = false;
                },
                function (e) {
                    console.log('NOT SAVED!');
                    console.log(e);

                    $scope.isSaving = false;
                });
        }
    }]);