(function() {

    angular
        .module('consume.login')
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
            name: 'login',
            url: '/login',
            templateUrl: '/templates/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        };
    }
})();


