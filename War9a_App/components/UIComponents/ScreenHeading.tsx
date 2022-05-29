import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextStyle, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { BackButton } from '../Buttons/BackButton';
import { BookmarkButton } from '../Buttons/BookmarkButton';


interface Props {
    text: string,
    color?: string,
    pos?: "absolute" | "relative",
    top?: number,
    mt?: number,
    mb?: number,
    fs?: number,
    bookmark?: boolean,
    bkimage?: string,
    shadow?: boolean,
    options?: boolean,
}

export const ScreenHeading:React.FC<Props> = ({text, color="black", pos, top, mt, mb, fs, bookmark, bkimage, shadow, options}) => {
    
    shadow = shadow !== undefined ? shadow : true;

    const shadowStyle = shadow ? {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 8,
        padding: 6,
        maxWidth: "79%",
        elevation: 21,
    } as TextStyle : {} ;

    const styles = StyleSheet.create({
        container:{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 0,
            marginBottom: mb ? mb : 0,
            position: pos ? pos : "relative",
            top: top ? top : 0,
            marginTop: mt ? mt : 0,
            width: "85%",
            zIndex:4
        },
        text: {
            fontSize: fs ? fs : 21,
            fontFamily: "Inter_700Bold",
            marginLeft: 10,
            color: color,

            ...shadowStyle
        }
    })

    return(
        <View style={styles.container}>
            <BackButton color={color ? color : "black"} shadow={shadow}/>
            <Text style={styles.text}>{text}</Text>
            {bookmark ? <BookmarkButton image={false} size={32} pos="absolute" top="auto" right={0}/> : <View></View>}
            {options ? <Icon name="ellipsis-vertical" size={22} style={{position: 'absolute', top: 'auto', right: 0}}/> : <View></View>}
        </View>
    );
}