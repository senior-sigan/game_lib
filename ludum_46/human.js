function Human(x, y, inventory) {
    this._id = nextID();
    this.width = 16;
    this.height = 16;
    this.x = x;
    this.y = y;
    this.hunger = 0;
    this.speed = 32;

    this.normTemperature = 5;
    this.maxTemperature = 100;
    this.minTemperature = -60;
    this.temperatureDefence = 0.7;

    this.temperature = this.normTemperature;

    this.canGather = [];
    this.inventory = inventory;
}

Human.prototype.draw = function () {
    utils.drawSprite(sprites.boy, this.x - 8, this.y - 8);

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

Human.prototype._handleTemperature = function () {
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

    // trace(this.temperature, diff);
}

Human.prototype.update = function () {
    this.canGather.length = 0;
    this._handleMovement();

    var dists = state.warmSources.map(function (ws) {
        return {
            dist: utils.distance(ws.x, ws.y, this.x, this.y),
            ws: ws
        };
    }.bind(this)).sort(function (a, b) {
        return a.dist - b.dist;
    });

    if (dists.length !== 0) {
        this.closestFire = dists[0];
    } else {
        this.closestFire = null;
    }

    this._handleTemperature()
}

module.exports = Human;