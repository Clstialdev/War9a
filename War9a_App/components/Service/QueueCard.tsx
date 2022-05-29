import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, ViewStyle, Text, Image} from 'react-native';

import group from '../../assets/Queued.png';

import { UIButton } from '../Buttons/UIButton';
import { LanguageContext } from '../Languages';


interface Props {
    number?:number,
    style?:ViewStyle,
    onPress?: ()=>void;
}

export const QueueCard:React.FC<Props> = ({number,style,onPress}) =>{

    const styles = StyleSheet.create({
        container:{
            height: 60,
            width: "80%",
            backgroundColor: '#fff',
            borderRadius: 30,
            zIndex: 1,
            shadowColor: "black",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.13,
            shadowRadius: 30,
            elevation: 21,
            position: 'absolute',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            
            ...style
        },
        text:{
            color: '#3F38DD',
            fontFamily: 'Inter_700Bold',
            // fontSize: 14
        }
    })

    const inQueue = number ? number > 20 ? "+20" : number.toString() : "0" 

    const {language} = useContext(LanguageContext);

    return(
        <View style={styles.container}>
            <Image source={group} resizeMethod="resize" resizeMode="contain" style={{width:86}}/>
            <Text style={styles.text}>{inQueue + " " + language.queueDetails.inqueueTitle}</Text>
            <UIButton text={language.queueDetails.join} sz="md" fontWeight={900} style={{paddingLeft:25, paddingRight:25, borderRadius:20}} press={onPress ? onPress : ()=>console.log("Pressed")}/>
        </View>
    );
}

