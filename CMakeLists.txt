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
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} --embed-file ludum_46@/")
    set(CMAKE_EXECUTABLE_SUFFIX ".js")

    file(COPY ludum_46 DESTINATION ${CMAKE_BINARY_DIR}/)
    file(COPY ludum_46/index.html DESTINATION ${CMAKE_BINARY_DIR}/)
else ()
    file(COPY ludum_46/ DESTINATION ${CMAKE_BINARY_DIR})
endif ()

file(GLOB_RECURSE SOURCES src/*.cpp)
file(GLOB_RECURSE HEADERS src/*.hpp)

add_executable(${PROJECT_NAME} ${SOURCES} ${HEADERS})

add_subdirectory(vendor/duktape)
add_subdirectory(vendor/raylib)

target_include_directories(${PROJECT_NAME} PUBLIC SYSTEM vendor/duktape)
target_include_directories(${PROJECT_NAME} PUBLIC SYSTEM vendor/raylib/src)
target_link_libraries(${PROJECT_NAME} duktape raylib)


function(create_zip output_file input_files working_dir)
    add_custom_command(
        COMMAND ${CMAKE_COMMAND} -E tar "cf" "${output_file}" --format=zip -- ${input_files}
        WORKING_DIRECTORY "${working_dir}"
        OUTPUT  "${output_file}"
        DEPENDS ${input_files}
        COMMENT "Zipping to ${output_file}."
    )
endfunction()


if (EMSCRIPTEN)
    list(APPEND BundleFiles "${CMAKE_BINARY_DIR}/index.html" "${CMAKE_BINARY_DIR}/fantasy_console.wasm" "${CMAKE_BINARY_DIR}/fantasy_console.js")
    create_zip("${CMAKE_BINARY_DIR}/web_bundle.zip" "${BundleFiles}" ${CMAKE_BINARY_DIR})
    add_custom_target("make_web_bundle" ALL DEPENDS "${CMAKE_BINARY_DIR}/web_bundle.zip")
endif()