(function() {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorMathFabController', EditorMathFabController);

    function EditorMathFabController($rootScope) {
        
        var vm = this;

        vm.fabDirection = 'up';
        vm.fabStatus = true;
        vm.fabAnimation = 'md-scale';

        vm.save = function ($event) {
            $rootScope.$broadcast('save', $event);
        };

        vm.addChoice = function ($event) {
            $rootScope.$broadcast('addChoice', $event);
        };

        vm.addFile = function ($event) {
            $rootScope.$broadcast('addFile', $event);
        };

        vm.addLineChart = function ($event) {
            $rootScope.$broadcast('addLineChart', $event);
        };

        vm.addImage = function ($event) {
            $rootScope.$broadcast('addImage', $event);

        };

        vm.addPieChart = function ($event) {
            $rootScope.$broadcast('addPieChart', $event);
        };

        vm.addVariable = function ($event) {
            $rootScope.$broadcast('addVariable', $event);
        };

        vm.submitJob = function ($event) {
            $rootScope.$broadcast('submitJob', $event);
        }

    }
})();