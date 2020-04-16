function PaletteScene() {
}

PaletteScene.prototype.onRender = function () {
    var w = DISPLAY_WIDTH / PALETTE_LEN;
    var h = DISPLAY_HEIGHT;
    for (var i = 0; i < PALETTE_LEN; i++) {
        draw_rect_fill(i * w, 0, w, h, i);
    }
};
PaletteScene.prototype.onCreate = function () {
};
PaletteScene.prototype.onDispose = function () {
};

module.exports = PaletteScene;