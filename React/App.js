/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {Text, TouchableOpacity, View, Animated, Easing} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import AccountScreen from './AccountScreen';
import AboutScreen from './AboutScreen';
import SettingScreen from './SettingScreen';
import BookmarkScreen from './BookmarkScreen';

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

  const menuStyle = {
    transform: [
      {
        translateX: menuAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-300, 0], // Adjust the value for the desired menu width
        }),
      },
    ],
  };

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {/* Menu */}
      <Animated.View
        style={[
          {backgroundColor: '#ecf0f1', padding: 10, paddingTop: 10},
          menuStyle,
        ]}>
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

      {/* Main Content */}
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{title: 'Cancer Awareness'}}
        />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Bookmark" component={BookmarkScreen} />
      </Stack.Navigator>

      {/* Menu Toggle Button */}
      <TouchableOpacity
        onPress={toggleMenu}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 2,
        }}>
        <Text style={{color: 'black', fontSize: 20}}>☰</Text>
      </TouchableOpacity>
    </View>
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