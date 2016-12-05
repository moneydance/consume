(function() {
    'use strict';

    angular
        .module('blocks.animation')
        .directive('flipper', flipper)
        .directive('flipHelper', flipHelper)
        .directive('flipManager', flipManager);

    function flipper() {
        function flipperDirCtrl() {
            var flipVm = this;
        }

        function link(scope, element, attr, ctrls) {
            var flipperDirCtrl = ctrls[0];
            var flipManagerDirCtrl = ctrls[1];
            flipperDirCtrl._parent = flipManagerDirCtrl;
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
            template: '<div class="front {{flipVm._parent.shape}}" ng-click="flipVm._parent.select($event, flipVm.back)">{{flipVm.front}}</div>',
            link: link
        };
    }

    function flipHelper() {
        function flipHelperDirCtrl() {
            var flipHelperVm = this;
        }

        function link(scope, element, attr, ctrls) {
            var flipHelperDirCtrl = ctrls[0];
            var flipManagerDirCtrl = ctrls[1];
            flipHelperDirCtrl._parent = flipManagerDirCtrl;
            flipManagerDirCtrl.backElement = element;
        }

        return {
            restrict: "E",
            replace: true,
            scope: {},
            require: ['flipHelper', '^flipManager'],
            controller: flipHelperDirCtrl,
            controllerAs: 'flipHelperVm',
            template: '<div id="back" class="stack-element back {{flipHelperVm._parent.shape}}">{{flipHelperVm._parent.back}}</div>',
            link: link
        };
    }



    flipManager.$inject = ['$animate'];
    function flipManager($animate) {
        function flipManagerDirCtrl() {
            var flipManagerVm = this;
            flipManagerVm.backElement;
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
                     //   position: "absolute",
                        top: pos.top + "px",
                        left: pos.left + "px"
                    });
                    var siblings = flipManagerVm.selected.siblings().not(flipManagerVm.backElement[0]);
                    console.log(siblings);
                    siblings.each(function(i, v) {
                        console.log(i);
                        console.log(siblings.length);
                        if (i != siblings.length -1){
                           $animate.addClass(this, 'hidden');
                        }
                        else {
                           $animate.addClass(this, 'hidden').then(flip);
                        }
                    });
                }

                function flip(){

                    flipManagerVm.selected.css({
                        'transform': 'rotateY(180deg)',
                        '-moz-transform': 'rotateY(180deg)',
                        '-webkit-transform': 'rotateY(180deg)'
                    });
                    flipManagerVm.backElement.css({
                        'top': 'initial',
                        'left': 'initial',
                        '-moz-transform': 'rotateY(360deg)',
                        '-webkit-transform': 'rotateY(360deg)',
                        'transform': 'rotateY(360deg)',
                        '-webkit-transition': '2s',
                        '-moz-transition':'2s',
                        'transition': '2s'
                    });
                    flipManagerVm.backElement.addClass("selected-display");
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
            template: '<div class="flex row-flex flex-wrap flex-center-y flex-center-x" ng-transclude></div>',
            bindToController: {
                shape: '@'
            }
        };
    }
})();
