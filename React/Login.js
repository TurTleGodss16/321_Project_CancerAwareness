import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0); // State variable to count login attempts

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '552731092988-j76omm78blqb4gskq6mal294mnrv0l3e.apps.googleusercontent.com',
    });
  }, []);

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
      <Text style={styles.logo}>Cancer Awareness</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.resetPasswordText}>Forgot password? Reset here.</Text>
        </TouchableOpacity>
      )}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleAnonymousLogin}>
        <Text style={styles.loginText}>LOGIN ANONYMOUSLY</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignin}>
        <Text style={styles.buttonText}>SIGN IN WITH GOOGLE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
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
  googleButton: {
    width: '80%',
    backgroundColor: '#db3236',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#000000',
    marginBottom: 40,
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
  loginBtn: {
    width: '80%',
    backgroundColor: '#0000FF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 10,
    color: '#0000FF',
    textDecorationLine: 'underline',
  },
  resetPasswordText: {
    marginBottom: 5,
    color: '#0000FF',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
