function SceneManager(scenes) {
    this.scenes = scenes;
    this.currentScene = 0;
    this.prevScene = this.scenes.length;
    this.nextScene = 0;
}

SceneManager.prototype.update = function () {
    this.currentScene = this.nextScene;
    if (this.prevScene !== this.currentScene) {
        if (this.prevScene !== this.scenes.length) {
            this.scenes[this.prevScene].dispose();
        }
        this.scenes[this.currentScene].init();
        this.prevScene = this.currentScene;
    }
    var res = this.scenes[this.currentScene].update();

    if (res) {
        trace("Transition to next scene");
        this.nextScene = (this.currentScene + 1) % this.scenes.length;
    }
};

SceneManager.prototype.draw = function () {
    this.scenes[this.currentScene].draw();
}

module.exports = SceneManager;