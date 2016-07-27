(function() {
    'use strict';

    angular
        .module('consume.dashboard.home')
        .controller('DashboardHomeController', DashboardHomeController);

    DashboardHomeController.$inject = ['logger'];
    function DashboardHomeController(logger) {
        var cm = this;
    }
})();

