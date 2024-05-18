/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
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
import { NavigationContainer, useNavigation, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './UserContext';
import MainScreen from './MainScreen';
import AccountScreen from './AccountScreen';
import AboutScreen from './AboutScreen';
import SettingScreen from './SettingScreen';
import BookmarkScreen from './BookmarkScreen';
import Language from './Sub_SettingScreen/Language';
import Notification from './Sub_SettingScreen/Notifications';
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
import AdenoidCancer from './Article/AdenoidCancer';
import AppendixCancer from './Article/AppendixCancer';
import BowelCancer from './Article/BowelCancer';
import CervicalCaner from './Article/CervicalCancer';
import GallbladderCancer from './Article/GallbladderCancer';
import HeadNeckCancer from './Article/HeadNeckCancer';
import HodgkinCancer from './Article/HodgkinCancer';
import KidneyCancer from './Article/KidneyCancer';
import LeukaemiaCancer from './Article/LeukaemiaCancer';
import LiverCancer from './Article/LiverCancer';
import LymphomaCancer from './Article/LymphomaCancer';
import MelanomaCancer from './Article/MelanomaCancer';
import MouthCancer from './Article/MouthCancer';
import MyelomaCancer from './Article/MyelomaCancer';
import OvarianCancer from './Article/OvarianCancer';
import PenileCancer from './Article/PenileCancer';
import ProstateCancer from './Article/ProstateCancer';
import SkinCancer from './Article/SkinCancer';
import ThyroidCancer from './Article/ThyroidCancer';
import VaginalCancer from './Article/VaginalCancer';
import VulvarCancer from './Article/VulvarCancer';
import ChatbotScreen from "./Chatbot";
import Icon from 'react-native-vector-icons/FontAwesome';
import messaging from '@react-native-firebase/messaging';
import Articles from './Articles';
import SurveyScreen from './Survey';
import { doc, setDoc, collection, deleteDoc, getDocs, getDoc } from 'firebase/firestore'; // Import required functions from Firestore
import { firestore, auth } from './firebaseConfig'; // Make sure you export 'db' from your firebaseConfig file
import ResultScreen from './Result';
import BottomNavigator from './BottomNavigator'; // Import BottomNavigator

const Stack = createNativeStackNavigator();

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookmarkColors, setBookmarkColors] = useState({
    AnalCancer: 'black',
    AdenoidCancer: 'black',
    AppendixCancer: 'black',
    BladderCancer: 'black',
    BoneCancer: 'black',
    BowelCancer: 'black',
    BrainCancer: 'black',
    BreastCancer: 'black',
    CervicalCaner: 'black',
    GallbladderCancer: 'black',
    HeadNeckCancer: 'black',
    HodgkinCancer: 'black',
    KidneyCancer: 'black',
    LeukaemiaCancer: 'black',
    LiverCancer: 'black',
    LungCancer: 'black',
    LymphomaCancer: 'black',
    MelanomaCancer: 'black',
    MouthCancer: 'black',
    MyelomaCancer: 'black',
    OvarianCancer: 'black',
    PenileCancer: 'black',
    ProstateCancer: 'black',
    SkinCancer: 'black',
    ThyroidCancer: 'black',
    VaginalCancer: 'black',
    VulvarCancer: 'black',
  });
  const [savedArticles, setSavedArticles] = useState([]);
  const [user, setUser] = useState(null); // New state for user
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false); // New state to check if user is authenticated (has email and name)
  const menuAnimation = useRef(new Animated.Value(0)).current;

  const toggleBookmarkColor = async articleName => {
    if (!isAuthenticatedUser) return; // Exit function if user is not authenticated

    const isBookmarked = bookmarkColors[articleName] === 'black';
    const newBookmarkColors = {
      ...bookmarkColors,
      [articleName]: isBookmarked ? 'red' : 'black',
    };

    setBookmarkColors(newBookmarkColors);

    const userDocRef = doc(firestore, "users", user.uid);
    const articlesCollectionRef = collection(userDocRef, "articles");

    try {
      if (isBookmarked) {
        // Save the article to Firestore
        await setDoc(doc(articlesCollectionRef, articleName), { name: articleName, type: articleName });
        console.log("Article saved to Firestore");
      } else {
        // Remove the article from Firestore
        await deleteDoc(doc(articlesCollectionRef, articleName));
        console.log("Article removed from Firestore");
      }
    } catch (error) {
      console.error("Error updating article in Firestore: ", error);
    }
  };

  useEffect(() => {
    const fetchSavedArticles = async () => {
      if (!user) return; // Exit function if user is not authenticated

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
    };
    fetchSavedArticles();
  }, [user]);

  useEffect(() => {
    const checkUserAuthentication = async (currentUser) => {
      if (!currentUser) {
        setIsAuthenticatedUser(false);
        return;
      }

      const userDocRef = doc(firestore, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.email && userData.name) {
          setIsAuthenticatedUser(true);
        } else {
          setIsAuthenticatedUser(false);
        }
      } else {
        setIsAuthenticatedUser(false);
      }
    };

    // Check user authentication status
    const unsubscribe = auth.onAuthStateChanged(async currentUser => {
      setUser(currentUser);
      await checkUserAuthentication(currentUser);
    });

    return unsubscribe;
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

{/* <TouchableOpacity
  style={styles.menuItem}
  onPress={() => {
    toggleMenu();
    navigation.navigate('Setting');
  }}>
  <Icon name="cog" size={20} color="black" />
  <Text style={styles.menuText}>Setting</Text>
</TouchableOpacity> */}

<TouchableOpacity
  style={styles.menuItem}
  onPress={() => {
    toggleMenu();
    navigation.navigate('Bookmark', { savedArticles });
  }}>
  <Icon name="bookmark" size={20} color="black" />
  <Text style={styles.menuText}>Bookmark</Text>
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
              {isMenuOpen && <Menu />}
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
                    headerTitle: 'SCSG Awareness App',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                      <TouchableOpacity style={{ marginLeft: -10 }} onPress={toggleMenu}>
                        <View
                          style={{
                            width: 40, // Diameter of the outer circle
                            height: 40, // Diameter of the outer circle
                            borderRadius: 20, // Radius to make it a perfect circle
                            backgroundColor: 'black', // Background color of the circle
                            justifyContent: 'center', // Center the icon elements vertically
                            alignItems: 'center', // Center the icon elements horizontally
                          }}
                        >
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
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="About"
                  component={AboutScreen}
                  options={{ headerTitle: 'About',
                      headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                  name="Setting"
                  component={SettingScreen}
                  options={{ headerTitle: 'Setting', headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                  name="Bookmark"
                  component={BookmarkScreen}
                  options={{
                    headerTitle: 'Bookmarks',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                  name="NearByClinic"
                  component={NearByClinic}
                  options={{
                    headerTitle: 'Near By Clinic',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="Articles"
                  component={Articles}
                  options={{ headerTitle: 'Articles', 
                  headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                  name="CancerDefinitions"
                  component={CancerDefinitions}
                  options={{ 
                  headerTitle: 'What is Cancer',
                  headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                  name="CancerTypes"
                  component={CancerTypes}
                  options={{ headerTitle: 'Cancer Types',
                  headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center' }}
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
                  name="ResetPassword"
                  component={ResetPasswordScreen}
                  options={{
                    headerTitle: 'Reset Password',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="signup"
                  component={SignupScreen}
                  options={{
                    headerTitle: 'Signup',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="AnalCancer"
                  component={AnalCancer}
                  options={{
                    headerTitle: 'Anal Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
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
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
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
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
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
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
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
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
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
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
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
                  name="AdenoidCancer"
                  component={AdenoidCancer}
                  options={{
                    headerTitle: 'Adenoid Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.AdenoidCancer}
                        onPress={() => {
                          toggleBookmarkColor('AdenoidCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Adenoid Cancer', type: 'AdenoidCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="AppendixCancer"
                  component={AppendixCancer}
                  options={{
                    headerTitle: 'Appendix Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.AppendixCancer}
                        onPress={() => {
                          toggleBookmarkColor('AppendixCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Appendix Cancer', type: 'AppendixCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="BowelCancer"
                  component={BowelCancer}
                  options={{
                    headerTitle: 'Bowel Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.BowelCancer}
                        onPress={() => {
                          toggleBookmarkColor('BowelCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Bowel Cancer', type: 'BowelCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="CervicalCancer"
                  component={CervicalCaner}
                  options={{
                    headerTitle: 'Cervical Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.CervicalCaner}
                        onPress={() => {
                          toggleBookmarkColor('CervicalCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Cervical Cancer', type: 'CervicalCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="GallbladderCancer"
                  component={GallbladderCancer}
                  options={{
                    headerTitle: 'Gallbladder Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.GallbladderCancer}
                        onPress={() => {
                          toggleBookmarkColor('GallbladderCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Gallbladder Cancer', type: 'GallbladderCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="HeadNeckCancer"
                  component={HeadNeckCancer}
                  options={{
                    headerTitle: 'Head & Neck Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.HeadNeckCancer}
                        onPress={() => {
                          toggleBookmarkColor('HeadNeckCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'HeadNeck Cancer', type: 'HeadNeckCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="HodgkinCancer"
                  component={HodgkinCancer}
                  options={{
                    headerTitle: "Hodgkin's Lymphoma",
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.HodgkinCancer}
                        onPress={() => {
                          toggleBookmarkColor('HodgkinCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Hodgkin Cancer', type: 'HodgkinCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="KidneyCancer"
                  component={KidneyCancer}
                  options={{
                    headerTitle: 'Kidney Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.KidneyCancer}
                        onPress={() => {
                          toggleBookmarkColor('KidneyCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Kidney Cancer', type: 'KidneyCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="LeukaemiaCancer"
                  component={LeukaemiaCancer}
                  options={{
                    headerTitle: 'Leukaemia Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.LeukaemiaCancer}
                        onPress={() => {
                          toggleBookmarkColor('LeukaemiaCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Leukaemia Cancer', type: 'LeukaemiaCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="LiverCancer"
                  component={LiverCancer}
                  options={{
                    headerTitle: 'Liver Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.LiverCancer}
                        onPress={() => {
                          toggleBookmarkColor('LiverCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Liver Cancer', type: 'LiverCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="LymphomaCancer"
                  component={LymphomaCancer}
                  options={{
                    headerTitle: 'Lymphoma Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.LymphomaCancer}
                        onPress={() => {
                          toggleBookmarkColor('LymphomaCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Lymphoma Cancer', type: 'LymphomaCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="MelanomaCancer"
                  component={MelanomaCancer}
                  options={{
                    headerTitle: 'Melanoma Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.MelanomaCancer}
                        onPress={() => {
                          toggleBookmarkColor('MelanomaCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Melanoma Cancer', type: 'MelanomaCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="MouthCancer"
                  component={MouthCancer}
                  options={{
                    headerTitle: 'Mouth Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.MouthCancer}
                        onPress={() => {
                          toggleBookmarkColor('MouthCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Mouth Cancer', type: 'MouthCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="MyelomaCancer"
                  component={MyelomaCancer}
                  options={{
                    headerTitle: 'Myeloma Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.MyelomaCancer}
                        onPress={() => {
                          toggleBookmarkColor('MyelomaCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Myeloma Cancer', type: 'MyelomaCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="OvarianCancer"
                  component={OvarianCancer}
                  options={{
                    headerTitle: 'Ovarian Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.OvarianCancer}
                        onPress={() => {
                          toggleBookmarkColor('OvarianCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Ovarian Cancer', type: 'OvarianCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="PenileCancer"
                  component={PenileCancer}
                  options={{
                    headerTitle: 'Penile Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.PenileCancer}
                        onPress={() => {
                          toggleBookmarkColor('PenileCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Penile Cancer', type: 'PenileCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="ProstateCancer"
                  component={ProstateCancer}
                  options={{
                    headerTitle: 'Prostate Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.ProstateCancer}
                        onPress={() => {
                          toggleBookmarkColor('ProstateCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Prostate Cancer', type: 'ProstateCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="SkinCancer"
                  component={SkinCancer}
                  options={{
                    headerTitle: 'Skin Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.SkinCancer}
                        onPress={() => {
                          toggleBookmarkColor('SkinCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Skin Cancer', type: 'SkinCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="ThyroidCancer"
                  component={ThyroidCancer}
                  options={{
                    headerTitle: 'Thyroid Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.ThyroidCancer}
                        onPress={() => {
                          toggleBookmarkColor('ThyroidCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Thyroid Cancer', type: 'ThyroidCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="VaginalCancer"
                  component={VaginalCancer}
                  options={{
                    headerTitle: 'Vaginal Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.VaginalCancer}
                        onPress={() => {
                          toggleBookmarkColor('VaginalCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Vaginal Cancer', type: 'VaginalCancer' },
                          ]);
                        }} // Toggle color on press
                      />
                    ),
                  }}
                />

                <Stack.Screen
                  name="VulvarCancer"
                  component={VulvarCancer}
                  options={{
                    headerTitle: 'Vulvar Cancer',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => isAuthenticatedUser && (
                      <Icon
                        name="bookmark"
                        size={20}
                        color={bookmarkColors.VulvarCancer}
                        onPress={() => {
                          toggleBookmarkColor('VulvarCancer');
                          setSavedArticles([
                            ...savedArticles,
                            { name: 'Vulvar Cancer', type: 'VulvarCancer' },
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
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="Causes"
                  component={Causes}
                  options={{
                    headerTitle: 'Causes',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="Treatment"
                  component={Treatment}
                  options={{
                    headerTitle: 'Treatment',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="SideEffects"
                  component={SideEffects}
                  options={{
                    headerTitle: 'Side Effects',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="Survey"
                  component={SurveyScreen}
                  options={{
                    headerTitle: 'Survey',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="Result"
                  component={ResultScreen}
                  options={{
                    headerTitle: 'Result',
                    headerTitleStyle: {
                      fontFamily: 'Lora-SemiBold',
                      fontSize: 22,
                      // fontWeight: 'bold',
                    },
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
navItem: {
alignItems: 'center',
},
navText: {
fontSize: 12,
color: 'black',
},
navTextActive: {
color: 'blue',
fontWeight: 'bold',
},
dmSansFont: {
fontFamily: 'DMSans_18pt-SemiBold',
fontSize: 20,
},
});

export default App;

