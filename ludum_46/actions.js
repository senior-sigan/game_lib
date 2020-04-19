var utils = require('utils');
var Hummer = require('hummer');
var Torch = require('torch');
var Bonfire = require('camp_fire');

var txtColor = 10;
var fontSizeBig = 30;
var fontSize = 20;

function Actions() {
    this.collection = [];
    this.posX = 130;
    this.posY = 8;
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

var acts = [
    {
        result: {hummers: 1},
        requires: {branches: 1, stones: 1},
        requiresBuildings: [],
        act: 'craft',
        object: {
            width: 8,
            height: 8,
            sprite: 10
        },
        make: function (self) {
            trace("Make hummer");
            var hummer = new Hummer(state.human.x, state.human.y);
            state.human.inventory.push(hummer);
            utilizeItems(self.requires);
        }
    },
    {
        result: {branches: 4},
        requires: {hummers: -1},
        requiresBuildings: ['trees'],
        act: 'chop tree',
        object: {
            width: 8,
            height: 8,
            sprite: utils.randChoice([3, 4, 5])
        },
        make: function (self) {
            trace("chop tree")
            utils.forEach(self.result, function(n, name) {
                var obj = new Branch(state.human.x, state.human.y);
                state.gatherable[obj._id] = obj;
            });
            var utilisedTrees = 0;
            utils.forEach(self.foundBuildings, function (building) {
                // TODO: hm it should be more strait-forward?
                if (utilisedTrees >= 1) {
                    return;
                }
                utilisedTrees += 1;
                if (building._type === 'trees') {
                    state.trees[building._id] = null;
                    delete state.trees[building._id];
                }
            })
            utilizeItems(self.requires);
        }
    },
    {
        result: {torch: 1},
        requires: {branches: 1},
        requiresBuildings: ['bonfire'],
        act: 'craft',
        object: {
            width: 8,
            height: 8,
            sprite: 9
        },
        make: function (self) {
            trace("make torch");
            state.human.inventory.push(
                new Torch(state.human.x, state.human.y));
            utilizeItems(self.requires);
        }
    },
    {
        result: {bonfire: 1},
        requires: {branches: 3, stones: -1},
        requiresBuildings: [],
        act: 'make fire',
        object: {
            width: 8,
            height: 8,
            sprite: 11
        },
        make: function (self) {
            trace("set bonfire");

            var bonfire = new Bonfire(state.human.x, state.human.y);
            state.warmSources.push(bonfire);

            utilizeItems(self.requires);
        }
    }
];

Actions.prototype._handle_actions = function () {
    var self = this;
    utils.forEach(acts, function (action) {
        var works = 0;
        utils.forEach(action.requires, function (n, name) {
            var objs = utils.find(name, state.human.inventory.container, function (obj) {
                return obj._type;
            });
            if (objs.length > 0 && objs.length >= n) {
                works += 1;
            }
        });

        action.foundBuildings = [];
        utils.forEach(action.requiresBuildings, function (name) {
            // trace(utils.toJson(action.requiresBuildings), state.human.closeBuildings);
            var objs = utils.find(name, state.human.closeBuildings, function (obj) {
                return obj._type;
            });
            action.foundBuildings = utils.concat([action.foundBuildings, objs]);
            if (objs.length > 0) {
                works += 1;
            }
        });

        if (works === utils.len(action.requires) + utils.len(action.requiresBuildings)) {
            // allow action
            self.push(action);
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

Actions.prototype._handle_keys = function () {
    this.collection.forEach(function (action) {
        if (isPressed(action.key + KEY_0)) {
            action.make(action);
        }
    });
}

Actions.prototype.update = function () {
    this.collection.length = 0;
    utils.forEach(state.human.canGather, function (obj) {
        this.push({
            act: 'gather',
            object: obj,
            make: gatherAction
        });
    }.bind(this));
    utils.forEach(state.human.inventory.container, function (obj) {
        this.push({
            act: 'throw',
            object: obj,
            make: throwAction
        });
    }.bind(this));

    this._handle_actions();
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
    if (action.act === 'gather') {
        for (var i = 0; i < this.collection.length; i++) {
            if(this.collection[i].object._type === action.object._type) {
                return;
            }
        }
    }

    action.key = this.collection.length;
    this.collection.push(action);
}

module.exports = Actions;