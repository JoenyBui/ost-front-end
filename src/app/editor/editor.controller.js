(function() {
    'use strict';

    angular
        .module('editor')
        .controller('EditorPageController', EditorPageController);

    /* @ngInject */
    function EditorPageController() {
        var vm = this;

        vm.testData = ['triangular', 'is', 'great'];

        vm.editorOptions = {
            lineWrapping: false,
            lineNumbers: true,
            //readOnly: 'nocursor',
            //mode: {
            //    name: 'javascript',
            //    json: true
            //},
            theme: 'twilight',
            mode: "javascript",
            indentUnit: 4
            //'text-align': 'left'
        };

        vm.name = 'Test Problem';
        vm.qtype = 0;
        vm.qtype_options = ['True or False', 'Multiple Choice', 'Fill-in-the-Blank'];
        vm.stem = {
            statement: "Tell if the fraction on the left is less or greater than the fraction on the right."
        };

        vm.keys = {
            answer: 0,
            choices: [
                "2/3",
                "3/5"
            ]
        };

        vm.validation = '';
        vm.explanation = '';
        vm.editors = ["joeny"];
    }
})();