import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Styles'; // Import styles from the CSS file

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.container}>
      {/* Menu Bar */}
      <View style={[styles.menuBar, isMenuOpen ? styles.openMenuBar : {}]}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuToggle}>
          <Text style={styles.menuToggleText}>☰</Text>
        </TouchableOpacity>
        <View style={styles.menuSections}>
          <TouchableOpacity style={styles.menuSection}>
            <Text>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuSection}>
            <Text>Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuSection}>
            <Text>Info</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.heading}>Cancer App</Text>
        <Text>You can find any cancer information at here</Text>
      </View>
    </View>
  );
};

export default App;
