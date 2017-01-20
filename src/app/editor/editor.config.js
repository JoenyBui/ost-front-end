(function () {
  'use strict';

  angular
    .module('app.editor')
    .config(moduleConfig);

  /* @ngInject */
  function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
    $translatePartialLoaderProvider.addPart('app/editor');

    $stateProvider
      .state('triangular.admin-default.math', {
        url: '/editor/math/:problemId',
        views: {
          '': {
            templateUrl: 'app/editor/math/editor-math.tmpl.html',

            // set the controller to load for this page
            controller: 'EditorMathPageController',
            controllerAs: 'vm',
            resolve: {
              'loadItem': function ($stateParams, Editor, djangoAuth) {
                var problemId = $stateParams.problemId;

                return djangoAuth.request({
                  method: 'GET',
                  url: 'v1/math/maths/' + problemId + '/',
                  data: {}
                }).then(function (data) {
                  // Initialize new Math Problem.
                  var problem = new Editor.Math();

                  // Load problem with the data.
                  problem.open(data);

                  return problem;
                }, function (reason) {
                  $log.log(reason);
                });
              }
            }
          },
          'belowContent': {
            templateUrl: 'app/editor/math/fab-button.tmpl.html',

            controller: 'EditorMathFabController',
            controllerAs: 'vm'
          }
        },
        data: {
          layout: {
            contentClass: 'full-image-background mb-bg-fb-08 background-overlay-static',
            innerContentClass: 'overlay-gradient-20'
          }
        }
      })
      .state('triangular.admin-default.editor-dashboard', {
        url: '/editor/dashboard',
        views: {
          '': {
            templateUrl: 'app/editor/dashboard/editor-dashboard.tmpl.html',
            controller: 'EditorDashboardController',
            controllerAs: 'vm'

          },
          'belowContent': {
            templateUrl: 'app/editor/dashboard/fab-button.tmpl.html',
            controller: 'EditorDashboardFabController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          'authenticationStatus': function (djangoAuth) {
            return djangoAuth.authenticationStatus()
          }
        }
      })
      .state('triangular.admin-default.editor-settings', {
        url: '/editor/settings',
        views: {
          '': {
            templateUrl: 'app/editor/settings/editor.settings.tmpl.html',
            controller: 'EditorSettingController',
            controllerAs: 'vm'

          }
        },
        resolve: {
          'authenticationStatus': function (djangoAuth) {
            return djangoAuth.authenticationStatus()
          }
        }
      });

    triMenuProvider.addMenu({
      name: 'MENU.EDITOR.EDITOR-MODULE',
      icon: 'zmdi zmdi-face',
      type: 'dropdown',
      priority: 1.1,
      children: [{
        name: 'MENU.EDITOR.EDITOR-DASHBOARD',
        state: 'triangular.admin-default.editor-dashboard',
        type: 'link'
      }, {
        name: 'MENU.EDITOR.SETTINGS',
        state: 'triangular.admin-default.editor-settings',
        type: 'link'
      }]
    });
  }
})();