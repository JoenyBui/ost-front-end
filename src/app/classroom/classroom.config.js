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
                        templateUrl: 'app/classroom/sensei/dashboard/sensei-dashboard.tmpl.html',

                        // set the controller to load for this page
                        controller: 'SenseiDashboardController',
                        controllerAs: 'vm'
                    },
                    'belowContent': {
                        templateUrl: 'app/classroom/sensei/dashboard/fab-button.tmpl.html',

                        controller: 'SenseiDashboardFabController',
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
                        templateUrl: 'app/classroom/sensei/test/sensei-test.tmpl.html',

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
                        templateUrl: 'app/classroom/sensei/problem/sensei-problem.tmpl.html',

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
                        templateUrl: 'app/classroom/pupil/dashboard/pupil-dashboard.tmpl.html',

                        // set the controller to load for this page
                        controller: 'PupilDashboardController',
                        controllerAs: 'vm'
                    },
                    'belowContent': {
                        templateUrl: 'app/classroom/pupil/dashboard/fab-button.tmpl.html',

                        controller: 'PupilDashboardFabController',
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
                        templateUrl: 'app/classroom/pupil/test/pupil-test.tmpl.html',

                        controller: 'PupilTestController',
                        controllerAs: 'vm'
                    },
                    'belowContent': {
                        templateUrl: 'app/classroom/pupil/test/fab-button.tmpl.html',

                        controller: 'PupilTestFabController',
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