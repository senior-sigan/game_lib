var utils = require('utils')

function Tree(x, y) {
    this._id = utils.nextID();
    this._type = 'trees';
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.animation = new utils.Animation([6, 7], 0.7, Math.random());
}

Tree.width = 16;
Tree.height = 16;

Tree.prototype.draw = function () {
    var sprite = this.animation.update();
    draw_sprite(sprite, this.x, this.y);
}

Tree.prototype.update = function() {

}

module.exports = Tree;