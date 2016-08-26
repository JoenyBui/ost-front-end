/**
 * Created by joeny on 6/15/16.
 */
(function () {
    'use strict';

    angular
        .module('app.classroom')
        .controller('PupilTestController', PupilTestController);

    /* @ngInject */
    function PupilTestController($scope, $log, $mdDialog, $stateParams, djangoAuth) {
        var vm = this;

        var shuffle = function (a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }

            return a;
        };

        vm.test = {
            id: -1,
            name: "",
            teacher: "",
            problems: []
        };

        vm.problemInfo = null;
        vm.randomKeys = null;

        if ($stateParams.hasOwnProperty('testId')) {
            var testId = $stateParams.testId;

            if (!(testId === "")) {
                djangoAuth.request({
                    method: 'GET',
                    url: 'v1/classroom/exam-problems/' + testId + '/',
                    data: {}
                }).then(function (data) {
                    if ('id' in data) {
                        vm.test.id = data['id'];
                    }

                    if ('name' in data) {
                        vm.test.name = data['name'];
                    }

                    if ('teacher' in data) {
                        vm.test.teacher = data['teacher'];
                    }

                    if ('problems' in data) {
                        vm.test.problems = data['problems'];
                    }

                    if ('info' in data) {
                        if ('problems' in data['info']) {
                            vm.problemInfo = data['info']['problems'];

                            var keys = Object.keys(vm.problemInfo);

                            vm.randomKeys = shuffle(keys);
                        }
                    }

                }, function (reason) {

                });
            }
        }


        // watches

        $scope.$on('submitTest', function( ev ){
            $mdDialog.show({
                templateUrl: 'app/classroom/pupil/submit-test-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'SubmitTestDialogController',
                controllerAs: 'vm'
            })
            .then(function(answer) {
                //TODO: Return answer and grade
                vm.todos.push(answer);
            });
        });
    }
})();