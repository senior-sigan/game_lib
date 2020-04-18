var utils = require('utils');
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
        if (state.human.canGather.length === 0) {
            // TODO: make sound "Oh-oh"
        } else {
            var id = state.human.canGather[0]._id;
            var res = state.human.inventory.push(state.branches[id]);
            if (!res) {
                // TODO: make sound "Oh-oh-2"
            } else {
                state.branches[id] = null;
                delete state.branches[id];
            }
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
            if (utils.randint(0, 16) !== 0) continue;
            var sprite = utils.randChoice([3, 4, 5]);
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
            if (utils.randint(0, 2) !== 0) continue;
            grass.push(new Grass(i * 8, j * 8));
        }
    }
    return grass;
}

state = {
    branches: generateBranches(),
    grass: generateGrass(),
    human: new Human(32, 32, new Inventory(4)),
    warmSources: [new CampFire(16, 16)],
    environment: {
        temperature: -20
    },
    showInventory: false
};

function drawHud() {
    draw_rect_fill(0, 100, 128, 28, 0);
    draw_text("Temp: " + state.human.temperature.toFixed(), 0, 110, 4)

    state.human.canGather.forEach(function (obj, i) {
        draw_rect(64 + i * obj.width + 2 - 1, 109, obj.width + 2, obj.height + 2, 1);
        draw_sprite(obj.sprite, 64 + i * obj.width + 2, 110);
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

    var maxPerLine = 6;
    var offset = 2;
    var size = maxPerLine * (8 + 2 * offset) - offset;

    draw_rect_fill(posX, posY, size, size, 0);
    draw_rect(posX, posY, size, size, 5);

    state.human.inventory.forEach(function (value, key, index) {
        var i = index % maxPerLine;
        var j = Math.floor(index / maxPerLine);

        var x = posX + i * (8 + offset + offset);
        var y = posY + j * (8 + offset + offset);
        draw_sprite(value.sprite, x + offset / 2, y + offset / 2);
        draw_rect(x, y, 8 + offset, 8 + offset, 5);
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
    draw_text(""+ getFPS(), 116,0, 10);
}