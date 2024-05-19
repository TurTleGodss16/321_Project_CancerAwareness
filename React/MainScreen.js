/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import BottomNavigator from './BottomNavigator';

const MainScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const cancerTypes = [
    'Adenoid Cancer',
    'Anal Cancer',
    'Appendix Cancer',
    'Bladder Cancer',
    'Bone Cancer',
    'Brain Cancer',
    'Bowel Cancer',
    'Breast Cancer',
    'Cancer Definitions',
    'Cancer Types',
    'Causes',
    'Cervical Cancer',
    'Gallbladder Cancer',
    'Head & Neck Cancer',
    'Hodgkin Lyphoma',
    'Kidney Cancer',
    'Leukaemia Cancer',
    'Liver Cancer',
    'Lymphoma Cancer',
    'Melanoma Cancer',
    'Lung Cancer',
    'Mouth Cancer',
    'Myeloma Cancer',
    'Ovarian Cancer',
    'Penile Cancer',
    'Prostate Cancer',
    'Side Effects',
    'Skin Cancer',
    'Thyroid Cancer',
    'Treament',
    'Vaginal Cancer',
    'Vulvar Cancer',
  ];

  const handleSearch = text => {
    setSearchText(text);
    if (text === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = cancerTypes.filter(cancerType =>
        cancerType.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const navigateToCancerArticle = cancerType => {
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
      case 'Adenoid Cancer':
        navigation.navigate('AdenoidCancer');
        break;
      case 'Appendix Cancer':
        navigation.navigate('AppendixCancer');
        break;
      case 'Bowel Cancer':
        navigation.navigate('BowelCancer');
        break;
      case 'Cervical Cancer':
        navigation.navigate('CervicalCancer');
        break;
      case 'Gallbladder Cancer':
        navigation.navigate('GallbladderCancer');
        break;
      case 'Head & Neck Cancer':
        navigation.navigate('HeadNeckCancer');
        break;
      case 'Hodgkin Lymphoma':
        navigation.navigate('HodgkinCancer');
        break;
      case 'Kidney Cancer':
        navigation.navigate('KidneyCancer');
        break;
      case 'Leukaemia Cancer':
        navigation.navigate('LeukaemiaCancer');
        break;
      case 'Liver Cancer':
        navigation.navigate('LiverCancer');
        break;
      case 'Lymphoma Cancer':
        navigation.navigate('LymphomaCancer');
        break;
      case 'Melanoma Cancer':
        navigation.navigate('MelanomaCancer');
        break;
      case 'Mouth Cancer':
        navigation.navigate('MouthCancer');
        break;
      case 'Myeloma Cancer':
        navigation.navigate('MyelomaCancer');
        break;
      case 'Ovarian Cancer':
        navigation.navigate('OvarianCancer');
        break;
      case 'Penile Cancer':
        navigation.navigate('PenileCancer');
        break;
      case 'Prostate Cancer':
        navigation.navigate('ProstateCancer');
        break;
      case 'Skin Cancer':
        navigation.navigate('SkinCancer');
        break;
      case 'Thyroid Cancer':
        navigation.navigate('ThyroidCancer');
        break;
      case 'Vaginal Cancer':
        navigation.navigate('VaginalCancer');
        break;
      case 'Vulvar Cancer':
        navigation.navigate('VulvarCancer');
        break;
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
                placeholderTextColor="#999"
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

            <Text style={[styles.linkText, styles.loraFont, { marginBottom: 10, alignSelf: 'center' }]}>Quick Links</Text>

            <View style={styles.linksContainer}>
              <View style={styles.link}>
                <TouchableOpacity style={[styles.orangeBackground, { width: 85, height: 75 }]} onPress={() => navigation.navigate('CancerDefinitions')}>
                  <View style={styles.circleContainer}>
                    <View style={styles.circle} />
                  </View>
                  <Image style={[styles.linkIcon, { width: 70, height: 80 }]} source={require('../Images/cancer_symbol.png')} />
                </TouchableOpacity>
                <Text style={[styles.linkText, styles.dmSansFont]}>What is Cancer</Text>
              </View>

              <View style={styles.link}>
                <TouchableOpacity style={[styles.orangeBackground, { width: 85, height: 75 }]} onPress={() => navigation.navigate('CancerTypes')}>
                  <View style={styles.circleContainer}>
                    <View style={styles.circle} />
                  </View>
                  <Image style={[styles.linkIcon, { width: 90, height: 75 }]} source={require('../Images/type_of_cancer.png')} />
                </TouchableOpacity>
                <Text style={[styles.linkText, styles.dmSansFont]}>Types</Text>
              </View>

              <View style={styles.link}>
                <TouchableOpacity style={[styles.orangeBackground, { width: 85, height: 75 }]} onPress={() => navigation.navigate('Causes')}>
                  <View style={styles.circleContainer}>
                    <View style={styles.circle} />
                  </View>
                  <Image style={[styles.linkIcon, { width: 80, height: 75 }]} source={require('../Images/reason.png')} />
                </TouchableOpacity>
                <Text style={[styles.linkText, styles.dmSansFont]}>Causes</Text>
              </View>

              <View style={styles.link}>
                <TouchableOpacity style={[styles.orangeBackground, { width: 85, height: 75 }]} onPress={() => navigation.navigate('Treatment')}>
                  <View style={styles.circleContainer}>
                    <View style={styles.circle} />
                  </View>
                  <Image style={[styles.linkIcon, { width: 45, height: 60 }]} source={require('../Images/treatment.png')} />
                </TouchableOpacity>
                <Text style={[styles.linkText, styles.dmSansFont]}>Treatment</Text>
              </View>

              <View style={styles.link}>
                <TouchableOpacity style={[styles.orangeBackground, { width: 85, height: 75 }]} onPress={() => navigation.navigate('SideEffects')}>
                  <View style={styles.circleContainer}>
                    <View style={styles.circle} />
                  </View>
                  <Image style={[styles.linkIcon, { width: 70, height: 75 }]} source={require('../Images/side_effect.png')} />
                </TouchableOpacity>
                <Text style={[styles.linkText, styles.dmSansFont]}>Side Effects</Text>
              </View>

              <View style={styles.link}>
                <TouchableOpacity style={[styles.orangeBackground, { width: 85, height: 75 }]} onPress={() => navigation.navigate('Survey')}>
                  <View style={styles.circleContainer}>
                    <View style={styles.circle} />
                  </View>
                  <Image style={[styles.linkIcon, { width: 50, height: 65 }]} source={require('../Images/survey.png')} />
                </TouchableOpacity>
                <Text style={[styles.linkText, styles.dmSansFont]}>Survey</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.centeredBooking} onPress={() => navigation.navigate('NearByClinic')}>
              <Text style={[styles.linkText, { fontFamily: 'Lora-SemiBold', fontSize: 18 }]}>Booking a Screening</Text>
              <View style={[styles.linkBooking, styles.bookingBackground]}>
                <Image style={[styles.linkIcon, { alignSelf: 'center', width: 325, height: 220 }]} source={require('../Images/booking.png')} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.chatbotButton]}
              onPress={() => navigation.navigate('Chatbot')}
            >
              <Image style={styles.chatbotIcon} source={require('../Images/ChatbotIcon.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity>
          <BottomNavigator />
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flexGrow: 1,
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
    backgroundColor: '#FFF',
    paddingRight: 10, // Ensure padding inside the container
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: '#000', // Set the text color to black
  },
  iconCustom: {
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
    position: 'relative',
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
    alignItems: 'center',
    bottom: 20,
  },
  bookingBackground: {
    backgroundColor: '#BCE08A',
    width: 333,
    height: 240,
    borderRadius: 20,
    marginTop: 20,
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
    color: '#333',
  },
  chatbotButton: {
    position: 'absolute',
    top: 570,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff914d',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
  chatbotIcon: {
    width: 60,
    height: 60,
  },
  dmSansFont: {
    fontFamily: 'DMSans_18pt-SemiBold',
    fontSize: 12,
  },
  loraFont: {
    fontFamily: 'Lora-SemiBold',
    fontSize: 20,
  },
});

export default MainScreen;
