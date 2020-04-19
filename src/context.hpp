#pragma once

#include <raylib.h>

#include <vector>
#include <map>
#include <memory>
#include <string>

#include "core/i_runtime.hpp"
#include "core/sprite_sheet.hpp"

class Canvas;

class Context {
  bool should_stop_ = false;
  IRuntime* runtime_{};
  Canvas* canvas_{};
  SpriteSheet sprites{};
 public:
  const int canvas_width_;
  const int canvas_height_;
  const std::map<std::string, KeyboardKey> keys;
  const std::vector<Color> palette;
  Context(int canvas_width, int canvas_height, const std::map<std::string, KeyboardKey>& keys,
          const std::vector<Color>& palette);

  void Init(IRuntime* runtime);
  void Update();
  void Reset();
  ~Context();

  SpriteSheet* GetSpriteSheet() {
    return &sprites;
  }

  [[nodiscard]] Color GetColor(int idx) const;

  [[nodiscard]] int palette_len() const {
    return palette.size();
  }

  [[nodiscard]] float canvas_height() const {
    return static_cast<float>(canvas_height_);
  }

  [[nodiscard]] float canvas_width() const {
    return static_cast<float>(canvas_width_);
  }

  // ShouldStop returns true if user decided to restart cartridge
  [[nodiscard]] bool ShouldStop() const;
  // ShouldExit returns true if user decided to exit from the app
  [[nodiscard]] bool ShouldExit() const;

  [[nodiscard]] Vector2 GetVirtualMousePosition() const;

  [[nodiscard]] float GetScale() const;
};

Context* GetContext();
void SetContext(Context* context);