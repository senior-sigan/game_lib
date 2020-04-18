function drawSprite(sprite, x, y) {
    for (var j = 0; j < sprite.length; j++) {
        for (var i = 0; i < sprite[j].length; i++) {
            if (sprite[j][i] === 0) continue; // transparent
            draw_pixel(x + i, y + j, sprite[j][i]);
        }
    }
}


function Animation(frames, animationSpeed, initTime) {
    this.frames = frames;
    this.currentFrame = 0;
    this.time = initTime;
    this.animationSpeed = animationSpeed;
}

Animation.prototype.update = function() {
    this.time += DELTA_TIME;
    if (this.time >= this.animationSpeed) {
        this.time = 0;
        this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }
    return this.frames[this.currentFrame];
}

module.exports = {
    Animation: Animation,
    drawSprite: drawSprite
}