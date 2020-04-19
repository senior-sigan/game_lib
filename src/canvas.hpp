#pragma once

#include <raylib.h>

class Canvas {
  Rectangle canvas_field_{};
  Rectangle dest_rect_{};
  float scale_ = 1.0f;

  int canvas_width_;
  int canvas_height_;
  void UpdateDestRect();
 public:
  RenderTexture2D canvas_{};

  Canvas(int canvas_width, int canvas_height);
  void Update();
  void Draw();

  [[nodiscard]] float GetScale() const;
};
