var utils = require('utils');

function Inventory(maxSize) {
    this.maxSize = maxSize;
    this.container = {};
}

Inventory.prototype.push = function (obj) {
    this.container[obj._id] = obj;
}

Inventory.prototype.pop = function (_id) {
    var obj = this.container[_id];
    this.container[_id] = null;
    delete this.container[_id];
    return obj;
}

Inventory.prototype.forEach = function(lambda) {
    utils.forEach(this.container, lambda);
}

module.exports = Inventory;