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
            flipManagerVm.backElement = angular.element('#back');
            flipManagerVm.back = "";
            flipManagerVm.selected;
            flipManagerVm.select = select;

            function select($event, back) {
                flipManagerVm.selected = angular.element($event.currentTarget);
                flipManagerVm.back = back;
                flipadelphia();

                function flipadelphia() {
                    console.log(flipManagerVm.backElement);
                    console.log(flipManagerVm.selected);
                    var pos = flipManagerVm.selected.position();
                    console.log(pos);
                    // move back_element to position of selected element
                    flipManagerVm.backElement.css({
                        position: "absolute",
                        top: pos.top + "px",
                        left: pos.left + "px"
                    });
                    flipManagerVm.selected.siblings().addClass('hidden').then(flip);
                    // flip
                }

                function flip(){
                    flipManagerVm.selected.css({
                        'transform': 'rotateY(180deg)',
                        '-moz-transform': 'rotateY(180deg)',
                        '-webkit-transform': 'rotateY(180deg)'
                    });
                    flipManagerVm.backElement.css({
                        'position': 'relative',
                        'top': '0px',
                        'left': '0px',
                        '-moz-transform': 'rotateY(360deg)',
                        '-webkit-transform': 'rotateY(360deg)',
                        'transform': 'rotateY(360deg)'
                    });
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
