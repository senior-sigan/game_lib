#include <duktape.h>
#include <raylib.h>

#include <string>

#include "duk_helpers.hpp"
#include "js_lib.hpp"
#include "js_stl.hpp"

const int screenWidth = 240;
const int screenHeight = 136;

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

  InitWindow(screenWidth, screenHeight, "Fantasy Console");
  SetTargetFPS(30);

  bool started = false;

  while (!WindowShouldClose()) {
    if (!started) {
      started = true;
      js.OnInit();
    }
    js.OnUpdate();

    BeginDrawing();
    js.OnDraw();
    EndDrawing();
  }
  CloseWindow();

  return 0;
}
