import { StyleSheet, Text, TouchableHighlight, View, ViewStyle } from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

interface UIButtonProps {
    text: string,
    fontWeight?: number,
    color?: string,
    mt?: number,
    mb?: number,
    ml?: number,
    mr?: number,
    pos?: "relative" | "absolute",
    t?: number,
    b?: number,
    l?: number,
    r?: number,
    sz?: "sm" | "md" | "lg" | "xxl",
    mxw?: number,
    shadow?: boolean,
    icon?: string,
    press?: () => void,
    style?: ViewStyle
}

export const UIButton:React.FC<UIButtonProps> = ({text, fontWeight, mt,mb,ml,mr, pos, t,b,l,r, sz, color, mxw, shadow, icon, style, press}) =>{
    let fontF = 'Inter_400Regular';
    switch (fontWeight) {
        case 400 || null:
            fontF = 'Inter_400Regular';
            break;
        case 600:
            fontF = 'Inter_600SemiBold';
            break;
        case 700:
            fontF = 'Inter_700Bold';
            break;
        case 900:
            fontF = 'Inter_900Black';
            break;
    }


    const styles = StyleSheet.create({
        container:{
            backgroundColor: color ? color : '#25855A',
            paddingTop: sz === "sm"? 6 : sz==="md" ? 8 : sz==="xxl" ? 15 : 10,
            paddingBottom: sz === "sm"? 6 : sz==="md" ? 8 : sz==="xxl" ? 15 : 10,
            paddingLeft: sz === "sm"? "3%" : sz==="md" ? 25 : sz==="xxl" ? "20%" : "20%",
            paddingRight: sz === "sm"? "3%" : sz==="md" ? 25 : sz==="xxl" ? "20%" : "20%",
            borderRadius: sz=== "xxl" ? 12 : 5,
            marginTop: mt === null ? 0 : mt,
            marginBottom: mb === null ? 0 : mb,
            marginLeft: ml === null ? 0 : ml,
            marginRight: mr === null ? 0 : mr,
            position: pos === null ? "relative" : pos,
            top: t === null ? 0 : t,
            bottom: b === null ? 0 : b,
            left: l === null ? 0 : l,
            right: r === null ? 0 : r,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 8,
            },
            shadowOpacity: shadow ? 0.15 : 0,
            shadowRadius: 11.14,
            elevation: 17,
            ...style
        },
        text:{
            fontFamily: fontF,
            color: 'white',
            fontSize: sz === "sm" ? 10 : sz==="md" ? 12 : sz==="xxl" ? 17 : 15,
            textAlign: 'center',
            paddingLeft: icon ? sz === "sm" ? 10 : sz==="md" ? 12 : sz==="xxl" ? 17 : 15 : 0 ,
            
        },
        });
        
    return(
        <TouchableHighlight underlayColor="#276749" onPress={press} style={styles.container}>
            <View style={{display: 'flex',flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                {icon ? <Icon name={icon} color="white" size={sz === "sm" ? 12 : sz==="md" ? 16 : sz==="xxl" ? 30 : 20} style={{position: 'absolute', left: -5}}/> : <View />}
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableHighlight>
    );
}

