/**
 * Created by joeny on 8/25/16.
 */
(function() {
    'use strict';

    angular
        .module('app.classroom')
        .controller('PupilTestFabController', PupilTestFabController);

    /* @ngInject */
    function PupilTestFabController($rootScope) {
        var vm = this;

        vm.submitTest = function ($event) {
            $rootScope.$broadcast('submitTest', $event);
        };
    }
})();