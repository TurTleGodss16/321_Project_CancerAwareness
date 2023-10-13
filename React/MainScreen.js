/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const MainScreen = ({navigation, route}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = text => {
    // Testing console
    console.log('Search Text: ', text);
    setSearchText(text);
  };

  return (
    <View style={{marginBottom: 50}}>
      <View style={styles.searchContainer}>
        {/*Search bar*/}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchText}
            onChangeText={handleSearch}
          />
          <Icon name="search1" size={30} style={styles.iconCustom} />
        </View>

        {/*Quick link*/}
        <View style={{gap: 10}}>
          <Text style={styles.headerText}>Quick Links</Text>

          {/*First row Links*/}
          <View style={styles.rowCustom}>
            <View>
              <Image
                style={styles.imgCustom}
                source={require('../Images/cancer_symbol.png')}
              />
              <Text style={styles.textDescription}>What is Cancer</Text>
            </View>

            <View>
              <Image
                style={styles.imgCustom}
                source={require('../Images/type_of_cancer.png')}
              />
              <Text style={styles.textDescription}>Types</Text>
            </View>

            <View>
              <Image
                style={styles.imgCustom}
                source={require('../Images/reason.png')}
              />
              <Text style={styles.textDescription}>Causes</Text>
            </View>
          </View>

          {/*Second row link */}
          <View style={styles.rowCustom}>
            <View>
              <Image
                style={styles.imgCustom_treatment}
                source={require('../Images/treatment.png')}
              />
              <Text style={styles.textDescription}>Treament</Text>
            </View>

            <View>
              <Image
                style={styles.imgCustom_SideEffect}
                source={require('../Images/side_effect.png')}
              />
              <Text style={styles.textDescription}>Side Effects</Text>
            </View>

            <View>
              <Image
                style={styles.imgCustom_Survey}
                source={require('../Images/survey.png')}
              />
              <Text style={styles.textDescription}>Survey</Text>
            </View>
          </View>

          <View style={styles.rowCustom_2}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../Images/booking.png')}
            />
            <Text style={styles.textDescription_2}>Booking a Screening</Text>
          </View>
        </View>
      </View>

      {/*Bottom bar */}
      <View style={styles.bottomBar}>
        <Text>Ahihi</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    borderColor: '#000',
    backgroundColor: 'white',
    gap: 20,
    paddingBottom: 220,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  iconCustom: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
  },
  rowCustom: {
    fontSize: 15,
    flexDirection: 'row',
    gap: 33,
    alignSelf: 'center',
  },
  rowCustom_2: {
    fontSize: 15,
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
    marginTop: 15,
  },
  textDescription: {
    textAlign: 'center',
    color: 'black',
  },
  textDescription_2: {
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imgCustom: {
    width: 80,
    height: 80,
  },
  imgCustom_treatment: {
    width: 90,
    height: 90,
  },
  imgCustom_SideEffect: {
    width: 90,
    height: 85,
  },
  imgCustom_Survey: {
    width: 70,
    height: 85,
  },
  bottomBar: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 50,
    borderTopWidth: 1,
  },
});

export default MainScreen;
