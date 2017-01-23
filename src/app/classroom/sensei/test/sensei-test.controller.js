/**
 * Created by joeny on 6/15/16.
 */
(function () {
  'use strict';

  angular
    .module('app.classroom')
    .controller('SenseiTestController', SenseiTestController);

  /* @ngInject */
  function SenseiTestController($scope, $log, $mdToast, $mdDialog, $mdSidenav, $stateParams, $q, djangoAuth, loadItem) {
    var vm = this;

    vm.test = loadItem;

    $scope.$on('search', function ($event) {
      $mdDialog.show({
        controller: 'SenseiTestSearchDialogController',
        controllerAs: 'vm',
        templateUrl: 'app/classroom/sensei/test/sensei-test.search-dialog.tmpl.html',
        clickOutsideToClose: true,
        focusOnOpen: false,
        targetEvent: $event
      })
      .then(function (addList) {

        if (addList != null) {
          var promises = vm.test.addProblems(addList);

          $q.all(
            promises
          ).then(function (value) {
            var savePromise = vm.test.save();

            savePromise.then(function (data) {
              $mdToast.show(
                $mdToast.simple()
                  .content('Added questions to test.')
                  .position('bottom right')
                  .hideDelay(5000)
              )
            }, function (reason) {
              $mdToast.show(
                $mdToast.simple()
                  .content(reason)
                  .position('bottom right')
                  .hideDelay(5000)
              )
            });
          }, function (reason) {

          });

        }

      }, function () {
        // Pass
      });
    });

    vm.problemInfo = [];

    vm.add_check_item = function () {
      var dataChanged = false;

      for (var index in vm.results) {
        var item = vm.results[index];

        if ('selected' in item) {
          vm.test.problems.push(item.id);

          if (!(item.id in vm.problemInfo)) {
            vm.problemInfo[item.id] = item.data;

            dataChanged = true;
          }
        }
      }

      if (dataChanged) {
        djangoAuth.request({
          method: 'PUT',
          url: 'v1/classroom/exam-problems/' + vm.test.id + '/',
          data: vm.test
        }).then(function (data) {

        }, function (reason) {

        });
      }

      $mdSidenav('right').toggle();
    };

  }
})();