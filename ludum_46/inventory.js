var utils = require('utils');

function Inventory(maxSize) {
    this.maxSize = maxSize;
    this.container = {};
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

module.exports = Inventory;