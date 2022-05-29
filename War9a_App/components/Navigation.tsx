import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React, { useContext } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { LanguageContext } from './Languages';


interface Props{
    active: "explore" | "queues" | "favorites" | "profile"
}

export const Navigation:React.FC<Props> = ({active}) =>{
    const navigation = useNavigation();
    const {language} = useContext(LanguageContext);
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.navBtn} onPress={()=>navigation.navigate("MainHub")}>
                <Icon name="compass" size={30} color={active === "explore" ? "#25855A" : "rgba(0,0,0,0.2)"}/>
                <Text style={active === "explore" ? styles.active : styles.text}>{language.Navigation.exploreBtn}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navBtn} onPress={()=>navigation.navigate("MyQueues")}>
                <Icon name="alarm" size={30} color={active === "queues" ? "#25855A" : "rgba(0,0,0,0.2)"}/>
                <Text style={active === "queues" ? styles.active : styles.text}>{language.Navigation.queuesBtn}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navBtn} onPress={()=>navigation.navigate("Favorites")}>
                <Icon name="heart" size={30} color={active === "favorites" ? "#25855A" : "rgba(0,0,0,0.2)"}/>
                <Text style={active === "favorites" ? styles.active : styles.text}>{language.Navigation.favoritesBtn}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navBtn} onPress={()=>navigation.navigate("Profile")}>
                <Icon name="person" size={30} color={active === "profile" ? "#25855A" : "rgba(0,0,0,0.2)"}/>
                <Text style={active === "profile" ? styles.active : styles.text}>{language.Navigation.profileBtn}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      height: 100,
      width: "100%",
      position: 'absolute',
      bottom: 0,
      paddingBottom: 10,
      backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: 'rgba(46, 46, 79, 0.2)',
        elevation: 8,

    },
    navBtn:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontFamily:"Inter_900Black",
        fontSize: 12,
        color: "rgba(0,0,0,0.2)"
    },
    active:{
        fontFamily:"Inter_900Black",
        fontSize: 12,
        color: "#25855A"
    }
})