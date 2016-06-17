/**
 * Created by joeny on 6/15/16.
 */
(function () {
    'use strict';

    angular
        .module('app.classroom')
        .controller('SenseiProblemController', SenseiProblemController);

    /* @ngInject */
    function SenseiProblemController($scope, $log, $mdDialog, $stateParams, djangoAuth) {
        var vm = this;

        vm.problem = false;
        vm.answer = true;

        if ($stateParams.hasOwnProperty('problemId')) {
            // TODO: Need to see if problemId is a valid number and use better concatenation.
            djangoAuth.request({
                method: 'GET',
                url: 'v1/math/maths/' + $stateParams.problemId,
                data: {}
            }).then(function (data) {
                $log.log(data);

                vm.problem = data;

            }, function (reason) {
                $log.log(reason);
            });
        } else {
            $log.log("Param not specified");
        }
    }
})();