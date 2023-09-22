import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  menuBar: {
    width: 60,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },

  openMenuBar: {
    width: 200,
  },

  menuToggle: {
    marginBottom: 20,
  },

  menuToggleText: {
    color: 'white',
    fontSize: 24,
  },

  menuSections: {
    flex: 1,
  },

  menuSection: {
    padding: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },

  mainContent: {
    flex: 1,
    paading: 20,
    textAlign: 'center',
  },

  heading: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
});
