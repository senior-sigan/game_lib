Math.fmod = function (a, b) {
    return Number((a - (Math.floor(a / b) * b)).toPrecision(8));
};

function Prisma() {
    this.t = 0;
}

Prisma.prototype.onRender = function () {
    var base = 143;
    var pi8 = Math.PI / 8;
    var pi2 = Math.PI * 2;
    draw_clear_screen(0);

    var red = 8;
    var green = 11;
    var blue = 12;

    for (var i = Math.fmod(this.t, 8.0); i < base; i += 8.0) {
        var x = Math.floor(i);
        var y = Math.floor(base - i);
        draw_line(x, 0, 0, y, red);
        draw_line(x, base, base, y, green);
        this.t += DELTA_TIME;
    }

    for (var i = Math.fmod(this.t / 16, pi8); i < pi2; i += pi8) {
        var x = Math.floor(base / 2.0 + (base / 4.0) * Math.cos(i));
        var y = Math.floor(base / 2.0 + (base / 4.0) * Math.cos(i));
        draw_line(base, 0, x, y, blue);
        draw_line(0, base, x, y, blue);
    }

    draw_line(0, 0, base, 0, red);
    draw_line(0, 0, 0, base, red);
    draw_line(base, 0, base, base, green);
    draw_line(0, base, base, base, green);
};
Prisma.prototype.onCreate = function () {
    this.t = 0;
};
Prisma.prototype.onDispose = function () {
};

module.exports = Prisma;