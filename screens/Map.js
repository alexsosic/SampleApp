/**
 * Smart Pula
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {changeLocation} from '../actions/location';

function MapScreen({navigation}) {
  const [mapRef, setMapRef] = useState();
  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const initialRegion = {
    latitude: location.latitude || 44.87,
    longitude: location.longitude || 13.84,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  };
  useEffect(() => {
    if (mapRef && location.latitude === 0 && location.longitude === 0) {
      Geolocation.getCurrentPosition(
        (position) => {
          const initialPosition = {
            latitude: position.coords.latitude || 0,
            longitude: position.coords.longitude || 0,
          };
          if (
            initialPosition.latitude !== 0 &&
            initialPosition.longitude !== 0
          ) {
            dispatch(changeLocation(initialPosition));
            mapRef.animateToRegion(
              {
                ...initialPosition,
                latitudeDelta: 0.04,
                longitudeDelta: 0.05,
              },
              500,
            );
          }
        },
        (error) => Alert.alert('Error', JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    }
  }, [dispatch, location.latitude, location.longitude, mapRef]);

  return (
    <MapView
      style={{...StyleSheet.absoluteFillObject}}
      ref={(ref) => setMapRef(ref)}
      showsUserLocation={true}
      initialRegion={initialRegion}>
      <Marker
        draggable
        coordinate={location}
        onDragEnd={(e) => dispatch(changeLocation(e.nativeEvent.coordinate))}
      />
    </MapView>
  );
}

export default MapScreen;
