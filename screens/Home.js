/**
 * Smart Pula
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import md5 from 'md5';
import 'react-native-get-random-values';
import {uuid, isUuid} from 'uuidv4';
import AsyncStorage from '@react-native-community/async-storage';

import {changeAppId} from '../actions/appId';
import {changeImage} from '../actions/image';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

Icon.loadFont();

function HomeScreen({navigation}) {
  const image = useSelector((state) => state.image);
  const description = useSelector((state) => state.description.text);
  const location = useSelector((state) => state.location);
  const appId = useSelector((state) => state.appId.id);
  const dispatch = useDispatch();

  const uuidValue = async () => {
    try {
      const value = await AsyncStorage.getItem('@uuid');
      if (!isUuid(value)) {
        const newId = uuid();
        await AsyncStorage.setItem('@uuid', newId);
        return newId;
      }
      return value;
    } catch (e) {
      console.log('AsyncStorage getData error: ', e);
      return null;
    }
  };

  const chooseImage = () => {
    let options = {
      title: 'Odaberi sliku',
      cameraType: 'front',
      mediaType: 'photo',
      quality: 0.6,
      maxWidth: 2000,
      maxHeight: 2000,
      allowsEditing: false,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        dispatch(changeImage(response));
      }
    });
  };

  const sendReport = () => {
    const xhr = new XMLHttpRequest();
    const body = {
      userid: appId,
      secure: md5(appId + 'nr4a6uaco58m').toString(),
      description: description,
      lat: location.latitude,
      lng: location.longitude,
      photo: image.data,
    };
    xhr.onload = function () {
      Alert.alert('Prijava uspješno poslana!');
      console.log(xhr.responseText);
    };
    xhr.open('POST', 'http://www.smartpula.eu/api/reports/');
    xhr.send(JSON.stringify(body));
  };

  const background = {uri: 'https://i.imgur.com/lIirgdw.jpg'};

  useEffect(() => {
    uuidValue().then((id) => dispatch(changeAppId(id)));
  }, [dispatch]);

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
                  chooseImage();
                }}>
                <Icon name="camera" size={32} color="white" />
                <Text style={styles.sectionTitle}>Uslikaj</Text>
                {image.uri !== '' && (
                  <Icon name="check" size={36} color="white" />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.sectionItem}>
              <TouchableOpacity
                style={styles.stepButton}
                onPress={() => {
                  navigation.navigate('Describe');
                }}>
                <Icon name="pencil" size={36} color="white" />
                <Text style={styles.sectionTitle}>Opiši</Text>
                {description !== '' && (
                  <Icon name="check" size={36} color="white" />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.sectionItem}>
              <TouchableOpacity
                style={styles.stepButton}
                onPress={() => {
                  navigation.navigate('Map');
                }}>
                <Icon name="map-marker" size={42} color="white" />
                <Text style={styles.sectionTitle}>Lociraj</Text>
                {location.latitude !== 0 && (
                  <Icon name="check" size={36} color="white" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              disabled={
                !(
                  image.uri !== '' &&
                  description !== '' &&
                  location.latitude !== 0
                )
              }
              style={styles.postButton}
              onPress={() => sendReport()}
              underlayColor="#fff">
              <Text style={styles.postText}>Pošalji</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

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
  postButton: {
    paddingRight: 100,
    paddingLeft: 100,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#29733b',
  },
  postText: {
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

export default HomeScreen;
