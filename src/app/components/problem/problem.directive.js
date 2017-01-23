/**
 * Created by joeny on 8/21/16.
 */
(function () {
  'use strict';

  angular
    .module('app.components')
    .directive('ostProblem', ostProblem);

  function ostProblem() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/problem/problem-directive.tmpl.html',
      // transclude: true,
      // replace: true,
      scope: {
        title: '@',
        subtitle: '@',
        teacher: '=',
        columns: '=',
        contents: '=',
        id: '=',
        flex: '@',
        flexXs: '@'
      },
      bindToController: true,
      link: link,
      controller: Controller,
      controllerAs: 'vm'
    };

    function link($scope, $element, attrs) {
      $scope.vm.teacher = attrs.teacher || false;
      $scope.vm.title = attrs.title;
      $scope.vm.subtitle = attrs.subtitle;
    }

    function Controller(Editor, djangoAuth) {
      var vm = this;

      vm.problemInstance = new Editor.ProblemInstance();
      vm.problemInstance.id = vm.id;

      vm.UNASSIGNED = 0;
      vm.FILL_IN_THE_BLANK = 1;
      vm.TRUE_OF_FALSE = 2;
      vm.MULTIPLE_CHOICE = 3;
      vm.PROBLEM_SET = 4;
      vm.SHORT_ANSWER = 5;
      vm.MULTIPLE_ANSWER = 6;
      vm.WORD_PROBLEM = 7;

      vm.saveItem = function () {
        djangoAuth.request({
          method: 'PUT',
          url: 'v1/problem/problem-instance/' + vm.problemInstance.id + '/',
          data: vm.problemInstance
        }).then(function (data) {

        }, function (reason) {
          
        })
      };

      djangoAuth.request({
        method: 'GET',
        url: 'v1/problem/problem-instance/' + vm.problemInstance.id + '/',
        data: {}
      }).then(function (data) {
        vm.problemInstance.open(data);

      }, function (reason) {
        $log.log(reason);
      });
    }
  }
})();