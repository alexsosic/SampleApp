/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';

import configureStore from './store/configureStore';
import HomeScreen from './screens/Home';
import DescribeScreen from './screens/Describe';
import MapScreen from './screens/Map';

const store = configureStore();
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Prijava'}}
          />
          <Stack.Screen
            name="Describe"
            component={DescribeScreen}
            options={{title: 'Opiši'}}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{title: 'Odaberi Lokaciju'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
