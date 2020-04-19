var utils = require('utils');

function Torch(x, y) {
    this._id = utils.nextID();
    this._type = 'torches';
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.sprite = 9;
    this.animation = new utils.Animation([9, 10], 0.3, Math.random());
}

Torch.prototype.update = function () {

}

Torch.prototype.draw = function () {
    var sprite = this.animation.update();
    draw_sprite(sprite, this.x, this.y);
}

module.exports = Torch;