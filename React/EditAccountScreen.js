//Edit account

import React from 'react';
import {View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const EditProfileScreen = ({navigation, route}) => {

    const [selectedImage, setSelectedImage] = useState(imagesURL[0]);
    const [email, setEmail] = useState("johndoe@gmail.com");
    const [password, setPassword] = useState("randompassword");


    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

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
                <View  style = {{
                    flexDirection: "Column",
                    marginBottom: 6
                }}>
                    <Text style = {{fontSize: 30, fontWeight: "bold"}}>Name</Text>
                    <View style = {{
                        height: 44,
                        width: "100%",
                        borderColor: "Grey",
                        borderWidth: 1,
                        borderRadius: 4,
                        marginVertical: 6,
                        justifyContent: "center",
                        paddingLeft: 8
                    }}>
                        <TextInput value = {name} 
                            onChangeText = {value => setName(value)}
                            editable = {true}
                        />
                    </View>
                </View>
                <View  style = {{
                    flexDirection: "Column",
                    marginBottom: 6
                }}>
                    <Text style = {{fontSize: 30, fontWeight: "bold"}}>Email</Text>
                    <View style = {{
                        height: 44,
                        width: "100%",
                        borderColor: "Grey",
                        borderWidth: 1,
                        borderRadius: 4,
                        marginVertical: 6,
                        justifyContent: "center",
                        paddingLeft: 8
                    }}>
                        <TextInput value = {email} 
                            onChangeText = {value => setEmail(value)}
                            editable = {true}
                        />
                    </View>
                </View>
                <View  style = {{
                    flexDirection: "Column",
                    marginBottom: 6
                }}>
                    <Text style = {{fontSize: 30, fontWeight: "bold"}}>Password</Text>
                    <View style = {{
                        height: 44,
                        width: "100%",
                        borderColor: "Grey",
                        borderWidth: 1,
                        borderRadius: 4,
                        marginVertical: 6,
                        justifyContent: "center",
                        paddingLeft: 8
                    }}>
                        <TextInput value = {password} 
                            onChangeText = {value => 
                            setName(password)}
                            secureTextEntry
                            editable = {true} 
                        />
                    </View>
                </View>
                <TouchableOpacity style = {{
                    backgroundColor: "white",
                    height: 44,
                    borderRadius: 6,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Text style = {{
                        fontSize: 16,
                        fontWeight: "bold",
                    }}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>

    );
};

export default EditAccountScreen;
