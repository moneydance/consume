(function() {
    'use strict';

    angular
        .module('blocks.animation')
        .directive('flipper', flipper)
        .directive('flipManager', flipManager);



    function flipper() {
        function flipperDirCtrl() {
            var flipVm = this;
            flipVm.select = select;

            function select(event) {
                flipVm._parent.select(angular.element(event.currentTarget).parent());
            }
        }

        function link(scope, element, attr, ctrls) {
            var flipDirCtrl = ctrls[0];
            var flipManagerDirCtrl = ctrls[1];
            flipDirCtrl._parent = flipManagerDirCtrl;
            flipDirCtrl.id = flipManagerDirCtrl.add(element);
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
                back: '@',
                shape: '@'
            },
            template: '<div class="container" id = "{{flipVm.id}}"><div class="original {{flipVm.shape}}" ng-click="flipVm.select($event)">{{flipVm.front}} </div> <div class="copy hidden"><div class="copy-front {{flipVm.shape}}">{{flipVm.front}}</div><div class="copy-back {{flipVm.shape}}">{{flipVm.back}}</div></div></div>',
            link: link
        };
    }

    flipManager.$inject = ['$animate'];
    function flipManager($animate) {
        function flipManagerDirCtrl() {
            var flipManagerVm = this;
            flipManagerVm.flippers = new Array();
            flipManagerVm.selected;
            flipManagerVm.count = 0;
            flipManagerVm.add = add;
            flipManagerVm.select = select;

            function add(new_flippy) {
                flipManagerVm.flippers.push(new_flippy);
                var id = flipManagerVm.count;
                flipManagerVm.count++;
                return id;
            }

            function select(selected_flippy) {
                flipManagerVm.selected = selected_flippy;
                for (var i in flipManagerVm.flippers) {
                    var flipper = flipManagerVm.flippers[i];
                    console.log(flipper.attr('id'));
                    if (flipper.attr('id') !== flipManagerVm.selected.attr('id')) {
                        //fuck jqlite dumb theres no selectors like jquery :( looks shit.
                        var og = angular.element(flipper.children()[0]);
                        var cp = angular.element(flipper.children()[1]);
                        if (i < flipManagerVm.flippers.length - 1) {
                            $animate.addClass(og, 'hidden');
                        } else {
                            $animate.addClass(og, 'hidden').then(flipadelphia);
                        }
                    }
                }

                function flipadelphia() {
                    var selectedOG = angular.element(flipManagerVm.selected.children()[0]);
                    var selectedCP = angular.element(flipManagerVm.selected.children()[1]);
                    var selectedCPFront = angular.element(selectedCP.children()[0]);
                    var selectedCPBack = angular.element(selectedCP.children()[1]);
                    $animate.addClass(selectedOG, 'hidden no-transition');
                    $animate.removeClass(selectedCP, 'hidden');
                    $animate.addClass(selectedCP, 'selected-display');
                    selectedCPFront.css({
                        'transform': 'rotateY(180deg)'
                    });
                    selectedCPBack.css({
                        'transform': 'rotateY(0deg)'
                    });
                }
            }
        }

        return {
            restrict: "E",
            scope: {},
            controller: flipManagerDirCtrl,
            controllerAs: 'flipManagerVm'
        };
    }
})();
