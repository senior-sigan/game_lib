TARGET = fantasy_console

all: clean web desktop

web: web_reload web_build

desktop: desktop_reload desktop_build

clean: web_clean desktop_clean

desktop_clean:
	rm -rf cmake-build-debug

desktop_reload:
	cmake -Bcmake-build-debug

desktop_build:
	cmake --build cmake-build-debug -j 4

web_clean:
	rm -rf cmake-build-web

web_reload:
	emcmake cmake -Bcmake-build-web -DPLATFORM=Web

web_clean_js:
	rm cmake-build-web/fantasy_console.js

web_build: web_reload
	cmake --build cmake-build-web -j 4

vendor_zip:
	zip -r vendor vendor.zip

vendor_unzip:
	unzip vendor.zip

run_examples:
	cd examples; ../cmake-build-debug/fantasy_console lunar.js

run_game:
	cd ludum_46; ../cmake-build-debug/fantasy_console main.js