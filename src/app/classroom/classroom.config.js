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
            .state('triangular.admin-default.sensei-dashboard', {
                url: '/classroom/sensei',
                views: {
                    '': {
                        templateUrl: 'app/classroom/sensei/sensei-dashboard.tmpl.html',

                        // set the controller to load for this page
                        controller: 'SenseiDashboardController',
                        controllerAs: 'vm'
                    },
                    'belowContent': {
                        templateUrl: 'app/editor/math/fab-button.tmpl.html',

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
            .state('triangular.admin-default.sensei-test', {
                url: '/classroom/sensei/test/:testId',
                views: {
                    '': {
                        templateUrl: 'app/classroom/sensei/sensei-test.tmpl.html',

                        controller: 'SenseiTestController',
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
            .state('triangular.admin-default.sensei-problem', {
                url: '/classroom/sensei/problem/:problemId',
                views: {
                    '': {
                        templateUrl: 'app/classroom/sensei/sensei-problem.tmpl.html',

                        controller: 'SenseiProblemController',
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
            .state('triangular.admin-default.pupil-dashboard', {
                url: '/classroom/pupil',
                views: {
                    '': {
                        templateUrl: 'app/classroom/pupil/pupil-dashboard.tmpl.html',

                        // set the controller to load for this page
                        controller: 'PupilDashboardController',
                        controllerAs: 'vm'
                    },
                    'belowContent': {
                        templateUrl: 'app/classroom/pupil/fab-button.tmpl.html',

                        controller: 'PupilFabController',
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
            .state('triangular.admin-default.pupil-test', {
                url: '/classroom/pupil/test/:testId',
                views: {
                    '': {
                        templateUrl: 'app/classroom/pupil/pupil-test.tmpl.html',

                        controller: 'PupilTestController',
                        controllerAs: 'vm'
                    },
                    'belowContent': {
                        templateUrl: 'app/classroom/pupil/fab-button.tmpl.html',

                        controller: 'PupilFabController',
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
                    state: 'triangular.admin-default.sensei-dashboard'
                }, {
                    name: 'MENU.CLASSROOM.SENSEI.TEST',
                    type: 'link',
                    state: 'triangular.admin-default.sensei-test'
                }, {
                    name: 'MENU.CLASSROOM.SENSEI.PROBLEM',
                    type: 'link',
                    state: 'triangular.admin-default.sensei-problem'
                }]
            }, {
                name: 'MENU.CLASSROOM.PUPIL.TITLE',
                state: 'triangular.admin-default.pupil',
                type: 'dropdown',
                children: [{
                    name: 'MENU.CLASSROOM.PUPIL.DASHBOARD',
                    type: 'link',
                    state: 'triangular.admin-default.pupil-dashboard'
                }, {
                    name: 'MENU.CLASSROOM.PUPIL.TEST',
                    type: 'link',
                    state: 'triangular.admin-default.pupil-test'
                }]
            }]
        });
    }
})();