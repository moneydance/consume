(function() {
    'use strict';

    angular
        .module('consume.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['logger'];
    function LoginController(logger) {
        var vm = this;
        logger.success("shit works");
    }
})();

