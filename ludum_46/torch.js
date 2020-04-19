var utils = require('utils');

function Torch(x, y) {
    this._id = utils.nextID();
    this._type = 'branches';
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.sprite = 9;
}

Torch.prototype.update = function () {

}

Torch.prototype.draw = function () {
    draw_sprite(this.sprite, this.x, this.y);
}

module.exports = Torch;