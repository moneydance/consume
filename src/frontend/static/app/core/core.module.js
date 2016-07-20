(function() {
    'use strict';

    angular.module('consume.core', [
        // angular modules
        //'ngAnimate', 'ngSanitize',
        // block modules
        'blocks.exception', 'blocks.logger', 'blocks.router',
        // 3rd party modules
        'uiRouterStyles'
    ]);
})();
