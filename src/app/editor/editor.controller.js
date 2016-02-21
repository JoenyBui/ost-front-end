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
            lineWrapping: true,
            lineNumbers: true,
            //readOnly: 'nocursor',
            //mode: {
            //    name: 'javascript',
            //    json: true
            //},
            theme:'twilight',
            mode: "javascript",
            indentUnit: 4
            //'text-align': 'left'
        }
    }
})();