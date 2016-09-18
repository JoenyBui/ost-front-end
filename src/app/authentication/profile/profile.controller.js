(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController($mdToast, djangoAuth) {
        var vm = this;
        vm.settingsGroups = [{
            name: 'ADMIN.NOTIFICATIONS.ACCOUNT_SETTINGS',
            settings: [{
                title: 'ADMIN.NOTIFICATIONS.SHOW_LOCATION',
                icon: 'zmdi zmdi-pin',
                enabled: true
            },{
                title: 'ADMIN.NOTIFICATIONS.SHOW_AVATAR',
                icon: 'zmdi zmdi-face',
                enabled: false
            },{
                title: 'ADMIN.NOTIFICATIONS.SEND_NOTIFICATIONS',
                icon: 'zmdi zmdi-notifications-active',
                enabled: true
            }]
        },{
            name: 'ADMIN.NOTIFICATIONS.CHAT_SETTINGS',
            settings: [{
                title: 'ADMIN.NOTIFICATIONS.SHOW_USERNAME',
                icon: 'zmdi zmdi-account',
                enabled: true
            },{
                title: 'ADMIN.NOTIFICATIONS.SHOW_PROFILE',
                icon: 'zmdi zmdi-account-box',
                enabled: false
            },{
                title: 'ADMIN.NOTIFICATIONS.ALLOW_BACKUPS',
                icon: 'zmdi zmdi-cloud-upload',
                enabled: true
            }]
        }];

        vm.user = djangoAuth.user;
        vm.password = {
            password: '',
            confirm: ''
        };

        vm.updateProfile = function () {
            djangoAuth.request({
                method: 'PUT',
                url: '/core/profile/',
                data: vm.user
            }).then(function (data) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Profile Updated!')
                        .position('bottom right')
                        .hideDelay(5000)
                );
            }, function (reason) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Profile Failed!')
                        .position('bottom right')
                        .hideDelay(5000)
                );
            })
        };

        vm.updateEditor = function () {
            /*
            * Update Editor
            * */
        };

        vm.updatePassword = function () {
            /*
            * Update password.
            * */
            djangoAuth.changePassword(
                vm.password.password,
                vm.password.confirm
            ).then(function (data) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Password Updated!')
                        .position('bottom right')
                        .hideDelay(5000)
                );
            }, function (reason) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Password Failed!')
                        .position('bottom right')
                        .hideDelay(5000)
                );

            })
        };

        vm.updateSettings = function () {
            
        };
        
    }
})();