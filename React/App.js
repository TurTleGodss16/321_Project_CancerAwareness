/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import AccountScreen from './AccountScreen';
import AboutScreen from './AboutScreen';
import SettingScreen from './SettingScreen';
import BookmarkScreen from './BookmarkScreen';
import EditAccountScreen from './EditAccountScreen';
import Language from './Sub_SettingScreen/Language';
import Notification from './Sub_SettingScreen/Notifications';
import AboutApp from './Sub_AboutScreen/AboutApp';
import AboutPartners from './Sub_AboutScreen/AboutPartners';
import AboutDevelopment from './Sub_AboutScreen/AboutDevelopment';
import MultiLineHeaderTitle from './multiLineHeaderTitle';
import LoginScreen from './Login';
import SignupScreen from './signup';

const Stack = createNativeStackNavigator();

const Menu = () => {
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity style={{flex: 1}} onPress={closeMenu} activeOpacity={1}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {isMenuOpen && (
            <Animated.View
              style={[
                {
                  backgroundColor: '#f0f0f0',
                  padding: 10,
                  paddingTop: 10,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  height: '100%',
                  width: '30%',
                  gap: 10,
                },
                {
                  transform: [
                    {
                      translateX: menuAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-300, 0], // Adjust the value for the desired menu width
                      }),
                    },
                  ],
                },
              ]}>
              {/* Menu items */}
              <TouchableOpacity
                style={styles.screenSection}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('Account');
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../Images/profile_account.png')}
                />
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  Account
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.screenSection}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('About');
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../Images/about.png')}
                />
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  About Us
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.screenSection}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('Setting');
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../Images/setting.png')}
                />
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  Setting
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.screenSection}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('Bookmark');
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../Images/bookmark.png')}
                />
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  Bookmark
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.screenSection_logout}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('Login');
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../Images/logout.png')}
                />
                <Text style={{fontWeight: 'bold', color: 'black'}}>Logout</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Main Content */}
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
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={toggleMenu}>
                    <Text style={{fontSize: 20}}>☰</Text>
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
              options={{headerTitle: 'About', headerTitleAlign: 'center'}}
            />
            <Stack.Screen
              name="Setting"
              component={SettingScreen}
              options={{headerTitle: 'Setting', headerTitleAlign: 'center'}}
            />
            <Stack.Screen
              name="Bookmark"
              component={BookmarkScreen}
              options={{headerTitle: 'Bookmark', headerTitleAlign: 'center'}}
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
              name="EditAccountScreen"
              component={EditAccountScreen}
              options={{
                headerTitle: 'Edit Account',
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
              name="SignupScreen"
              component={SignupScreen}
              options={{
                headerTitle: 'Signup',
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenSection: {
    flexDirection: 'row',
    gap: 10,
  },

  screenSection_logout: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 450,
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
};

export default App;
