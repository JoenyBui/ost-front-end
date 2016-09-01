/**
 * Created by joeny on 5/1/16.
 */
(function() {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorDashboardDialogController', EditorDashboardDialogController);

    /* @ngInject */
    function EditorDashboardDialogController($mdDialog, $state, $stateParams, problem) {
        var vm = this;

        vm.currentProblem = problem;

        vm.open = function () {
            $state.go('triangular.admin-default.math', {'problemId': this.currentProblem.id});

            $mdDialog.hide();
        };

        vm.next = function () {
            var index = day.entries.indexOf(vm.currentEntry);
            index = index + 1 < day.entries.length ? index + 1 : 0;
            vm.currentEntry = day.entries[index];
        };

        vm.prev = function () {
            var index = day.entries.indexOf(vm.currentEntry);
            index = index - 1 < 0 ? day.entries.length - 1 : index - 1;
            vm.currentEntry = day.entries[index];
        };
    }
})();
