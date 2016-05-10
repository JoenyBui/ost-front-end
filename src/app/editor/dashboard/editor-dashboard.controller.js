/**
 * Created by joeny on 5/1/16.
 */
(function () {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorDashboardController', EditorDashboardController);
    
    /* @ngInject */
    function EditorDashboardController($mdDialog) {
        var vm = this;

        vm.feed = [
            {
                date: moment().subtract(1, 'days'),
                entries: [
                    {
                        id:1,
                        name:"Trial 1",
                        domain: 1004
                    },
                    {
                        id:2,
                        name:"Trial 2",
                        domain: 1004
                    },
                    {
                        id:3,
                        name:"Trial 3"
                    },
                    {
                        id:4,
                        name: "Trial 4"
                    }]
            },
            {
                date: moment().subtract(2, 'days'),
                entries: [
                    {
                        id:1,
                        name:"Trial 5"
                    },
                    {
                        id:2,
                        name:"Trial 6"
                    }
                ]
            }
        ];

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