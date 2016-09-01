/**
 * Created by joeny on 5/1/16.
 */
(function() {
    'use strict';

    angular
        .module('app.classroom')
        .controller('SenseiDashboardDialogController', SenseiDashboardDialogController);

    /* @ngInject */
    function SenseiDashboardDialogController($mdDialog, $state, $stateParams, test) {
        var vm = this;

        vm.test = test;

        vm.open = function () {
            $state.go('triangular.admin-default.sensei-test', {
                'testId': this.test.id
            });

            $mdDialog.hide();
        };
    }
})();
