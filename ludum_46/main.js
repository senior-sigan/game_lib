var sprites = require('sprites');
var utils = require('utils');
var Branch = require('branch');
var CampFire = require('camp_fire');
var Inventory = require('inventory');
var Human = require('human');
var Grass = require('grass');
var Tree = require('tree');
var Stone = require('stone');
var Actions = require('actions');
var SceneManager = require('scene_manager');
var LogoScene = require('logo_scene');
var GameScene = require('game_scene');

function init() {
    sprites.load();
    sceneManager = new SceneManager([
        new LogoScene(),
        new GameScene()
    ]);
}

function update() {
    sceneManager.update();
}

function draw() {
    sceneManager.draw();
}