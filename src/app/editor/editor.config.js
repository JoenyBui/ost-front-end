(function() {
    'use strict';

    angular
        .module('editor')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/editor');

        $stateProvider
        .state('triangular.admin-default.seed-page', {
            url: '/editor/editor-page',
            templateUrl: 'app/editor/editor.tmpl.html',
            // set the controller to load for this page
            controller: 'EditorPageController',
            controllerAs: 'vm',
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
                name: 'MENU.EDITOR.EDITOR-PAGE',
                state: 'triangular.admin-default.seed-page',
                type: 'link'
            }]
        });
    }
})();