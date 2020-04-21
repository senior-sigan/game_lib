#pragma once

#include <vector>
#include <raylib.h>

class SpriteSheet {
  std::vector<Texture2D> sprites_;

 public:
  void AddSprite(std::vector<std::vector<int>> sprite);
  [[nodiscard]] Texture2D GetSprite(int idx) const;
};
