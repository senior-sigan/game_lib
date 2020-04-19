declare namespace module {
    let exports: any;
}

declare function require(name: string): object;

declare function draw_clear_screen(color: number): void;

declare function draw_pixel(x: number, y: number, color: number): void;

declare function draw_line(x0: number, y0: number, x1: number, y1: number, color: number): void;

declare function draw_rect_fill(x: number, y: number, w: number, h: number, color: number): void;

declare function draw_rect(x: number, y: number, w: number, h: number, color: number): void;

declare function draw_circle(x: number, y: number, radius: number, color: number): void;

declare function draw_circle_fill(x: number, y: number, radius: number, color: number): void;

declare function draw_text(text: string, x: number, y: number, color: number, size: number): void;

declare function draw_sprite(idx: number, x: number, y: number);

declare function isPressed(key: number);

declare function trace(text: string): void;

declare function getFPS(): number;

declare function exit(): void;

declare function reset(): void;

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

declare const KEY_A: number;
declare const KEY_B: number;
declare const KEY_C: number;
declare const KEY_D: number;
declare const KEY_E: number;
declare const KEY_F: number;
declare const KEY_G: number;
declare const KEY_H: number;
declare const KEY_I: number;
declare const KEY_J: number;
declare const KEY_K: number;
declare const KEY_L: number;
declare const KEY_M: number;
declare const KEY_N: number;
declare const KEY_O: number;
declare const KEY_P: number;
declare const KEY_Q: number;
declare const KEY_R: number;
declare const KEY_S: number;
declare const KEY_T: number;
declare const KEY_U: number;
declare const KEY_V: number;
declare const KEY_W: number;
declare const KEY_X: number;
declare const KEY_Y: number;
declare const KEY_Z: number;
declare const KEY_0: number;
declare const KEY_1: number;
declare const KEY_2: number;
declare const KEY_3: number;
declare const KEY_4: number;
declare const KEY_5: number;
declare const KEY_6: number;
declare const KEY_7: number;
declare const KEY_8: number;
declare const KEY_9: number;
declare const KEY_RETURN: number;
declare const KEY_ESCAPE: number;
declare const KEY_BACKSPACE: number;
declare const KEY_TAB: number;
declare const KEY_SPACE: number;
declare const KEY_F1: number;
declare const KEY_F2: number;
declare const KEY_F3: number;
declare const KEY_F4: number;
declare const KEY_F5: number;
declare const KEY_F6: number;
declare const KEY_F7: number;
declare const KEY_F8: number;
declare const KEY_F9: number;
declare const KEY_F10: number;
declare const KEY_F11: number;
declare const KEY_F12: number;
declare const KEY_RIGHT: number;
declare const KEY_LEFT: number;
declare const KEY_DOWN: number;
declare const KEY_UP: number;
declare const KEY_LCTRL: number;
declare const KEY_LSHIFT: number;
declare const KEY_LALT: number;
declare const KEY_RCTRL: number;
declare const KEY_RSHIFT: number;
declare const KEY_RALT: number;
declare const MOUSE_BUTTON_LEFT: number;
declare const MOUSE_BUTTON_MIDDLE: number;
declare const MOUSE_BUTTON_RIGHT: number;