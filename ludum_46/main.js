function _build_id_generator() {
    var _ID_ = 0;
    return function () {
        _ID_++;
        return _ID_;
    }
}

var nextID = _build_id_generator();

var utils = require('utils');
Math.randint = utils.randint;

var sprites = require('sprites');
var CampFire = require('camp_fire');
var Inventory = require('inventory');
var Human = require('human');
var Grass = require('grass');
var Branch = require('branch');

function handleGathering() {
    utils.forEach(state.branches, function (branch) {
        if (utils.intersectAABB(branch, state.human)) {
            state.human.canGather.push(branch);
        }
    });

    if (INPUT.spacePressed && !state.showInventory) {
        if (this.canGather.length === 0) {
            // TODO: make sound "Oh-oh"
        } else {

        }
    }
}

/**
 *
 * @returns {{String, Branch}}
 */
function generateBranches() {
    // Maybe spawn them near to trees???
    var branches = {};
    for (var i = 0; i < 128 / 8; i++) {
        for (var j = 0; j < 128 / 8; j++) {
            if (Math.randint(0, 16) !== 0) continue;
            var sprite = utils.randChoice(sprites.branches);
            var branch = new Branch(i * 8, j * 8, sprite)
            branches[branch._id] = branch;
        }
    }
    return branches;
}

function generateGrass() {
    var grass = []
    for (var i = 0; i < 128 / 8; i++) {
        for (var j = 0; j < 128 / 8; j++) {
            if (Math.randint(0, 2) !== 0) continue;
            grass.push(new Grass(i * 8, j * 8));
        }
    }
    return grass;
}

state = {
    branches: generateBranches(),
    grass: generateGrass(),
    human: new Human(32, 32, new Inventory(2)),
    warmSources: [new CampFire(16, 16)],
    environment: {
        temperature: -20
    },
    showInventory: false
};

function drawHud() {
    draw_rect_fill(0, 100, 128, 28, 0);
    draw_text("Cold: " + state.human.temperature.toFixed(), 0, 110, 4)

    state.human.canGather.forEach(function (obj, i) {
        draw_rect(64 + i * obj.width + 2 - 1, 109, obj.width + 2, obj.height + 2, 1);
        utils.drawSprite(obj.sprite, 64 + i * obj.width + 2, 110);
    })
}

function drawInventory() {
    if (!INPUT.z) {
        state.showInventory = false;
        return;
    }

    state.showInventory = true;

    var posX = 16;
    var posY = 16;

    draw_rect_fill(posX, posY, 96, 96, 0);
    draw_rect(posX, posY, 96, 96, 5);

    var maxPerLine = 8;

    state.human.inventory.forEach(function (value, key, index) {
        var i = index % maxPerLine;
        var j = Math.floor(index / maxPerLine);

        draw_rect(posX + i * 16, posY + j * 16, 16, 16, 5);
    });
}

function init() {

}

function update() {
    utils.forEach(state.branches, function (el) {
        el.update();
    });
    utils.forEach(state.warmSources, function (el) {
        el.update();
    });
    state.human.update();
    handleGathering();

    state.warmSources = state.warmSources.filter(function (el) {
        return !el.toDelete();
    });
}

function draw() {
    draw_clear_screen(0);
    utils.forEach(state.grass, function (el) {
        el.draw();
    });
    utils.forEach(state.branches, function (el) {
        el.draw();
    });
    state.human.draw();
    utils.forEach(state.warmSources, function (el) {
        el.draw();
    })
    drawHud();
    drawInventory();
}