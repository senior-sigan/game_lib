var sprites = [
    ".......6.7484848",
    "......65.7848488",
    "......65.7484848",
    "......65.7888888",
    ".....665.7888...",
    ".....655.7......",
    "....6554.7......",
    "....6554.7......",
    "....6654........",
    "....6554........",
    "....6544........",
    "....6544........",
    "...65544........",
    "...65444........",
    "..665444........",
    ".7666444........"
];


function makeShipSprite() {
    var ship = [];
    for (var j = 0; j < 16; j++) {
        for (var i = 0; i < 8; i++) {
            var c = sprites[j][i] === '.' ? 0 : sprites[j][i];
            ship.push({
                x: 15 - i,
                y: j,
                color: c
            });
            ship.push({
                x: i,
                y: j,
                color: c
            });
        }
    }

    return ship;
}

function makeFlagSprite() {
    var flag = [];
    for (var j = 0; j < 8; j++) {
        for (var i = 8; i < 16; i++) {
            var c = sprites[j][i] === '.' ? 0 : sprites[j][i];
            flag.push({
                x: i - 8,
                y: j,
                color: c
            })
        }
    }
    return flag;
}

var shipSprite = makeShipSprite();
var flagSprite = makeFlagSprite();

//===================

Math.randint = function (min_, max_) {
    return (Math.random() * max_ + min_) >> 0;
};

DefaultState = {
    x: 36,
    y: 20,
    vy: 0,
    g: 0.16,
    trust: 0,
    floor_y: 110,
    landed: false,
    success: undefined,
    explosion: 50,
    t: 0,
    stars: [],
    stats: {
        value: 0,
        color: 0,
        danger: false
    }
};

State = Object.create(DefaultState);


function getAlt() {
    return (State.floor_y - State.y - 17).toFixed(1) + 1
}

function getVelStat() {
    var color = 2;
    var danger = false;
    if (Math.abs(State.vy) >= 1) {
        color = 8;
        danger = true;
    }
    return {
        value: 0 - State.vy.toFixed(1),
        color: color,
        danger: danger
    }
}


function makeStars() {
    for (var i = 0; i < 20; i++) {
        var x = Math.randint(0, 128);
        var y = Math.randint(0, 128);
        State.stars.push([x, y]);
    }
}

function moveStars() {
    for (var i = 0; i < State.stars.length; i++) {
        var star = State.stars[i];
        star[0] = (star[0] + 0.01) % 128;
        star[1] = (star[1] + 0.003 + 128) % 128;
    }
}

function drawStarts() {
    State.stars.forEach(function (star) {
        draw_pixel(star[0], star[1], 7);
    });
}

function drawLand() {
    draw_line(0, State.floor_y, 128, State.floor_y, 5);
    draw_rect_fill(0, State.floor_y + 1, 128, 128, 13);
    draw_circle(100, 120, 3, 5);
    draw_circle(110, 115, 2, 5);
    draw_circle(30, 120, 3, 5);
    // draw_rect(0,0,128,128, 6);
}

function drawStats() {
    var alt = State.alt;
    if (State.landed) {
        if (State.success) {
            alt = "TOUCH";
        } else {
            alt = "BUM!!";
        }
    }
    draw_text("Alt: " + alt, 80, 30, 2);
    draw_text("Vel: " + State.stats.value, 80, 40, State.stats.color);
}

function drawExplosion() {
    for (var i = 0; i < State.explosion; i++) {
        draw_circle_fill(
            State.x + 8 + i / 2 - Math.randint(0, i),
            State.y + 15 - Math.randint(0, i),
            Math.randint(0, i / 5),
            Math.randint(0, 15)
        );
    }
    State.explosion -= 0.2;
}

function drawFlag() {
    if (!(State.landed && State.success)) return;

    for (var i = 0; i < flagSprite.length; i++) {
        var el = flagSprite[i];
        if (el.color === 0) continue;
        draw_pixel(56+ el.x, 102 + el.y, el.color);
    }
}

function drawShip() {
    if (State.landed && !State.success) {
        drawExplosion();
        return;
    }

    var x = State.x;
    var y = State.y;
    for (var i = 0; i < shipSprite.length; i++) {
        var el = shipSprite[i];
        if (el.color !== 0) {
            draw_pixel(el.x + x, el.y + y, el.color);
        }
    }
}

function moveRocket() {
    State.stats = getVelStat();
    State.alt = getAlt();
    if (State.alt <= 0.0001 || State.landed) {
        State.landed = true;
        State.trust = 0;
    }
    if (State.landed === true) {
        State.success = !State.stats.danger;
    }

    if (State.landed === false) {
        if (INPUT.up || INPUT.mouseDown) {
            State.trust = 1;
            // Pfff-pfff sound
        } else {
            State.trust = 0;
        }

        var a = -State.g + State.trust;
        State.y = State.y + State.vy * DELTA_TIME * 5;
        State.vy = State.vy - a * DELTA_TIME * 5;
    }
}

function init() {
    makeStars();

    trace("HELLO");
}

function update() {
    moveStars();
    moveRocket();

    if (INPUT.startReleased) {
        trace("RESET");
        reset();
    }
}

function draw() {
    draw_clear_screen(1);
    drawStarts();
    drawShip();
    drawFlag();

    drawLand();
    drawStats();
}

function Lunar() {

}

Lunar.prototype.onRender = function() {
  update();
  draw();
};

Lunar.prototype.onCreate = function() {
    State = Object.create(DefaultState);
    init();
};

Lunar.prototype.onDispose = function() {};

module.exports = Lunar;