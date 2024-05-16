/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const MainScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const cancerTypes = [
    'Anal Cancer',
    'Bladder Cancer',
    'Bone Cancer',
    'Brain Cancer',
    'Breast Cancer',
    'Lung Cancer',
  ];

  const handleSearch = text => {
    setSearchText(text);
    // If search text is empty, reset the suggestions
    if (text === '') {
      setSuggestions([]);
    } else {
      // Filter cancer types based on input text for autocomplete suggestions
      const filteredSuggestions = cancerTypes.filter(cancerType =>
        cancerType.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const navigateToCancerArticle = cancerType => {
    // Based on the selected cancer type, navigate to the corresponding article
    switch (cancerType) {
      case 'Anal Cancer':
        navigation.navigate('AnalCancer');
        break;
      case 'Bladder Cancer':
        navigation.navigate('BladderCancer');
        break;
      case 'Bone Cancer':
        navigation.navigate('BoneCancer');
        break;
      case 'Brain Cancer':
        navigation.navigate('BrainCancer');
        break;
      case 'Breast Cancer':
        navigation.navigate('BreastCancer');
        break;
      case 'Lung Cancer':
        navigation.navigate('LungCancer');
        break;
      // Add cases for other cancer types and navigate to respective screens
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
              value={searchText}
              onChangeText={handleSearch}
            />
            <Icon name="search1" size={24} style={styles.iconCustom} />
          </View>
          <FlatList
            data={suggestions}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigateToCancerArticle(item)}>
                <Text style={styles.suggestion}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />

          <Text style={[styles.headerText, styles.dmSansFont, {justifyContent: 'center', alignSelf: 'center'}]}>Quick Links</Text>

          <View style={styles.linksContainer}>
            <View style={styles.link}>
              <TouchableOpacity style={[styles.orangeBackground, { width: 85, height: 75 }]} onPress={() => navigation.navigate('CancerDefinitions')}>
                <View style={styles.circleContainer}>
                  <View style={styles.circle} />
                </View>
                <Image style={[styles.linkIcon, { width: 70, height: 80 }]} source={require('../Images/cancer_symbol.png')} />
              </TouchableOpacity>
              <Text style={styles.linkText}>What is Cancer</Text>
            </View>

            <View style={styles.link}>
              <TouchableOpacity style={[styles.orangeBackground, { width: 85, height: 75 }]} onPress={() => navigation.navigate('CancerTypes')}>
                <View style={styles.circleContainer}>
                  <View style={styles.circle} />
                </View>
                <Image style={[styles.linkIcon, { width: 90, height: 75 }]} source={require('../Images/type_of_cancer.png')} />
              </TouchableOpacity>
              <Text style={styles.linkText}>Types</Text>
            </View>

            <View style={styles.link}>
              <TouchableOpacity style={[styles.orangeBackground, { width: 85, height: 75 }]} onPress={() => navigation.navigate('Causes')}>
                <View style={styles.circleContainer}>
                  <View style={styles.circle} />
                </View>
                <Image style={[styles.linkIcon, { width: 80, height: 75 }]} source={require('../Images/reason.png')} />
              </TouchableOpacity>
              <Text style={styles.linkText}>Causes</Text>
            </View>

            <View style={styles.link}>
              <TouchableOpacity style={[styles.orangeBackground, { width: 85, height: 75 }]} onPress={() => navigation.navigate('Treatment')}>
                <View style={styles.circleContainer}>
                  <View style={styles.circle} />
                </View>
                <Image style={[styles.linkIcon, { width: 45, height: 60 }]} source={require('../Images/treatment.png')} />
              </TouchableOpacity>
              <Text style={styles.linkText}>Treatment</Text>
            </View>

            <View style={styles.link}>
              <TouchableOpacity style={[styles.orangeBackground, { width: 85, height: 75 }]} onPress={() => navigation.navigate('SideEffects')}>
                <View style={styles.circleContainer}>
                  <View style={styles.circle} />
                </View>
                <Image style={[styles.linkIcon, { width: 70, height: 75 }]} source={require('../Images/side_effect.png')} />
              </TouchableOpacity>
              <Text style={styles.linkText}>Side Effects</Text>
            </View>

            <View style={styles.link}>
              <TouchableOpacity style={[styles.orangeBackground, { width: 85, height: 75 }]} onPress={() => navigation.navigate('Survey')}>
                <View style={styles.circleContainer}>
                  <View style={styles.circle} />
                </View>
                <Image style={[styles.linkIcon, { width: 50, height: 65 }]} source={require('../Images/survey.png')} />
              </TouchableOpacity>
              <Text style={styles.linkText}>Survey</Text>
            </View>
          </View>

          {/* Remaining components */}
          <TouchableOpacity
            style={[styles.chatbotButton]} // Apply orange background
            onPress={() => navigation.navigate('Chatbot')}
          >
            <Image style={styles.chatbotIcon} source={require('../Images/ChatbotIcon.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.centeredBooking} onPress={() => navigation.navigate('NearByClinic')}>
            <Text style={[styles.linkText, styles.dmSansFont]}>Booking a Screening</Text>
            <View style={[styles.linkBooking, styles.bookingBackground]}>
              <Image style={[styles.linkIcon, {alignSelf: 'center', width: 325, height: 220}]} source={require('../Images/booking.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  searchContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  iconCustom: {
    marginLeft: 10,
    marginRight: 10,
    color: '#CCCCCC',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333333',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  linksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  link: {
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 15,
  },
  linkBooking: {
    width: 200,
  },
  orangeBackground: {
    backgroundColor: '#ff914d',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Add relative positioning for the circle
  },
  circleContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#335E90',
  },
  centeredBooking: {
    alignItems: 'center', // Align the booking section in the center
    bottom: 20, // Add space between booking and bottom bar
  },
  bookingBackground: {
    backgroundColor: '#BCE08A', // Green color for booking
    width: 333,
    height: 240,
    borderRadius: 20,    marginTop: 20,
    padding: 10,
  },
  linkIcon: {
    alignSelf: 'center',
  },
  linkText: {
    color: '#333333',
    marginTop: 5,
  },
  suggestion: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  chatbotButton: {
    position: 'absolute',
    top: 650,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff914d',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  chatbotIcon: {
    width: 60,
    height: 60,
  },
  dmSansFont: {
    fontFamily: 'DMSans_18pt-SemiBold',
    fontSize: 20,
  },
  loraFont: {
    fontFamily: 'Lora',
  },
});

export default MainScreen;
