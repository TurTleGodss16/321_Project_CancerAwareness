/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { firestore, auth } from './firebaseConfig';
import BottomNavigator from './BottomNavigator'; // Ensure this path is correct

const BookmarkScreen = () => {
  const navigation = useNavigation();
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    // Function to fetch articles associated with the user from Firestore
    const fetchArticles = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const articlesCollectionRef = collection(userDocRef, "articles");
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

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  // Define colors for each cancer type
  const cancerColors = {
    AnalCancer: '#ff7f50',
    BladderCancer: '#6495ed',
    BoneCancer: '#ff6347',
    BrainCancer: '#8a2be2',
    BreastCancer: '#ff69b4',
    LungCancer: '#20b2aa',
  };

  return (
    <SafeAreaView style={styles.container}>
      {savedArticles.length === 0 ? (
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
              <Text style={styles.headerText}>{article.name}</Text>
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
});

export default BookmarkScreen;
