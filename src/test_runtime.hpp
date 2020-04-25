#pragma once

#include "core/i_runtime.hpp"
#include "effects/particles_system.hpp"

class TestRuntime: public IRuntime {
  ParticlesSystem ps{ 50, 50,ParticlesSystemConfig{}};
 public:
  void OnInit() override;
  void OnUpdate() override;
  void OnDraw() override;
};
