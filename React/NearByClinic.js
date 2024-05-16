import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

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
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Error requesting location permission:', err);
    return false;
  }
};

const findNearbyClinics = async (latitude, longitude, setClinics) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      {
        params: {
          key: API_KEY,
          location: `${latitude},${longitude}`,
          radius: 5000, // Specify radius in meters
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
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (location) {
      findNearbyClinics(
        location.coords.latitude,
        location.coords.longitude,
        setClinics,
      );
    }
  }, [location]);

  const getLocation = async () => {
    const result = await requestLocationPermission();
    if (result) {
      Geolocation.getCurrentPosition(
        position => {
          setLocation(position);
          setShowTable(true);
        },
        error => {
          console.error('Error getting location:', error);
          setLocation(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };

  const handleOpenGoogleMaps = clinic => {
    const { vicinity } = clinic;
    const label = encodeURIComponent(vicinity);
    const url = `https://www.google.com/maps/search/?api=1&query=${label}`;

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Nearby Clinics</Text>
      <TouchableOpacity style={styles.findButton} onPress={getLocation}>
        <Text style={styles.findButtonText}>Find Clinics</Text>
      </TouchableOpacity>
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
  findButton: {
    backgroundColor: '#ff914d',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  findButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default NearByClinic;
