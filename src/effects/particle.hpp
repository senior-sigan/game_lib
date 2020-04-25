#pragma once

#include <raylib.h>
#include <vector>
#include <stack>
#include "../core/graphics.hpp"

class Particle {
 protected:
  float posX_ = 0;
  float posY_ = 0;
  float dx_ = 0;
  float dy_ = 0;
  float life_ = 0;
  bool isAlive_ = false;

  std::stack<int>& deadIdx_;
  int idx_;

 public:
  Particle(std::stack<int>& deadIdx, int idx) : deadIdx_(deadIdx), idx_(idx) {}

  void Init(float posX, float posY, float lifeTime, float dx, float dy) {
    isAlive_ = true;
    life_ = lifeTime;
    posX_ = posX;
    posY_ = posY;
    dx_ = dx;
    dy_ = dy;
  }
  void Draw() const {
    drawPixel(static_cast<int>(posX_), static_cast<int>(posY_), GREEN);
  }
  void Update() {
    if (life_ <= 0 && isAlive_) {
      // save this particle to the dead-table for future reuse
      isAlive_ = false;
      deadIdx_.push(idx_);
      return;
    }

    posX_ += dx_ * GetFrameTime();
    posY_ += dy_ * GetFrameTime();
    life_ -= GetFrameTime();
  }

  [[nodiscard]] bool IsAlive() const {
    return isAlive_;
  }
};