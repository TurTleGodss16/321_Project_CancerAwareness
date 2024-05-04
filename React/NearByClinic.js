/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  ScrollView,
  Linking,
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

// Existing imports...

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
      <Button title="Find Clinics" onPress={getLocation} />
      <ScrollView style={styles.scrollView}>
          {clinics.map((clinic, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={[styles.cell, styles.firstCell]} onPress={() => handleOpenGoogleMaps(clinic)}>
                {clinic.name}
              </Text>
              <View style={styles.secondCell}>
                <Text style={[styles.cell, styles.secondCellText]} onPress={() => handleOpenGoogleMaps(clinic)}>
                  {clinic.vicinity}
                </Text>
                <Text style={styles.link} onPress={() => handleOpenGoogleMaps(clinic)}>
                  Open in Google Maps
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  firstHeader: {
    flex: 2,
  },
  secondHeader: {
    flex: 3,
  },
  cell: {
    fontSize: 16,
    textAlign: 'center',
  },
  firstCell: {
    flex: 2,
  },
  secondCell: {
    flex: 3,
    justifyContent: 'center',
  },
  secondCellText: {
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default NearByClinic;
