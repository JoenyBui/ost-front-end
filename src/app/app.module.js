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


            'app.editor',
            'app.authentication',
            // 'seed-module',
            // uncomment above to activate the example seed module
            'app.examples'
        ])
        // create a constant for languages so they can be added to both triangular & translate
        .constant('APP_LANGUAGES', [{
            name: 'LANGUAGES.CHINESE',
            key: 'zh'
        }, {
            name: 'LANGUAGES.ENGLISH',
            key: 'en'
        }, {
            name: 'LANGUAGES.FRENCH',
            key: 'fr'
        }, {
            name: 'LANGUAGES.PORTUGUESE',
            key: 'pt'
        }])
        .constant('API_CONFIG', {
            // set a constant for the API we are connecting to
            /*'url': 'http://127.0.0.1:8000/',*/
            'url': '//127.0.0.1:8000/',
            'accounts': 'rest-auth/'
        })
        .config(['$cookiesProvider', function($cookiesProvider) {
            $cookiesProvider.defaults.path = 'http://localhost:3000/';
            $cookiesProvider.defaults.domain = 'localhost';
        }])
        .run(function (djangoAuth, API_CONFIG) {
            djangoAuth.initialize(API_CONFIG.url, false)
                .then(function(data) {

                }, function(reason) {

                });
        });
})();