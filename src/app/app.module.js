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
			'ui.tinymce',
			'firebase',

			'app.components',
			'app.home',
			'app.editor',
			'app.classroom',
			'app.authentication'

			// 'seed-module',
			// uncomment above to activate the example seed module
			// 'app.examples'
		])
		.config(function ($cookiesProvider, ENV_VARS) {
			$cookiesProvider.defaults.path = ENV_VARS.URL_PATH;
			$cookiesProvider.defaults.domain = ENV_VARS.URL_DOMAIN;
		})
		.config(function (RestangularProvider, API_CONFIG) {
			RestangularProvider.setBaseUrl(API_CONFIG.url);
		})
		.config(function () {
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyA9ZLPjeYrB_qZzpBmUjEmNILajZxG9TD0",
        authDomain: "ost-front-end.firebaseapp.com",
        databaseURL: "https://ost-front-end.firebaseio.com",
        storageBucket: "ost-front-end.appspot.com",
        messagingSenderId: "120293626118"
      };
      firebase.initializeApp(config);
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