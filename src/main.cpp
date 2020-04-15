#include <duktape.h>

#include "context.hpp"
#include "js_runtime.hpp"

int main() {
  JsRuntimeHolder js("example.js");

  context.Init(&js);
  context.RunLoop();
  context.Dispose();

  return 0;
}
