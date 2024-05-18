/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, doc } from 'firebase/firestore';
import { firestore, auth } from './firebaseConfig';
import BottomNavigator from './BottomNavigator'; // Ensure this path is correct
import { UserContext } from './UserContext'; // Import the UserContext

const BookmarkScreen = () => {
  const navigation = useNavigation();
  const [savedArticles, setSavedArticles] = useState([]);
  const { user } = useContext(UserContext); // Use the UserContext

  useEffect(() => {
    // Function to fetch articles associated with the user from Firestore
    const fetchArticles = async () => {
      const currentUser = auth.currentUser;
      if (currentUser && !currentUser.isAnonymous) {
        const userDocRef = doc(firestore, 'users', currentUser.uid);
        const articlesCollectionRef = collection(userDocRef, 'articles');
        const querySnapshot = await getDocs(articlesCollectionRef);
        const articles = [];
        querySnapshot.forEach((doc) => {
          articles.push(doc.data());
        });
        setSavedArticles(articles);
      }
    };

    fetchArticles();
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  // Define colors for each cancer type
  const cancerColors = {
    AnalCancer: '#ff7f50',
    AdenoidCancer: '#ff7f50',
    AppendixCancer: '#ff7f50',
    BladderCancer: '#6495ed',
    BoneCancer: '#ff6347',
    BowelCancer: '#ff6347',
    BrainCancer: '#8a2be2',
    BreastCancer: '#ff69b4',
    CervicalCancer: '#ff69b4',
    GallbladderCancer: '#ff69b4',
    HeadNeckCancer: '#ff69b4',
    HodgkinCancer: '#ff69b4',
    KidneyCancer: '#ff69b4',
    LeukaemiaCancer: '#ff69b4',
    LiverCancer: '#ff69b4',
    LymphomaCancer: '#ff69b4',
    MelanomaCancer: '#ff69b4',
    MouthCancer: '#ff69b4',
    MyelomaCancer: '#ff69b4',
    OvarianCancer: '#ff69b4',
    PenileCancer: '#ff69b4',
    ProstateCancer: '#ff69b4',
    SkinCancer: '#ff69b4',
    ThyroidCancer: '#ff69b4',
    VaginalCancer: '#ff69b4',
    VulvarCancer: '#ff69b4',
    LungCancer: '#20b2aa',
  };

  // Function to format the article name
  const formatArticleName = (name) => {
    return name.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  return (
    <SafeAreaView style={styles.container}>
      {auth.currentUser?.isAnonymous ? (
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
      ) : savedArticles.length === 0 ? (
        <View style={styles.noBookmarkContainer}>
          <Image
            style={styles.image}
            source={require('../Images/Bookmark_Warning.png')}
          />
          <Text style={styles.headerText}>You have no bookmarks!</Text>
          <Text style={styles.descriptionText}>
            Click the flag icon on any article/page and it will appear here!
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {savedArticles.map((article, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.itemContainer,
                { backgroundColor: cancerColors[article.type] },
              ]}
              onPress={() => navigateToScreen(article.type)}>
              <Text style={styles.headerText}>{formatArticleName(article.name)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <BottomNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  noBookmarkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: '80%',
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  descriptionText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
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
    color: 'black', // Ensure text color contrasts with background
    textAlign: 'center',
  },
  anonymousPrompt: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black', // Ensure text color contrasts with background
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

export default BookmarkScreen;
