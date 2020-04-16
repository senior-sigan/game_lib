declare namespace module {
    let exports: any;
}

declare function require(name: string): object;

declare function draw_clear_screen(color: number): void;

declare function draw_pixel(x: number, y: number, color: number): void;

declare function get_pixel(x: number, y: number): number;

declare function draw_line(x0: number, y0: number, x1: number, y1: number, color: number): void;

declare function draw_rect_fill(x: number, y: number, w: number, h: number, color: number): void;

declare function draw_rect(x: number, y: number, w: number, h: number, color: number): void;

declare function draw_circle(x: number, y: number, radius: number, color: number): void;

declare function draw_circle_fill(x: number, y: number, radius: number, color: number): void;

declare function draw_sprite(sprite_id: number, screen_x: number, screen_y: number, sheet_x: number, sheet_y: number, width: number, height: number): void;

declare function draw_text(text: string, x: number, y: number, color: number, size: number, spacing: number): void;

declare function import_sprite(file_name: string): number;

declare function trace(text: string): void;

declare function exit(): void;

declare function reset(): void;

declare function importMusic(path: string, name: string): void;

declare function importSFX(path: string, name: string): void;

declare function playMusic(name: string, loop: number): void;

declare function playSFX(name: string, loop: number, ticks: number): void;

declare var PALETTE_LEN: number;

declare var DISPLAY_HEIGHT: number;
declare var DISPLAY_WIDTH: number;

declare var TIME: number;
declare var DELTA_TIME: number;

declare namespace INPUT {
    var up: boolean;
    var down: boolean;
    var left: boolean;
    var right: boolean;
    var start: boolean;
    var pause: boolean;
    var space: boolean;
    var z: boolean;
    var x: boolean;
    var upPressed: boolean;
    var downPressed: boolean;
    var leftPressed: boolean;
    var rightPressed: boolean;
    var startPressed: boolean;
    var pausePressed: boolean;
    var spacePressed: boolean;
    var zPressed: boolean;
    var xPressed: boolean;
    var upReleased: boolean;
    var downReleased: boolean;
    var leftReleased: boolean;
    var rightReleased: boolean;
    var startReleased: boolean;
    var pauseReleased: boolean;
    var spaceReleased: boolean;
    var zReleased: boolean;
    var xReleased: boolean;
    var mousePressed: boolean;
    var mouseDown: boolean;
    var mouseReleased: boolean;
    var mouseX: number;
    var mouseY: number;
}