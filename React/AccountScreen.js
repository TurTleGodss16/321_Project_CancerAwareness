import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from './UserContext';

const AccountScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profileSection}>
          <Image
            source={user.profilePic ? { uri: user.profilePic } : require('../Images/ProfilePic.png')}
            style={styles.profileImage}
          />
          <Text style={styles.title}>Name</Text>
          <View style={styles.textBox}>
            <Text>{user.name}</Text>
          </View>
          <Text style={styles.title}>Email</Text>
          <View style={styles.textBox}>
            <Text>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditAccountScreen')}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        {/* Rest of the component */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileSection: {
    width: '80%',
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
    alignSelf: 'center',
  },
  textBox: {
    width: '100%',
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'left',
  },
  button: {
    width: '100%',
    backgroundColor: '#0000FF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  recentArticles: {
    width: '80%',
    marginTop: 24,
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
    backgroundColor: 'white',
    height: 60,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  bottomBarIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
  },
  textDescription: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 4,
  },
});

export default AccountScreen;
