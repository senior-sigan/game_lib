var utils = require('utils');

function Branch(x, y, sprite) {
    this._id = utils.nextID();
    this._type = 'branches';
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.sprite = utils.randChoice([3, 4, 5])
}

Branch.prototype.update = function () {

}

Branch.prototype.draw = function () {
    draw_sprite(this.sprite, this.x, this.y);
}

module.exports = Branch;