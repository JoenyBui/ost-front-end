/**
 * Created by joeny on 6/15/16.
 */
(function () {
    'use strict';

    angular
        .module('app.classroom')
        .controller('SenseiTestController', SenseiTestController);

    /* @ngInject */
    function SenseiTestController($scope, $log, $mdDialog, djangoAuth) {
        var vm = this;

        vm.problems = [];

        //TODO: Add get request with search.
        djangoAuth.request({
            method: 'GET',
            url: 'v1/math/maths/',
            data: {}
        }).then(function (data) {

        }, function (reason) {

        });
    }
})();