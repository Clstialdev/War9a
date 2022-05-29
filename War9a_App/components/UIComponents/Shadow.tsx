import React, { useEffect } from 'react';
import { View, ViewStyle, StyleSheet} from 'react-native';
import { Platform } from 'expo-modules-core';

interface Props {
    style: ViewStyle,
    strength?: number,
    color?: string,
}

export const Shadow:React.FC<Props> = ({style, strength, color="black"}) => {
    
    const styles = StyleSheet.create({
        shadow:{
        height: "100%",
        width: "100%",
        backgroundColor: Platform.OS === "ios" ? color : "transparent",
        shadowColor: Platform.OS === "ios" ? color : "transparent",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 30,
        elevation: 21,
        position: 'absolute',
        borderRadius: 20,
        },
    })

    return(
        <View style={style}>
            {Array(strength ? strength : 1).fill(1).map((v, i:number)=> <View style={styles.shadow} key={i}></View>)}
        </View>
    );
}
