function randint(min_, max_) {
    return (Math.random() * max_ + min_) >> 0;
}

function RandomLinesScene() {
}

RandomLinesScene.prototype.onCreate = function () {
    draw_clear_screen(PALETTE[0]);
};
RandomLinesScene.prototype.onRender = function () {
    const x0 = randint(0, DISPLAY_WIDTH);
    const x1 = randint(0, DISPLAY_WIDTH);
    const y0 = randint(0, DISPLAY_HEIGHT);
    const y1 = randint(0, DISPLAY_HEIGHT);

    const i = (TIME % PALETTE_LEN) >> 0;

    draw_line(x0, y0, x1, y1, PALETTE[i]);
};
RandomLinesScene.prototype.onDispose = function () {
};

module.exports = RandomLinesScene;