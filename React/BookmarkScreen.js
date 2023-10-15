/* eslint-disable react-native/no-inline-styles */
//Bookmark Screen

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const BookmarkScreen = ({navigation}) => {
  return (
    <View style={styles.body}>
      <View>
        <Image
          style={styles.image_custom}
          source={require('../Images/Bookmark_Warning.png')}
        />
      </View>

      <View style={styles.text_custom}>
        <Text style={styles.headerText}>You have no bookmarks!</Text>
        <Text style={styles.descriptionText}>
          Click the flag icon on any article/page and it will appear here!
        </Text>
      </View>

      {/*Bottom bar for all screen */}
      <View style={styles.bottomBar}>
        <View style={{marginLeft: 20}}>
          <Image
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              alignSelf: 'center',
            }}
            source={require('../Images/home.png')}
          />
          <Text style={styles.textDescription}>Home</Text>
        </View>
        <View style={{marginLeft: 120, marginTop: 8}}>
          <Image
            style={{
              width: 30,
              height: 30,
              alignItems: 'center',
              alignSelf: 'center',
            }}
            source={require('../Images/compass.png')}
          />
          <Text style={styles.textDescription}>Search</Text>
        </View>
        <View style={{marginLeft: 120, marginTop: 6}}>
          <Image
            style={{
              width: 30,
              height: 30,
              alignItems: 'center',
              alignSelf: 'center',
            }}
            source={require('../Images/survey_bar.png')}
          />
          <Text style={styles.textDescription}>Survey</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    gap: 10,
  },

  image_custom: {
    width: 100,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  text_custom: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingBottom: 450,
  },

  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  descriptionText: {
    fontSize: 10,
    textAlign: 'center',
  },

  bottomBar: {
    height: 60,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    flexDirection: 'row',
  },

  textDescription: {
    textAlign: 'center',
    color: 'black',
  },
});
export default BookmarkScreen;
