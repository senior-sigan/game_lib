#pragma once

#include <string>
#include "context.hpp"


typedef struct duk_hthread duk_context;

class JsRuntimeHolder {
  duk_context* const ctx;
  const std::string script_path_;

  void setup();

 public:
  explicit JsRuntimeHolder(const std::string& script_path);
  void OnInit();
  void OnUpdate();
  void OnDraw();
  ~JsRuntimeHolder();
};