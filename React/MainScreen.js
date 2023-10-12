//Main Screen

import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-screens';

const MainScreen = ({navigation, route}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = text => {
    //Testing console
    console.log('Search Text: ', text);
    setSearchText(text);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default MainScreen;
