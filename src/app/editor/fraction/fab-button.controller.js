(function() {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorFractionFabController', EditorFractionFabController);

    function EditorFractionFabController($rootScope) {
        var vm = this;
        vm.addTodo = addTodo;
        vm.fabDirection = 'up';
        vm.fabStatus = true;
        vm.fabAnimation = 'md-fling';


        vm.add_choice = function () {
            this.fraction.keys.choices.push("1/2");
        };

        vm.add_line_chart = function () {
            console.log('Add Line Chart');
        };

        vm.add_pie_chart = function () {
            console.log('Add Pie Chart');
        };

        ////////////////

        function addTodo($event) {
            $rootScope.$broadcast('addTodo', $event);
        }
    }
})();