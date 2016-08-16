/**
 * Created by joeny on 8/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorSubmitJobController', EditorSubmitJobController);

    function EditorSubmitJobController($interval, $mdDialog, djangoAuth, job, requestUrl) {
        var vm = this;

        vm.job = job;


        vm.submit = function () {

        };

        vm.cancel = function () {
            $mdDialog.cancel();
        };
    }

})();