#pragma once

class IRuntime {
 public:
  virtual void OnInit() = 0;
  virtual void OnUpdate() = 0;
  virtual void OnDraw() = 0;
  virtual ~IRuntime() = default;
};
