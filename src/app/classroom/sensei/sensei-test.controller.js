/**
 * Created by joeny on 6/15/16.
 */
(function () {
    'use strict';

    angular
        .module('app.classroom')
        .controller('SenseiTestController', SenseiTestController);

    /* @ngInject */
    function SenseiTestController($scope, $log, $mdDialog, $stateParams, djangoAuth) {
        var vm = this;

        vm.test = {
            id: -1,
            name: "",
            teacher: "",
            problems: []
        };

        vm.problemInfo = [];

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
                        }
                    }

                }, function (reason) {

                });
            }
        }
    }
})();