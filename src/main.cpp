#include <duktape.h>

#include "context.hpp"
#include "js_runtime.hpp"

#if defined(PLATFORM_WEB)
#include <emscripten/emscripten.h>
#endif

static const char* script_path = "main.js";

void UpdateDrawFrame() {
  GetContext()->Update();
}

static bool run() {
  JsRuntimeHolder js(script_path);
  Context ctx{};
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
