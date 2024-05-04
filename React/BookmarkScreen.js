import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BookmarkScreen = ({route}) => {
  const {savedArticles} = route.params;
  const navigation = useNavigation();

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  // Define colors for each cancer type
  const cancerColors = {
    AnalCancer: '#ff7f50',
    BladderCancer: '#6495ed',
    BoneCancer: '#ff6347',
    BrainCancer: '#8a2be2',
    BreastCancer: '#ff69b4',
    LungCancer: '#20b2aa',
  };

  return (
    <View style={styles.container}>
      {savedArticles.length === 0 ? (
        <View style={styles.noBookmarkContainer}>
          <Image
            style={styles.image}
            source={require('../Images/Bookmark_Warning.png')}
          />
          <Text style={styles.headerText}>You have no bookmarks!</Text>
          <Text style={styles.descriptionText}>
            Click the flag icon on any article/page and it will appear here!
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {savedArticles.map((article, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.itemContainer,
                {backgroundColor: cancerColors[article.type]},
              ]}
              onPress={() => navigateToScreen(article.type)}>
              <Text style={styles.headerText}>{article.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Bottom navigation bar */}
      <View style={styles.bottomBar}>{/* Your bottom navigation items */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  noBookmarkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: '80%',
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  descriptionText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
});

export default BookmarkScreen;
