import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from './UserContext';
import { auth } from './firebaseConfig';

const AccountScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [isAnonymous, setIsAnonymous] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      if (auth.currentUser) {
        setIsAnonymous(auth.currentUser.isAnonymous);
      }
    };

    checkUser();
  }, []);

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
        </View>
        {/* Rest of the component */}
      </ScrollView>
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
    width: '80%',
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
    alignSelf: 'center',
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
    textAlign: 'left',
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
  recentArticles: {
    width: '80%',
    marginTop: 24,
  },
  recentArticle: {
    marginTop: 12,
  },
  recentArticleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentArticleExcerpt: {
    fontSize: 12,
    color: '#666',
  },
  bottomBar: {
    backgroundColor: 'white',
    height: 60,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  bottomBarIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
  },
  textDescription: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 4,
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
    marginBottom: 20,
  },
  anonymousPrompt: {
    fontSize: 16,
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
