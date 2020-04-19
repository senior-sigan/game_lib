#include "context.hpp"

#include <raylib.h>

#include <algorithm>
#include <cmath>

static constexpr Vector2 ZeroVector2{0, 0};

static Vector2 ClampValue(Vector2 value, Vector2 min, Vector2 max) {
  Vector2 result = value;
  result.x = (result.x > max.x) ? max.x : result.x;
  result.x = (result.x < min.x) ? min.x : result.x;
  result.y = (result.y > max.y) ? max.y : result.y;
  result.y = (result.y < min.y) ? min.y : result.y;
  return result;
}

void Context::UpdateDestRect() {
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

void Context::Init(IRuntime* runtime) {
  runtime_ = runtime;
  runtime_->OnInit();

  int multi = 4;
  SetConfigFlags(FLAG_WINDOW_RESIZABLE | FLAG_VSYNC_HINT);
  InitWindow(canvas_width_ * multi, canvas_height_ * multi, "Fantasy Console");
  SetTargetFPS(60);

  canvas_ = LoadRenderTexture(canvas_width_, canvas_height_);
  SetTextureFilter(canvas_.texture, FILTER_POINT);

  canvasField_ = {
      0.0f,
      0.0f,
      static_cast<float>(canvas_.texture.width),
      -static_cast<float>(canvas_.texture.height),
  };
}
void Context::Update() {
  UpdateDestRect();
  runtime_->OnUpdate();
  BeginDrawing();
  ClearBackground(BLACK);
  BeginTextureMode(canvas_);
  runtime_->OnDraw();
  EndTextureMode();
  DrawTexturePro(canvas_.texture, canvasField_, dest_rect_, ZeroVector2, 0.0f, WHITE);
  EndDrawing();
}

Vector2 Context::GetVirtualMousePosition() const {
  auto mouse = GetMousePosition();
  auto sw = static_cast<float>(GetScreenWidth());
  auto sh = static_cast<float>(GetScreenHeight());
  auto x = (mouse.x - (sw - (canvas_width() * scale_)) * 0.5f) / scale_;
  auto y = (mouse.y - (sh - (canvas_height() * scale_)) * 0.5f) / scale_;
  return ClampValue(Vector2{x, y}, {0, 0}, {canvas_width(), canvas_height()});
}
bool Context::ShouldStop() const {
  return should_stop_ || ShouldExit();
}
bool Context::ShouldExit() const {
  return WindowShouldClose();
}
Context::~Context() {
  TraceLog(LOG_INFO, "Context destroyed");
  CloseWindow();
}
void Context::Reset() {
  should_stop_ = true;
}
Color Context::GetColor(int idx) const {
  return palette.at(idx % palette.size());
}
Context::Context(int canvas_width, int canvas_height, const std::map<std::string, KeyboardKey>& keys,
                 const std::vector<Color>& palette)
    : canvas_width_(canvas_width), canvas_height_(canvas_height), keys(keys), palette(palette) {}
