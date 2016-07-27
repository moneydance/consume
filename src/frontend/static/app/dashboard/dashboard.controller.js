(function() {
    'use strict';

    angular
        .module('consume.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['logger'];
    function DashboardController(logger) {
        var vm = this;
        vm.dashboard_links = [
            {'title': 'home'},
            {'title': 'about'},
            {'title': 'code'},
            {'title': 'projects'},
    //      {'title': 'Blog'},
            {'title': 'contact'}];
    }
})();