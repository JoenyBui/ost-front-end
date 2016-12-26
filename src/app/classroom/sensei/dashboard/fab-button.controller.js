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


        vm.addTest = function ($event) {
            $rootScope.$broadcast('addTest', $event);
        };

    }
})();