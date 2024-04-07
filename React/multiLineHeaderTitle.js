/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';

const MultiLineHeaderTitle = () => {
  return (
    <View>
      <Text style={{fontSize: 25, textAlign: 'center', color: 'black'}}>
        Language
      </Text>
      <Text style={{fontSize: 15, textAlign: 'center', color: 'black'}}>
        Select a default language
      </Text>
    </View>
  );
};

export default MultiLineHeaderTitle;
