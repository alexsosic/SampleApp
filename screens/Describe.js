/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {changeDescription} from '../actions/description';

function DescribeScreen({navigation}) {
  const description = useSelector((state) => state.description.text);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => dispatch(changeDescription(text))}
        value={description}
        multiline={true}
      />
      <TouchableOpacity
        style={styles.postButton}
        onPress={() => {
          navigation.navigate('Home');
        }}
        underlayColor="#fff">
        <Text style={styles.postText}>Potvrdi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 10,
    padding: 5,
    height: 200,
    borderColor: '#29733b',
    borderWidth: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
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
});

export default DescribeScreen;
