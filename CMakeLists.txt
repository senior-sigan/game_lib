cmake_minimum_required(VERSION 3.15)
project(fantasy_console)

set(CMAKE_CXX_STANDARD 17)

find_package(raylib 3.0.0 REQUIRED)

file(GLOB_RECURSE SOURCES src/*.cpp)
file(GLOB_RECURSE HEADERS src/*.hpp)

file(COPY examples/ DESTINATION ${CMAKE_BINARY_DIR})

add_executable(${PROJECT_NAME} ${SOURCES} ${HEADERS})

add_subdirectory(vendor/duktape)

target_include_directories(${PROJECT_NAME} PUBLIC SYSTEM vendor/duktape)
target_link_libraries(${PROJECT_NAME} duktape raylib)
