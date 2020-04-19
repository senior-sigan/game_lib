var utils = require('utils');
var Hummer = require('hummer');
var Torch = require('torch');

var txtColor = 10;
var fontSizeBig = 30;
var fontSize = 20;

function Actions() {
    this.collection = [];
    this.posX = 130;
    this.posY = 8;
    this.crafts = PrepareCrafts();
}

function utilizeItems(requirements) {
    utils.forEach(requirements, function (n, name) {
        if (n > 0) {
            for (var i = 0; i < n; i++) {
                state.human.inventory.popByType(name);
            }
        }
    });
}

function PrepareCrafts() {
    return [
        {
            result: {hummers: 1},
            requires: {branches: 1, stones: 1},
            requiresBuildings: [],
            object: {
                width: 8,
                height: 8,
                sprite: 10,
                make: function (self) {
                    trace("Make hummer");
                    var hummer = new Hummer(state.human.x, state.human.y);
                    state.gatherable[hummer._id] = hummer;
                    utilizeItems(self.requires);
                }
            }
        },
        {
            result: {branches: 4},
            requires: {hummers: -1},
            requiresBuildings: ['trees'],
            object: {
                width: 8,
                height: 8,
                sprite: utils.randChoice([3, 4, 5]),
                make: function (self) {
                    trace("chop tree")
                    utilizeItems(self.requires);
                }
            }
        },
        {
            result: {torch: 1},
            requires: {branches: 1},
            requiresBuildings: ['bonfire'],
            object: {
                width: 8,
                height: 8,
                sprite: 9,
                make: function (self) {
                    trace("make torch")
                    utilizeItems(self.requires);
                }
            }
        },
        {
            result: {bonfire: 1},
            requires: {branches: 3, stones: -1},
            requiresBuildings: [],
            object: {
                width: 8,
                height: 8,
                sprite: 11,
                make: function (self) {
                    trace("set bonfire");
                    utilizeItems(self.requires);
                }
            }
        }
    ];
}

Actions.prototype._handle_crafts = function () {
    var self = this;
    utils.forEach(this.crafts, function (craft) {
        var works = 0;
        utils.forEach(craft.requires, function (n, name) {
            var objs = utils.find(name, state.human.inventory.container, function (obj) {
                return obj._type;
            });
            if (objs.length > 0 && objs.length >= n) {
                works += 1;
            }
        });

        utils.forEach(craft.requiresBuildings, function(name) {
           var objs = utils.find(name, state.human.closeBuildings);
           if (objs.length > 0) {
               works += 1;
           }
        });

        // trace(utils.toJson(craft.result), works, utils.len(craft.requires))
        if (works === utils.len(craft.requires) + utils.len(craft.requiresBuildings)) {
            // allow craft
            self.push({
                act: 'craft',
                object: craft.object,
                craft: craft
            })
        }
    });
}

function gatherAction(action) {
    var obj = action.object;

    var res = state.human.inventory.push(obj);
    if (res) {
        delete state.human.canGather[obj._id];
        delete state.gatherable[obj._id];
    }
}

function throwAction(action) {
    var obj = action.object;

    var res = state.human.inventory.pop(obj._id);
    if (res) {
        obj.x = state.human.x;
        obj.y = state.human.y;
        state.gatherable[obj._id] = obj;
    }
}

function craftAction(action) {
    action.object.make(action.craft);
}

var actions = {
    'gather': gatherAction,
    'throw': throwAction,
    'craft': craftAction
}

Actions.prototype._handle_keys = function () {
    this.collection.forEach(function (action) {
        if (isPressed(action.key + KEY_0)) {
            actions[action.act](action);
        }
    });
}

Actions.prototype.update = function () {
    this.collection.length = 0;
    utils.forEach(state.human.canGather, function (obj) {
        this.push({
            act: 'gather',
            object: obj
        });
    }.bind(this));
    utils.forEach(state.human.inventory.container, function (obj) {
        this.push({
            act: 'throw',
            object: obj
        });
    }.bind(this));
    // TODO: handle crafts
    this._handle_crafts();

    this._handle_keys();
}

Actions.prototype.draw = function () {
    draw_text("Actions", this.posX, 0, txtColor, fontSizeBig);

    var wh = {width: 0, height: 0}
    this.collection.forEach(function (obj, i) {
        var y = this.posY + (wh.height + 2) * i;
        wh = utils.draw_sprite_with_border(obj.object, this.posX, y);
        var txtOffset = (wh.height - fontSize / 4) / 2;
        draw_text("" + obj.key + " " + obj.act, this.posX + wh.width + 2, y + txtOffset, txtColor, fontSize);
    }.bind(this));
}

Actions.prototype.push = function (action) {
    action.key = this.collection.length;
    this.collection.push(action);
}

module.exports = Actions;