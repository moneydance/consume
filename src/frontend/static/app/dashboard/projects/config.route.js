(function() {

    angular
        .module('consume.dashboard.projects')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper)
    {
        routerHelper.configureStates(getStates());
    }

    function getStates()
    {
        return{
            name: 'projects',
            url: '/projects',
            templateUrl: 'app/dashboard/projects/projects.html',
            controller: 'DashboardProjectsController',
            controllerAs: 'projectsVm',
            parent: 'dashboard',
            data: {
                css: 'app/dashboard/projects/projects.css'
            }

        };
    }
})();



