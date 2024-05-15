import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const ResultScreen = ({ route, navigation }) => {
  // Extract totalScore from route.params
  const { totalScore } = route.params;
  console.log("Total score: ", totalScore);
  if (totalScore >= 60) {
    return (
      <View>
        <Text>Please find the nearby clinics and book a screening with them soon!</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NearByClinic');
          }}>
          <Text>NearBy Clinics</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (totalScore < 60) {
    return (
      <View>
        <Text>You may not be predisposed to Cancer. Click below for resources on Cancer.</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Main');
          }}>
          <Text>Main Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default ResultScreen;
