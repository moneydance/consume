(function() {
    'use strict';

    angular
        .module('blocks.animation')
        .directive('animateOnLoad', animateOnLoad);

    animateOnLoad.$inject = ['$animateCss'];
    function animateOnLoad ($animateCss) {
        return {
            'link': function(scope, element) {
                $animateCss(
                    element,{'event': 'enter', structural: true}).start();
            }
        };
    }
})();
