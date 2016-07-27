(function() {

    angular
        .module('consume.dashboard.code')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper)
    {
        routerHelper.configureStates(getStates());
    }

    function getStates()
    {
        return{
            name: 'code',
            url: '/code',
            templateUrl: 'app/dashboard/code/code.html',
            controller: 'DashboardCodeController',
            controllerAs: 'cm',
            parent: 'dashboard',
            data: {
                css: 'app/dashboard/code/code.css'
            }

        };
    }
})();


