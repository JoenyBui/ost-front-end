/**
 * Created by joeny on 8/30/16.
 */
(function () {
    angular
        .module('app.editor')
        .controller('AddReadingDialogController', AddReadingDialogController);

    function AddReadingDialogController($rootScope, $mdDialog, djangoAuth) {
        var vm = this;

        vm.cancel = function () {
            $mdDialog.hide();
        };
    }
})();
