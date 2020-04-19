var utils = require('utils')

function Stone(x, y) {
    this._id = utils.nextID();
    this._type = 'stones';
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.sprite = 8;
}

Stone.width = 8;
Stone.height = 8;

Stone.prototype.draw = function () {
    draw_sprite(this.sprite, this.x, this.y);
}

Stone.prototype.update = function() {

}

module.exports = Stone;