#include "test_runtime.hpp"
#include <raylib.h>
#include "context.hpp"

void TestRuntime::OnInit() {
  ps.Init();
}
void TestRuntime::OnUpdate() {
  if (IsKeyDown(KEY_W)) {
    ps.posY_ -= 40*GetFrameTime();
  }
  if (IsKeyDown(KEY_S)) {
    ps.posY_ += 40*GetFrameTime();
  }
  if (IsKeyDown(KEY_A)) {
    ps.posX_ -= 40*GetFrameTime();
  }
  if (IsKeyDown(KEY_D)) {
    ps.posX_ += 40*GetFrameTime();
  }
  ps.Update();
}
void TestRuntime::OnDraw() {
  ClearBackground(BLACK);
  ps.Draw();
  auto mul = GetContext()->GetMultiplier();
  DrawRectangle(mul*ps.posX_, mul*ps.posY_, 10, 10, RED);
}
