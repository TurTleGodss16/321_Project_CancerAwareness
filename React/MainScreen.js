import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const MainScreen = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = text => {
    setSearchText(text);
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

        <Text style={styles.headerText}>Quick Links</Text>

        <View style={styles.linksContainer}>
          <TouchableOpacity style={styles.link}>
            <Image style={styles.linkIcon} source={require('../Images/cancer_symbol.png')} />
            <Text style={styles.linkText}>What is Cancer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link}>
            <Image style={styles.linkIcon} source={require('../Images/type_of_cancer.png')} />
            <Text style={styles.linkText}>Types</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link}>
            <Image style={styles.linkIcon} source={require('../Images/reason.png')} />
            <Text style={styles.linkText}>Causes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linksContainer}>
          <TouchableOpacity style={styles.link}>
            <Image style={styles.linkIcon} source={require('../Images/treatment.png')} />
            <Text style={styles.linkText}>Treatment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link}>
            <Image style={styles.linkIcon} source={require('../Images/side_effect.png')} />
            <Text style={styles.linkText}>Side Effects</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link}>
            <Image style={styles.linkIcon} source={require('../Images/survey.png')} />
            <Text style={styles.linkText}>Survey</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Booking')}>
          <Image style={styles.linkIcon} source={require('../Images/booking.png')} />
          <Text style={styles.linkText}>Booking a Screening</Text>
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
});

export default MainScreen;
