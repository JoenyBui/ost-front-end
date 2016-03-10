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
        });

        triMenuProvider.addMenu({
            name: 'MENU.EDITOR.EDITOR-MODULE',
            icon: 'zmdi zmdi-grade',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'MENU.EDITOR.FRACTION-PAGE',
                state: 'triangular.admin-default.fraction',
                type: 'link'
            }]
        });
    }
})();