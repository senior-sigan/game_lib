var utils = require('utils');

var txtColor = 10;
var fontSizeBig = 30;
var fontSize = 20;

function Actions() {
    this.collection = [];
    this.posX = 130;
    this.posY = 8;
}

function gatherAction(action) {
    trace("GATHER", action.object._type);
    var obj = action.object;

    var res = state.human.inventory.push(obj);
    if (res) {
        delete state.human.canGather[obj._id];
        delete state[obj._type][obj._id];
    }
}

function throwAction(action) {
    trace("Throw", action.object._type);
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
    var idx = 0;
    utils.forEach(state.human.canGather, function (obj) {
        this.push({
            act: 'gather',
            object: obj,
            key: idx
        });
        idx += 1;
    }.bind(this));
    utils.forEach(state.human.inventory.container, function (obj) {
        this.push({
            act: 'throw',
            object: obj,
            key: idx
        });
        idx += 1;
    }.bind(this));
    // TODO: handle crafts

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
    this.collection.push(action);
}

module.exports = Actions;