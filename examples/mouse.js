function MouseScene() {
}

MouseScene.prototype.onRender = function () {
    if (INPUT.mouseDown) {
        draw_circle_fill(INPUT.mouseX, INPUT.mouseY, 2, 3);
    } else {
        draw_circle_fill(INPUT.mouseX, INPUT.mouseY, 2, 5);
    }
};

MouseScene.prototype.onCreate = function () {
    draw_clear_screen(0);
};
MouseScene.prototype.onDispose = function () {
};

module.exports = MouseScene;