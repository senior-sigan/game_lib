#pragma once

typedef struct duk_hthread duk_context;

void RegisterJsLib(duk_context *ctx);
void OnUpdateJsLib(duk_context *ctx);