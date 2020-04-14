function MouseScene() {
}

MouseScene.prototype.onRender = function () {
    if (INPUT.mouseDown) {
        draw_circle_fill(INPUT.mouseX, INPUT.mouseY, 2, PALETTE[3]);
    } else {
        draw_circle_fill(INPUT.mouseX, INPUT.mouseY, 2, PALETTE[5]);
    }
};

MouseScene.prototype.onCreate = function () {
    draw_clear_screen(PALETTE[0]);
};
MouseScene.prototype.onDispose = function () {
};

module.exports = MouseScene;