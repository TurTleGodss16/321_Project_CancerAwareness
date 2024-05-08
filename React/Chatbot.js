import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const ChatbotScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://creator.voiceflow.com/prototype/6639cc87dfee0b8ea6a1bfb5' }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatbotScreen;