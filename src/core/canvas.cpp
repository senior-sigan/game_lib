#include "canvas.hpp"

#include <algorithm>

void Canvas::UpdateDestRect() {
  auto cw = static_cast<float>(canvas_width_);
  auto ch = static_cast<float>(canvas_height_);
  auto sw = static_cast<float>(GetScreenWidth());
  auto sh = static_cast<float>(GetScreenHeight());
  scale_ = std::min(sw / cw, sh / ch);
  dest_rect_ = Rectangle{
      (sw - cw * scale_) * 0.5f,
      (sh - ch * scale_) * 0.5f,
      cw * scale_,
      ch * scale_,
  };
}

Canvas::Canvas(int canvas_width, int canvas_height) : canvas_width_(canvas_width), canvas_height_(canvas_height) {
  canvas_ = LoadRenderTexture(canvas_width_, canvas_height_);
  SetTextureFilter(canvas_.texture, FILTER_POINT);
  canvas_field_ = {
      0.0f,
      0.0f,
      static_cast<float>(canvas_.texture.width),
      -static_cast<float>(canvas_.texture.height),
  };
}
void Canvas::Update() {
  UpdateDestRect();
}
void Canvas::Draw() {
  DrawTexturePro(canvas_.texture, canvas_field_, dest_rect_, {0, 0}, 0.0f, WHITE);
}
float Canvas::GetScale() const {
  return scale_;
}
