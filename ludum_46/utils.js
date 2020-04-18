function drawSprite(sprite, x, y) {
    for (var j = 0; j < sprite.length; j++) {
        for (var i = 0; i < sprite[j].length; i++) {
            if (sprite[j][i] === 0) continue; // transparent
            draw_pixel(x + i, y + j, sprite[j][i]);
        }
    }
}

function distance(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
}

function randint(min_, max_) {
    return (Math.random() * max_ + min_) >> 0;
}

function randChoice(array) {
    return array[randint(0, array.length)];
}

function intersectAABB(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y;
}

function forEach(obj, lambda) {
    if (Array.isArray(obj)) {
        obj.forEach(lambda);
    } else {
        Object.keys(obj).forEach(function (key, index) {
            lambda(obj[key], key, index);
        });
    }
}

function len(collection) {
    if (Array.isArray(collection)) return collection.length;
    return Object.keys(collection).length;
}

function Animation(frames, animationSpeed, initTime) {
    this.frames = frames;
    this.currentFrame = 0;
    this.time = initTime;
    this.animationSpeed = animationSpeed;
}

Animation.prototype.update = function () {
    this.time += DELTA_TIME;
    if (this.time >= this.animationSpeed) {
        this.time = 0;
        this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }
    return this.frames[this.currentFrame];
}

function _build_id_generator() {
    var _ID_ = 0;
    return function () {
        _ID_++;
        return _ID_;
    }
}

module.exports = {
    nextID: _build_id_generator(),
    Animation: Animation,
    drawSprite: drawSprite,
    randChoice: randChoice,
    randint: randint,
    intersectAABB: intersectAABB,
    distance: distance,
    forEach: forEach,
    len: len
}