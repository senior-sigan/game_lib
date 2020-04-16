Math.fmod = function (a, b) {
    return Number((a - (Math.floor(a / b) * b)).toPrecision(8));
};

function Prisma() {
    this.t = 0;
}

Prisma.prototype.onRender = function () {
    const base = 143;
    const pi8 = Math.PI / 8;
    const pi2 = Math.PI * 2;
    draw_clear_screen(0);

    const red = 8;
    const green = 11;
    const blue = 12;

    for (var i = Math.fmod(this.t, 8.0); i < base; i += 8.0) {
        const x = Math.floor(i);
        const y = Math.floor(base - i);
        draw_line(x, 0, 0, y, red);
        draw_line(x, base, base, y, green);
        this.t += DELTA_TIME;
    }

    for (var i = Math.fmod(this.t / 16, pi8); i < pi2; i += pi8) {
        const x = Math.floor(base / 2.0 + (base / 4.0) * Math.cos(i));
        const y = Math.floor(base / 2.0 + (base / 4.0) * Math.cos(i));
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