/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  SafeAreaView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './UserContext';
import MainScreen from './MainScreen';
import AccountScreen from './AccountScreen';
import AboutScreen from './AboutScreen';
import SettingScreen from './SettingScreen';
import BookmarkScreen from './BookmarkScreen';
import Language from './Sub_SettingScreen/Language';
import Notification from './Sub_SettingScreen/Notifications';
import AboutApp from './Sub_AboutScreen/AboutApp';
import AboutPartners from './Sub_AboutScreen/AboutPartners';
import AboutDevelopment from './Sub_AboutScreen/AboutDevelopment';
import MultiLineHeaderTitle from './multiLineHeaderTitle';
import LoginScreen from './Login';
import SignupScreen from './signup';
import ResetPasswordScreen from './ResetPassword';
import NearByClinic from './NearByClinic';
import AnalCancer from './Article/AnalCancer';
import BladderCancer from './Article/BladderCancer';
import BoneCancer from './Article/BoneCancer';
import BrainCancer from './Article/BrainCancer';
import BreastCancer from './Article/BreastCancer';
import LungCancer from './Article/LungCancer';
import CancerDefinitions from './Article/CancerDefinitions';
import CancerTypes from './Article/CancerTypes';
import Treatment from './Article/Treament'; 
import Causes from './Article/Causes';
import SideEffects from './Article/SideEffects';
import ChatbotScreen from "./Chatbot";
import Icon from 'react-native-vector-icons/FontAwesome';
import messaging from '@react-native-firebase/messaging';
import Articles from './Articles';
import SurveyScreen from './Survey';
import { doc, setDoc, collection, deleteDoc, getDocs } from 'firebase/firestore'; // Import required functions from Firestore
import { firestore, auth } from './firebaseConfig'; // Make sure you export 'db' from your firebaseConfig file
import ResultScreen from './Result';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookmarkColors, setBookmarkColors] = useState({
    AnalCancer: 'black',
    BladderCancer: 'black',
    BoneCancer: 'black',
    BrainCancer: 'black',
    BreastCancer: 'black',
    LungCancer: 'black',
  });
  const [savedArticles, setSavedArticles] = useState([]);
  const menuAnimation = useRef(new Animated.Value(0)).current;

  const toggleBookmarkColor = articleName => {
    const newBookmarkColors = {
      ...bookmarkColors,
      [articleName]: bookmarkColors[articleName] === 'black' ? 'red' : 'black',
    };
  
    setBookmarkColors(newBookmarkColors);
  
    const isBookmarked = newBookmarkColors[articleName] === 'red';
  
    if (isBookmarked) {
      // Save the article to Firestore
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const articlesCollectionRef = collection(userDocRef, "articles");
        setDoc(doc(articlesCollectionRef, articleName), { name: articleName, type: articleName })
          .then(() => console.log("Article saved to Firestore"))
          .catch(error => console.error("Error saving article to Firestore: ", error));
      }
    } else {
      // Remove the article from Firestore
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const articleDocRef = doc(collection(userDocRef, "articles"), articleName);
        deleteDoc(articleDocRef)
          .then(() => console.log("Article removed from Firestore"))
          .catch(error => console.error("Error removing article from Firestore: ", error));
      }
    }
  };

  useEffect(() => {
    const fetchSavedArticles = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        const articlesCollectionRef = collection(userDocRef, 'articles');
        const querySnapshot = await getDocs(articlesCollectionRef);
        const articles = [];
        querySnapshot.forEach((doc) => {
          articles.push(doc.id);
        });
        setSavedArticles(articles);
        // Initialize bookmark colors based on saved articles
        const initialBookmarkColors = {};
        articles.forEach((article) => {
          initialBookmarkColors[article] = 'red';
        });
        setBookmarkColors(initialBookmarkColors);
      }
    };
    fetchSavedArticles();
  }, []);
  

  const toggleMenu = () => {
    const toValue = isMenuOpen ? 0 : 1;

    Animated.timing(menuAnimation, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New Message', remoteMessage.notification.title);
    });

    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        Alert.alert('New Message', remoteMessage.notification.title);
      }
    });

    return unsubscribe;
  }, []);

  const Menu = () => {
    const navigation = useNavigation();

    return (
      <Animated.View
        style={[
          {
            backgroundColor: '#f0f0f0',
            padding: 20,
            paddingTop: 40,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            height: '100%',
            width: '60%',
            gap: 20,
          },
          {
            transform: [
              {
                translateX: menuAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-300, 0],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            toggleMenu();
            navigation.navigate('Account');
          }}>
          <Icon name="user" size={20} color="black" />
          <Text style={styles.menuText}>Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            toggleMenu();
            navigation.navigate('About');
          }}>
          <Icon name="info" size={20} color="black" />
          <Text style={styles.menuText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            toggleMenu();
            navigation.navigate('Setting');
          }}>
          <Icon name="cog" size={20} color="black" />
          <Text style={styles.menuText}>Setting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            toggleMenu();
            navigation.navigate('Bookmark', { savedArticles });
          }}>
          <Icon name="bookmark" size={20} color="black" />
          <Text style={styles.menuText}>Bookmark</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            toggleMenu();
            navigation.navigate('Login');
          }}>
          <Icon name="sign-out" size={20} color="black" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <UserProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={closeMenu} activeOpacity={1}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {isMenuOpen && (
                <Menu />
              )}
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{
                    headerTitle: 'Login',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="Main"
                  component={MainScreen}
                  options={{
                    headerTitle: 'Cancer Awareness',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                      <TouchableOpacity style={{ marginLeft: -10 }} onPress={toggleMenu}>
                        <View style={{
                          width: 40, // Diameter of the outer circle
                          height: 40, // Diameter of the outer circle
                          borderRadius: 20, // Radius to make it a perfect circle
                          backgroundColor: 'black', // Background color of the circle
                          justifyContent: 'center', // Center the icon elements vertically
                          alignItems: 'center' // Center the icon elements horizontally
                        }}>
                          <Image
                            source={require('../Images/HamburgerButton.png')} // Ensure this path matches your file's location
                            style={{ width: 20, height: 20 }} // Adjust size as needed
                          />
                        </View>
                      </TouchableOpacity>
                    ),
                  }}
                />
                <Stack.Screen
                  name="Account"
                  component={AccountScreen}
                  options={{
                    headerTitle: 'Account',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="About"
                  component={AboutScreen}
                  options={{ headerTitle: 'About', headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                  name="Setting"
                  component={SettingScreen}
                  options={{ headerTitle: 'Setting', headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                  name="Bookmark"
                  component={BookmarkScreen}
                  options={{ headerTitle: 'Bookmark', headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                  name="NearByClinic"
                  component={NearByClinic}
                  options={{
                    headerTitle: 'Near By Clinic',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="Articles"
                  component={Articles}
                  options={{ headerTitle: 'Articles', headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                  name="CancerDefinitions"
                  component={CancerDefinitions}
                  options={{ headerTitle: 'What is Cancer', headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                  name="CancerTypes"
                  component={CancerTypes}
                  options={{ headerTitle: 'Cancer Types', headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                  name="Language"
                  component={Language}
                  options={{
                    headerTitle: () => <MultiLineHeaderTitle />,
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="Notification"
                  component={Notification}
                  options={{
                    headerTitle: 'Notification',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="AboutApp"
                  component={AboutApp}
                  options={{
                    headerTitle: 'About App',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="AboutPartners"
                  component={AboutPartners}
                  options={{
                    headerTitle: 'About Partners',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="AboutDevelopment"
                  component={AboutDevelopment}
                  options={{
                    headerTitle: 'About Development',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="ResetPassword"
                  component={ResetPasswordScreen}
                  options={{
                    headerTitle: 'Reset Password',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="signup"
                  component={SignupScreen}
                  options={{
                    headerTitle: 'Signup',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="AnalCancer"
                  component={AnalCancer}
                  options={{
                    headerTitle: 'Anal Cancer',
                    headerTitleAlign: 'center',
                    headerRight: () => (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.AnalCancer}
                        onPress={() => {
                          toggleBookmarkColor('AnalCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Anal Cancer', type: 'AnalCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="BladderCancer"
                  component={BladderCancer}
                  options={{
                    headerTitle: 'Bladder Cancer',
                    headerTitleAlign: 'center',
                    headerRight: () => (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.BladderCancer}
                        onPress={() => {
                          toggleBookmarkColor('BladderCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Bladder Cancer', type: 'BladderCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="BrainCancer"
                  component={BrainCancer}
                  options={{
                    headerTitle: 'Brain Cancer',
                    headerTitleAlign: 'center',
                    headerRight: () => (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.BrainCancer}
                        onPress={() => {
                          toggleBookmarkColor('BrainCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Brain Cancer', type: 'BrainCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="BoneCancer"
                  component={BoneCancer}
                  options={{
                    headerTitle: 'Bone Cancer',
                    headerTitleAlign: 'center',
                    headerRight: () => (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.BoneCancer}
                        onPress={() => {
                          toggleBookmarkColor('BoneCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Bone Cancer', type: 'BoneCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="BreastCancer"
                  component={BreastCancer}
                  options={{
                    headerTitle: 'Breast Cancer',
                    headerTitleAlign: 'center',
                    headerRight: () => (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.BreastCancer}
                        onPress={() => {
                          toggleBookmarkColor('BreastCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Breast Cancer', type: 'BreastCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="LungCancer"
                  component={LungCancer}
                  options={{
                    headerTitle: 'Lung Cancer',
                    headerTitleAlign: 'center',
                    headerRight: () => (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.LungCancer}
                        onPress={() => {
                          toggleBookmarkColor('LungCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Lung Cancer', type: 'LungCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="Chatbot"
                  component={ChatbotScreen}
                  options={{
                    headerTitle: 'Chatbot',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="Causes"
                  component={Causes}
                  options={{
                    headerTitle: 'Causes',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="Treatment"
                  component={Treatment}
                  options={{
                    headerTitle: 'Treatment',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="SideEffects"
                  component={SideEffects}
                  options={{
                    headerTitle: 'Side Effects',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="Survey"
                  component={SurveyScreen}
                  options={{
                    headerTitle: 'Survey',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="Result"
                  component={ResultScreen}
                  options={{
                    headerTitle: 'Result',
                    headerTitleAlign: 'center',
                  }}
                />
              </Stack.Navigator>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </NavigationContainer>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
});

export default App;
