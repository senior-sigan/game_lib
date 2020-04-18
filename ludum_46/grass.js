var utils = require('utils')

function Grass(x, y) {
    this._id = utils.nextID();
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.animation = new utils.Animation(sprites.grass, 0.8, utils.randint(0, 3));
}

Grass.prototype.draw = function () {
    var sprite = this.animation.update();
    utils.drawSprite(sprite, this.x, this.y);
}

module.exports = Grass;