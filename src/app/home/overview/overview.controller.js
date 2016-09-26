/**
 * Created by joeny on 9/18/16.
 */
(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('OverviewController', OverviewController);

    /* @ngInject */
    function OverviewController($state, $mdToast, $location, triSettings) {
        var vm = this;

        vm.arrayData = [
            { src: 'assets/images/avatars/avatar-5.png' },
            { src: 'assets/images/avatars/avatar-5.png' },
            { src: 'assets/images/avatars/avatar-5.png' },
            { src: 'assets/images/avatars/avatar-5.png' }
        ];
    }
})();