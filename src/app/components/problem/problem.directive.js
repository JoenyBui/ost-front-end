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
      $scope.vm.title = attrs.title;
      $scope.vm.subtitle = attrs.subtitle;
    }

    function Controller(Editor, djangoAuth) {
      var vm = this;

      vm.item = null;
      vm.problem = null;
      vm.instance = null;

      vm.UNASSIGNED = 0;
      vm.FILL_IN_THE_BLANK = 1;
      vm.TRUE_OF_FALSE = 2;
      vm.MULTIPLE_CHOICE = 3;
      vm.PROBLEM_SET = 4;
      vm.SHORT_ANSWER = 5;
      vm.MULTIPLE_ANSWER = 6;
      vm.WORD_PROBLEM = 7;


      djangoAuth.request({
        method: 'GET',
        url: 'v1/problem/problem-instance/' + vm.id + '/',
        data: {}
      }).then(function (data) {
        vm.instance = data;
        vm.problem = vm.instance.info;
        vm.item = vm.problem.base[0];

      }, function (reason) {
        console.log(reason);
      });
    }
  }
})();