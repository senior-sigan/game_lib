var sprites = require('sprites');

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

Math.randint = function (min_, max_) {
    return (Math.random() * max_ + min_) >> 0;
};

function CampFire(x, y) {
    this.x = x;
    this.y = y;
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

    var n_imps = Math.randint(0, 10);
    for (var i = 0; i < n_imps; i++) {
        var ox = Math.randint(0, 9) - 4;
        var oy = Math.randint(0, 9) - 4;
        var r = Math.randint(0, 5);
        var color = Math.randint(0, 2) + 8;
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

function Human(x, y) {
    this.x = x;
    this.y = y;
    this.hunger = 0;
    this.speed = 24;

    this.normTemperature = 5;
    this.maxTemperature = 100;
    this.minTemperature = -60;
    this.temperatureDefence = 0.7;

    this.temperature = this.normTemperature;
}

Human.prototype.draw = function () {
    drawSprite(sprites.boy, this.x - 8, this.y - 8);

    // if (this.closestFire) {
    //     draw_line(state.human.x, state.human.y, this.closestFire.ws.x, this.closestFire.ws.y, 8);
    // }
}

Human.prototype._handleMovement = function () {
    if (INPUT.down) {
        this.y += this.speed * DELTA_TIME;
    }
    if (INPUT.up) {
        this.y -= this.speed * DELTA_TIME;
    }
    if (INPUT.left) {
        this.x -= this.speed * DELTA_TIME;
    }
    if (INPUT.right) {
        this.x += this.speed * DELTA_TIME;
    }
}

Human.prototype._handleTemperature = function() {
    var fireTemperature = 0;
    if (!!this.closestFire) {
        var sqDist = Math.pow(this.closestFire.dist / 8, 2) + 0.01;
        fireTemperature = this.closestFire.ws.temperature / sqDist;
    }

    var diff = state.environment.temperature + fireTemperature;
    this.temperature += diff * this.temperatureDefence * DELTA_TIME;

    if (this.temperature >= this.maxTemperature) {
        this.temperature = this.maxTemperature;
    }
    if (this.temperature <= this.minTemperature) {
        this.temperature = this.minTemperature
    }

    trace(this.temperature, diff);
}

Human.prototype.update = function () {
    this._handleMovement();

    var dists = state.warmSources.map(function(ws) {
      return {dist: distance(ws.x, ws.y, this.x, this.y), ws: ws};
    }.bind(this)).sort(function(a, b) {
        return a.dist - b.dist;
    });

    if (dists.length !== 0) {
        this.closestFire = dists[0];
    } else {
        this.closestFire = null;
    }

    this._handleTemperature()
}

state = {
    human: new Human(32, 32),
    warmSources: [new CampFire(16, 16)],
    environment: {
        temperature: -20
    }
};

function drawHud() {
    draw_rect()
    draw_text("Cold: " + state.human.temperature.toFixed(), 0, 110, 4)
}

function init() {

}

function update() {
    state.warmSources.forEach(function (el) {
        el.update();
    });
    state.human.update();


    state.warmSources = state.warmSources.filter(function (el) {
        return !el.toDelete();
    });
}

function draw() {
    draw_clear_screen(0);
    state.human.draw();
    state.warmSources.forEach(function (el) {
        el.draw();
    })
    drawHud();
}