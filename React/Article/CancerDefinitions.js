/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import BottomNavigator from '../BottomNavigator';

const screenHeight = Dimensions.get('window').height;

const CancerDefinitions = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.webViewContainer}>
                <WebView 
                    nestedScrollEnabled
                    source={{ uri: 'https://www.cancercouncil.com.au/cancer-information/understanding-cancer/what-is-cancer/' }}
                    style={styles.webView}
                />
            </View>
            <BottomNavigator />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webViewContainer: {
        flex: 1,
    },
    webView: {
        flex: 1,
    },
});

export default CancerDefinitions;
