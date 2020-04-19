#include "sprite_sheet.hpp"

#include <raylib.h>

#include "../context.hpp"

void SpriteSheet::AddSprite(std::vector<std::vector<int>> sprite) {
  auto h = sprite.size();
  auto w = sprite[0].size();
  auto pixels = new Color[h * w];
  for (int i = 0; i < h; i++) {
    for (int j = 0; j < w; j++) {
      if (sprite[i][j] == 0) {
        pixels[j + i * w] = {0, 0, 0, 0};
      } else {
        pixels[j + i * w] = GetContext()->palette.at(sprite[i][j]);
      }
    }
  }
  auto image = LoadImageEx(pixels, w, h);
  sprites_.push_back(LoadTextureFromImage(image));
}
Texture2D SpriteSheet::GetSprite(int idx) const {
  auto i = idx % sprites_.size();
  if (i != idx) {
    TraceLog(LOG_WARNING, "GetSprite: id out of range: %d", idx);
  }
  return sprites_.at(i);
}
