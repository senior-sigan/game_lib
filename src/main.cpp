#include <duktape.h>

#include "context.hpp"
#include "js/js_runtime.hpp"

#if defined(PLATFORM_WEB)
#include <emscripten/emscripten.h>
#endif

static const char* script_path = "main.js";

void UpdateDrawFrame() {
  GetContext()->Update();
}

static bool run() {
  JsRuntimeHolder js(script_path);
  Context ctx(
      192, 128,
      {
          {"up", KEY_UP},
          {"down", KEY_DOWN},
          {"left", KEY_LEFT},
          {"right", KEY_RIGHT},
          {"start", KEY_ENTER},
          {"pause", KEY_P},
          {"space", KEY_SPACE},
          {"z", KEY_Z},
          {"x", KEY_X},
      },
      {
          {{43, 40, 33, 255},
              {98, 76, 60, 255},
              {217, 172, 139, 255},
              {227, 207, 180, 255},
              {36, 61, 92, 255},
              {93, 114, 117, 255},
              {92, 139, 147, 255},
              {177, 165, 141, 255},
              {176, 58, 72, 255},
              {212, 128, 77, 255},
              {224, 200, 114, 255},
              {62, 105, 88, 255}}
      });
  SetContext(&ctx);
  GetContext()->Init(&js);
#if defined(PLATFORM_WEB)
  emscripten_set_main_loop(UpdateDrawFrame, 0, 1);
#else
  while (!GetContext()->ShouldStop()) {
    UpdateDrawFrame();
  }
#endif
  return !GetContext()->ShouldExit();
}

int main(int argc, char** argv) {
  if (argc > 1) {
    script_path = argv[1];
  }

  // Infinite loop of restarts
  while (run())
    ;
  return 0;
}
