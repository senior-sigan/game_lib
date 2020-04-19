#include "context.hpp"

#include <raylib.h>

#include <algorithm>
#include <cmath>

#include "canvas.hpp"

static constexpr Vector2 ZeroVector2{0, 0};

static Vector2 ClampValue(Vector2 value, Vector2 min, Vector2 max) {
  Vector2 result = value;
  result.x = (result.x > max.x) ? max.x : result.x;
  result.x = (result.x < min.x) ? min.x : result.x;
  result.y = (result.y > max.y) ? max.y : result.y;
  result.y = (result.y < min.y) ? min.y : result.y;
  return result;
}

void Context::Init(IRuntime* runtime) {
  int multi = 4;
  SetConfigFlags(FLAG_WINDOW_RESIZABLE | FLAG_VSYNC_HINT);
  InitWindow(canvas_width_ * multi, canvas_height_ * multi, "Fantasy Console");
  SetTargetFPS(60);

  canvas_ = new Canvas(canvas_width_ * GetMultiplier(), canvas_height_ * GetMultiplier());

  runtime_ = runtime;
  runtime_->OnInit();
}
void Context::Update() {
  canvas_->Update();
  runtime_->OnUpdate();
  BeginDrawing();
  ClearBackground(BLACK);
  BeginTextureMode(canvas_->canvas_);
  runtime_->OnDraw();
  EndTextureMode();
  canvas_->Draw();
  EndDrawing();
}

Vector2 Context::GetVirtualMousePosition() const {
  auto mouse = GetMousePosition();
  auto sw = static_cast<float>(GetScreenWidth());
  auto sh = static_cast<float>(GetScreenHeight());
  auto x = (mouse.x - (sw - (canvas_width() * GetScale())) * 0.5f) / GetScale();
  auto y = (mouse.y - (sh - (canvas_height() * GetScale())) * 0.5f) / GetScale();
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
  delete canvas_;
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
float Context::GetScale() const {
  return canvas_->GetScale();
}
int Context::GetMultiplier() const {
  return 4;
}
