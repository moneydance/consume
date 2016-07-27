(function() {
    'use strict';

    angular.module('consume.core', [
        // angular modules
        // block modules
        'blocks.exception', 'blocks.logger', 'blocks.router', 'blocks.animation', 'blocks.physics',
        // 3rd party modules
        'uiRouterStyles'
    ]);
})();
