function LogoScene() {
    this.showTime = 2;
    this.timer = 0;
}

LogoScene.prototype.draw = function () {
    draw_text("CAT_IN_THE_DARK", 0,0, 10, 40);
    draw_sprite(17, 192/2 - 5*6/2,128/2 - 11*6/2, 6)
}

LogoScene.prototype.update = function() {
    this.timer += DELTA_TIME;
    if (this.timer >= this.showTime) {
        this.timer = 0;
        return true;
    }
    if (INPUT.spacePressed) {
        this.timer = 0;
        return true;
    }
}

LogoScene.prototype.init = function() {

}

LogoScene.prototype.dispose = function() {

}

module.exports = LogoScene;