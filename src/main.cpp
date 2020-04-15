#include <duktape.h>

#include "context.hpp"
#include "js_runtime.hpp"

static bool run() {
  JsRuntimeHolder js("example.js");
  Context ctx{};
  SetContext(&ctx);

  GetContext()->Init(&js);
  while (!GetContext()->ShouldStop()) {
    GetContext()->Update();
  }
  return !GetContext()->ShouldExit();
}

int main() {
  // Infinite loop of restarts
  while (run())
    ;
  return 0;
}
