import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import BottomNavigator from './BottomNavigator';
import {Picker} from '@react-native-picker/picker';
const API_KEY = 'AIzaSyDWxI_qkI1ONKIW9wxiMY4u7qWASgO51bQ'; // Replace 'YOUR_API_KEY' with your Google Maps API key

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error('Error requesting location permission:', err);
    return false;
  }
};

const findNearbyClinics = async (latitude, longitude, radius, setClinics) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      {
        params: {
          key: API_KEY,
          location: `${latitude},${longitude}`,
          radius: radius, // Specify radius in meters
          type: 'hospital', // Specify the type of place
        },
      },
    );

    const results = response.data.results;
    setClinics(results);
  } catch (error) {
    console.error('Error fetching nearby clinics:', error);
  }
};

const NearByClinic = () => {
  const [location, setLocation] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [radius, setRadius] = useState(5000); // Default radius in meters

  useEffect(() => {
    const getLocation = async () => {
      const result = await requestLocationPermission();
      if (result) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position);
            findNearbyClinics(position.coords.latitude, position.coords.longitude, radius, setClinics);
            setLoading(false);
          },
          error => {
            console.error('Error getting location:', error);
            setLocation(null);
            setLoading(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } else {
        setLoading(false);
      }
    };

    getLocation();
  }, [radius]);

  const handleOpenGoogleMaps = clinic => {
    const { vicinity } = clinic;
    const label = encodeURIComponent(vicinity);
    const url = `https://www.google.com/maps/search/?api=1&query=${label}`;

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Search Radius:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={radius}
          style={styles.picker}
          onValueChange={(itemValue) => setRadius(itemValue)}
        >
          <Picker.Item label="1 km" value={1000} />
          <Picker.Item label="5 km" value={5000} />
          <Picker.Item label="10 km" value={10000} />
          <Picker.Item label="20 km" value={20000} />
        </Picker>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          {clinics.map((clinic, index) => (
            <View style={styles.card} key={index}>
              <Text style={styles.clinicName} onPress={() => handleOpenGoogleMaps(clinic)}>
                {clinic.name}
              </Text>
              <Text style={styles.clinicAddress} onPress={() => handleOpenGoogleMaps(clinic)}>
                {clinic.vicinity}
              </Text>
              <TouchableOpacity onPress={() => handleOpenGoogleMaps(clinic)}>
                <Text style={styles.link}>Open in Google Maps</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
       <View style={styles.bottomNavigatorContainer}>
        <BottomNavigator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#335e90',
  },
  label: {
    fontSize: 18,
    color: '#335e90',
    marginBottom: 10,
  },
  pickerContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderColor: '#335e90',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  clinicName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#335e90',
    marginBottom: 8,
  },
  clinicAddress: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  link: {
    color: '#bce081',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  bottomNavigatorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default NearByClinic;
