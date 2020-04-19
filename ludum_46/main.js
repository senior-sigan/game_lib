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
    utils.forEach(state.gatherable, function (collection) {
        utils.forEach(collection, function (obj) {
            if (utils.intersectAABB(obj, state.human)) {
                state.human.canGather[obj._id] = obj;
            }
        });
    });

    // if (INPUT.spacePressed && !state.showInventory) {
    //     if (state.human.canGather.length === 0) {
    //         // TODO: make sound "Oh-oh"
    //     } else {
    //         var obj = state.human.canGather[0];
    //         var res = state.human.inventory.push(state.human.canGather[0]);
    //         if (!res) {
    //             // TODO: make sound "Oh-oh-2"
    //         } else {
    //             state[obj._type][obj._id] = null;
    //             delete state[obj._type][obj._id];
    //         }
    //     }
    // }
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
    return generateObjects(function(i, j, size) {
        if (utils.randint(0, 16) !== 0) return null;
        var sprite = utils.randChoice([3, 4, 5]);
        return new Branch(i * size, j * size, sprite)
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
    var trees = []
    for (var i = 0; i < 128 / Tree.width; i++) {
        for (var j = 0; j < 128 / Tree.height; j++) {
            if (utils.randint(0, 8) !== 0) continue;
            trees.push(new Tree(i * Tree.width, j * Tree.height));
        }
    }
    return trees;
}

function State() {
    this.stones = generateStones();
    this.trees = generateTrees();
    this.branches = generateBranches();
    this.grass = generateGrass();
    this.human = new Human(32, 32, new Inventory(4));
    this.warmSources = [new CampFire(16, 16)];
    this.environment = {temperature: -20};
    this.showInventory = false;
    this.actions = new Actions();

    this.gatherable = [this.stones, this.branches];
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

function update() {
    utils.forEach(state.branches, function (el) {
        el.update();
    });
    utils.forEach(state.trees, function (el) {
        el.update();
    })
    utils.forEach(state.warmSources, function (el) {
        el.update();
    });
    state.human.update();
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
    utils.forEach(state.stones, draw_el);
    utils.forEach(state.grass, draw_el);
    utils.forEach(state.branches, draw_el);
    utils.forEach(state.trees, draw_el);
    state.human.draw();
    utils.forEach(state.warmSources, draw_el)
    state.actions.draw();
    drawInventory();
    draw_text("" + getFPS(), 116, 0, 10, 0);
}