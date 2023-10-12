//Setting Screen

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const SettingScreen = () => {
  const navigation = useNavigation();
  //Create switch for theme
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.body}>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <View style={styles.containers}>
          <View>
            <Image
              style={styles.image_custom_notification}
              source={require('../Images/Notification_Bell.png')}
            />
          </View>
          <View>
            <Text style={styles.headerText}>Notifications</Text>
            <Text style={styles.descriptionText}>
              Manage notification by type.
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.containers}>
        <View>
          <Image
            style={styles.image_custom_theme}
            source={require('../Images/Theme.png')}
          />
        </View>
        <View>
          <Text style={styles.headerText}>Theme</Text>
          <Text style={styles.descriptionText}>
            Toggle Light and Dark mode.
          </Text>
        </View>
        {/*Toggle Switch*/}
        <View style={styles.toggle_switch}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0f'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Language')}>
        <View style={styles.containers}>
          <View>
            <Image
              style={styles.image_custom_language}
              source={require('../Images/Language.png')}
            />
          </View>
          <View>
            <Text style={styles.headerText}>Language</Text>
            <Text style={styles.descriptionText}>
              Set the default language.
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.containers}>
        <View>
          <Image
            style={styles.image_custom_access}
            source={require('../Images/Accessibility.png')}
          />
        </View>
        <View>
          <Text style={styles.headerText}>Accessibility Options</Text>
          <Text style={styles.descriptionText}>
            Customize your experience for greater accessibility
          </Text>
        </View>
      </View>
    </View>
  );
};

/*const SettingScreen = ({navigation}) => {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
};*/

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    fontFamily: 'sans-serif',
    gap: 10,
  },

  headerText: {
    fontWeight: 'bold',
  },

  descriptionText: {
    fontSize: 10,
  },

  containers: {
    flexDirection: 'row',
  },

  image_custom_notification: {
    width: 27,
    height: 27,
    top: 3,
  },

  image_custom_theme: {
    width: 26,
    height: 25,
    top: 5,
  },

  image_custom_language: {
    width: 26,
    height: 25,
    top: 5,
  },

  image_custom_access: {
    width: 26,
    height: 25,
    top: 5,
  },

  toggle_switch: {
    flex: 1,
    paddingRight: 20,
    alignItems: 'flex-end',
  },
});

export default SettingScreen;
