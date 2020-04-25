#pragma once

#include <raylib.h>

#include <stack>
#include <vector>

#include "particle.hpp"

class FloatGen {
  float min_;
  float max_;

 public:
  FloatGen(float min, float max) : min_(min), max_(max) {}

  operator float() const {
    float r = static_cast<float>(std::rand()) / static_cast<float>(RAND_MAX);
    if (r < 0) {
      r = 0;
    }
    if (r >= 1) {
      r = 1.0;
    }
    return r * (max_ - min_) + min_;
  }

  operator int() const {
    return static_cast<int>(static_cast<float>(*this));
  }
};

struct ParticlesSystemConfig {
  // unity sets emission per distance!
  const float interval = 0.1;
  const int nParticlesPerInterval = FloatGen(50, 400);

  const float particleLifetime = 1.2;

  const FloatGen velocityX{15, 40};
  const FloatGen velocityY{-5, 5};

  // TODO: should be function, or even graphic...
  const int maxVelocity = -1;  // for air effect. -1 means no limits

  const float duration = 4;     // lifetime duration of the system in seconds
  const bool looped = true;     // if true restart system after lifetime become zero
  const int maxParticles = 1000;  // limit number of particles alive at one time
};

class ParticlesSystem {
  std::stack<int> deadIdx{};
  std::vector<Particle> particles_{};
  const ParticlesSystemConfig config_;

  float timer = 0;
  float lifeTime;
  bool isAlive = false;

  int getDeadParticle() {
    if (deadIdx.empty()) {
      return -1;
    }
    auto idx = deadIdx.top();
    deadIdx.pop();
    return idx;
  }

  void generateParticles() {
    for (auto i = 0; i < config_.nParticlesPerInterval; i++) {
      auto idx = getDeadParticle();
      if (idx < 0) return;
      particles_.at(idx).Init(posX_, posY_, config_.particleLifetime, config_.velocityX, config_.velocityY);
    }
  }

 public:
  float posX_;
  float posY_;

  explicit ParticlesSystem(int posX, int posY, const ParticlesSystemConfig& config)
      : posX_(posX), posY_(posY), config_(config) {
    particles_.reserve(config.maxParticles);
    for (auto i = 0; i < config.maxParticles; i++) {
      particles_.emplace_back(deadIdx, i);
      deadIdx.push(i);
    }
  }

  void Init() {
    isAlive = true;
  }
  void Draw() {
    for (auto& particle : particles_) {
      if (particle.IsAlive()) {
        particle.Draw();
      }
    }
  }
  void Update() {
    timer += GetFrameTime();
    if (lifeTime >= config_.duration) {
      isAlive = false;
      if (config_.looped) {
        Init();
      }
    }

    lifeTime += GetFrameTime();
    if (timer >= config_.interval && isAlive) {
      timer -= config_.interval;
      generateParticles();
    }
    for (auto& particle : particles_) {
      if (particle.IsAlive()) {
        particle.Update();
      }
    }
  }
};
