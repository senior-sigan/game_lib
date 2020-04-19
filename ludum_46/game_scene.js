var utils = require('utils');
var Branch = require('branch');
var CampFire = require('camp_fire');
var Inventory = require('inventory');
var Human = require('human');
var Grass = require('grass');
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
    return generateObjects(function (i, j, size) {
        if (utils.randint(0, 8) !== 0) return;
        return new Tree(i * size, j * size);
    }, Tree.width);
}

function State() {
    this.inventory = new Inventory(9);
    this.trees = generateTrees();
    this.grass = generateGrass();
    this.human = new Human(32, 32, this.inventory);
    this.warmSources = [new CampFire(16, 16)];
    this.environment = {temperature: -20};
    this.gatherable = utils.concat([
        generateStones(),
        generateBranches()
    ]);
    trace(this.gatherable.length);
    this.actions = new Actions();
}

state = null;

function GameScene() {

}

GameScene.prototype.init = function () {
    trace("INIT GAME")
    state = new State();
}

function updateEl(el) {
    el.update();
}

GameScene.prototype.update = function () {
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
    state.inventory.update();
}

function draw_el(el) {
    el.draw();
}

GameScene.prototype.draw = function () {
    draw_clear_screen(0);
    utils.forEach(state.grass, draw_el);
    utils.forEach(state.trees, draw_el);
    utils.forEach(state.gatherable, draw_el);
    state.human.draw();
    utils.forEach(state.warmSources, draw_el)
    state.actions.draw();
    state.inventory.draw();
    draw_text("" + getFPS(), 186, 0, 10, 16);
}

GameScene.prototype.dispose = function () {
    state = null;
}

module.exports = GameScene;