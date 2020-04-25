#pragma once

#include <string>

#include "../context.hpp"
#include "../core/i_runtime.hpp"

typedef struct duk_hthread duk_context;

class JsRuntimeHolder : public IRuntime {
  duk_context* const ctx;
  const std::string script_path_;

  void setup();

 public:
  explicit JsRuntimeHolder(const std::string& script_path);
  void OnInit() override;
  void OnUpdate() override;
  void OnDraw() override;
  ~JsRuntimeHolder() override;
};