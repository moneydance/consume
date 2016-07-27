(function() {
    'use strict';

    angular
        .module('blocks.physics')
        .factory('world', world)
        .factory('ticker', ticker)
        .factory('scale', scale)
        .directive("physicsCanvas", physicsCanvas)
        .directive("physicsEdgeDetection", physicsEdgeDetection)
        .directive("physicsCircles", physicsCircles);

    world.$inject = ['Physics'];
    function world(Physics)
    {
        var world = Physics();
        world.on('step', function() {
                world.render();
            });
        return world;
    }

    ticker.$inject = ['Physics', 'world'];
    function ticker(Physics, world)
    {
        function start()
        {
            Physics.util.ticker.on(function (time) {
                world.step(time);
            });
            Physics.util.ticker.start()
        }
        return {
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
        }
    }



    physicsCanvas.$inject = ['Physics', 'world', 'ticker', '$window'];
    function physicsCanvas (Physics, world, ticker, $window)
    {
        return {
            restrict: "E",
            transclude: true,
            template: "<canvas height={{height}} width={{width}}></canvas><div ng-transclude></div>",
            link: createCanvas
        };

        function createCanvas (scope, element)
        {
            var canvas = element.find("canvas");
            var width = $window.innerWidth;
            var height = $window.innerHeight;
            scope.height = height;
            scope.width = width;
            console.log(width);
            var renderer = Physics.renderer('canvas', {
                el: canvas[0],
                width: width,
                height: height
            });
            world.add(renderer);
            canvas.attr("style", "");
            ticker.start();
        }
    }

    physicsEdgeDetection.$inject = ['Physics', 'world', '$window'];
    function physicsEdgeDetection (Physics, world, $window) {
        return {
            restrict: "E",
            scope: {
                restitution: "@"
            },
            link: link
        };

        function link (scope) {
                var maxY = $window.innerHeight;
                var maxX = $window.innerWidth;
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

    physicsCircles.$inject = ['Physics', 'world', '$window', 'scale'];
    function physicsCircles(Physics, world, $window, scale)
    {
        Circle.prototype.colors = ['#FFBFC2', '#76D5BB', '#9ACFE3', '#BC8C1C', '#AB004F', '#7EAA9F', '#F8DE79', '#898883'];
        return {
            restrict: "E",
            link: link
        };

        function Circle(width, height)
        {
            var color = Math.floor(Math.random() * this.colors.length);
            var radius = scale.s(Math.floor(Math.random() * 80) + 20);
            this.c = Physics.body('circle', {
                x: Math.random() * width,
                y: height + (radius * 2),
                vy: -.03,
                radius: radius,
                mass: 1,
                restitution: 0.5,
                styles: {
                    strokeStyle: this.colors[color],
                    fillStyle: this.colors[color],
                    lineWidth: 1
                }
            });
            this.setTimeStamp = setTimeStamp;
            this.time_stamp;

            function setTimeStamp(time, lambda){
                this.time_stamp = time + nextExponential(lambda);
            }

            function nextExponential(lambda)
            {
            var Y = Math.random();
            var x = (- Math.log(1.0-Y))/lambda;
            return Math.round(x);
            }
        }

        function link(scope)
        {
            var step = 0;
            var height = $window.innerHeight;
            var width = $window.innerWidth;
            var queued = new Circle(width, height);
            queued.setTimeStamp(step, .006);
            var active_circles = [];
            world.on('step', onStep);

            function resetCircles () {
                var b;
                var l = active_circles.length;
                while (l--) {
                    b = active_circles[l]
                    if (b.c.state.pos.y < -scale.s(600)) {
                        world.removeBody(b.c);
                        active_circles.splice(l, 1);
                    }
                }
            }

            function onStep() {
                step++;
                if (queued.time_stamp < step)
                {
                active_circles.push(queued);
                world.add(queued.c);
                queued = new Circle(width, height);
                queued.setTimeStamp(step, .006);
                }
                resetCircles();
            }
        }
    }
})();

