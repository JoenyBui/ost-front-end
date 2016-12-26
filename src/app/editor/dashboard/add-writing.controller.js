/**
 * Created by joeny on 8/30/16.
 */
(function () {
    angular
        .module('app.editor')
        .controller('AddWritingDialogController', AddWritingDialogController);

    function AddWritingDialogController($rootScope, $mdDialog, djangoAuth) {
        var vm = this;

        vm.cancel = function () {
            $mdDialog.hide();
        };
    }
})();
