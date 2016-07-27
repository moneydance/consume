(function() {
    'use strict';

    angular
        .module('consume.dashboard.code')
        .controller('DashboardCodeController', DashboardCodeController);

    DashboardCodeController.$inject = ['logger'];
    function DashboardCodeController(logger) {
        var cm = this;
    }
})();

