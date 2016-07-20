(function() {

    angular
        .module('consume.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper)
    {
        routerHelper.configureStates(getStates());
    }

    //getStates.$inject = [];
    function getStates()
    {
        return{
            name: 'dashboard',
            url: '/dashboard',
            templateUrl: '/templates/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm'
        };
    }
})();

