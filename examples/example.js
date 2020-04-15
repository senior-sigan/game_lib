const SceneManager = require('scene_manager');

const PrismaScene = require('prisma');
const MouseScene = require('mouse');
const PaletteScene = require('palette');
const RandomLinesScene = require('random_lines');

const sceneManager = new SceneManager([
    new MouseScene(),
    // new NativeHelloWorld(),
    // new SoundScene(),
    new PaletteScene(),
    new RandomLinesScene(),
    // new ButtonsScene(),
    new PrismaScene()
]);

function init() {

}

function update() {
    // print(JSON.stringify(INPUT));
}

function draw() {
    sceneManager.onRender();
}