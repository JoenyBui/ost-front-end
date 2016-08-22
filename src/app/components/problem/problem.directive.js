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
                item: '='
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

        function Controller() {
            var vm = this;

            vm.item.answer = null;

            vm.UNASSIGNED = 0;
            vm.FILL_IN_THE_BLANK = 1;
            vm.TRUE_OF_FALSE = 2;
            vm.MULTIPLE_CHOICE = 3;
            vm.PROBLEM_SET = 4;
            vm.SHORT_ANSWER = 5;
            vm.MULTIPLE_ANSWER = 6;
            vm.WORD_PROBLEM = 7;


        }
    }
})();