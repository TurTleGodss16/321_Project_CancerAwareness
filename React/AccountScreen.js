import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from './UserContext';
import { auth } from './firebaseConfig';
import BottomNavigator from './BottomNavigator'; // Ensure the path is correct

const AccountScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [isAnonymous, setIsAnonymous] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      if (auth.currentUser) {
        setIsAnonymous(auth.currentUser.isAnonymous);
      }
    };

    checkUser();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => {
            auth.signOut().then(() => {
              setUser(null); // Clear user context
              navigation.navigate('Login');
            }).catch(error => {
              Alert.alert('Error', error.message);
            });
          }
        },
      ],
      { cancelable: true }
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.anonymousContainer}>
          <Text style={styles.anonymousText}>You are logged in anonymously.</Text>
          <Text style={styles.anonymousPrompt}>Please log in with your email address to access all features.</Text>
          <TouchableOpacity 
            style={styles.loginBtn} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginBtnText}>Login with Email</Text>
          </TouchableOpacity>
        </View>
        <BottomNavigator />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profileSection}>
          <Image
            source={user.profilePic ? { uri: user.profilePic } : require('../Images/ProfilePic.png')}
            style={styles.profileImage}
          />
          <Text style={styles.title}>Name</Text>
          <View style={styles.textBox}>
            <Text>{user.name}</Text>
          </View>
          <Text style={styles.title}>Email</Text>
          <View style={styles.textBox}>
            <Text>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileSection: {
    width: '90%',
    alignItems: 'center',
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
  },
  textBox: {
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
  logoutBtn: {
    width: '100%',
    backgroundColor: '#ff0000',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  anonymousContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  anonymousText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  anonymousPrompt: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#335E90',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AccountScreen;
