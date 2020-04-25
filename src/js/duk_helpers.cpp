#include "duk_helpers.hpp"

#include <iostream>
#include <cstdio>
#include <string>

int GetDukInt(duk_context* ctx, int idx, int null_case) {
  return duk_is_null_or_undefined(ctx, idx) ? null_case : duk_to_int(ctx, idx);
}
const char* GetDukStr(duk_context* ctx, int idx, const char* null_case) {
  return duk_is_null_or_undefined(ctx, idx) ? null_case : duk_to_string(ctx, idx);
}
bool GetDukBool(duk_context* ctx, int idx, bool null_case) {
  return duk_is_null_or_undefined(ctx, idx) ? null_case : duk_to_boolean(ctx, idx);
}
void PushFileAsString(duk_context* ctx, const char* filename) {
  FILE* f = fopen(filename, "rb");
  if (f) {
    fseek(f, 0L, SEEK_END);
    size_t len = ftell(f);
    printf("File size %s is %ld\n", filename, len);
    rewind(f);
    char* buf = new char[len];
    auto read_bytes = fread((void*) buf, 1, len, f);
    fclose(f);
    duk_push_lstring(ctx, (const char*) buf, (duk_size_t) read_bytes);
  } else {
    std::cerr << "Cannot open file " << filename << std::endl;
    duk_push_undefined(ctx);
  }
}
void RunScript(duk_context* ctx, const char* filename) {
  printf("Running script: %s\n", filename);
  PushFileAsString(ctx, filename);
  if (duk_peval(ctx) != 0) {
    printf("Error: %s\n", duk_safe_to_string(ctx, -1));
    return;
  }
  duk_pop(ctx);
}

void RegisterConstant(duk_context* ctx, const char* name, duk_double_t value) {
  duk_push_number(ctx, value);
  duk_put_global_string(ctx, name);
}

void CallFunc(duk_context* ctx, const char* name) {
  duk_get_prop_string(ctx, -1, name);
  if (duk_pcall(ctx, 0) != 0) {
    std::cerr << name << ": " << duk_safe_to_string(ctx, -1) << std::endl;
  }
  duk_pop(ctx);
}
