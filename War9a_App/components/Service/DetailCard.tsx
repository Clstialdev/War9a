import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    icon: string,
    text?: string,
    description?: string,
}

export const DetailCard:React.FC<Props> = ({icon, text, description}) => {

    return(
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name={icon} size={25} color="#25855A"/>
            </View>
            <View>
                <Text style={styles.text}>{text ? text : "Pass a text={''} param"}</Text>
                <Text style={styles.description}>{description ? description : "Pass a description={''} param"}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        
    },
    iconContainer:{
        height: 45,
        width: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(37,133,90,0.2)',
        marginRight: 10,
        borderRadius: 10
    },
    text:{
        fontSize: 15.5,
        fontFamily: "Inter_600SemiBold",
        paddingBottom: 5,
        
    },
    description:{
        fontFamily: 'Inter_700Bold',
        color: 'rgba(0,0,0,0.44)',
        fontSize: 13,
        
    },
})