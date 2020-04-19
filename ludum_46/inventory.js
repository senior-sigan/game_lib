var utils = require('utils');

function Inventory(maxSize) {
    this.maxSize = maxSize;
    this.container = {};

    this.posY = 80;
    this.posX = 130;
}

Inventory.prototype.push = function (obj) {
    if (utils.len(this.container) >= this.maxSize) {
        return false;
    }
    this.container[obj._id] = obj;
    return true;
}

Inventory.prototype.pop = function (_id) {
    var obj = this.container[_id];
    if (!obj) return null;
    this.container[_id] = null;
    delete this.container[_id];
    return obj;
}

Inventory.prototype.popByType = function (type) {
    var obj = utils.findOne(this.container, function (obj) {
        return obj._type === type;
    });
    return this.pop(obj._id);
}

function throwObject(obj) {
    var res = state.human.inventory.pop(obj._id);
    if (res) {
        obj.x = state.human.x;
        obj.y = state.human.y;
        state.gatherable[obj._id] = obj;
    }
}

Inventory.prototype.update = function () {
    utils.forEach(this.container, function (value, key, index) {
        if (isPressed(index + KEY_0)) {
            throwObject(value);
        }
    });
}

Inventory.prototype.draw = function () {
    var wh = {width: 0, height: 0};
    var self = this;
    draw_text('Inventory', self.posX, self.posY-10, 10, 30)
    utils.forEach(this.container, function (value, key, index) {
        var i = index % 3;
        var j = Math.floor(index / 3);
        var y = self.posY + (wh.height + 2) * j;
        var x = self.posX + (wh.width + 2) * i;
        wh = utils.draw_sprite_with_border(value, x, y, 3);
        draw_text('' + index, x+2, y+1, 10, 16);
    });
}

module.exports = Inventory;