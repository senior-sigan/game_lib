#include "js_runtime.hpp"

#include <duktape.h>

#include "duk_helpers.hpp"
#include "js_lib.hpp"
#include "js_stl.hpp"

void JsRuntimeHolder::OnDraw() {
  CallFunc(ctx, "draw");
}
void JsRuntimeHolder::OnUpdate() {
  OnUpdateJsLib(ctx);
  CallFunc(ctx, "update");
}
void JsRuntimeHolder::OnInit() {
  setup();
  CallFunc(ctx, "init");
}
void JsRuntimeHolder::setup() {
  RegisterJsSTL(ctx);
  RegisterJsLib(ctx);
  duk_push_global_object(ctx);
  RunScript(ctx, script_path_.c_str());
}
JsRuntimeHolder::JsRuntimeHolder(const std::string& script_path)
    : ctx(duk_create_heap_default()), script_path_(script_path) {
  if (!ctx) {
    exit(-1);
  }
}
JsRuntimeHolder::~JsRuntimeHolder() {
  duk_destroy_heap(ctx);
}
