(function() {
    'use strict';

    angular
        .module('app', [
            'triangular',
            'ngAnimate',
            'ngCookies',
            'ngSanitize',
            'ngMessages',
            'ngMaterial',
            'ui.router',
            'pascalprecht.translate',
            'LocalStorageModule',
            'googlechart',
            'chart.js',
            'linkify',
            'ui.calendar',
            'angularMoment',
            'textAngular',
            'uiGmapgoogle-maps',
            'hljs',
            'md.data.table',
            angularDragula(angular),
            'ngFileUpload',
            'ui.codemirror',
            'restangular',
            'material.components.expansionPanels',

            'app.components',
            'app.home',
            'app.editor',
            'app.classroom',
            'app.authentication'

            // 'seed-module',
            // uncomment above to activate the example seed module
            // 'app.examples'
        ])
        .config(['$cookiesProvider', function($cookiesProvider) {
            $cookiesProvider.defaults.path = 'http://localhost:3000/';
            $cookiesProvider.defaults.domain = 'localhost';
        }])
        .config(function (RestangularProvider) {
            RestangularProvider.setBaseUrl('http://127.0.0.1:8000/');
        })
        .run(function (djangoAuth, Restangular, API_CONFIG) {
            return djangoAuth.initialize(API_CONFIG.url, false)
                .then(function(data) {
                    console.log('djangoAuth.initialize: success');
                }, function(reason) {
                    console.log('djangoAuth.initialize: failed');
                });

            // var baseAccounts = Restangular.all('rest-auth/user');

            // baseAccounts.getList().then(function (accounts) {
            //     var allAccounts = accounts;
            //
            // }, function(reason) {
            //     console.log(reason);
            // });

            // Restangular.all('v1/problem/problem-base/').getList().then(function (problem) {
            //     var problem = problem;
            // }, function (reason) {
            //     console.log(reason);
            //
            // })

        });
})();