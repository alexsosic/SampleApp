.PHONY: start
start:
	react-native start --reset-cache

.PHONY: cleanup
cleanup:
	watchman watch-del-all
	rm -rf /tmp/metro-*
	rm -r node_modules/
	yarn install
	npx pod-install

.PHONY: ios
ios:
	yarn run ios
