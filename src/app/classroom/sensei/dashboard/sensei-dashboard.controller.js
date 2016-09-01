/**
 * Created by joeny on 4/9/16.
 */
(function () {
    'use strict';

    angular
        .module('app.classroom')
        .controller('SenseiDashboardController', SenseiDashboardController);

    /* @ngInject */
    function SenseiDashboardController($scope, $log, $mdDialog, $timeout, djangoAuth) {
        var vm =this;

        vm.tests = [];

        var promiseTest = djangoAuth.request({
            method: 'GET',
            url: 'v1/classroom/exam-problems/' + '?ordering=-modified',
            data: {}
        }).then(function (data) {
            vm.tests = data;

        }, function (reason) {
            $log.log(reason);
        });

        vm.menu = {
            items: [
            {
                title: 'Delete Test'
            }
        ]};

        vm.openTest = function (item, $event) {
            $mdDialog.show({
                controller: 'SenseiDashboardDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/classroom/sensei/dashboard/sensei-dashboard-dialog.tmpl.html',
                clickOutsideToClose: true,
                focusOnOpen: false,
                targetEvent: $event,
                locals: {
                    test: item
                }
            });
        };
    }
})();