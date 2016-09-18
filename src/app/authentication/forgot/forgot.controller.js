(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('ForgotController', ForgotController);

    /* @ngInject */
    function ForgotController($scope, $state, $mdToast, $filter, triSettings, djangoAuth) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.user = {
            email: ''
        };

        vm.resetClick = function() {
            djangoAuth.resetPassword(vm.user.email)
                .then(function (data) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content($filter('translate')('FORGOT.MESSAGES.RESET_SENT') + ' ' + data.email)
                            .position('bottom right')
                            .action($filter('translate')('FORGOT.MESSAGES.LOGIN_NOW'))
                            .highlightAction(true)
                            .hideDelay(0)
                    ).then(function() {
                        $state.go('authentication.login');
                    });

                }, function (reason) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content($filter('translate')('FORGOT.MESSAGES.NO_RESET') + ' ' + data.email)
                            .position('bottom right')
                            .hideDelay(5000)
                    );
                });
        }
    }
})();
