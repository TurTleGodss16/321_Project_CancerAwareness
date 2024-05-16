/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    ScrollView
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const navBarHeight = 50;

const Articles = ({}) => {
    return(
        <ScrollView style={{ flex: 1 }}>
            <WebView nestedScrollEnabled
                source={{ uri: 'https://www.cancer.org.au/cancer-information/types-of-cancer/anal-cancer'}}
                style={{ height: screenHeight * 0.93 - navBarHeight}}
            />
        </ScrollView>
    );
};

export default Articles;