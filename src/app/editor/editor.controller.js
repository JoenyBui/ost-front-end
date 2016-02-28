(function() {
    'use strict';

    angular
        .module('editor')
        .controller('EditorPageController', EditorPageController);

    /* @ngInject */
    function EditorPageController() {
        var vm = this;

        vm.fraction = {
            name: 'Test Problem',
            domain: 1004,
            qtype: 0,
            stem: {
                statement: "Tell if the fraction on the left is less or greater than the fraction on the right."
            },
            keys: {
                answer: 0,
                choices: [
                    "2/3",
                    "3/5"
                ]
            },
            validation:{

            },
            explanation:{

            },
            editors:[]
        };
        //
        //vm.name = 'Test Problem';
        //vm.qtype = 0;
        vm.qtype_options = ['True or False', 'Multiple Choice', 'Fill-in-the-Blank'];
        //vm.stem = {
        //    statement: "Tell if the fraction on the left is less or greater than the fraction on the right."
        //};
        //
        //vm.keys = {
        //    answer: 0,
        //    choices: [
        //        "2/3",
        //        "3/5"
        //    ]
        //};
        //
        //vm.validation = '';
        //vm.explanation = '';
        //vm.editors = ["joeny"];
    }
})();