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
        vm.requestUrl = requestUrl;
        
        vm.submit = function () {
            if (vm.job.id != -1) {
                vm.requestUrl += vm.job.id + '/';
            }

            /*Submit Job*/
            $mdDialog.hide([vm.job, vm.requestUrl]);
        };

        vm.cancel = function () {
            $mdDialog.cancel();
        };
    }

})();