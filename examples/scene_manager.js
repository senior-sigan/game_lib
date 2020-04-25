function SceneManager(scenes) {
    this.scenes = scenes;
    this.currentScene = 0;
    this.prevScene = this.scenes.length;
}

SceneManager.prototype.onRender = function () {
    if (this.prevScene !== this.currentScene) {
        if (this.prevScene !== this.scenes.length) {
            this.scenes[this.prevScene].onDispose();
        }
        this.scenes[this.currentScene].onCreate();
        this.prevScene = this.currentScene;
    }
    this.scenes[this.currentScene].onRender();

    if (isPressed(KEY_SPACE)) {
        trace("Transition to next scene");
        this.currentScene = (this.currentScene + 1) % this.scenes.length;
    }
    if (isPressed(KEY_ESCAPE)) {
        exit();
    }
};

module.exports = SceneManager;