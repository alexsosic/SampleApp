/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Geolocation from '@react-native-community/geolocation';

Icon.loadFont();

const App: () => React$Node = () => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);
  const [location, setLocation] = useState();

  const background = {uri: 'https://i.imgur.com/lIirgdw.jpg'};

  Geolocation.getCurrentPosition(
    (position) => {
      const initialPosition = JSON.stringify(position);
      setLocation({initialPosition});
    },
    (error) => Alert.alert('Error', JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  );

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionItem}>
              <TouchableOpacity
                style={styles.stepButton}
                onPress={() => {
                  setHasPhoto(true);
                  Alert.alert('Usklikaj pressed');
                }}>
                <Icon name="camera" size={32} color="white" />
                <Text style={styles.sectionTitle}>Uslikaj</Text>
                {hasPhoto && <Icon name="check" size={36} color="white" />}
              </TouchableOpacity>
            </View>
            <View style={styles.sectionItem}>
              <TouchableOpacity
                style={styles.stepButton}
                onPress={() => {
                  setHasDescription(true);
                  Alert.alert('Opisi pressed');
                }}>
                <Icon name="pencil" size={36} color="white" />
                <Text style={styles.sectionTitle}>Opiši</Text>
                {hasDescription && <Icon name="check" size={36} color="white" />}
              </TouchableOpacity>
            </View>
            <View style={styles.sectionItem}>
              <TouchableOpacity
                style={styles.stepButton}
                onPress={() => {
                  setHasLocation(true);
                  Alert.alert('Lociraj pressed');
                }}>
                <Icon name="map-marker" size={42} color="white" />
                <Text style={styles.sectionTitle}>Lociraj</Text>
                {hasLocation && <Icon name="check" size={36} color="white" />}
              </TouchableOpacity>
              <Text>{JSON.stringify(location)}</Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              disabled={!(hasPhoto && hasDescription && hasLocation)}
              style={styles.loginScreenButton}
              onPress={() => Alert.alert('Send Button pressed')}
              underlayColor="#fff">
              <Text style={styles.loginText}>Pošalji</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  sectionContainer: {
    paddingHorizontal: 24,
  },
  stepButton: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionItem: {
    marginTop: 48,
  },
  sectionTitle: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  loginScreenButton: {
    paddingRight: 100,
    paddingLeft: 100,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#29733b',
  },
  loginText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
});

export default App;
