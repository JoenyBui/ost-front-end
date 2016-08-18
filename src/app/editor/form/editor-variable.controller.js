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

        vm.variables = {
            name: 'Var1',
            options: [
                {
                    value: 'whole',
                    text: 'Whole Number'
                },
                {
                    value: 'real',
                    text: 'Real Number'
                },
                {
                    value: 'text',
                    text: 'Text'
                },
                {
                    value: 'whole_list',
                    text: 'Whole list'
                },
                {
                    value: 'real_list',
                    text: 'Real list'
                },
                {
                    value: 'range',
                    text: 'Whole Range'
                },
                {
                    value: 'xrange',
                    text: 'Real Number Range'
                }
            ],
            whole: {
                values: null
            },
            real: {
                values: null
            },
            whole_list: {
                values: [null, null]
            },
            real_list: {
                values: [null, null]
            },
            range: {
                values: [0, 10, 1]
            },
            xrange: {
                values: [0, 1, 0.1]
            },
            text: {
                values: null
            },
            selectedItem: 'whole'
        };

        vm.item = {
            name: 'Var1',
            value: 1,
            type: 'whole'
        };

        vm.selectChangeType = function () {
            vm.item.type = vm.variables.selectedItem;
        };

        vm.add_wl_item = function () {
            vm.variables.whole_list.values.push(null);
        };

        vm.remove_wl_item = function () {

        };

        vm.add_rl_item = function () {
            vm.variables.real_list.values.push(null);
        };

        vm.remove_rl_item = function () {

        };

        function hide() {
            if (vm.item.type == 'whole') {
                vm.item.value = parseInt(vm.variables.whole.values);
            }
            else if (vm.item.type == 'real') {
                vm.item.value = parseFloat(vm.variables.real.values);
            }
            else if(vm.item.type == 'text') {
                vm.item.value = vm.variables.text.values;
            }
            else if (vm.item.type == 'whole_list') {
                vm.item.value = vm.variables.whole_list.values;
            }
            else if (vm.item.type == 'real_list') {
                vm.item.value = vm.variables.real_list.values;
            }
            else if (vm.item.type == 'range') {
                vm.item.value = vm.variables.range.values;
            }
            else if (vm.item.type == 'xrange') {
                vm.item.value = vm.variables.xrange.values;
            }

            $mdDialog.hide(vm.item);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();