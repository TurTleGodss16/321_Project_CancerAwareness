/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview';

const screenHeight = Dimensions.get('window').height;
const navBarHeight = 50;

const CancerTypes = ({ navigation }) => {
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <WebView 
                    nestedScrollEnabled
                    source={{ uri: 'https://www.cancercouncil.com.au/cancer-information/#types'}}
                    style={{ height: screenHeight * 0.93 - navBarHeight}}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default CancerTypes;
