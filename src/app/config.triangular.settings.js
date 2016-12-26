(function() {
		'use strict';

		angular
				.module('app')
				.config(translateConfig);

		/* @ngInject */
		function translateConfig(triSettingsProvider, triRouteProvider, APP_LANGUAGES, ENV_VARS) {
				var now = new Date();
				// set app name & logo (used in loader, sidemenu, footer, login pages, etc)
				triSettingsProvider.setName('Agora');
				triSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' agora.com');
				triSettingsProvider.setLogo('assets/images/logo.png');

				// set current version of app (shown in footer)
				triSettingsProvider.setVersion(ENV_VARS.VERSION);

				// set the document title that appears on the browser tab
				triRouteProvider.setTitle('Agora');
				triRouteProvider.setSeparator('|');

				// setup available languages in triangular
				for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
						triSettingsProvider.addLanguage({
								name: APP_LANGUAGES[lang].name,
								key: APP_LANGUAGES[lang].key
						});
				}
		}
})();