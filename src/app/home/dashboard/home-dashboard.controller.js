/**
 * Created by joeny on 9/25/16.
 */
(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeDashboardController', HomeDashboardController);

    /* @ngInject */
    function HomeDashboardController($scope, $mdDialog, djangoAuth) {
        var vm = this;

        vm.editor_items = [];
        vm.pupil_items = [];
        vm.sensei_items = [];

        /**
         * Problem Base
         *
         * */
        djangoAuth.request({
            method: 'GET',
            url: 'v1/problem/problem-base/',
            data: {}
        }).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];

                item.href = '#';

                if (item.domain == 1000) {
                    item.href = '#/editor/math/' + item.id;
                }

                vm.editor_items.push(item);
            }

        }, function (reason) {
            
        });

        /**
         * Sensei Exam Problems
         *
         * */
        djangoAuth.request({
            method: 'GET',
            url: 'v1/classroom/exam-problems/',
            data: {}
        }).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];

                item.href = '#/classroom/sensei/test/' + item.id;

                vm.sensei_items.push(item);
            }

        }, function (reason) {

        });

        /**
         * Pupil Assignments
         *
         * */
        djangoAuth.request({
            method: 'GET',
            url: 'v1/classroom/assignments/',
            data: {}
        }).then(function (data) {
            for (var i=0; i < data.length; i++) {
                var item = data[i];

                item.href = '#/classroom/pupil/test/' + item.id;

                vm.pupil_items.push(item);
            }
        }, function (reason) {

        });
    }

})();