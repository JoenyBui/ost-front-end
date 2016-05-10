(function () {
    'use strict';

    angular
        .module('app')
        .run(routeChangeConfig);

    /* @ngInject */
    function routeChangeConfig($rootScope, $state, djangoAuth) {
        // TODO: Fix the state change to progressively check authentication.
        // $rootScope.$on("$stateChangeStart",
        //     function (event, toState, toParams, fromState, fromParams) {
        //         if (djangoAuth.authenticated == null) {
        //
        //         }
        //
        //         if (!djangoAuth.authenticated) {
        //             console.log('djangoAuth.authenticated not authenticated');
        //
        //             // Check if the user is authenticated.
        //             $state.transitionTo("authentication.login");
        //
        //             event.preventDefault();
        //         }
        //     }
        // );
    }
})();