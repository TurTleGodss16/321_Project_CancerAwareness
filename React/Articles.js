import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavigator from './BottomNavigator'; // Ensure this path is correct

const Articles = () => {
  const navigation = useNavigation();

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={[styles.itemContainer, styles.analCancer]}
          onPress={() => navigateToScreen('AnalCancer')}>
          <Text style={styles.headerText}>Anal Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.analCancer]}
          onPress={() => navigateToScreen('AppendixCancer')}>
          <Text style={styles.headerText}>Appendix Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.bladderCancer]}
          onPress={() => navigateToScreen('BladderCancer')}>
          <Text style={styles.headerText}>Bladder Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.boneCancer]}
          onPress={() => navigateToScreen('BoneCancer')}>
          <Text style={styles.headerText}>Bone Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.boneCancer]}
          onPress={() => navigateToScreen('BowelCancer')}>
          <Text style={styles.headerText}>Bowel Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.brainCancer]}
          onPress={() => navigateToScreen('BrainCancer')}>
          <Text style={styles.headerText}>Brain Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.breastCancer]}
          onPress={() => navigateToScreen('BreastCancer')}>
          <Text style={styles.headerText}>Breast Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.breastCancer]}
          onPress={() => navigateToScreen('CervicalCancer')}>
          <Text style={styles.headerText}>Cervical Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.breastCancer]}
          onPress={() => navigateToScreen('GallbladderCancer')}>
          <Text style={styles.headerText}>Gallbladder Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.breastCancer]}
          onPress={() => navigateToScreen('HeadNeckCancer')}>
          <Text style={styles.headerText}>Head & Neck Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.breastCancer]}
          onPress={() => navigateToScreen('HodgkinCancer')}>
          <Text style={styles.headerText}>Hodgkin Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.breastCancer]}
          onPress={() => navigateToScreen('KidneyCancer')}>
          <Text style={styles.headerText}>Kidney Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.breastCancer]}
          onPress={() => navigateToScreen('LeukaemiaCancer')}>
          <Text style={styles.headerText}>Leukaemia Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.breastCancer]}
          onPress={() => navigateToScreen('LiverCancer')}>
          <Text style={styles.headerText}>Liver Cancer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.itemContainer, styles.lungCancer]}
          onPress={() => navigateToScreen('LungCancer')}>
          <Text style={styles.headerText}>Lung Cancer</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  analCancer: {
    backgroundColor: '#ff7f50', // Example color for Anal Cancer
  },
  bladderCancer: {
    backgroundColor: '#6495ed', // Example color for Bladder Cancer
  },
  boneCancer: {
    backgroundColor: '#ff6347', // Example color for Bone Cancer
  },
  brainCancer: {
    backgroundColor: '#8a2be2', // Example color for Brain Cancer
  },
  breastCancer: {
    backgroundColor: '#ff69b4', // Example color for Breast Cancer
  },
  lungCancer: {
    backgroundColor: '#20b2aa', // Example color for Lung Cancer
  },
  // Add styles for other cancer types
});

export default Articles;
