/**
 * Created by joeny on 4/9/16.
 */
(function () {
    'use stict';

    angular
        .module('app.classroom')
        .controller('PupilDashboardController', PupilDashboardController);

    /* @ngInject */
    function PupilDashboardController($scope, $log, $mdDialog, djangoAuth) {
        var vm = this;

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
                templateUrl: 'app/classroom/pupil/dashboard/pupil-dashboard-dialog.tmpl.html',
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