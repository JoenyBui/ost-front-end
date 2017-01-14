/**
 * Created by joeny on 12/10/16.
 */
(function () {
  angular
    .module('app.classroom')
    .controller('AddTestDialogController', AddTestDialogController);

  function AddTestDialogController($rootScope, $mdDialog, $state, $log, Classroom, djangoAuth) {
    var vm = this;

    vm.test = new Classroom.Test();
    vm.test.name = 'New Test';
    vm.test.teacher = djangoAuth.roles.sensei;

    vm.createNewTest = function () {
      djangoAuth.request({
        method: 'POST',
        url: 'v1/classroom/exam-problems/',
        data: vm.test
      }).then(function (data) {
        $state.go(
          'triangular.admin-default.sensei-test', {
            'testId': data.id
          }
        );

        $mdDialog.hide()
      }, function (reason) {
        $log.log(reason);

        $mdDialog.hide();
      })
    };

    vm.cancel = function () {
      $mdDialog.hide();
    }

  }
})();