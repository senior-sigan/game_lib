function ButtonsScene() {
}

ButtonsScene.prototype.onRender = function () {
    draw_clear_screen(0);
    draw_text("Press Arrows\nPress Space to exit", 1, 10, 3, 2, 1);
    if (isPressed(KEY_W)) draw_clear_screen(1);

    if (isPressed(KEY_S)) draw_clear_screen(2);

    if (isPressed(KEY_A)) draw_clear_screen(5);

    if (isPressed(KEY_D)) draw_clear_screen(4);
};
ButtonsScene.prototype.onCreate = function () {
};
ButtonsScene.prototype.onDispose = function () {
};

module.exports = ButtonsScene;