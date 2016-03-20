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

        vm.name = '';
        vm.type_options = '';
        vm.type = '';

        vm.item = {
            name: '',
            value: '',
            type: ''
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