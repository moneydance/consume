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
            templateUrl: '/app/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm',
            data: {
                css: 'app/dashboard/dashboard.css'
            }
        };
    }
})();

