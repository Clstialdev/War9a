import React , {useContext, useEffect, useState} from 'react';
import { Image, StyleSheet, View, ScrollView, Route, Text } from 'react-native';
import { vw, vh} from 'react-native-expo-viewport-units';
import { LanguageContext } from '../Languages';


interface queueTicketProps {
    index: number,
    userName: string,
    color?: string,
    selfAdded?: boolean,
}


export const QueueTicket:React.FC<queueTicketProps> = ({index, userName, color="#25855A", selfAdded=true}) => {
    const {language} = useContext(LanguageContext);
    return(
        <View style={queueTicketStyle.container}>
            <Text style={{...queueTicketStyle.smallNumber, color: color}}>#{index}</Text>
            <Text style={queueTicketStyle.userName}>{userName}</Text>
            <Text style={{...queueTicketStyle.bigNumber, color: color}}>#{index}</Text>
            <Text style={queueTicketStyle.selfAdded}>{selfAdded ? language.serviceQueue.addedInfo[0] : language.serviceQueue.addedInfo[1]}</Text>
        </View>
    )
}

const queueTicketStyle = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: "5%",
        paddingRight: '5%',
        height: 110,
        width: vw(85),
        backgroundColor: "rgba(247,247,247,1)",
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 10},
        elevation: 5,
        marginLeft: "7.5%",
        marginRight: "7.5%"
    },
    smallNumber: {
        color: "#25855A",
        position: 'absolute',
        left: "5%",
        top: "10%",
    },
    userName: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    bigNumber:{
        position: 'absolute',
        fontSize: 60,
        fontWeight: "600",
        right: "5%",
        top:"10%",
        opacity: 0.4
    },
    selfAdded:{
        position: 'absolute',
        bottom: "10%",
        right: "5%",
        opacity: 0.3
    }
    
})
