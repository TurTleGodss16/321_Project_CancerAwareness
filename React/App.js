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
                  backgroundColor: '#ecf0f1',
                  padding: 10,
                  paddingTop: 10,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  height: '100%',
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
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('Account');
                }}>
                <Text>Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('About');
                }}>
                <Text>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('Setting');
                }}>
                <Text>Setting</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('Bookmark');
                }}>
                <Text>Bookmark</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Main Content */}
          <Stack.Navigator initialRouteName="Main">
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
              options={{headerTitle: 'Language', headerTitleAlign: 'center'}}
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
          </Stack.Navigator>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
};

export default App;
