import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomNavigator = () => {
  const navigation = useNavigation();
  const routes = useNavigationState(state => state?.routes || []);
  const currentRoute = routes[routes.length - 1]?.name || '';

  // List of screens where BottomNav should not be shown
  const hideBottomNavScreens = ['LoginScreen', 'ResetPasswordScreen', 'signup'];

  if (hideBottomNavScreens.includes(currentRoute)) {
    return null;
  }

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Main')}
      >
        <Icon name="home" size={20} color={currentRoute === 'Main' ? 'blue' : 'black'} />
        <Text style={[styles.navText, currentRoute === 'Main' && styles.navTextActive]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Articles')}
      >
        <Icon name="file-text-o" size={20} color={currentRoute === 'Articles' ? 'blue' : 'black'} />
        <Text style={[styles.navText, currentRoute === 'Articles' && styles.navTextActive]}>Articles</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Survey')}
      >
        <Icon name="clipboard" size={20} color={currentRoute === 'Survey' ? 'blue' : 'black'} />
        <Text style={[styles.navText, currentRoute === 'Survey' && styles.navTextActive]}>Survey</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8',
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
});

export default BottomNavigator;
