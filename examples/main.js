const SceneManager = require('scene_manager');

const PrismaScene = require('prisma');
const MouseScene = require('mouse');
const PaletteScene = require('palette');
const RandomLinesScene = require('random_lines');
const ButtonScene = require('button');

const sceneManager = new SceneManager([
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
    if (INPUT.zPressed) {
        reset();
    }
}

function draw() {
    sceneManager.onRender();
}