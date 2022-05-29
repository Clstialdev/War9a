import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

interface RoundTag {
    name: string,
    icon?: string,
    active?: boolean,
    color?: string,
    onPress: ()=>void,
}

export const RoundTag:React.FC<stateTagProps> = ({icon="question", name, active=false, color="black", onPress}) => {
    
    const shadow = active ? {
        shadowColor: color ? color : "black",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 21,
    } : {}
    const roundTagStyles = StyleSheet.create({
        container:{
            backgroundColor: active ? color : "white",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            borderRadius: 60,
            borderWidth: 2,
            borderColor: active ? color : "rgba(0,0,0,0.05)",
            ...shadow
        },
        text:{
            textAlign: 'center',
            fontSize: 15,
            fontFamily: 'Inter_600SemiBold',
            marginTop: 12
        }
    })

    return(
        <TouchableOpacity style={{marginRight: 12}} onPress={onPress}>
            <View style={roundTagStyles.container}>
                <Icon name={icon} size={40} color={active ? "white" : "rgba(0,0,0,0.4)"}/>
            </View>
            <Text style={roundTagStyles.text}>{name}</Text>
        </TouchableOpacity>
    );
};