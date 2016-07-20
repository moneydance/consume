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
            templateUrl: 'javascript/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        };
    }
})();


