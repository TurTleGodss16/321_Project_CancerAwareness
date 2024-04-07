import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Language = ({navigation}) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.Text}>English</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.Text}>Vietnamese</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.Text}>Turkish</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.Text}>Chinese &#40;Simplified&#41;</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.Text}>Chinese &#40;Traditional&#41;</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.Text}>Thailand</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.Text}>Korean</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.Text}>Japanese</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.Text}>Italian</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.Text}>Greek</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.Text}>France</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 1,
    width: '100%',
    backgroundColor: 'white',
    marginTop: 10,
  },
  container_header: {
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 2,
    width: '100%',
    backgroundColor: '#white',
  },
  Text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  Text_header: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
  },
});

export default Language;
