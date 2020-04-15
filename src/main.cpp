#include <duktape.h>
#include <raylib.h>

#include <string>

#include "duk_helpers.hpp"
#include "js_lib.hpp"
#include "js_stl.hpp"

const int canvasWidth = 240;
const int canvasHeight = 136;

class JsRuntimeHolder {
  duk_context* const ctx;
  const std::string script_path_;

 public:
  explicit JsRuntimeHolder(const std::string& script_path) : ctx(duk_create_heap_default()), script_path_(script_path) {
    if (!ctx) {
      exit(-1);
    }
  }

  void setup() {
    RegisterJsSTL(ctx);
    RegisterJsLib(ctx);
    duk_push_global_object(ctx);
    RunScript(ctx, script_path_.c_str());
  }

  void OnInit() {
    setup();
    CallFunc(ctx, "init");
  }

  void OnUpdate() {
    OnUpdateJsLib(ctx);
    CallFunc(ctx, "update");
  }

  void OnDraw() {
    CallFunc(ctx, "draw");
  }

  ~JsRuntimeHolder() {
    duk_destroy_heap(ctx);
  }
};

int main() {
  JsRuntimeHolder js("example.js");

  InitWindow(canvasWidth * 4, canvasHeight * 4, "Fantasy Console");
  SetTargetFPS(60);

  RenderTexture2D target = LoadRenderTexture(canvasWidth, canvasHeight);
  SetTextureFilter(target.texture, FILTER_POINT);

  Rectangle textureRect{
      0.0f,
      0.0f,
      static_cast<float>(target.texture.width),
      -static_cast<float>(target.texture.height),
  };

  bool started = false;

  while (!WindowShouldClose()) {
    if (!started) {
      started = true;
      js.OnInit();
    }

    auto sw = static_cast<float>(GetScreenWidth());
    auto sh = static_cast<float>(GetScreenHeight());
    auto scale = std::min(sw / canvasWidth, sw / canvasHeight);
    auto destRect = Rectangle{
        (sw - canvasWidth * scale) * 0.5f,
        (sh - canvasHeight * scale) * 0.5f,
        canvasWidth * scale,
        canvasHeight * scale,
    };

    js.OnUpdate();

    BeginDrawing();
    ClearBackground(BLACK);
    BeginTextureMode(target);
    js.OnDraw();
    EndTextureMode();
    DrawTexturePro(target.texture, textureRect, destRect, Vector2{0, 0}, 0.0f, WHITE);
    EndDrawing();
  }
  CloseWindow();

  return 0;
}
