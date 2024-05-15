/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, ProgressBarAndroid, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithCredential, GoogleAuthProvider, sendEmailVerification } from 'firebase/auth';
import { auth, firestore } from './firebaseConfig'; // Import Firestore and Auth from your config
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import { doc, setDoc } from 'firebase/firestore'; // Import required functions from Firestore

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');  
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0); // Updated state initialization
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [name, setName] = useState('');

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Add user info to Firestore
      const userDocRef = doc(firestore, "users", user.uid); // Create a document reference with the user's UID
      await setDoc(userDocRef, {
        name: name,
        email: email
      });

      Alert.alert("Success", "Account created successfully. Please verify your email.");
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
    const mediumRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (strongRegex.test(password)) {
      setPasswordFeedback('');
      return 1; // Strong
    } else if (mediumRegex.test(password)) {
      setPasswordFeedback('Add special characters and numbers for stronger password');
      return 0.5; // Medium
    } else {
      setPasswordFeedback('Password must be at least 8 characters long with special characters, numbers, uppercase, and lowercase letters');
      return 0.2; // Weak
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordStrength(checkPasswordStrength(text));
  };

  const getProgressBarColor = (strength) => {
    if (strength === 1) {
      return '#00FF00'; // Green for strong
    } else if (strength === 0.5) {
      return '#FFFF00'; // Yellow for medium
    } else {
      return '#FF0000'; // Red for weak
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
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry={passwordVisibility}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)}>
          <Icon name={passwordVisibility ? 'eye-slash' : 'eye'} style={styles.icon} size={20} color="grey"/>
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password"
          secureTextEntry={confirmPasswordVisibility}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}>
          <Icon name={confirmPasswordVisibility ? 'eye-slash' : 'eye'} style={styles.icon} size={20} color="grey"/>
        </TouchableOpacity>
      </View>
      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={passwordStrength}
        color={getProgressBarColor(passwordStrength)} // Dynamically set color
        style={styles.progressBar}
      />
      <Text style={styles.passwordFeedback}>{passwordFeedback}</Text>
      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 200
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#333333',
    marginBottom: 40,
  },
  googleButton: {
    width: '80%',
    backgroundColor: '#FF914D',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: -10,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    width: '80%',
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    flex: 1,
    height: 50,
    color: 'black',
  },
  signupBtn: {
    width: '80%',
    backgroundColor: '#335E90',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  progressBar: {
    width: '80%',
    height: 20,
    borderRadius: 25,
  },
  passwordFeedback: {
    maxWidth: '80%',
    textAlign: 'center',
    marginTop: 10,
    color: '#FF0000',
  },
});

export default SignupScreen;
