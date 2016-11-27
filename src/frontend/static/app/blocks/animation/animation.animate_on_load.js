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
            template: '<div class="container front {{flipVm._parent.shape}}" ng-click="flipVm._parent.select($event, flipVm.back)">{{flipVm.front}}</div>',
            link: link
        };
    }

    flipManager.$inject = ['$animate'];
    function flipManager($animate) {
        function flipManagerDirCtrl() {
            var flipManagerVm = this;
            flipManagerVm.back = "";
            flipManagerVm.selected;
            flipManagerVm.select = select;

            function select(selected_flippy, back) {
                console.log(flipManagerVm.selected);
                flipManagerVm.selected = selected_flippy;
                flipManagerVm.selected = back;
                flipadelphia();

                function flipadelphia() {
                    var selectedFront = flipManagerVm.selected;
                    // selected back
                    // add no hide to selected element
                    // get position of selected element
                    // move back_element to position of selected element
                    // hide front elements
                    // flip
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
            template: '<div class="stack-elements-container inherit-dim"><div class="stack-element parent-dim flex row-flex flex-wrap flex-center-y flex-center-x"> <div id="back" class="container back {{flipManagerVm.shape}}">{{flipManagerVm.back}}</div></div><div class="flex row-flex parent-dim flex-wrap flex-center-y flex-center-x" ng-transclude></div></div>',
            bindToController: {
                shape: '@'
            }
        };
    }
})();
