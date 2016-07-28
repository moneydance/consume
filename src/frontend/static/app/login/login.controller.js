(function() {
    'use strict';

    angular
        .module('consume.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['logger'];
    function LoginController(logger) {
        var loginVm = this;
        logger.success("shit works");
    }
})();

