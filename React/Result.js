import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Dimensions } from 'react-native';
import BottomNavigator from './BottomNavigator'; // Ensure the path is correct

const screenHeight = Dimensions.get('window').height;
const ResultScreen = ({ route, navigation }) => {
  // Extract totalScore from route.params
  const { totalScore } = route.params;
  console.log("Total score: ", totalScore);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {totalScore >= 60 ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Please find the nearby clinics and book a screening with them soon!
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('NearByClinic');
              }}>
              <Text style={styles.buttonText}>NearBy Clinics</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              You may not be predisposed to Cancer. Click below for resources on Cancer.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('Main');
              }}>
              <Text style={styles.buttonText}>Main Menu</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <View Style = {styles.bottomNavigatorContainer}>
        <BottomNavigator />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 80, // Ensure there is space for the bottom navigator
  },
  resultContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#335e90',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomNavigatorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ResultScreen;
