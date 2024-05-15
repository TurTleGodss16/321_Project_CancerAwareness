/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [passwordVisibility, setPasswordVisibility] = useState(true);  

  useEffect(() => {
    // Configure Google Sign In
    GoogleSignin.configure({
      webClientId: '552731092988-j76omm78blqb4gskq6mal294mnrv0l3e.apps.googleusercontent.com',
    });

    // Check Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, navigate to Main
        navigation.navigate('Main');
        // Optionally, store a flag indicating login status
        await AsyncStorage.setItem('isLoggedIn', 'true');
      } else {
        // User is signed out, remove the flag
        await AsyncStorage.removeItem('isLoggedIn');
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigation]);

  const handleGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential);
      Alert.alert("Success", "Signed in with Google");
      navigation.navigate('Main');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Google Sign-in Cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Google Sign-in in Progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Google Play Services Not Available");
      } else {
        Alert.alert("Google Sign-in Failed", error.message);
      }
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Main');
      setLoginAttempts(0); // Reset login attempts after a successful login
    } catch (error) {
      Alert.alert('Invalid email or password.');
      setLoginAttempts(prevAttempts => prevAttempts + 1); // Increment login attempts on failure
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
      navigation.navigate('Main');
    } catch (error) {
      alert('Error logging in anonymously.');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../Images/logo.png')} 
        style={styles.logoImage} 
      />
      <Text style={styles.logo}>SCSG Awareness App</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      {loginAttempts >= 5 && (
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.resetPasswordText}>Forgot password? Reset here.</Text>
        </TouchableOpacity>
      )}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry={passwordVisibility}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)}>
          <Icon name={passwordVisibility ? 'eye-slash' : 'eye'} style={styles.icon} size={20} color="grey" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.anonymousBtn} onPress={handleAnonymousLogin}>
        <Text style={styles.loginText}>LOGIN ANONYMOUSLY</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignin}>
        <Text style={styles.buttonText}>LOGIN WITH GOOGLE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  googleButton: {
    width: '80%',
    backgroundColor: '#FF914D',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Consistent spacing with the bottom margin of the login button
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#333333', // Adjusted to match MainScreen's text color
    marginBottom: 40,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    height: 50,
    marginBottom: 20, // Consistent spacing for input fields
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    flex: 1,
    height: 50,
    color: 'black',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: -10,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#335E90', // Adjusted to match MainScreen's circle color
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Adjusted for consistency
    marginBottom: 10, // Ensures consistent spacing between the buttons
  },
  anonymousBtn: {
    width: '80%',
    backgroundColor: '#BCE08A', // Green color for anonymous login
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Adjusted for consistency
    marginBottom: 10, // Ensures consistent spacing between the buttons
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 20, // Match the spacing above for consistency
    color: '#0000FF',
    textDecorationLine: 'underline',
  },
  resetPasswordText: {
    color: '#0000FF',
    textDecorationLine: 'underline',
    marginBottom: 5, // Adjust this to ensure the spacing above the reset password text matches other spacings
  },
});

export default LoginScreen;
