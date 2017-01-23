/**
 * Created by joeny on 6/15/16.
 */
(function () {
  'use strict';

  angular
    .module('app.classroom')
    .controller('PupilTestController', PupilTestController);

  /* @ngInject */
  function PupilTestController($scope, $log, $mdDialog, $stateParams, djangoAuth, loadItem) {
    var vm = this;

    vm.test = loadItem;

    $scope.$on('submitTest', function (ev) {

      $mdDialog.show({
        templateUrl: 'app/classroom/pupil/test/submit-test-dialog.tmpl.html',
        targetEvent: ev,
        controller: 'SubmitTestDialogController',
        controllerAs: 'vm',
        locals: {
          test: vm.test
        }
      })
      .then(function (test) {
        djangoAuth.request({
          method: 'POST',
          url: 'v1/classroom/exam-answers/',
          data: test
        }).then(function (data) {
          $log.log(data);
        }, function (reason) {
          $log.log(reason);
        });
      });
    });
  }
})();