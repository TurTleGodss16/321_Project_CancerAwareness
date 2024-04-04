import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '552731092988-j76omm78blqb4gskq6mal294mnrv0l3e.apps.googleusercontent.com',
    });
  }, []);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Signup Failed", "The passwords do not match.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully");
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential);
      Alert.alert("Success", "Signed in with Google");
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert("Google Sign-up Failed", error.message);
    }
  };

  const checkPasswordStrength = (password) => {
    const strongRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).{8,}$/;
    const mediumRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).{6,}$/;
    if (strongRegex.test(password)) {
      return 'Strong';
    } else if (mediumRegex.test(password)) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordStrength(checkPasswordStrength(text));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Cancer Awareness</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Text>Password Strength: {passwordStrength}</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up with Email</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignup}>
        <Text style={styles.buttonText}>Sign Up with Google</Text>
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
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#000000',
    marginBottom: 40,
  },
  googleButton: {
    width: '80%',
    backgroundColor: '#db3236',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  button: {
    width: '80%',
    backgroundColor: '#0000FF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
