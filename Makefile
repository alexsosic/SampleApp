.PHONY: start
start:
	react-native start --reset-cache

.PHONY: cleanup
cleanup:
	rm -rf /tmp/metro-*
	watchman watch-del-all
	rm -r node_modules/
	yarn install
	npx pod-install

.PHONY: ios
ios:
	yarn run ios
