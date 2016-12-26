/**
 * Created by joeny on 9/11/16.
 */
(function () {
		'use strict';

		angular
				.module('app')
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