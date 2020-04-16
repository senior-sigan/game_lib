function ButtonsScene() {
}

ButtonsScene.prototype.onRender = function () {
    draw_clear_screen(0);
    draw_text("Press Arrows\nPress Space to exit", 1, 10, 3, 2, 1);
    if (INPUT.up) draw_clear_screen(1);

    if (INPUT.down) draw_clear_screen(2);

    if (INPUT.left) draw_clear_screen(5);

    if (INPUT.right) draw_clear_screen(4);
};
ButtonsScene.prototype.onCreate = function () {
};
ButtonsScene.prototype.onDispose = function () {
};

module.exports = ButtonsScene;