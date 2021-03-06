/**
 * Created by joeny on 12/10/16.
 */
(function () {
    'use strict';

    angular
        .module('app.classroom')
        .controller('PupilSettingController', PupilSettingController);

    function PupilSettingController($log, djangoAuth) {
        var vm = this;

        vm.roles = {
            id: null,
            editor: null,
            sensei: null,
            pupil: null
        };


        vm.pupil = {
            pen_name: ""
        };

        djangoAuth.request({
            method: 'GET',
            url: '/core/role/',
            data: {}
        }).then(function (data) {
            vm.roles = data;

            djangoAuth.request({
                method: 'GET',
                url: 'v1/classroom/pupil/' + vm.roles.sensei + '/',
                data: {}
            }).then(function(data) {
                vm.pupil = data;
            }, function(reason) {
                $log.log(reason);
            });
        }, function (reason) {

        });

        vm.update_settings = function () {
            djangoAuth.request({
                method: 'PUT',
                url: 'v1/classroom/pupil/' + vm.roles.sensei + '/',
                data: {
                    user: vm.roles.id,
                    pen_name: vm.pupil.pen_name
                }
            }).then(function (data) {
                vm.pupil = data;
            }, function (reason) {

            });
        }

    }
})();

