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
  },

  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  descriptionText: {
    fontSize: 10,
    textAlign: 'center',
  },
});
export default BookmarkScreen;
