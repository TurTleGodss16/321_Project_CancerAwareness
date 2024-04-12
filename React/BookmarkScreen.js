/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const BookmarkScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../Images/Bookmark_Warning.png')}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.headerText}>You have no bookmarks!</Text>
        <Text style={styles.descriptionText}>
          Click the flag icon on any article/page and it will appear here!
        </Text>
      </View>

      {/* Bottom navigation bar */}
      <View style={styles.bottomBar}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require('../Images/home.png')}
          />
          <Text style={styles.textDescription}>Home</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require('../Images/compass.png')}
          />
          <Text style={styles.textDescription}>Search</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require('../Images/survey_bar.png')}
          />
          <Text style={styles.textDescription}>Survey</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  textDescription: {
    color: 'black',
    fontSize: 12,
    marginTop: 3,
  },
});

export default BookmarkScreen;
