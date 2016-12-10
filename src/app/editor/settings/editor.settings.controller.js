(function() {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorSettingController', EditorSettingController);

    /* @ngInject */
    function EditorSettingController($log, djangoAuth) {
        var vm = this;
        
        vm.roles = {
            id: null,
            editor: null,
            sensei: null,
            pupil: null
        };


        vm.editor = {
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
                url: 'v1/editor/editors/' + vm.roles.editor + '/',
                data: {}
            }).then(function(data) {
                vm.editor = data;
            }, function(reason) {
                $log.log(reason);
            });
        }, function (reason) {

        });

        vm.update_settings = function () {
            djangoAuth.request({
                method: 'PUT',
                url: 'v1/editor/editors/' + vm.roles.editor + '/',
                data: {
                    user: vm.roles.id,
                    pen_name: vm.editor.pen_name
                }
            }).then(function (data) {
                vm.editor = data;
            }, function (reason) {

            });
        }
    }
})();
