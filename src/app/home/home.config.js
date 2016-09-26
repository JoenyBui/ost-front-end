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
            });
    }

})();
