/**
 * Created by joeny on 6/15/16.
 */
(function () {
    'use strict';

    angular
        .module('app.classroom')
        .controller('SenseiProblemController', SenseiProblemController);

    /* @ngInject */
    function SenseiProblemController($scope, $log, $mdDialog, djangoAuth) {
        var vm = this;

        vm.problem = false;
        vm.answer = true;

        djangoAuth.request({
            method: 'GET',
            url: 'v1/math/maths/1',
            data: {}
        }).then(function (data) {
            $log.log(data);

            vm.problem = data;

        }, function (reason) {
            $log.log(reason);
        });
    }
})();