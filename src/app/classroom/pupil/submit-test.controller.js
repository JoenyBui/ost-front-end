(function() {
    'use strict';

    angular
        .module('app.classroom')
        .controller('SubmitTestDialogController', SubmitTestDialogController);

    /* @ngInject */
    function SubmitTestDialogController($state, $mdDialog) {
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