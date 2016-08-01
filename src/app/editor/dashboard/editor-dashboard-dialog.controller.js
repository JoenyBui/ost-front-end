/**
 * Created by joeny on 5/1/16.
 */
(function() {
    'use strict';

    angular
        .module('app.examples.extras')
        .controller('EditorDashboardDialogController', EditorDashboardDialogController);

    /* @ngInject */
    function EditorDashboardDialogController($mdDialog, day, entry) {
        var vm = this;
        vm.currentEntry = entry;
        vm.next = next;
        vm.prev = prev;

        function next() {
            var index = day.entries.indexOf(vm.currentEntry );
            index = index + 1 < day.entries.length ? index + 1 : 0;
            vm.currentEntry = day.entries[index];
        }

        function prev() {
            var index = day.entries.indexOf(vm.currentEntry );
            index = index - 1 < 0 ? day.entries.length -1 : index - 1;
            vm.currentEntry = day.entries[index];
        }
    }
})();
