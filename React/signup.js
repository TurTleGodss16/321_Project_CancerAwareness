import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import { auth } from './firebaseConfig'; // Adjusted import
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the specific function

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully");
      // Optionally navigate to the login screen or main app screen after signup
      navigation.navigate('Login'); // Change 'Login' to your login screen's route name if different
    } catch (error) {
      // Handle errors here, including displaying a notification
      Alert.alert("Signup Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
