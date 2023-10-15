/* eslint-disable react-native/no-inline-styles */
//Account Screen

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const AccountScreen = ({navigation}) => {
  const user = {
    recentArticles: [
      {
        title: 'Article 1 - Page 1',
        excerpt: 'First sentence from the page.',
      },
      {
        title: 'Article 2 - Page 42',
        excerpt: 'First sentence from the page.',
      },
      {
        title: 'Article 3 - Page 123',
        excerpt: 'First sentence from the page.',
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View>
            <View>
              <View
                style={{
                  alignItems: 'center',
                  marginVertical: 22,
                }}>
                <Image
                    source={require('../Images/ProfilePic.png')}
                    style={styles.profileImage}
                />
              </View>
              <Text style={styles.title}>Name</Text>
              <View
                style={styles.textBox}>
                <Text>John Doe</Text>
              </View>
              <Text style={styles.title}>Location</Text>
              <View
                style={styles.textBox}>
                <Text>Northfields Ave, Wollongong, NSW 2522</Text>
              </View>
              <Text style={styles.title}>Age</Text>
              <View
                style={styles.textBox}>
                <Text>23</Text>
              </View>
              <Button
                title="Edit"
                onPress={() => {
                  navigation.navigate('EditAccountScreen');
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.recentArticles}>
          <Text style={styles.title}>Recent Articles</Text>
          {user.recentArticles.map(article => (
            <View key={article.title} style={styles.recentArticle}>
              <Text style={styles.recentArticleTitle}>{article.title}</Text>
              <Text style={styles.recentArticleExcerpt}>{article.excerpt}</Text>
            </View>
          ))}
        </View>
  </ScrollView>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  textBox: {
    height: 44,
    width: '100%',
    borderColor: 'Grey',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 6,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'black',
  },
  recentArticles: {
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  recentArticle: {
    marginTop: 12,
  },
  recentArticleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentArticleExcerpt: {
    fontSize: 12,
    color: '#666',
  },
  bottomBar: {
    backgroundColor: "white",
    height: 60,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
});

export default AccountScreen;