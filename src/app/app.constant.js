/**
 * Created by joeny on 9/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .constant('API_CONFIG', {
            // set a constant for the API we are connecting to
            /*'url': 'http://127.0.0.1:8000/',*/
            'url': '//127.0.0.1:8000/',
            // 'url': 'https://api.mywaterbuffalo.com/',
            'accounts': 'rest-auth/'
        })
        .constant('GLOBAL_SETTINGS', {
            'debug': false
        })
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
        }]);
})();