#include "js_lib.hpp"

#include <duktape.h>
#include <raylib.h>

#include <iostream>
#include <map>

#include "context.hpp"
#include "duk_helpers.hpp"

constexpr int PALETTE_LEN = 16;
constexpr Color PALETTE[PALETTE_LEN] = {
    Color{0, 0, 0, 255},      Color{29, 43, 83, 255},    Color{126, 37, 83, 255},   Color{0, 135, 81, 255},
    Color{171, 82, 54, 255},  Color{95, 87, 79, 255},    Color{194, 195, 199, 255}, Color{255, 241, 232, 255},
    Color{255, 0, 77, 255},   Color{255, 163, 0, 255},   Color{255, 240, 36, 255},  Color{0, 231, 86, 255},
    Color{41, 173, 255, 255}, Color{131, 118, 156, 255}, Color{255, 119, 168, 255}, Color{255, 204, 170, 255}};

const std::map<std::string, int> keys{{"up", KEY_UP},       {"down", KEY_DOWN},   {"left", KEY_LEFT},
                                      {"right", KEY_RIGHT}, {"start", KEY_ENTER}, {"pause", KEY_P},
                                      {"space", KEY_SPACE}, {"z", KEY_Z},         {"x", KEY_X}};

Color GetDukColor(duk_context *ctx, int idx) {
  auto colorIdx = duk_to_int(ctx, idx);
  auto color = PALETTE[colorIdx % PALETTE_LEN];
  return color;
}

duk_ret_t js_SetPixel(duk_context *ctx) {
  auto x = duk_to_int(ctx, 0);
  auto y = duk_to_int(ctx, 1);
  auto color = GetDukColor(ctx, 2);
  DrawPixel(x, y, color);
  return 0;
}
duk_ret_t js_GetPixel(duk_context *ctx) {
  auto x = duk_to_int(ctx, 0);
  auto y = duk_to_int(ctx, 1);
  TraceLog(LOG_ERROR, "GetPixel is not implemented");
  duk_push_int(ctx, -1);
  return 1;
}

duk_ret_t js_DrawClearScreen(duk_context *ctx) {
  auto color = GetDukColor(ctx, 0);
  ClearBackground(color);
  return 0;
}
duk_ret_t js_DrawLine(duk_context *ctx) {
  auto x0 = duk_to_int(ctx, 0);
  auto y0 = duk_to_int(ctx, 1);
  auto x1 = duk_to_int(ctx, 2);
  auto y1 = duk_to_int(ctx, 3);
  auto color = GetDukColor(ctx, 4);
  DrawLine(x0, y0, x1, y1, color);
  return 0;
}

void SetupPaletteConst(duk_context *ctx) {
  RegisterConstant(ctx, "PALETTE_LEN", PALETTE_LEN);
}

duk_ret_t js_DrawRectFill(duk_context *ctx) {
  auto x = duk_to_int(ctx, 0);
  auto y = duk_to_int(ctx, 1);
  auto w = duk_to_int(ctx, 2);
  auto h = duk_to_int(ctx, 3);
  auto color = GetDukColor(ctx, 4);

  DrawRectangle(x, y, w, h, color);
  return 0;
}
duk_ret_t js_DrawRect(duk_context *ctx) {
  auto x = duk_to_int(ctx, 0);
  auto y = duk_to_int(ctx, 1);
  auto w = duk_to_int(ctx, 2);
  auto h = duk_to_int(ctx, 3);
  auto color = GetDukColor(ctx, 4);

  DrawRectangleLines(x, y, w, h, color);
  return 0;
}
duk_ret_t js_DrawCircle(duk_context *ctx) {
  auto x = duk_to_int(ctx, 0);
  auto y = duk_to_int(ctx, 1);
  auto r = duk_to_int(ctx, 2);
  auto color = GetDukColor(ctx, 3);
  DrawCircleLines(x, y, r, color);
  return 0;
}
duk_ret_t js_DrawCircleFill(duk_context *ctx) {
  auto x = duk_to_int(ctx, 0);
  auto y = duk_to_int(ctx, 1);
  auto r = duk_to_int(ctx, 2);
  auto color = GetDukColor(ctx, 3);
  DrawCircle(x, y, r, color);
  return 0;
}

static duk_ret_t js_Trace(duk_context *ctx) {
  duk_push_string(ctx, " ");
  duk_insert(ctx, 0);
  duk_join(ctx, duk_get_top(ctx) - 1);

  TraceLog(LOG_INFO, duk_safe_to_string(ctx, -1));

  return 0;
}

static duk_ret_t js_Reset(duk_context* ctx) {
  GetContext()->Reset();
  return 0;
}

static const struct {
  duk_c_function func;
  int params;
  const char *name;
} ApiFunc[] = {
    {js_Trace, DUK_VARARGS, "trace"},
    {js_DrawRectFill, 5, "draw_rect_fill"},
    {js_DrawRect, 5, "draw_rect"},
    {js_GetPixel, 2, "get_pixel"},
    {js_SetPixel, 3, "set_pixel"},
    {js_DrawClearScreen, 1, "draw_clear_screen"},
    {js_DrawLine, 5, "draw_line"},
    {js_DrawCircle, 4, "draw_circle"},
    {js_DrawCircleFill, 4, "draw_circle_fill"},
    {js_Reset, 0, "reset"},
    //    {js_DrawSprite, 7, "draw_sprite"},
    //    {js_ShowText, 6, "show_text"},
    //    {js_ImportMusic, 2, "importMusic"},
    //    {js_ImportSFX, 2, "importSFX"},
    //    {js_PlayMusic, 2, "playMusic"},
    //    {js_PlaySFX, 3, "playSFX"},
};

static void RegisterInputs(duk_context *ctx) {
  auto idx = duk_push_object(ctx);
  for (auto &key : keys) {
    if (IsKeyDown(key.second)) {
      duk_push_boolean(ctx, true);
      duk_put_prop_string(ctx, idx, key.first.c_str());
    }
    if (IsKeyPressed(key.second)) {
      duk_push_boolean(ctx, true);
      duk_put_prop_string(ctx, idx, (key.first + "Pressed").c_str());
    }
    if (IsKeyReleased(key.second)) {
      duk_push_boolean(ctx, true);
      duk_put_prop_string(ctx, idx, (key.first + "Released").c_str());
    }
    if (IsMouseButtonPressed(MOUSE_LEFT_BUTTON)) {
      duk_push_boolean(ctx, true);
      duk_put_prop_string(ctx, idx, "mousePressed");
    }
    if (IsMouseButtonReleased(MOUSE_LEFT_BUTTON)) {
      duk_push_boolean(ctx, true);
      duk_put_prop_string(ctx, idx, "mouseReleased");
    }
    if (IsMouseButtonDown(MOUSE_LEFT_BUTTON)) {
      duk_push_boolean(ctx, true);
      duk_put_prop_string(ctx, idx, "mouseDown");
    }

    auto mpos = GetContext()->GetVirtualMousePosition();
    duk_push_int(ctx, mpos.x);
    duk_put_prop_string(ctx, idx, "mouseX");

    duk_push_int(ctx, mpos.y);
    duk_put_prop_string(ctx, idx, "mouseY");
  }
  duk_put_global_string(ctx, "INPUT");
}

static void RegisterTimers(duk_context *ctx) {
  RegisterConstant(ctx, "TIME", GetTime());
  RegisterConstant(ctx, "DELTA_TIME", GetFrameTime());
}

void RegisterJsLib(duk_context *ctx) {
  for (const auto &i : ApiFunc) {
    duk_push_c_function(ctx, i.func, i.params);
    duk_put_global_string(ctx, i.name);
  }

  SetupPaletteConst(ctx);
  RegisterConstant(ctx, "DISPLAY_HEIGHT", 136);
  RegisterConstant(ctx, "DISPLAY_WIDTH", 240);
  OnUpdateJsLib(ctx);
}

void OnUpdateJsLib(duk_context *ctx) {
  RegisterInputs(ctx);
  RegisterTimers(ctx);
}