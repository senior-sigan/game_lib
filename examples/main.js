var SceneManager = require('scene_manager');

var PrismaScene = require('prisma');
var MouseScene = require('mouse');
var PaletteScene = require('palette');
var RandomLinesScene = require('random_lines');
var ButtonScene = require('button');
var LunarScene = require('lunar');

var sceneManager = new SceneManager([
    new LunarScene(),
    new ButtonScene(),
    new PrismaScene(),
    new PaletteScene(),
    // new NativeHelloWorld(),
    // new SoundScene(),
    new RandomLinesScene(),
    new MouseScene(),
]);

function init() {
    trace("Random number "+Math.random());
}

function update() {
    if (isPressed(KEY_R)) {
        reset();
    }
}

function draw() {
    sceneManager.onRender();
}