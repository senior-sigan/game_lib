var utils = require('utils');
var CampFire = require('camp_fire');
var Inventory = require('inventory');
var Human = require('human');
var Grass = require('grass');
var Branch = require('branch');
var Tree = require('tree');
var Stone = require('stone');
var Actions = require('actions');

function handleGathering() {
    utils.forEach(state.gatherable, function (obj) {
        if (utils.intersectAABB(obj, state.human)) {
            state.human.canGather[obj._id] = obj;
        }
    });
}

function areaRect(obj, offset) {
    return {
        x: obj.x - offset,
        y: obj.y - offset,
        width: obj.width + offset,
        height: obj.height + offset
    }
}

function handleBuildingCollisions() {
    utils.forEach(state.warmSources, function (obj) {
        if (utils.intersectAABB(areaRect(obj, obj.width / 4), state.human)) {
            state.human.closeBuildings.push(obj);
        }
    });

    utils.forEach(state.trees, function (obj) {
        if (utils.intersectAABB(areaRect(obj, -obj.width / 8), state.human)) {
            state.human.closeBuildings.push(obj);
        }
    });
}

function generateObjects(factory, size) {
    var objs = {};
    for (var i = 0; i < 128 / size; i++) {
        for (var j = 0; j < 128 / size; j++) {
            var obj = factory(i, j, size);
            if (obj) {
                objs[obj._id] = obj;
            }
        }
    }
    return objs;
}

/**
 *
 * @returns {{String, Branch}}
 */
function generateBranches() {
    return generateObjects(function (i, j, size) {
        if (utils.randint(0, 16) !== 0) return null;
        return new Branch(i * size, j * size)
    }, 8);
}

function generateStones() {
    return generateObjects(function (i, j, size) {
        if (utils.randint(0, 64) === 0) {
            return new Stone(i * size, j * size);
        }
    }, 8);
}

function generateGrass() {
    return generateObjects(function (i, j, size) {
        if (utils.randint(0, 2) !== 0) return null;
        return new Grass(i * size, j * size);
    }, 8);
}

function generateTrees() {
    return generateObjects(function(i,j, size) {
        if (utils.randint(0, 8) !== 0) return;
        return new Tree(i * size, j * size);
    }, Tree.width);
}

function State() {
    this.trees = generateTrees();
    this.grass = generateGrass();
    this.human = new Human(32, 32, new Inventory(4));
    this.warmSources = [new CampFire(16, 16)];
    this.environment = {temperature: -20};
    this.gatherable = utils.concat([
        generateStones(),
        generateBranches()
    ]);
    trace(this.gatherable.length);
    this.actions = new Actions();
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
    state = new State();
}

function updateEl(el) {
    el.update();
}

function update() {
    utils.forEach(state.gatherable, updateEl);
    utils.forEach(state.trees, updateEl)
    utils.forEach(state.warmSources, updateEl);
    state.human.update();
    handleBuildingCollisions();
    handleGathering();
    state.actions.update();

    state.warmSources = state.warmSources.filter(function (el) {
        return !el.toDelete();
    });
}

function draw_el(el) {
    el.draw();
}

function draw() {
    draw_clear_screen(0);
    utils.forEach(state.grass, draw_el);
    utils.forEach(state.trees, draw_el);
    utils.forEach(state.gatherable, draw_el);
    state.human.draw();
    utils.forEach(state.warmSources, draw_el)
    state.actions.draw();
    drawInventory();
    draw_text("" + getFPS(), 116, 0, 10, 0);
}