(function() {
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
            // url: '/editor/fraction/{problemId:[0-9]}',
            views: {
                '': {
                    templateUrl: 'app/editor/math/editor-math.tmpl.html',

                    // set the controller to load for this page
                    controller: 'EditorMathPageController',
                    controllerAs: 'vm'
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
                name: 'MENU.EDITOR.MATH-PAGE',
                state: 'triangular.admin-default.math',
                type: 'link'
            }]
        });
    }
})();