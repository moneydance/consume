(function() {
    'use strict';

    angular
        .module('consume.dashboard.code')
        .controller('DashboardCodeController', DashboardCodeController);

    DashboardCodeController.$inject = ['logger'];
    function DashboardCodeController(logger) {
        var codeVm = this;
        codeVm.code_data = [
            {'title': 'Python'},
            {'title': 'Java'},
            {'title': 'C++'},
            {'title': 'JavaScript'},
            {'title': 'Docker'}
            ];
    }
})();

