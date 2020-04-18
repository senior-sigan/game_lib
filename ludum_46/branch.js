var utils = require('utils');

function Branch(x, y, sprite) {
    this._id = utils.nextID();
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.sprite = sprite
}

Branch.prototype.update = function () {

}

Branch.prototype.draw = function () {
    draw_sprite(this.sprite, this.x, this.y);
}

module.exports = Branch;