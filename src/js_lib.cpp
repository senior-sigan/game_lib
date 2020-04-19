#include "js_lib.hpp"

#include <duktape.h>
#include <raylib.h>

#include "context.hpp"
#include "duk_helpers.hpp"

Color GetDukColor(duk_context *ctx, int idx) {
  auto colorIdx = duk_to_int(ctx, idx);
  return GetContext()->GetColor(colorIdx);
}

duk_ret_t js_SetPixel(duk_context *ctx) {
  auto x = duk_to_int(ctx, 0);
  auto y = duk_to_int(ctx, 1);
  auto color = GetDukColor(ctx, 2);
  auto mul = GetContext()->GetMultiplier();
  DrawPixel(x * mul, y * mul, color);
  return 0;
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
  auto mul = GetContext()->GetMultiplier();
  DrawLineEx({static_cast<float>(x0 * mul), static_cast<float>(y0 * mul)},
             {static_cast<float>(x1 * mul), static_cast<float>(y1 * mul)}, mul, color);
  return 0;
}

void SetupPaletteConst(duk_context *ctx) {
  RegisterConstant(ctx, "PALETTE_LEN", GetContext()->palette_len());
}

static void SetupKeys(duk_context *ctx) {
  RegisterConstant(ctx, "KEY_A", KEY_A);
  RegisterConstant(ctx, "KEY_B", KEY_B);
  RegisterConstant(ctx, "KEY_C", KEY_C);
  RegisterConstant(ctx, "KEY_D", KEY_D);
  RegisterConstant(ctx, "KEY_E", KEY_E);
  RegisterConstant(ctx, "KEY_F", KEY_F);
  RegisterConstant(ctx, "KEY_G", KEY_G);
  RegisterConstant(ctx, "KEY_H", KEY_H);
  RegisterConstant(ctx, "KEY_I", KEY_I);
  RegisterConstant(ctx, "KEY_J", KEY_J);
  RegisterConstant(ctx, "KEY_K", KEY_K);
  RegisterConstant(ctx, "KEY_L", KEY_L);
  RegisterConstant(ctx, "KEY_M", KEY_M);
  RegisterConstant(ctx, "KEY_N", KEY_N);
  RegisterConstant(ctx, "KEY_O", KEY_O);
  RegisterConstant(ctx, "KEY_P", KEY_P);
  RegisterConstant(ctx, "KEY_Q", KEY_Q);
  RegisterConstant(ctx, "KEY_R", KEY_R);
  RegisterConstant(ctx, "KEY_S", KEY_S);
  RegisterConstant(ctx, "KEY_T", KEY_T);
  RegisterConstant(ctx, "KEY_U", KEY_U);
  RegisterConstant(ctx, "KEY_V", KEY_V);
  RegisterConstant(ctx, "KEY_W", KEY_W);
  RegisterConstant(ctx, "KEY_X", KEY_X);
  RegisterConstant(ctx, "KEY_Y", KEY_Y);
  RegisterConstant(ctx, "KEY_Z", KEY_Z);
  RegisterConstant(ctx, "KEY_0", KEY_ZERO);
  RegisterConstant(ctx, "KEY_1", KEY_ONE);
  RegisterConstant(ctx, "KEY_2", KEY_TWO);
  RegisterConstant(ctx, "KEY_3", KEY_THREE);
  RegisterConstant(ctx, "KEY_4", KEY_FOUR);
  RegisterConstant(ctx, "KEY_5", KEY_FIVE);
  RegisterConstant(ctx, "KEY_6", KEY_SIX);
  RegisterConstant(ctx, "KEY_7", KEY_SEVEN);
  RegisterConstant(ctx, "KEY_8", KEY_EIGHT);
  RegisterConstant(ctx, "KEY_9", KEY_NINE);
  RegisterConstant(ctx, "KEY_RETURN", KEY_ENTER);
  RegisterConstant(ctx, "KEY_ESCAPE", KEY_ESCAPE);
  RegisterConstant(ctx, "KEY_BACKSPACE", KEY_BACKSPACE);
  RegisterConstant(ctx, "KEY_TAB", KEY_TAB);
  RegisterConstant(ctx, "KEY_SPACE", KEY_SPACE);
  RegisterConstant(ctx, "KEY_F1", KEY_F1);
  RegisterConstant(ctx, "KEY_F2", KEY_F2);
  RegisterConstant(ctx, "KEY_F3", KEY_F3);
  RegisterConstant(ctx, "KEY_F4", KEY_F4);
  RegisterConstant(ctx, "KEY_F5", KEY_F5);
  RegisterConstant(ctx, "KEY_F6", KEY_F6);
  RegisterConstant(ctx, "KEY_F7", KEY_F7);
  RegisterConstant(ctx, "KEY_F8", KEY_F8);
  RegisterConstant(ctx, "KEY_F9", KEY_F9);
  RegisterConstant(ctx, "KEY_F10", KEY_F10);
  RegisterConstant(ctx, "KEY_F11", KEY_F11);
  RegisterConstant(ctx, "KEY_F12", KEY_F12);
  RegisterConstant(ctx, "KEY_RIGHT", KEY_RIGHT);
  RegisterConstant(ctx, "KEY_LEFT", KEY_LEFT);
  RegisterConstant(ctx, "KEY_DOWN", KEY_DOWN);
  RegisterConstant(ctx, "KEY_UP", KEY_UP);
  RegisterConstant(ctx, "KEY_LEFT_CONTROL", KEY_LEFT_CONTROL);
  RegisterConstant(ctx, "KEY_LSHIFT", KEY_LEFT_SHIFT);
  RegisterConstant(ctx, "KEY_LEFT_ALT", KEY_LEFT_ALT);
  RegisterConstant(ctx, "KEY_RIGHT_CONTROL", KEY_RIGHT_CONTROL);
  RegisterConstant(ctx, "KEY_RSHIFT", KEY_RIGHT_SHIFT);
  RegisterConstant(ctx, "KEY_RIGHT_ALT", KEY_RIGHT_ALT);
}

duk_ret_t js_DrawRectFill(duk_context *ctx) {
  auto x = duk_to_int(ctx, 0);
  auto y = duk_to_int(ctx, 1);
  auto w = duk_to_int(ctx, 2);
  auto h = duk_to_int(ctx, 3);
  auto color = GetDukColor(ctx, 4);
  auto mul = GetContext()->GetMultiplier();
  DrawRectangle(x * mul, y * mul, w * mul, h * mul, color);
  return 0;
}
duk_ret_t js_DrawRect(duk_context *ctx) {
  auto x = duk_to_int(ctx, 0);
  auto y = duk_to_int(ctx, 1);
  auto w = duk_to_int(ctx, 2);
  auto h = duk_to_int(ctx, 3);
  auto color = GetDukColor(ctx, 4);
  auto mul = GetContext()->GetMultiplier();
  DrawRectangleLinesEx({static_cast<float>(x * mul), static_cast<float>(y * mul), static_cast<float>(w * mul),
                        static_cast<float>(h * mul)},
                       mul, color);
  return 0;
}
duk_ret_t js_DrawCircle(duk_context *ctx) {
  auto x = duk_to_int(ctx, 0);
  auto y = duk_to_int(ctx, 1);
  auto r = duk_to_int(ctx, 2);
  auto color = GetDukColor(ctx, 3);
  auto mul = GetContext()->GetMultiplier();
  DrawCircleLines(x * mul, y * mul, r * mul, color);
  return 0;
}
duk_ret_t js_DrawCircleFill(duk_context *ctx) {
  auto x = duk_to_int(ctx, 0);
  auto y = duk_to_int(ctx, 1);
  auto r = duk_to_int(ctx, 2);
  auto color = GetDukColor(ctx, 3);
  auto mul = GetContext()->GetMultiplier();
  // TODO: fix circle contour thickness
  DrawCircle(x * mul, y * mul, r * mul, color);
  return 0;
}

static duk_ret_t js_Trace(duk_context *ctx) {
  duk_push_string(ctx, " ");
  duk_insert(ctx, 0);
  duk_join(ctx, duk_get_top(ctx) - 1);

  TraceLog(LOG_INFO, duk_safe_to_string(ctx, -1));

  return 0;
}

static duk_ret_t js_Reset(duk_context *ctx) {
  GetContext()->Reset();
  return 0;
}

duk_ret_t js_ShowText(duk_context *ctx) {
  std::string str = duk_to_string(ctx, 0);
  auto x = duk_to_int(ctx, 1);
  auto y = duk_to_int(ctx, 2);
  auto color = GetDukColor(ctx, 3);
  auto size = GetDukInt(ctx, 4, 1);
  //  auto spacing = GetDukInt(ctx, 5, 0);
  auto mul = GetContext()->GetMultiplier();
  DrawText(str.c_str(), x * mul, y * mul, size, color);
  return 0;
}

duk_ret_t js_DrawSprite(duk_context *ctx) {
  auto idx = duk_to_int(ctx, 0);
  auto x = duk_to_int(ctx, 1);
  auto y = duk_to_int(ctx, 2);
  auto scale = GetDukInt(ctx, 3, 1);
  auto mul = GetContext()->GetMultiplier();
  auto sprite = GetContext()->GetSpriteSheet()->GetSprite(idx);
  DrawTextureEx(sprite, {static_cast<float>(x * mul), static_cast<float>(y * mul)}, 0, mul * scale, WHITE);
  return 0;
}

duk_ret_t js_IsButtonPressed(duk_context *ctx) {
  auto key = duk_to_int(ctx, 0);
  auto res = IsKeyPressed(key);
  duk_push_boolean(ctx, res);
  return 1;
}

duk_ret_t js_GetKeyPressed(duk_context *ctx) {
  auto res = GetKeyPressed();
  duk_push_int(ctx, res);
  return 1;
}

duk_ret_t js_GetFPS(duk_context *ctx) {
  duk_push_int(ctx, GetFPS());
  return 1;
}

static const struct {
  duk_c_function func;
  int params;
  const char *name;
} ApiFunc[] = {
    {js_Trace, DUK_VARARGS, "trace"},
    {js_DrawRectFill, 5, "draw_rect_fill"},
    {js_DrawRect, 5, "draw_rect"},
    {js_SetPixel, 3, "draw_pixel"},
    {js_DrawClearScreen, 1, "draw_clear_screen"},
    {js_DrawLine, 5, "draw_line"},
    {js_DrawCircle, 4, "draw_circle"},
    {js_DrawCircleFill, 4, "draw_circle_fill"},
    {js_Reset, 0, "reset"},
    {js_DrawSprite, 7, "draw_sprite"},
    {js_ShowText, 6, "draw_text"},
    {js_GetFPS, 0, "getFPS"},
    {js_IsButtonPressed, 1, "isPressed"},
    {js_GetKeyPressed, 0, "getPressed"}
    //    {js_ImportMusic, 2, "importMusic"},
    //    {js_ImportSFX, 2, "importSFX"},
    //    {js_PlayMusic, 2, "playMusic"},
    //    {js_PlaySFX, 3, "playSFX"},
};

static void RegisterInputs(duk_context *ctx) {
  auto idx = duk_push_object(ctx);
  for (auto &key : GetContext()->keys) {
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
  SetupKeys(ctx);
  RegisterConstant(ctx, "DISPLAY_HEIGHT", GetContext()->canvas_height());
  RegisterConstant(ctx, "DISPLAY_WIDTH", GetContext()->canvas_width());
  OnUpdateJsLib(ctx);
}

void OnUpdateJsLib(duk_context *ctx) {
  RegisterInputs(ctx);
  RegisterTimers(ctx);
}