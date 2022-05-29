import { Animated, StyleSheet, Text, View,TouchableOpacity, ViewStyle, LayoutChangeEvent } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
    mb?: number,
    mt?: number,
    active?: string,
    option1?: string,
    option2?: string,
    style?: ViewStyle,

    state?: boolean,
    onPress?: (arg0:boolean)=>void,
}

export const SwitchButton:React.FC<Props> = ({mb, mt, option1, option2, style, state, onPress}) => {


    const container = {
        marginTop: mt ? mt : 0,
        marginBottom: mb ? mb : 0,
        // height: 50,
        width: "80%",
        backgroundColor: "rgba(0,0,0,0.04)",
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 4,
        ...style
    } as ViewStyle

    const [containerWidth, setContainerWidth] = useState(0);
    const [btnBgPos, setBtnBgPos] = useState(state);
    
    // useEffect(()=>{
    //     setBtnBgPos(active ? {left:4} : {right: 4})
    // },[containerWidth])

    const btnBgPosStyle = btnBgPos ? {left:4} : {right: 4};

    const buttonBg = {
        height: "100%",
        width: "50%",
        backgroundColor: '#fff',
        borderRadius: 30,
        position: 'absolute',
        ...btnBgPosStyle
    } as ViewStyle;


    const toggleAnim = useRef(new Animated.Value(0)).current;

    const toggle = () => {
        Animated.timing(toggleAnim, {
          toValue: btnBgPos ? state ? containerWidth /2 - 4 : 0 : !state ? -containerWidth /2 + 4 : 0 ,
          duration: 500,
          useNativeDriver: true,
        }).start();
      };

    const HandlePress = (option:boolean) => {
        if(option !== state){
            toggle(); 
            onPress ? onPress(!state) : console.log("no action");
        }

    }


    return(
        <View style={container} onLayout={({
            nativeEvent: {
              layout: { width },
            },
          }: LayoutChangeEvent) => setContainerWidth(width)}>

            <Animated.View style={[buttonBg, {transform: [{translateX: toggleAnim}]}]}></Animated.View>

            <TouchableOpacity style={styles.button} onPress={()=>HandlePress(true)}>
                <Text style={!state ? styles.text : styles.textActive}>{option1 ? option1 : "{option1}"}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={()=>HandlePress(false)}>
                <Text style={state ? styles.text : styles.textActive}>{option2 ? option2 : "{option2}"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
        paddingTop: 12,
        paddingBottom: 12,
        width: "50%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
        borderRadius: 30,
    },
    text:{
        fontSize: 16,
        fontFamily: 'Inter_900Black',
        textTransform: 'uppercase',
        color: "#9B9B9B"
    },
    textActive:{
        fontSize: 16,
        fontFamily: 'Inter_900Black',
        textTransform: 'uppercase',
        color: "#25855A"
    },
});