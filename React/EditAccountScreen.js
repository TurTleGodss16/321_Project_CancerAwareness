import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from './UserContext';
import { auth, firestore } from './firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { updateEmail, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification } from 'firebase/auth';

const EditAccountScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');

  const reauthenticate = async (currentPassword) => {
    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, cred);
  };

  const updateEmailAddress = async () => {
    try {
      await reauthenticate(currentPassword);
      const currentUser = auth.currentUser;

      if (user.email !== userEmail) {
        // Send verification email to the new email address
        await updateEmail(currentUser, userEmail);
        await sendEmailVerification(currentUser);
        Alert.alert("Verification Email Sent", "Please verify your new email address. After verification, log in again.");
        return;
      }

      // Update the user document in Firestore
      const userDocRef = doc(firestore, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        name: userName,
        email: userEmail,
      });

      setUser({ ...user, name: userName, email: userEmail });
      Alert.alert("Success", "Your account has been updated!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.title}>Edit Name</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />
        <Text style={styles.title}>Edit Email</Text>
        <TextInput
          style={styles.input}
          value={userEmail}
          onChangeText={setUserEmail}
          keyboardType="email-address"
        />
        <Text style={styles.title}>Current Password</Text>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          placeholder="Enter your current password"
        />
        <TouchableOpacity style={styles.button} onPress={updateEmailAddress}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  button: {
    width: '100%',
    backgroundColor: '#0000FF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditAccountScreen;
