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
      // POST Solution
      var method = 'POST';

      if (vm.job.id != -1) {
        vm.requestUrl += vm.job.id + '/';

        // Update Solution
        method = 'PUT';
      }

      /*Submit Job*/
      $mdDialog.hide([vm.job, vm.requestUrl, method]);
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };
  }

})();