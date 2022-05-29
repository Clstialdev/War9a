import { Image, StyleSheet, Text, TouchableHighlight, View, ViewStyle } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';


interface Props {
    text: string,
    fontWeight?: number,
    color?: string,
    mt?: number,
    mb?: number,
    ml?: number,
    mr?: number,
    ptb?: number,
    plr?: number,
    pos?: "relative" | "absolute",
    t?: number,
    b?: number,
    l?: number,
    r?: number,
    sz?: "sm" | "md" | "lg",
    fs?: number,
    icon?: string,
    shadow?: boolean,
    removable?: boolean,
    press?: () => void,
    style?: ViewStyle
}

export const TagButton:React.FC<Props> = ({text, fontWeight, color, mt,mb,ml,mr, ptb, plr, pos, t,b,l,r, sz, fs, icon, press, shadow, style, removable}) =>{
    let fontF = 'Inter_700Bold';
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

    const shadowStyle = shadow ? { 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 10, 
    } as ViewStyle : {}


    const styles = StyleSheet.create({
        container:{
            backgroundColor: color ? color : '#25855A',
            paddingTop: sz === "sm"? 3 : sz==="md" ? 9 : !ptb ? 12 : ptb,
            paddingBottom: sz === "sm"? 3 : sz==="md" ? 9 : !ptb ? 12 : ptb,
            paddingLeft: sz === "sm"? 10 : sz==="md" ? 23 : !plr ? 28 : plr,
            paddingRight: sz === "sm"? 10 : sz==="md" ? 23 : !plr ? 28 : plr,
            minHeight: sz === "sm"? 26 : sz==="md" ? 40 : 30,
            borderRadius: 20,
            marginTop: !mt ? 0 : mt,
            marginBottom: !mb ? 0 : mb,
            marginLeft: !ml ? 0 : ml,
            marginRight: !mr ? 0 : mr,
            position: !pos ? "relative" : pos,
            top: !t ? 0 : t,
            bottom: !b ? 0 : b,
            left: !l ? 0 : l,
            right: !r ? 0 : r,
            ...shadowStyle,
            ...style,
            
        },
        text:{
            fontFamily: fontF,
            color: 'white',
            fontSize: fs ? fs : sz === "sm" ? 10 : sz==="md" ? 12 : 15,
            textAlign: 'center',
            paddingLeft: 2
        },
        fragment:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        }
        });
        
    return(
        <TouchableHighlight underlayColor="#276749" onPress={press} style={styles.container}>
            <View style={styles.fragment}>
                {icon ? <Icon name={icon} size={sz === "sm"? 18 : sz==="md" ? 21 : 25} color="white"/> : null}
                <Text style={styles.text}>{text}</Text>
                {removable ? <Icon name="close" size={sz === "sm"? 18 : sz==="md" ? 21 : 25} style={{marginLeft: 10}} color="white"/> : <View></View>}
            </View>
        </TouchableHighlight>
    );
}

