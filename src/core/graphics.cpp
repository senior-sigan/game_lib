#include "graphics.hpp"

#include <raylib.h>
#include "../context.hpp"

void drawPixel(int posX, int posY, Color color) {
  auto mul = GetContext()->GetMultiplier();
  DrawRectangle(posX * mul, posY * mul, mul, mul, color);
}