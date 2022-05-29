
import SvgQRCode from 'react-native-qrcode-svg';
import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import { vw, vh} from 'react-native-expo-viewport-units';

import { ScreenHeading } from '../components/UIComponents/ScreenHeading'

interface Props {
    serviceId:string,
}

export const QrGenerator:React.FC<Props> = ({serviceId}) =>{
    return(
        <View style={styles.container}>
            <ScreenHeading text='Share Qr Code' color='white' shadow={false} mt={80}/>
            <View style={styles.qrContainer}>
                <View style={styles.qrOutline}>
                    <SvgQRCode value={"http://war9a.com/join/"+serviceId} size={vw(80)}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#6767CD",
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    qrContainer:{
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 100,
    },
    qrOutline:{
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5
    }
});