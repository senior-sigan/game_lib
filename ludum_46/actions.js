var utils = require('utils');

var txtColor = 10;
var fontSizeBig = 30;
var fontSize = 20;

function Actions(items) {
    this.collection = [];
    this.posX = 130;
    this.posY = 8;
    this.crafts = PrepareCrafts(items);
}


function PrepareCrafts(items) {
    return [
        {
            result: {hummers: 1},
            requires: {branches: 1, stones: 1},
            object: {
                width: 16,
                height: 16,
                sprite: 42
            }
        },
        {
            result: {branches: 4},
            requires: {trees: 1, hummers: -1},
            object: {
                width: 8,
                height: 8,
                sprite: utils.randChoice([3, 4, 5])
            }
        },
        {
            result: {torch: 1},
            requires: {branches: 1, bonfire: -1},
            object: {
                width: 8,
                height: 8,
                sprite: 42
            }
        },
        {
            result: {bonfire: 1},
            requires: {branches: 1, stones: 1},
            object: {
                width: 8,
                height: 8,
                sprite: 42
            }
        }
    ];
}

Actions.prototype._handle_crafts = function () {
    var self = this;
    utils.forEach(this.crafts, function (craft) {
        var works = 0;
        utils.forEach(craft.requires, function(n, name){
            var objs = utils.find(name, state.human.inventory.container, function(obj) {
                return obj._type;
            });
            if (objs.length > 0 && objs.length >= n) {
                works += 1;
            }
        });

        // trace(utils.toJson(craft.result), works, utils.len(craft.requires))
        if (works === utils.len(craft.requires)) {
            // allow craft
            self.push({
                act: 'craft',
                object: craft.object
            })
        }
    });
}

function gatherAction(action) {
    var obj = action.object;

    var res = state.human.inventory.push(obj);
    if (res) {
        delete state.human.canGather[obj._id];
        delete state[obj._type][obj._id];
    }
}

function throwAction(action) {
    var obj = action.object;

    var res = state.human.inventory.pop(obj._id);
    if (res) {
        obj.x = state.human.x;
        obj.y = state.human.y;
        state[obj._type][obj._id] = obj;
    }
}

var actions = {
    'gather': gatherAction,
    'throw': throwAction
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