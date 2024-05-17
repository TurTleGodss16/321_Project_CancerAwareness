import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import BottomNavigator from './BottomNavigator'; // Ensure this path is correct

const ChatbotScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webViewContainer}>
        <WebView
          source={{ uri: 'https://creator.voiceflow.com/prototype/6639cc87dfee0b8ea6a1bfb5' }}
          style={{ flex: 1 }}
        />
      </View>
      <BottomNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
  },
});

export default ChatbotScreen;
