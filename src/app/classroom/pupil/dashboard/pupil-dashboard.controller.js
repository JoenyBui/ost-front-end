/**
 * Created by joeny on 4/9/16.
 */
(function () {
  'use stict';

  angular
    .module('app.classroom')
    .controller('PupilDashboardController', PupilDashboardController);

  /* @ngInject */
  function PupilDashboardController($scope, $log, $mdDialog, $state, $mdExpansionPanel, djangoAuth) {
    var vm = this;

    vm.tests = [];


    $mdExpansionPanel().waitFor('base').then(function (instance) {
      instance.expand();
    });

    var promiseTest = djangoAuth.request({
      method: 'GET',
      url: 'v1/classroom/exam-problems/' + '?ordering=-modified',
      data: {}
    }).then(function (data) {
      vm.tests = data;

    }, function (reason) {
      $log.log(reason);
    });

    vm.menu = {
      items: [
        {
          title: 'Delete Test'
        }
      ]
    };

    vm.openTest = function (index) {
      var item = vm.tests[index];
      var testId = item.id;

      $state.go(
        'triangular.admin-default.pupil-test', {
          'testId': testId
        }
      )
    };

  }
})();