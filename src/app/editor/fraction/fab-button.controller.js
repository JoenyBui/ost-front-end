(function() {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorFractionFabController', EditorFractionFabController);

    function EditorFractionFabController($rootScope) {
        var vm = this;

        vm.fabDirection = 'up';
        vm.fabStatus = true;
        vm.fabAnimation = 'md-fling';


        vm.add_choice = function ($event) {
            this.fraction.keys.choices.push("1/2");
        };

        vm.add_file = function ($event) {
            console.log('Add File');
            $rootScope.$broadcast('addFile', $event);
        };

        vm.add_line_chart = function ($event) {
            console.log('Add Line Chart');
            $rootScope.$broadcast('addLineChart', $event);
        };

        vm.add_image = function ($event) {
            console.log('Add Image');
            $rootScope.$broadcast('addImage', $event);

        };

        vm.add_pie_chart = function ($event) {
            console.log('Add Pie Chart');
            $rootScope.$broadcast('addPieChart', $event);
        };

        vm.add_variable = function ($event) {
            $rootScope.$broadcast('addVariable', $event);
        };

    }
})();