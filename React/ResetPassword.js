/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './FirebaseConfig'; // Make sure this points to your Firebase config file

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleSendResetEmail = async () => {
    if (email.trim() === '') {
      Alert.alert('Enter your email', 'Please enter your email address to reset your password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Check your email', 'A link to reset your password has been sent to your email address.');
    } catch (error) {
      Alert.alert('Failed to send reset email', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Reset Password</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSendResetEmail}>
        <Text style={styles.loginText}>SEND RESET EMAIL</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#0000FF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#000000',
    marginBottom: 40,
  },
});

export default ResetPasswordScreen;
