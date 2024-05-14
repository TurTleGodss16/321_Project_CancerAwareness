import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, firestore } from './firebaseConfig'; // Import Firebase configuration
import { doc, getDoc } from 'firebase/firestore'; // Import required Firestore functions

const AccountScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name);
          setUserEmail(userData.email);
        }
      }
    };

    fetchUserData();
  }, []);

  const user = {
    recentArticles: [
      {
        title: 'Article 1 - Page 1',
        excerpt: 'First sentence from the page.',
      },
      {
        title: 'Article 2 - Page 42',
        excerpt: 'First sentence from the page.',
      },
      {
        title: 'Article 3 - Page 123',
        excerpt: 'First sentence from the page.',
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profileSection}>
          <Image
            source={require('../Images/ProfilePic.png')}
            style={styles.profileImage}
          />
          <Text style={styles.title}>Name</Text>
          <View style={styles.textBox}>
            <Text>{userName}</Text>
          </View>
          <Text style={styles.title}>Email</Text>
          <View style={styles.textBox}>
            <Text>{userEmail}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditAccountScreen')}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recentArticles}>
          <Text style={styles.title}>Recent Articles</Text>
          {user.recentArticles.map(article => (
            <View key={article.title} style={styles.recentArticle}>
              <Text style={styles.recentArticleTitle}>{article.title}</Text>
              <Text style={styles.recentArticleExcerpt}>{article.excerpt}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={{ marginLeft: 20 }}>
          <Image
            style={styles.bottomBarIcon}
            source={require('../Images/home.png')}
          />
          <Text style={styles.textDescription}>Home</Text>
        </View>
        <View style={{ marginLeft: 120, marginTop: 8 }}>
          <Image
            style={styles.bottomBarIcon}
            source={require('../Images/compass.png')}
          />
          <Text style={styles.textDescription}>Search</Text>
        </View>
        <View style={{ marginLeft: 120, marginTop: 6 }}>
          <Image
            style={styles.bottomBarIcon}
            source={require('../Images/survey_bar.png')}
          />
          <Text style={styles.textDescription}>Survey</Text>
        </View>
      </View>
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
});

export default AccountScreen;
