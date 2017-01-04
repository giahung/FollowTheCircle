Crafty.c("Circle", {
    internalCircle: null,
    running: false,
    directionX: 0,
    directionY: 0,
    Circle: function (x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.w = this.h = radius * 2;
        this.color = color || "#000000";

        return this;
    },

    at: function (x, y) {
        this.x = x;
        this.y = y;
        this.internalCircle = null;
        this.draw();
    },

    run: function () {
        this.running = true;
        directionX = getRandomInt(-1, 2);
        directionY = getRandomInt(-1, 2);
        this.changeDirection();
        this.move();
    },

    changeDirection: function () {
        if (this.running) {
            if (getRandomInt(0, 2)) {
                directionX = getRandomArbitrary(-0.5, 0.6);
                directionY = getRandomArbitrary(-0.5, 0.6);
            }
            this.timeout(this.changeDirection, 700);
        }
    },

    stop: function () {
        this.running = false;
    },

    move: function () {
        if (this.running) {

            var nextX = directionX * 2;
            var nextY = directionY * 2;

            this.x += nextX;
            this.y += nextY;

            if (this.x <= 0 || this.x + this.w >= Crafty.viewport.width) {
                directionX = - directionX;
                this.x -= 2 * nextX;
            }

            if (this.y < 0 || this.y + this.h >= Crafty.viewport.height) {
                directionY = - directionY;
                this.y -= 2 * nextY;
            }

            if (this.internalCircle !== undefined && this.internalCircle !== null) {
                this.internalCircle.shift(nextX, nextY);
                var newestX = Crafty.mousePos.x,
                    newestY = Crafty.mousePos.y;
                var isOut = !this.internalCircle.containsPoint(newestX, newestY);
                if (isOut) {
                    Crafty.trigger('OutCircle');
                }
            }
            this.draw();
            this.timeout(this.move, 17);
        }
    },

    draw: function () {

        var ctx = Crafty.canvasLayer.context;
        ctx.save();

        ctx.strokeStyle = this.color;
        ctx.fillStyle = '#FFFFFF';
        ctx.lineWidth = 4;
        ctx.beginPath();

        ctx.arc(
            this.x + this.radius,
            this.y + this.radius,
            this.radius - 2,
            0,
            Math.PI * 2
        );
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        if (this.internalCircle === undefined || this.internalCircle == null) {
            this.internalCircle = new Crafty.circle(this.x + this.radius, this.y + this.radius, this.radius + 5);
        }

    }
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}