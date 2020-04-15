#include "context.hpp"

Context* GLOBAL_CONTEXT = nullptr;

Context* GetContext() {
  return GLOBAL_CONTEXT;
}
void SetContext(Context* context) {
  GLOBAL_CONTEXT = context;
}