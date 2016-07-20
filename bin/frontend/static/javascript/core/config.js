(function() {
    'use strict';

    var core = angular.module('consume.core');
    ///////////////////////////////////////////////////////////////////////
    core.config(toastrConfig);
    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr)
    {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-top-right';
    }
    ///////////////////////////////////////////////////////////////////////
    core.value('config', config);
    var config =
    {
        appErrorPrefix: '[Error] ',
        appTitle: 'Consume',
        version: '1.0.0'
    };
    ///////////////////////////////////////////////////////////////////////
    core.config(exceptionConfig);
    exceptionConfig.$inject = ['$logProvider', 'exceptionHandlerProvider'];
    function exceptionConfig($logProvider, exceptionHandlerProvider)
    {
        if ($logProvider.debugEnabled)
        {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }
})();
