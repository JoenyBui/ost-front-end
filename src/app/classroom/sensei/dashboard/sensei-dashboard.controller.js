/**
 * Created by joeny on 4/9/16.
 */
(function () {
    'use strict';

    angular
        .module('app.classroom')
        .controller('SenseiDashboardController', SenseiDashboardController);

    /* @ngInject */
    function SenseiDashboardController($scope, $log, $mdDialog, $timeout, $state, $mdExpansionPanel, djangoAuth) {
        var vm =this;

        $mdExpansionPanel().waitFor('panelOne').then(function (instance) {
            instance.isOpen();
        });

        $scope.addPanelOne = function () {
            $mdExpansionPanelGroup('panelGroup').add('panelOne', {localParam: 'some data'});
        };

        $scope.addPanelTwo = function () {
            $mdExpansionPanelGroup('panelGroup').add('panelTwo');
        };

        $scope.removePanelOne = function () {
            $mdExpansionPanelGroup('panelGroup').remove('panelOne');
        };

        $scope.removeAll = function () {
            $mdExpansionPanelGroup('panelGroup').removeAll({animation: false});
        };

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

        /**
         * Add new test.
         *
         * */
        $scope.$on('addTest', function( ev ){
            $mdDialog.show({
                templateUrl: 'app/classroom/sensei/dashboard/add-test.tmpl.html',
                targetEvent: ev,
                controller: 'AddTestDialogController',
                controllerAs: 'vm',
                locals: {
                    variable: null
                }
            });
        });

        /**
         * Open the following test.
         *
         * */
        vm.openTest = function (index) {
            var item = vm.tests[index];
            var testId = item.id;

            $state.go(
                'triangular.admin-default.sensei-test', {
                    'testId': testId
                }
            );
        };
        // vm.openTest = function (item, $event) {
        //     $mdDialog.show({
        //         controller: 'SenseiDashboardDialogController',
        //         controllerAs: 'vm',
        //         templateUrl: 'app/classroom/sensei/dashboard/sensei-dashboard-dialog.tmpl.html',
        //         clickOutsideToClose: true,
        //         focusOnOpen: false,
        //         targetEvent: $event,
        //         locals: {
        //             test: item
        //         }
        //     });
        // };
    }
})();