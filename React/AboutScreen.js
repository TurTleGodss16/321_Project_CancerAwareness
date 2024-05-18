/* eslint-disable prettier/prettier */
import React from 'react';
import { ScrollView, Text, View, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import BottomNavigator from './BottomNavigator'; // Ensure this path is correct

const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Pressable>
        <Text style={styles.header}>About Us</Text>
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            Welcome to the Sister Cancer Support Group Awareness App (SCSG Awareness App), your go-to resource for information and support on various types of cancer. Whether you're seeking knowledge, guidance, or simply a supportive community, we're here for you every step of the way.
          </Text>
          <Text style={styles.paragraph}>
            At SCSG Awareness App, we are dedicated to providing accessible and comprehensive information about cancer to individuals worldwide. Our mission is to empower and support those affected by cancer, regardless of where they are in the world.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeader}>What We Offer</Text>
          <View style={styles.listItemContainer}>
            <Text style={styles.listItem}>- Comprehensive Information: Explore detailed articles and resources covering a wide range of cancer types, treatments, and support services.</Text>
            <Text style={styles.listItem}>- AI Chatbot: Connect with our AI chatbot, designed to provide personalized support and answer your questions about cancer. Whether you're seeking information on symptoms, treatment options, or emotional support, our chatbot is available 24/7 to assist you.</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Our Community</Text>
          <Text style={styles.paragraph}>
            Join our diverse community of individuals from around the globe who are passionate about cancer awareness and support. Share your experiences, offer encouragement, and find solidarity with others who understand what you're going through.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Meet the Team</Text>
          <Text style={styles.paragraph}>
            Behind the SCSG Awareness App is a dedicated team of professionals committed to making a difference in the fight against cancer. From developers to content creators, each member plays a vital role in ensuring that our app remains a trusted and reliable resource for our users.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Get Involved</Text>
          <Text style={styles.paragraph}>
            Join us in our mission to raise awareness and support those affected by cancer. Whether you're interested in volunteering, contributing content, or spreading the word about our app, there are plenty of ways to get involved and make a difference.
          </Text>
        </View>
        </Pressable>        
      </ScrollView>
      <BottomNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Increased margin
    color: '#333', // Header text color
  },
  section: {
    marginBottom: 20, // Increased margin between sections
    backgroundColor: '#f9f9f9', // Background color of sections
    padding: 15, // Added padding to sections
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Added shadow for depth
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555', // Subheader text color
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15, // Increased margin
    color: '#777', // Paragraph text color
  },
  listItemContainer: {
    marginTop: 10, // Increased margin from subheader
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
    color: '#777', // ListItem text color
  },
});

export default AboutScreen;
