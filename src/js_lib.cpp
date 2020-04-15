#include "js_lib.hpp"

#include <duktape.h>
#include <raylib.h>

#include <iostream>
#include <map>

#include "context.hpp"
#include "duk_helpers.hpp"

const int PALETTE_LEN = 16;
const Color PALETTE[PALETTE_LEN] = {
    Color{0, 0, 0, 255},      Color{29, 43, 83, 255},    Color{126, 37, 83, 255},   Color{0, 135, 81, 255},
    Color{171, 82, 54, 255},  Color{95, 87, 79, 255},    Color{194, 195, 199, 255}, Color{255, 241, 232, 255},
    Color{255, 0, 77, 255},   Color{255, 163, 0, 255},   Color{255, 240, 36, 255},  Color{0, 231, 86, 255},
    Color{41, 173, 255, 255}, Color{131, 118, 156, 255}, Color{255, 119, 168, 255}, Color{255, 204, 170, 255}};

const std::map<std::string, int> keys{{"up", KEY_UP},       {"down", KEY_DOWN},   {"left", KEY_LEFT},
                                      {"right", KEY_RIGHT}, {"start", KEY_ENTER}, {"pause", KEY_P},
                                      {"space", KEY_SPACE}, {"z", KEY_Z},         {"x", KEY_X}};

Color GetDukColor(duk_context *ctx, int idx) {
  Color color{};
  auto len = duk_get_length(ctx, idx);
  if (len != 4) {
    std::cerr << "Color should be array of 4 ints, but got " << len << "\n";
  } else {
    duk_get_prop_index(ctx, idx, 0);
    color.r = duk_to_uint16(ctx, -1);
    duk_get_prop_index(ctx, idx, 1);
    color.g = duk_to_uint16(ctx, -1);
    duk_get_prop_index(ctx, idx, 2);
    color.b = duk_to_uint16(ctx, -1);
    duk_get_prop_index(ctx, idx, 3);
    color.a = duk_to_uint16(ctx, -1);
  }
  return color;
}

duk_idx_t PutDukColor(duk_context *ctx, const Color &color) {
  auto colors_idx = duk_push_array(ctx);
  duk_push_number(ctx, color.r);
  duk_put_prop_index(ctx, colors_idx, 0);
  duk_push_number(ctx, color.g);
  duk_put_prop_index(ctx, colors_idx, 1);
  duk_push_number(ctx, color.b);
  duk_put_prop_index(ctx, colors_idx, 2);
  duk_push_number(ctx, color.a);
  duk_put_prop_index(ctx, colors_idx, 3);
  return colors_idx;
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
  Color color{};
  std::cout << "Not implemented"
            << "\n";
  PutDukColor(ctx, color);
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

  auto pal_idx = duk_push_array(ctx);
  for (int i = 0; i < PALETTE_LEN; i++) {
    auto color = PALETTE[i];
    PutDukColor(ctx, color);
    duk_put_prop_index(ctx, pal_idx, i);
  }
  duk_put_global_string(ctx, "PALETTE");
}

duk_ret_t js_GetTime(duk_context *ctx) {
  auto time = GetTime();
  duk_push_number(ctx, time);
  return 1;
}

duk_ret_t js_GetDelta(duk_context *ctx) {
  auto time = GetFrameTime();
  duk_push_number(ctx, time);
  return 1;
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

static const struct {
  duk_c_function func;
  int params;
  const char *name;
} ApiFunc[] = {
    //    {js_GetDisplayHeight, 0, "get_display_height"},
    //    {js_GetDisplayWidth, 0, "get_display_width"},
    {js_DrawRectFill, 5, "draw_rect_fill"},
    {js_DrawRect, 5, "draw_rect"},
    {js_GetPixel, 2, "get_pixel"},
    {js_SetPixel, 3, "set_pixel"},
    {js_DrawClearScreen, 1, "draw_clear_screen"},
    {js_DrawLine, 5, "draw_line"},
    {js_DrawCircle, 4, "draw_circle"},
    {js_DrawCircleFill, 4, "draw_circle_fill"},
    //    {js_DrawSprite, 7, "draw_sprite"},
    {js_GetTime, 0, "get_time"},
    {js_GetDelta, 0, "get_delta"},
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

    auto mpos = context.GetVirtualMousePosition();
    duk_push_int(ctx, mpos.x);
    duk_put_prop_string(ctx, idx, "mouseX");

    duk_push_int(ctx, mpos.y);
    duk_put_prop_string(ctx, idx, "mouseY");
  }
  duk_put_global_string(ctx, "INPUT");
}

void RegisterJsLib(duk_context *ctx) {
  for (const auto &i : ApiFunc) {
    duk_push_c_function(ctx, i.func, i.params);
    duk_put_global_string(ctx, i.name);
  }

  SetupPaletteConst(ctx);
  RegisterConstant(ctx, "DISPLAY_HEIGHT", 136);
  RegisterConstant(ctx, "DISPLAY_WIDTH", 240);
  RegisterInputs(ctx);
}

void OnUpdateJsLib(duk_context *ctx) {
  RegisterInputs(ctx);
}