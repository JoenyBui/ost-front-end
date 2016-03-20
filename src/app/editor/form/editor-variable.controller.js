(function() {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorVariableDialogController', EditorVariableDialogController);

    /* @ngInject */
    function EditorVariableDialogController($state, $mdDialog) {
        var vm = this;
        vm.cancel = cancel;
        vm.hide = hide;
        vm.item = {
            description: '',
            priority: '',
            selected: false
        };

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.item);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();