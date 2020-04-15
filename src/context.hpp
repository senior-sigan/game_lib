#pragma once

#include <raylib.h>

#include <memory>

class JsRuntimeHolder;

class Context {
  const int canvas_width_ = 240;
  const int canvas_height_ = 136;
  bool should_stop_ = false;
  JsRuntimeHolder* runtime_{};
  Rectangle canvasField_{};
  Rectangle dest_rect_{};
  float scale_ = 1.0f;
  RenderTexture2D canvas_{};

  void UpdateDestRect();

  [[nodiscard]] float canvas_height() const {
    return static_cast<float>(canvas_height_);
  }

  [[nodiscard]] float canvas_width() const {
    return static_cast<float>(canvas_width_);
  }

 public:
  void Init(JsRuntimeHolder* runtime);
  void Update();
  void Reset();
  ~Context();

  // ShouldStop returns true if user decided to restart cartridge
  [[nodiscard]] bool ShouldStop() const;
  // ShouldExit returns true if user decided to exit from the app
  [[nodiscard]] bool ShouldExit() const;

  [[nodiscard]] Vector2 GetVirtualMousePosition() const;
};

Context* GetContext();
void SetContext(Context* context);