(function() {

    angular
        .module('consume.dashboard.home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper)
    {
        routerHelper.configureStates(getStates());
    }

    function getStates()
    {
        return{
            name: 'home',
            url: '/home',
            templateUrl: 'javascript/dashboard/home/home.html',
            controller: 'DashboardHomeController',
            controllerAs: 'cm',
            parent: 'dashboard'
        };
    }
})();

