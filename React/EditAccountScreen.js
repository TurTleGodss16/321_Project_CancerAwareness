//Edit account
/*
import React from 'react';
import {View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from "expo-image-picker";

const EditProfileScreen = ({navigation, route}) => {

    const [selectedImage, setSelectedImage] = useState(imagesURL[0])

    const handleImageSelection = () => {

    }

    return(
        <SafeAreaView style = {{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <ScrollView>
                <View style = {{
                    alignment: "center",
                    marginVertical: 22,  
                }}>
                    <TouchableOpacity onPress = {handleImageSelection}>
                    <Image source = {{ uri: selectedImage }}
                        style = {{
                            height: 150,
                            width: 150,
                            borderRadius: 75,
                            borderWidth: 2,
                            borderColor: "black",
                        }} />
                       <View style = {{
                        position: "absolute",
                        bottom: 0,
                        right: 10,
                        zIndex: 9999
                       }}></View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default EditAccountScreen;
*/