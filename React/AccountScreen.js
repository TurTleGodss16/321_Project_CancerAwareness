//Account Screen

import React from 'react';
import {View, Text} from 'react-native';

const AccountScreen = ({navigation, route}) => {
    const User = {
        username: "JohnDoe123",
        location: "Northfields Ave, WOllongong, NSW, 252",
        age: 23,

        recentArticles:[
            {
                title: "Article 1 - Page 1",
                excerpt: "First sentence from the page.",
            },
            {
                title: "Article 2 - Page 42",
                excerpt: "First sentence from the page.",
            },
            {
                title: "Article 3 - Page 123",
                excerpt: "First sentence from the page.",
            },
        ],
    }
};

const [usename, setUsername] = useState(user.username);
const [location, setLocation] = useState(user.location);
const [age, setAge] = useState(user.age);

const handleSaveButtonCLick = () => {
    // update user object with new values
    user.username = username;
    user.location = location;
    user.age = age;

    // save the changes to the server
    

};

return(
    <View style = {style.container}>
        <Text style = {StyleSheet.title}>Profile</Text>
        <View style = {StyleSheet.profileInfo}>
            <Image style = {StyleSheet.profileImage} source = {{uri: 'https://example.com/profile-image.png'}}/>
            <view style = {styles.userDetails}>
                <input placeholder = "Username" value = {username} onCHangeText = {setUsername}/>
                <input placeholder = "Location" value = {location} onCHangeText = {setLocation}/>
                <input placeholder = "Age" value = {age} onCHangeText = {setAge}/>
            </view>
        </View>
        <view stye = {styles.recetnArticles}>
            <Text style = {styles.recentArticlesTitle}>Recent Articles</Text>
            {user.recentArticles.map((article) => (
          <View key = {article.title} style = {styles.recentArticle}>
            <Text style = {styles.recentArticleTitle}>{article.title}</Text>
            <Text style = {styles.recentArticleExcerpt}>{article.excerpt}</Text>
          </View>
        ))}
        </view>
        <button title = "Save" onPress = {handleSaveButtonCLick} />
    </View>
);

const styles = StyleSheet.create({
    body: {
        backgroundColour: "white",
        gap: 10,
    },
    container: {
        flex: 1,
        padding: 10,
    },
    title:{
        fontSize: 24,
        fontWeight: "bold",
    },
    profileInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    userDetails: {
        marginLeft: 16,
    },
    recentArticles: {
        marginTop: 24,
    },
    recentArticlesTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    recentArticle: {
        marginTop: 12,
    },
    recentArticleTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    recentArticleExcerpt: {
        fontSize: 12,
        color: "#666",
    },
})
export default AccountScreen;
