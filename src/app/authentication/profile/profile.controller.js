(function () {
  'use strict';

  angular
    .module('app.authentication')
    .controller('ProfileController', ProfileController);

  /* @ngInject */
  function ProfileController($mdToast, $state, djangoAuth) {
    var vm = this;

    vm.settingsGroups = [{
      name: 'ADMIN.NOTIFICATIONS.ACCOUNT_SETTINGS',
      settings: [{
        title: 'ADMIN.NOTIFICATIONS.SHOW_LOCATION',
        icon: 'zmdi zmdi-pin',
        enabled: true
      }, {
        title: 'ADMIN.NOTIFICATIONS.SHOW_AVATAR',
        icon: 'zmdi zmdi-face',
        enabled: false
      }, {
        title: 'ADMIN.NOTIFICATIONS.SEND_NOTIFICATIONS',
        icon: 'zmdi zmdi-notifications-active',
        enabled: true
      }]
    }, {
      name: 'ADMIN.NOTIFICATIONS.CHAT_SETTINGS',
      settings: [{
        title: 'ADMIN.NOTIFICATIONS.SHOW_USERNAME',
        icon: 'zmdi zmdi-account',
        enabled: true
      }, {
        title: 'ADMIN.NOTIFICATIONS.SHOW_PROFILE',
        icon: 'zmdi zmdi-account-box',
        enabled: false
      }, {
        title: 'ADMIN.NOTIFICATIONS.ALLOW_BACKUPS',
        icon: 'zmdi zmdi-cloud-upload',
        enabled: true
      }]
    }];

    vm.user = djangoAuth.user;

    vm.roles = {
      id: null,
      editor: null,
      sensei: null,
      pupil: null
    };

    vm.password = {
      password: '',
      confirm: ''
    };

    vm.roleGroup = {
      editor: {
        title: 'Register as Editor'
      },
      sensei: {
        title: 'Register as Sensei'
      },
      pupil: {
        title: 'Register as Pupil'
      }
    };

    djangoAuth.request({
      method: 'GET',
      url: '/core/role/',
      data: {}
    }).then(function (data) {
      vm.roles = data;

      if (vm.roles.editor != null) {
        vm.roleGroup.editor.title = 'Go to Editor Setting'
      }

      if (vm.roles.sensei != null) {
        vm.roleGroup.sensei.title = 'Go to Sensei Setting'
      }

      if (vm.roles.pupil != null) {
        vm.roleGroup.pupil.title = 'Go to Pupil Setting'
      }

    }, function (reason) {

    });

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

    /*
     * Open Editor
     *
     * */
    vm.openEditor = function () {

      if (this.roles.editor != null) {
        $state.go('triangular.admin-default.editor-settings');
      } else {
        djangoAuth.request({
          method: 'POST',
          url: 'v1/editor/editors/',
          data: {
            pen_name: this.user.username,
            user: this.roles.id
          }
        }).then(function (data) {
          $state.go('triangular.admin-default.editor-settings');

        }, function (reason) {
          $mdToast.show(
            $mdToast.simple()
              .content('Fail to create editor profile!')
              .position('bottom right')
              .hideDelay(5000)
          );

        })
      }
    };

    /*
     * Open Sensei
     *
     * */
    vm.openSensei = function () {

      if (this.roles.sensei != null) {
        $state.go('triangular.admin-default.sensei-settings');
      } else {
        djangoAuth.request({
          method: 'POST',
          url: 'v1/classroom/sensei/',
          data: {
            pen_name: this.user.username,
            user: this.roles.id
          }
        }).then(function (data) {
          $state.go('triangular.admin-default.sensei-settings');
        }, function (reason) {
          $mdToast.show(
            $mdToast.simple()
              .content('Fail to create sensei profile!')
              .position('bottom right')
              .hideDelay(5000)
          );

        })
      }
    };

    /**
     * Open Pupil
     *
     * */
    vm.openPupil = function () {
      if (this.roles.pupil != null) {
        $state.go('triangular.admin-default.pupil-settings');
      } else {
        djangoAuth.request({
          method: 'POST',
          url: 'v1/classroom/pupil/',
          data: {
            pen_name: this.user.username,
            user: this.roles.id
          }
        }).then(function (data) {
          $state.go('triangular.admin-default.pupil-settings');
        }, function (reason) {
          $mdToast.show(
            $mdToast.simple()
              .content('Fail to create pupil profile!')
              .position('bottom right')
              .hideDelay(5000)
          );

        })
      }
    };

    /**
     * Update Password
     * */
    vm.updatePassword = function () {

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