/**
 * Created by joeny on 5/1/16.
 */
(function () {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorDashboardController', EditorDashboardController);
    
    /* @ngInject */
    function EditorDashboardController($mdDialog, $log, djangoAuth) {
        var vm = this;

        vm.feed = [];

        djangoAuth.request({
            method: 'GET',
            url: 'v1/problem/problem-base/',
            data:{}
        }).then(function (data) {
            $log.log(data);
            
            for (var key in data) {
                vm.feed.push(
                    data[key]
                )
            }
        }, function (reason) {
            $log.log(reason);
        });

        vm.openEntry = openEntry;


        function openEntry(day, entry, $event) {
            $mdDialog.show({
                controller: 'EditorDashboardDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/editor/dashboard/editor-dashboard-dialog.tmpl.html',
                clickOutsideToClose: true,
                focusOnOpen: false,
                targetEvent: $event,
                locals: {
                    day: day,
                    entry: entry
                }
            });
        }
    }
})();