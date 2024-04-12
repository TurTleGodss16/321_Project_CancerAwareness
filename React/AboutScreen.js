/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AboutScreen = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigateToScreen('AboutApp')}>
        <Image style={styles.image} source={require('../Images/AboutApp.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>About App</Text>
          <Text style={styles.descriptionText}>What does this app do?</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer} onPress={() => navigateToScreen('AboutPartners')}>
        <Image style={styles.image} source={require('../Images/AboutPartners.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>About Partners</Text>
          <Text style={styles.descriptionText}>Learn about our partners</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer} onPress={() => navigateToScreen('AboutDevelopment')}>
        <Image style={styles.image} source={require('../Images/AboutDev.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>About Development</Text>
          <Text style={styles.descriptionText}>Learn about development</Text>
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
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default AboutScreen;
