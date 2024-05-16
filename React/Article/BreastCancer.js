/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const navBarHeight = 50;

const Articles = ({ navigation }) => {
    return(
        <ScrollView style={{ flex: 1 }}>
            <WebView nestedScrollEnabled
                source={{ uri: 'https://www.cancer.org.au/cancer-information/types-of-cancer/breast-cancer'}}
                style={{ height: screenHeight * 0.93 - navBarHeight}}
            />
        </ScrollView>
    );
};

export default Articles;