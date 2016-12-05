(function() {
    'use strict';

    angular
        .module('consume.dashboard.projects')
        .controller('DashboardProjectsController', DashboardProjectsController);

    DashboardProjectsController.$inject = ['logger'];
    function DashboardProjectsController(logger) {
        var projectsVm = this;
    }
})();


