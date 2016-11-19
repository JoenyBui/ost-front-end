(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($scope, $state, $mdToast, $http, $filter, triSettings, djangoAuth) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.user = {
            username: '',
            email: '',
            password: '',
            confirm: ''
        };
        
        vm.signupClick = function() {
            djangoAuth.register(vm.user.username, vm.user.password, vm.user.confirm, vm.user.email)
                .then(function (data) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content($filter('translate')('SIGNUP.MESSAGES.CONFIRM_SENT') + ' ')
                            .position('bottom right')
                            .action($filter('translate')('SIGNUP.MESSAGES.LOGIN_NOW'))
                            .highlightAction(true)
                            .hideDelay(0)
                    ).then(function() {
                        $state.go('authentication.login');
                    });

                }, function (reason) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content($filter('translate')('SIGNUP.MESSAGES.NO_SIGNUP'))
                            .position('bottom right')
                            .hideDelay(5000)
                    );

                });
        }
    }
})();