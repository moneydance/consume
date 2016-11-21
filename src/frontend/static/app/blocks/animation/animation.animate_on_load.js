(function() {
    'use strict';

    angular
        .module('blocks.animation')
        .directive('flipper', flipper)
        .directive('flipManager', flipManager);



    function flipper() {
        function flipperDirCtrl() {
            var flipVm = this;
        }

        function link(scope, element, attr, ctrls) {
            var flipDirCtrl = ctrls[0];
            var flipManagerDirCtrl = ctrls[1];
            flipDirCtrl._parent = flipManagerDirCtrl;
        }

        return {
            restrict: "E",
            replace: true,
            scope: {},
            require: ['flipper', '^flipManager'],
            controller: flipperDirCtrl,
            controllerAs: 'flipVm',
            bindToController: {
                front: '@',
                back: '@'
            },
            template: '<div class="container front {{flipVm._parent.shape}}" ng-click="flipVm._parent.select($event)">{{flipVm.front}}</div>',
            link: link
        };
    }

    flipManager.$inject = ['$animate'];
    function flipManager($animate) {
        function flipManagerDirCtrl() {
            var flipManagerVm = this;
            flipManagerVm.flippers = new Array();
            flipManagerVm.selected;
            flipManagerVm.add = add;
            flipManagerVm.select = select;

            function add(new_flippy) {
                flipManagerVm.flippers.push(new_flippy);
            }

            function select(selected_flippy) {
                console.log(flipManagerVm.selected);
                flipManagerVm.selected = selected_flippy;
                for (var i in flipManagerVm.flippers) {
                    var flipper = flipManagerVm.flippers[i];
                    if (i < flipManagerVm.flippers.length - 1) {
                        $animate.addClass(flipper, 'hidden');
                    } else {
                        $animate.addClass(flipper, 'hidden').then(flipadelphia);
                    }
                }

                function flipadelphia() {
                    var selectedFront = flipManagerVm.selected;
                    //var selectedBack = "back";
                    //$animate.removeClass(selectedBack, 'hidden');
                    selectedFront.css({
                        'transform': 'rotateY(180deg)',
                        '-moz-transform': 'rotateY(180deg)',
                        '-webkit-transform': 'rotateY(180deg)'
                    });
                    /*
                    selectedBack.css({
                        '-moz-transform': 'rotateY(360deg)',
                        '-webkit-transform': 'rotateY(360deg)',
                        'transform': 'rotateY(360deg)'
                    });
                    */
                }
            }
        }

        return {
            restrict: "E",
            transclude: true,
            replace: true,
            scope: {},
            controller: flipManagerDirCtrl,
            controllerAs: 'flipManagerVm',
            template: '<div class="stack-elements-container inherit-dim"><div class="parent-dim flex row-flex flex-wrap flex-center-y flex-center-x"> <div class="container back {{flipManagerVm.shape}}">{{flipManagerVm.back}}</div></div><div class="flex row-flex parent-dim flex-wrap flex-center-y flex-center-x" ng-transclude></div></div>',
            bindToController: {
                shape: '@'
            }
        };
    }
})();
