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

        //vm.name = '';
        vm.type_options = [
            {
                value: 'whole',
                text: 'Whole Number'
            },
            {
                value: 'real',
                text: 'Real Number'
            },
            {
                value: 'range',
                text: 'Whole Range'
            },
            {
                value: 'xrange',
                text: 'Real Number Range'
            },
            {
                value: 'text',
                text: 'Text'
            }
        ];

        //vm.type = 'whole';


        vm.item = {
            name: 'Var1',
            value: 1,
            type: 'whole'
        };

        /////////////////////////

        vm.selectChangeType = function () {

        };

        function hide() {
            if (vm.item.type == 'whole') {
                vm.item.value = parseInt(vm.item.value);
            }
            else if (vm.item.type == 'real') {
                vm.item.value = parseFloat(vm.item.value);
            }
            else if(vm.item.type == 'range') {
                //TODO: Check if the range format is correct.
            }
            else if (vm.item.type == 'xrange') {
                //TODO: Check if the xrange format is correct.
            }
            else {
                //TODO: Check if text looks clean.
            }

            $mdDialog.hide(vm.item);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();