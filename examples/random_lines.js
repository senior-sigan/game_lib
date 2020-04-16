function randint(min_, max_) {
    return (Math.random() * max_ + min_) >> 0;
}

function RandomLinesScene() {
}

RandomLinesScene.prototype.onCreate = function () {
    draw_clear_screen(0);
};
RandomLinesScene.prototype.onRender = function () {
    var x0 = randint(0, DISPLAY_WIDTH);
    var x1 = randint(0, DISPLAY_WIDTH);
    var y0 = randint(0, DISPLAY_HEIGHT);
    var y1 = randint(0, DISPLAY_HEIGHT);

    var i = (TIME % PALETTE_LEN) >> 0;

    draw_line(x0, y0, x1, y1, i);
};
RandomLinesScene.prototype.onDispose = function () {
};

module.exports = RandomLinesScene;