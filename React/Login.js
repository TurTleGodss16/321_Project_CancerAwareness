/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform authentication logic here
    // For simplicity, consider any non-empty username/password as a successful login
    if (username && password) {
      navigation.navigate('Main');
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <View>
      <View style={{alignItems: 'center', alignSelf: 'center'}}>
        <Text style={styles.welcome_text}>Welcome to Awareness Cancer App</Text>
      </View>
      <SafeAreaView
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={{textAlign: 'center'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View
        style={{
          marginTop: 30,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{textAlign: 'center', color: 'black', marginBottom: 15}}>
          Or login with
        </Text>
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              marginRight: 25,
              backgroundColor: 'grey',
            }}
            source={require('../Images/facebook_icon.png')}
          />
          <Image
            style={{width: 30, height: 30, marginRight: 25}}
            source={require('../Images/google_icon.png')}
          />
          <Image
            style={{width: 30, height: 30}}
            source={require('../Images/twitter_icon.png')}
          />
        </View>
      </View>

      <View style={{marginTop: 30, alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{textAlign: 'center', color: '#0000FF'}}>
          You don't have an account? Register here!!!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: 150,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  welcome_text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default LoginScreen;
