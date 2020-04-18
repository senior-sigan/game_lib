Math.randint = function (min_, max_) {
    return (Math.random() * max_ + min_) >> 0;
};

function CampFire(x, y) {
    this.x = x;
    this.y = y;
}

CampFire.prototype.draw = function () {
    var n_imps = Math.randint(0, 10);
    for (var i = 0; i < n_imps; i++) {
        var ox = Math.randint(0, 9) - 4;
        var oy = Math.randint(0, 9) - 4;
        var r = Math.randint(0, 5);
        var color = Math.randint(0, 2) + 8;
        draw_circle_fill(this.x + ox, this.y + oy, r, color);
    }
}

CampFire.prototype.update = function () {

}

state = {
    objects: [new CampFire(16, 16)]
};

function init(){

}

function update() {
    state.objects.forEach(function(el) {
        el.update();
    })
}

function draw() {
    draw_clear_screen(0);
    state.objects.forEach(function(el) {
        el.draw();
    })
}