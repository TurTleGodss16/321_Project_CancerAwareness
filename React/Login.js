/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import SignupScreen from './Signup';
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
    if (username && password) {
      navigation.navigate('Main'); // Ensure 'Main' matches your target screen's route name
    } else {
      alert('Invalid username or password.');
    }
  };

  const handleGoToSignup = () => {
    console.log("Navigate to SignupScren");
    navigation.navigate('SignupScreen'); // Ensure 'SignupScreen' matches your Signup screen's route name
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
        <TouchableOpacity style={styles.registerButton} onPress={handleGoToSignup}>
          <Text style={styles.registerButtonText}>Click here to register</Text>
        </TouchableOpacity>
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
  registerButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
