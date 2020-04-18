var utils = require('utils')

function CampFire(x, y) {
    this._id = utils.nextID();
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.maxLife = 10;
    this.life = this.maxLife;
    this.life_drain = 0.01;

    this.temperature = 400; // температура горения дерева
}

CampFire.prototype.toDelete = function () {
    return this.life === 0;
}

CampFire.prototype.draw = function () {
    if (this.life <= 0) {
        // TODO: рисовать угольки
        return;
    }

    var n_imps = utils.randint(0, 10);
    for (var i = 0; i < n_imps; i++) {
        var ox = utils.randint(0, 9) - 4;
        var oy = utils.randint(0, 9) - 4;
        var r = utils.randint(0, 5);
        var color = utils.randint(0, 2) + 8;
        draw_circle_fill(this.x + ox, this.y + oy, r, color);
    }

    var oX = 6;
    var oY = 10;
    draw_rect_fill(
        this.x - oX,
        this.y - oY,
        this.maxLife + 2,
        3,
        4
    );

    draw_line(this.x + 1 - oX,
        this.y + 1 - oY,
        this.x + 1 + this.life - oX,
        this.y + 1 - oY, 8
    );
}

CampFire.prototype.update = function () {
    if (this.life > 0) {
        this.life -= this.life_drain;
    } else {
        this.life = 0;
    }
}

module.exports = CampFire;