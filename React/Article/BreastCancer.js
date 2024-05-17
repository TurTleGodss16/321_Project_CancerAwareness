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

const Articles = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.webViewContainer}>
                <WebView 
                    nestedScrollEnabled
                    source={{ uri: 'https://www.cancer.org.au/cancer-information/types-of-cancer/breast-cancer' }}
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

export default Articles;
