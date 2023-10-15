import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AboutScreen = () => {
  const navigation = useNavigation();
  //Create switch for theme
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.body}>
      <TouchableHighlight
        onPress={() => navigation.navigate('AboutApp')}
        underlayColor="#EAE6E6">
        <View style={styles.containers}>
          <View>
            <Image
              style={styles.image_custom_aboutpartners}
              source={require('../Images/AboutApp.png')}
            />
          </View>
          <View>
            <Text style={styles.headerText}>About App</Text>
            <Text style={styles.descriptionText}>What does this app do?</Text>
          </View>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.navigate('AboutPartners')}
        underlayColor="#EAE6E6">
        <View style={styles.containers}>
          <View>
            <Image
              style={styles.image_custom_aboutpartners}
              source={require('../Images/AboutPartners.png')}
            />
          </View>
          <View>
            <Text style={styles.headerText}>About Partners</Text>
            <Text style={styles.descriptionText}>Learn about our partners</Text>
          </View>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.navigate('AboutDevelopment')}
        underlayColor="#EAE6E6">
        <View style={styles.containers}>
          <View>
            <Image
              style={styles.image_custom_aboutpartners}
              source={require('../Images/AboutDev.png')}
            />
          </View>
          <View>
            <Text style={styles.headerText}>About Development</Text>
            <Text style={styles.descriptionText}>Learn about development.</Text>
          </View>
        </View>
      </TouchableHighlight>
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

  image_custom_aboutapp: {
    width: 25,
    height: 25,
    top: 3,
    marginRight: 10,
  },

  image_custom_aboutpartners: {
    width: 26,
    height: 25,
    top: 5,
    marginRight: 10,
  },

  image_custom_aboutdev: {
    width: 26,
    height: 25,
    top: 5,
    marginRight: 10,
  },
});

export default AboutScreen;
