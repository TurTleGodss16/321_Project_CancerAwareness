//Account Screen

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const AccountScreen = ({navigation, route}) => {
  const user = {
    username: ' ',
    location: ' ',
    age: ' ',

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
      <View style={StyleSheet.profileInfo}>
        <Image
          style={StyleSheet.profileImage}
          source={{uri: 'https://example.com/profile-image.png'}}
        />
        <View>
          <View style={styles.usernameInput}>
            <TextInput
              placeholder="username"
              value={user.username}
              onCHangeText={user.setUsername}
            />
          </View>
          <View style={styles.locationInput}>
            <TextInput
              placeholder="Location"
              value={user.location}
              onCHangeText={user.setLocation}
            />
          </View>
          <View style={styles.ageInput}>
            <TextInput
              placeholder="Age"
              value={user.age}
              onCHangeText={user.setAge}
            />
          </View>
          <View>
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
        <Text style={styles.recentArticlesTitle}>Recent Articles</Text>
        {user.recentArticles.map(article => (
          <View key={article.title} style={styles.recentArticle}>
            <Text style={styles.recentArticleTitle}>{article.title}</Text>
            <Text style={styles.recentArticleExcerpt}>{article.excerpt}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );

/*const [usename, setUsername] = useState(user.username);
  const [location, setLocation] = useState(user.location);
  const [age, setAge] = useState(user.age);*/
};

const styles = StyleSheet.create({
  body: {
    backgroundColour: 'white',
    gap: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  userDetails: {
    marginLeft: 16,
  },
  recentArticles: {
    marginTop: 24,
  },
  recentArticlesTitle: {
    fontSize: 16,
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

  /*Dupplicate: I just changed body -> body_1*/
  body_1: {
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
export default AccountScreen;
