(function() {
    'use strict';

    angular
        .module('blocks.physics')
        .factory('world', world)
        .factory('scale', scale)
        .directive("physicsCanvas", physicsCanvas)
        .directive("physicsEdgeDetection", physicsEdgeDetection)
        .directive("physicsCircles", physicsCircles);

    var colors = ['#FFBFC2', '#76D5BB', '#9ACFE3',
            '#BC8C1C', '#AB004F', '#7EAA9F', '#F8DE79', '#898883'];

    world.$inject = ['Physics'];
    function world(Physics)
    {
        function newWorld()
        {
            var world = Physics();
            world.on('step', function() {
                world.render();
            });
            return world;
        }

        function start(world)
        {
            Physics.util.ticker.on(function (time) {
                world.step(time);
            });
            Physics.util.ticker.start();
        }

        return {
            newWorld: newWorld,
            start: start
        };
    }

    scale.$inject = ['$window'];
    function scale($window)
    {
        function s(n)
        {
            return n * $window.innerWidth / 600;
        }

        return {
            s: s
        };
    }

    physicsCanvas.$inject = ['Physics', 'world', '$window', '$rootScope'];
    function physicsCanvas (Physics, world, $window, $rootScope)
    {
        return {
            scope: {},
            restrict: "E",
            transclude: true,
            template: "<canvas height={{canvasVm.height}} width={{canvasVm.width}}></canvas><div ng-transclude></div>",
            controller: physicsCanvasController,
            controllerAs: 'canvasVm',
            link: createCanvas
        };

        function physicsCanvasController()
        {
            var canvasVm = this;
            canvasVm.w = world.newWorld();
            canvasVm.width = $window.innerWidth;
            canvasVm.height = $window.innerHeight;
        }

        function createCanvas (scope, element, attr, canvasVm)
        {
            scope.$on('$destroy', function () {
                canvasVm.w = canvasVm.w.destroy();
                console.log(canvasVm.w);
                console.log('alert scope destroyed');
            });
            var canvas = element.find("canvas");
            var renderer = Physics.renderer('canvas', {
                el: canvas[0],
                width: canvasVm.width,
                height: canvasVm.height
            });
            canvasVm.w.add(renderer);
            canvas.attr("style", "");
            world.start(canvasVm.w);
        }
    }

    physicsEdgeDetection.$inject = ['Physics', '$window'];
    function physicsEdgeDetection (Physics, $window)
    {
        return {
            restrict: "E",
            scope: {
                restitution: "@"
            },
            require: '^physicsCanvas',
            link: link
        };

        function link (scope, element, attr, canvasVm)
        {
            var world = canvasVm.w;
            var maxY = canvasVm.height;
            var maxX = canvasVm.width;
            var bounds = Physics.aabb(0,
                0,
                maxX,
                maxY);
            world.add(Physics.behavior('edge-collision-detection', {
                aabb: bounds,
                restitution: parseFloat(scope.restitution)
            }));
        }
    }

    physicsCircles.$inject = ['Physics', '$window', 'scale'];
    function physicsCircles(Physics, $window, scale)
    {
        return {
            scope: {},
            restrict: "E",
            require: '^physicsCanvas',
            link: link
        };

        function Circle(width, height, hidden)
        {
            this.c = newCircle();
            this.setTimeStamp = setTimeStamp;
            this.time_stamp;

            function newCircle()
            {
                var color = Math.floor(Math.random() * colors.length);
                var radius = scale.s(Math.floor(Math.random() * 80) + 20);
                var y;
                if (hidden)
                {
                    y = height + (radius * 2);
                }
                else
                {
                    y = Math.random() * height;
                }
                return Physics.body('circle', {
                    x: Math.random() * width,
                    y: y,
                    vy: -0.03,
                    radius: radius,
                    mass: 1,
                    restitution: 0.5,
                    styles: {
                        strokeStyle: colors[color],
                        fillStyle: colors[color],
                        lineWidth: 1
                    }
                });
            }

            function setTimeStamp(time, lambda)
            {
                this.time_stamp = time + nextExponential(lambda);
            }

            function nextExponential(lambda)
            {
                var Y = Math.random();
                var x = (- Math.log(1.0-Y))/lambda;
                return Math.round(x);
            }
        }

        function link(scope, element, attr, canvasVm)
        {
            var world = canvasVm.w;
            var step = 0;
            var last_reset = 0;
            var height = canvasVm.height;
            var width = canvasVm.width;
            var active_circles = [];
            initCircles();
            var queued = new Circle(width, height, true);
            queued.setTimeStamp(step, 0.006);
            world.on('step', onStep);

            function initCircles ()
            {
                var l = 10;
                while (l--)
                {
                    var c = new Circle(width, height, false);
                    world.add(c.c);
                    active_circles.push(c);
                }
            }

            function resetCircles ()
            {
                var b;
                var l = active_circles.length;
                while (l--)
                {
                    b = active_circles[l]
                    if (b.c.state.pos.y < -scale.s(600))
                    {
                        world.removeBody(b.c);
                        active_circles.splice(l, 1);
                    }
                }
            }

            function onStep()
            {
                step++;
                last_reset++;
                if (queued.time_stamp < step)
                {
                    active_circles.push(queued);
                    world.add(queued.c);
                    queued = new Circle(width, height, true);
                    queued.setTimeStamp(step, 0.006);
                }
                if (last_reset > 200)
                {
                    resetCircles();
                    last_reset = 0;
                }
            }
        }
    }
})();

