/**
 * Created by joeny on 12/4/16.
 */
(function () {
    'use strict';

    angular
        .module('app.classroom')
        .controller('SenseiTestSearchDialogController', SenseiTestSearchDialogController);

    /* ngInject */
    function SenseiTestSearchDialogController($scope, $mdDialog, $stateParams, djangoAuth) {
        var vm = this;

        vm.topics = [];

        djangoAuth.request({
            method: 'GET',
            url: 'v1/topic/topics/',
            data: {}
        }).then(function (data) {
            for (var key in data) {
                vm.topics.push({
                    key: data[key].key,
                    name: data[key].name
                })
            }
        }, function (reason) {

        });

        vm.close = function () {
            $mdDialog.hide()
        };
    }
})();