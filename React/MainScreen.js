/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity, FlatList } from 'react-native';
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
    <View style={styles.container}>
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

        <Text style={styles.headerText}>Quick Links</Text>

        <View style={styles.linksContainer}>
          <TouchableOpacity style={[styles.link, styles.orangeBackground]} onPress={() => navigation.navigate('CancerDefinitions')}>
            <Image style={styles.linkIcon} source={require('../Images/cancer_symbol.png')} />
            <Text style={styles.linkText}>What is Cancer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.link, styles.orangeBackground]} onPress={() => navigation.navigate('CancerTypes')}>
            <Image style={styles.linkIcon} source={require('../Images/type_of_cancer.png')} />
            <Text style={styles.linkText}>Types</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.link, styles.orangeBackground]}>
            <Image style={styles.linkIcon} source={require('../Images/reason.png')} />
            <Text style={styles.linkText}>Causes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linksContainer}>
          <TouchableOpacity style={[styles.link, styles.orangeBackground]}>
            <Image style={styles.linkIcon} source={require('../Images/treatment.png')} />
            <Text style={styles.linkText}>Treatment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.link, styles.orangeBackground]}>
            <Image style={styles.linkIcon} source={require('../Images/side_effect.png')} />
            <Text style={styles.linkText}>Side Effects</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.link, styles.orangeBackground]}>
            <Image style={styles.linkIcon} source={require('../Images/survey.png')} />
            <Text style={styles.linkText}>Survey</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.link, styles.orangeBackground]} onPress={() => navigation.navigate('Booking')}>
          <Image style={styles.linkIcon} source={require('../Images/booking.png')} />
          <Text style={styles.linkText}>Booking a Screening</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.orangeBackground]}
          onPress={() => navigation.navigate('Chatbot')}
        >
          <Text style={styles.linkText}>Go to Chatbot</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarItem} onPress={() => navigation.navigate('Home')}>
          <Image style={styles.bottomBarIcon} source={require('../Images/home.png')} />
          <Text style={styles.bottomBarText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomBarItem} onPress={() => navigation.navigate('Search')}>
          <Image style={styles.bottomBarIcon} source={require('../Images/compass.png')} />
          <Text style={styles.bottomBarText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomBarItem} onPress={() => navigation.navigate('Survey')}>
          <Image style={styles.bottomBarIcon} source={require('../Images/survey_bar.png')} />
          <Text style={styles.bottomBarText}>Survey</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
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
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  link: {
    alignItems: 'center',
  },
  orangeBackground: {
    backgroundColor: '#FFA500',
    borderRadius: 5,
    padding: 10,
  },
  linkIcon: {
    width: 80,
    height: 80,
  },
  linkText: {
    color: '#333333',
    marginTop: 5,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#CCCCCC',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bottomBarItem: {
    alignItems: 'center',
  },
  bottomBarIcon: {
    width: 30,
    height: 30,
  },
  bottomBarText: {
    color: '#333333',
    marginTop: 5,
    fontSize: 12,
  },
  suggestion: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  button: {
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default MainScreen;
