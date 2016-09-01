(function() {
    'use strict';

    angular
        .module('app.classroom')
        .controller('SubmitTestDialogController', SubmitTestDialogController);

    /* @ngInject */
    function SubmitTestDialogController($state, $mdDialog, test) {
        var vm = this;
        vm.cancel = cancel;
        vm.hide = hide;

        vm.test = test;

        function hide() {
            $mdDialog.hide(vm.test);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();