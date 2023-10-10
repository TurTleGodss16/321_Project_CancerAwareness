//Setting Screen

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const SettingScreen = ({navigation}) => {
  return (
    <View style={styles.body}>
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
      </View>

      <View style={styles.containers}>
        <View>
          <Image
            style={styles.image_custom_language}
            source={require('../Images/Language.png')}
          />
        </View>
        <View>
          <Text style={styles.headerText}>Language</Text>
          <Text style={styles.descriptionText}>Set the default language.</Text>
        </View>
      </View>

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
});

export default SettingScreen;
