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
                flipVm._parent.select(angular.element(event.currentTarget));
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
            template: '<div id="{{flipVm.id}}"  id="{{flipVm.id}}" class="container front {{flipVm.shape}}" ng-click="flipVm.select($event)">{{flipVm.front}}</div>',
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
                var count = 0;
                for (var i in flipManagerVm.flippers) {
                    var flipper = flipManagerVm.flippers[i];
                    count++;
                    if (flipper.attr('id') !== flipManagerVm.selected.attr('id')) {
                        if (count < flipManagerVm.flippers.length - 1) {
                            $animate.addClass(flipper, 'hidden');
                        } else {
                            $animate.addClass(flipper, 'hidden').then(flipadelphia);
                        }
                    }
                }

                function flipadelphia() {
                    var selectedFront = flipManagerVm.selected;
                    var selectedBack = "back";
                    for (var i in flipManagerVm.flippers) {
                        var flipper = flipManagerVm.flippers[i];
                        console.log(flipper.attr('id'));
                        if (flipper.attr('id') !== flipManagerVm.selected.attr('id')) {
                            $animate.addClass(flipper, 'no-flex-zone');
                        }
                    }
                    $animate.removeClass(selectedBack, 'hidden');
                    selectedFront.css({
                        'transform': 'rotateY(180deg)',
                        '-moz-transform': 'rotateY(180deg)',
                        '-webkit-transform': 'rotateY(180deg)'
                    });
                    selectedBack.css({
                        '-moz-transform': 'rotateY(360deg)',
                        '-webkit-transform': 'rotateY(360deg)',
                        'transform': 'rotateY(360deg)'
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
