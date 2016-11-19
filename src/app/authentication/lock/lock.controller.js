(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LockController', LockController);

    /* @ngInject */
    function LockController($state, triSettings, djangoAuth) {
        var vm = this;
        vm.user = djangoAuth.user;
        vm.password = '';

        vm.triSettings = triSettings;

        // controller to handle login check
        vm.loginClick = function() {
            djangoAuth.login(vm.user.username, vm.password)
                .then(function (data) {
                    // user logged in ok so goto the dashboard
                    $state.go('triangular.admin-default.dashboard-general');
                }, function (reason) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Unable to log in with provided credentials')
                            .position('bottom right')
                            .hideDelay(5000)

                    );
                });
        }
    }
})();