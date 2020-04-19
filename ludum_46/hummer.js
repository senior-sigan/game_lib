var utils = require('utils');

function Hummer(x, y) {
    this._id = utils.nextID();
    this._type = 'hummers';
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.sprite = 10;
}

Hummer.prototype.update = function () {

}

Hummer.prototype.draw = function () {
    draw_sprite(this.sprite, this.x, this.y);
}

module.exports = Hummer;