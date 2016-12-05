(function() {
    'use strict';

    angular
        .module('consume.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$timeout', '$rootElement', 'logger'];
    function DashboardController(logger) {
        var dashboardVm = this;
        dashboardVm.dashboard_links = [
            {'title': 'home'},
            {'title': 'about'},
            {'title': 'code'},
            {'title': 'projects'},
    //      {'title': 'Blog'},
            {'title': 'contact'}];
    }
})();
