(function () {
    'use strict';

    angular
        .module('app')
        .run(routeChangeConfig);

    /* @ngInject */
    function routeChangeConfig($rootScope, $state, djangoAuth, GLOBAL_SETTINGS) {
        /*
        * There are only three points in the application where the login modal should appear:
        *
        * 1.) When I’m on a welcome page and I click “Login”.
        * 2.) When I am not logged in and I attempt to visit a page that requires login, e.g. my profile page.
        * 3.) When I attempt to make a request that requires a login, e.g. my session has expired whilst I’m attempting to post something.
        */

        $rootScope.$on("$stateChangeStart",
            function (event, toState, toParams, fromState, fromParams) {
                if (GLOBAL_SETTINGS.debug == false) {

                    // TODO: Fix the state change to progressively check authentication.

                    var requireLogin = toState.data.requireLogin;

                    // if (djangoAuth.authenticated == null) {
                    //
                    // }

                    // Check to see if app is authenticated.
                    if (requireLogin && !djangoAuth.authenticated) {
                        console.log('djangoAuth.authenticated not authenticated');

                        // Check if the user is authenticated.
                        $state.transitionTo("authentication.login");

                        event.preventDefault();
                    }

                    // Pass through
                }
            }
        );
    }
})();