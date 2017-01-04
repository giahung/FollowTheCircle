Game = {
    circle: null,
    mousePositionText: null,
    start: function () {
        Crafty.init();
        Crafty.background('#22FFA5');
        this.reset();
        // this.mousePositionText = Crafty.e('2D, DOM, Text').attr({ x: 10, y: 10 });
        // Game.updateMousePosition();
    },

    updateMousePosition: function () {
        var newestX = Crafty.mousePos.x,
            newestY = Crafty.mousePos.y;
        Game.mousePositionText.text(newestX + ',' + newestY);
        Game.mousePositionText.timeout(Game.updateMousePosition, 100);
    },

    reset: function () {
        var criclex = Crafty.viewport.width / 2
        var circley = Crafty.viewport.height / 2;
        this.circle = Crafty.e("2D, Canvas, Mouse, Circle")
            .Circle(criclex, circley, 18.5, "#07AFCC");
        this.circle.one('Click', this.circle.run);
        this.circle.one('OutCircle', function (MouseEvent) {
            Game.circle.stop();
            Game.circle.destroy();
            Game.reset();
        });
    }
}