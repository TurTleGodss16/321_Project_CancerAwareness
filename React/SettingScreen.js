import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <View style={styles.itemContainer}>
          <Image style={styles.icon} source={require('../Images/Notification_Bell.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Notifications</Text>
            <Text style={styles.descriptionText}>Manage notification by type</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.itemContainer}>
        <Image style={styles.icon} source={require('../Images/Theme.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Theme</Text>
          <Text style={styles.descriptionText}>Toggle Light and Dark mode</Text>
        </View>
        <View style={styles.toggleSwitch}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0f' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Language')}>
        <View style={styles.itemContainer}>
          <Image style={styles.icon} source={require('../Images/Language.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Language</Text>
            <Text style={styles.descriptionText}>Set the default language</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Accessibility')}>
        <View style={styles.itemContainer}>
          <Image style={styles.icon} source={require('../Images/Accessibility.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Accessibility Options</Text>
            <Text style={styles.descriptionText}>Customize your experience for greater accessibility</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 3,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  descriptionText: {
    fontSize: 12,
    color: 'black',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  toggleSwitch: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default SettingScreen;
