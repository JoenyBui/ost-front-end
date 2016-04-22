/**
 * Created by joeny on 4/9/16.
 */
(function () {
    'use strict';

    angular
        .module('app.classroom')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/classroom');

        $stateProvider
            .state('triangular.admin-default.sensei', {
                url: '/classroom/sensei',
                views: {
                    '': {
                        templateUrl: 'app/classroom/sensei/sensei.tmpl.html',

                        // set the controller to load for this page
                        controller: 'ClassroomSenseiController',
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
            name: 'MENU.CLASSROOM.TITLE',
            icon: 'zmdi zmdi-grade',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'MENU.CLASSROOM.SENSEI.TITLE',
                state: 'triangular.admin-default.sensei',
                type: 'dropdown',
                children: [{
                    name: 'MENU.CLASSROOM.SENSEI.DASHBOARD',
                    type: 'link',
                    state: 'triangular.admin-default.sensei'
                }]
            }]
        });
    }
})();