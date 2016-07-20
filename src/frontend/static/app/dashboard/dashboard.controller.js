(function() {
    'use strict';

    angular
        .module('consume.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['logger'];
    function DashboardController(logger) {
        var vm = this;
        logger.success("shit works");
    }
})();
