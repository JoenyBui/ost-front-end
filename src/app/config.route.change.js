(function () {
    'use strict';

    angular
        .module('app')
        .run(routeChangeConfig);

    /* @ngInject */
    function routeChangeConfig($rootScope, $state, djangoAuth) {
        $rootScope.$on("$stateChangeStart",
            function (event, toState, toParams, fromState, fromParams) {
                if (djangoAuth.authenticated == null) {

                }

                if (!djangoAuth.authenticated) {
                    // Check if the user is authenticated.
                    $state.transitionTo("authentication.login");

                    event.preventDefault();
                }
            }
        );
    }
})();