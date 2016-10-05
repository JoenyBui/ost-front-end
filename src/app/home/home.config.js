/**
 * Created by joeny on 9/18/16.
 */
(function () {
    'use strict';

    angular
        .module('app.home')
        .config(moduleConfig);


    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/home');

        $stateProvider
            .state('home', {
                abstract: true,
                templateUrl: 'app/home/layouts/home.tmpl.html',
                controller: 'DefaultLayoutController',
                controllerAs: 'layoutController',
                data: {
                    requireLogin: false
                }
            })
            .state('home.overview', {
                url: '/home',
                views: {
                    toolbar: {
                        templateUrl: 'app/home/layouts/toolbar.tmpl.html',
                        controller: 'DefaultToolbarController',
                        controllerAs: 'vm'
                    },
                    content: {
                        templateUrl: 'app/home/overview/overview.tmpl.html',
                        controller: 'OverviewController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('triangular.admin-default.home', {
                url: '/dashboard',
                views: {
                    '': {
                        templateUrl: 'app/home/dashboard/home-dashboard.tmpl.html',
                        controller: 'HomeDashboardController',
                        controllerAs: 'vm'

                    }
                }
            });


        triMenuProvider.addMenu({
            name: 'MENU.HOME.DASHBOARD',
            state: 'triangular.admin-default.home',
            icon: 'zmdi zmdi-home',
            type: 'link',
            priority: 1.1

        });
    }

})();
