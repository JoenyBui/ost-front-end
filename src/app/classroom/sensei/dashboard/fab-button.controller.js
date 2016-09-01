/**
 * Created by joeny on 8/30/16.
 */
(function () {
    'use strict';

    angular
        .module('app.classroom')
        .controller('SenseiDashboardFabController', SenseiDashboardFabController);
    
    function SenseiDashboardFabController($rootScope) {
        var vm = this;

        vm.isOpen = false;
        vm.fabDirection = 'up';
        vm.fabAnimation = 'md-scale';


        vm.addMath = function ($event) {
            $rootScope.$broadcast('addMath', $event);
        };

        vm.addReading = function ($event) {
            $rootScope.$broadcast('addReading', $event);
        };

        vm.addWriting = function ($event) {
            $rootScope.$broadcast('addWriting', $event);
        };
    }
})();