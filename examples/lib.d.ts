type Color = [number, number, number, number]; // RGBA

declare namespace module {
    let exports: any;
}

declare function draw_clear_screen(color: Color): void;

declare function set_pixel(x: number, y: number, color: Color): void;

declare function get_pixel(x: number, y: number): number;

declare function draw_line(x0: number, y0: number, x1: number, y1: number, color: Color): void;

declare function draw_rect_fill(x: number, y: number, w: number, h: number, color: Color): void;

declare function draw_rect(x: number, y: number, w: number, h: number, color: Color): void;

declare function draw_circle(x: number, y: number, radius: number, color: Color): void;

declare function draw_circle_fill(x: number, y: number, radius: number, color: Color): void;

declare function draw_sprite(sprite_id: number, screen_x: number, screen_y: number, sheet_x: number, sheet_y: number, width: number, height: number): void;

declare function show_text(text: string, x: number, y: number, color: Color, size: number, spacing: number): void;

declare function import_sprite(file_name: string): number;

declare function trace(text: string): void;

declare function exit(): void;

declare function reset(): void;

declare function importMusic(path: string, name: string): void;

declare function importSFX(path: string, name: string): void;

declare function playMusic(name: string, loop: number): void;

declare function playSFX(name: string, loop: number, ticks: number): void;

declare const PALETTE_LEN: number;
declare const PALETTE: Color[];

declare const DISPLAY_HEIGHT: number;
declare const DISPLAY_WIDTH: number;

declare const TIME: number;
declare const DELTA_TIME: number;

declare namespace INPUT {
    const up: boolean;
    const down: boolean;
    const left: boolean;
    const right: boolean;
    const start: boolean;
    const pause: boolean;
    const space: boolean;
    const z: boolean;
    const x: boolean;
    const upPressed: boolean;
    const downPressed: boolean;
    const leftPressed: boolean;
    const rightPressed: boolean;
    const startPressed: boolean;
    const pausePressed: boolean;
    const spacePressed: boolean;
    const zPressed: boolean;
    const xPressed: boolean;
    const upDown: boolean;
    const downDown: boolean;
    const leftDown: boolean;
    const rightDown: boolean;
    const startDown: boolean;
    const pauseDown: boolean;
    const spaceDown: boolean;
    const zDown: boolean;
    const xDown: boolean;
    const mousePressed: boolean;
    const mouseReleased: boolean;
    const mouseDown: boolean;
    const mouseX: number;
    const mouseY: number;
}