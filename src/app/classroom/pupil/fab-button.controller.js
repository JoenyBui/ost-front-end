/**
 * Created by joeny on 8/25/16.
 */
(function() {
    'use strict';

    angular
        .module('app.classroom')
        .controller('PupilFabController', PupilFabController);

    /* @ngInject */
    function PupilFabController($rootScope) {
        var vm = this;

        vm.submitTest = function ($event) {
            $rootScope.$broadcast('submitTest', $event);
        };
    }
})();