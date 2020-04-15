cmake_minimum_required(VERSION 3.15)
project(fantasy_console)

set(CMAKE_CXX_STANDARD 17)

if (EMSCRIPTEN)
    set(PLATFORM Web)
    set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
    set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
    set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE BOTH)
    set(CMAKE_FIND_ROOT_PATH_MODE_PACKAGE ONLY)

    add_definitions(-DPLATFORM_WEB)
    add_definitions(-DUSE_WASM)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} --bind --memory-init-file 0 -s INITIAL_MEMORY=64MB -s SAFE_HEAP=1")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s USE_GLFW=3 -s USE_WEBGL2=1 -s FORCE_FILESYSTEM=1")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s WASM=1")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s ASSERTIONS=1")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} --use-preload-plugins")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} --embed-file examples@/")
    set(CMAKE_EXECUTABLE_SUFFIX ".js")

    file(COPY examples DESTINATION ${CMAKE_BINARY_DIR}/)
    file(COPY examples/index.html DESTINATION ${CMAKE_BINARY_DIR}/)
else ()
    file(COPY examples/ DESTINATION ${CMAKE_BINARY_DIR})
endif ()

file(GLOB_RECURSE SOURCES src/*.cpp)
file(GLOB_RECURSE HEADERS src/*.hpp)

add_executable(${PROJECT_NAME} ${SOURCES} ${HEADERS})

add_subdirectory(vendor/duktape)
add_subdirectory(vendor/raylib)

target_include_directories(${PROJECT_NAME} PUBLIC SYSTEM vendor/duktape)
target_include_directories(${PROJECT_NAME} PUBLIC SYSTEM vendor/raylib/src)
target_link_libraries(${PROJECT_NAME} duktape raylib)
