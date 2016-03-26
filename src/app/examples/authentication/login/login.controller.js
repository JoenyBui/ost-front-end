(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, $mdToast, $location, triSettings, djangoAuth) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.socialLogins = [{
            icon: 'fa fa-twitter',
            color: '#5bc0de',
            url: '#'
        },{
            icon: 'fa fa-facebook',
            color: '#337ab7',
            url: '#'
        },{
            icon: 'fa fa-google-plus',
            color: '#e05d6f',
            url: '#'
        },{
            icon: 'fa fa-linkedin',
            color: '#337ab7',
            url: '#'
        }];
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            username: '',
            password: ''
        };

        ////////////////

        function loginClick() {
            djangoAuth.login(vm.user.username, vm.user.password)
                .then(function(data) {
                    // Successful login.
                    $location.path("/");
                }, function(reason) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Unable to log in with provided credientials')
                            .position('bottom right')
                            .hideDelay(5000)

                    );
                })
        }
    }
})();