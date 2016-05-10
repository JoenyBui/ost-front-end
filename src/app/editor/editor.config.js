(function() {
    'use strict';

    angular
        .module('app.editor')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/editor');

        $stateProvider
        .state('triangular.admin-default.fraction', {
            url: '/editor/fraction',
            views: {
                '': {
                    templateUrl: 'app/editor/fraction/editor-fraction.tmpl.html',

                    // set the controller to load for this page
                    controller: 'EditorFractionPageController',
                    controllerAs: 'vm'
                },
                'belowContent': {
                    templateUrl: 'app/editor/fraction/fab-button.tmpl.html',

                    controller: 'EditorFractionFabController',
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
            templateUrl: 'app/editor/dashboard/editor-dashboard.tmpl.html',
            controller: 'EditorDashboardController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            name: 'MENU.EDITOR.EDITOR-MODULE',
            icon: 'zmdi zmdi-grade',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'MENU.EDITOR.EDITOR-DASHBOARD',
                state: 'triangular.admin-default.editor-dashboard',
                type: 'link'
            }, {
                name: 'MENU.EDITOR.FRACTION-PAGE',
                state: 'triangular.admin-default.fraction',
                type: 'link'
            }]
        });
    }
})();