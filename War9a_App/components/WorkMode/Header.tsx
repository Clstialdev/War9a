import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableHighlight, TextInput, Alert } from 'react-native';
import { UIButton } from "../Buttons/UIButton";
import { TagButton } from "../Buttons/TagButton";
import { vw, vh} from 'react-native-expo-viewport-units';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { Firestore } from 'firebase/firestore';

interface Props {
    serviceName?: string,
    serviceOwned?: undefined | string,
    queueLength?: number,
    addToQueue?: ()=>void,
    removeFromQueue?: ()=>void,
}

export const Header:React.FC<Props> = ({serviceName, serviceOwned, queueLength, addToQueue, removeFromQueue}) => {
    return(
        <View style={styles.container}>
            <View style={styles.bg}></View>
            <TopBar serviceName={serviceName} serviceOwned={serviceOwned}/>
            <QueueControl queueLength={queueLength} addToQueue={addToQueue} removeFromQueue={removeFromQueue}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        display:'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        minHeight: vh(30),
        width: "100%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingTop: 20
        
    },
    bg:{
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor:'#6767CD',
        height: "100%",
        width: "100%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
});



const TopBar:React.FC<Props> = ({serviceName, serviceOwned}) =>{
    const navigation = useNavigation();

    const [workPressCounter, setWorkPressCounter] = useState(0);

    let serviceOwner = serviceOwned!==undefined ? true : false;
    
    const WorkModePress = () =>{
        navigation.navigate("MainHub");
    }

    return(
        <View style={topbarStyles.container}>
            <TouchableOpacity onPress={WorkModePress}>
                <IonIcon name="shuffle-outline" size={30} color="white"/>
            </TouchableOpacity>
            <View style={topbarStyles.modeContainer}>
                <Text style={topbarStyles.workModeText}>Work Mode</Text>
                <Text style={topbarStyles.serviceName}>{`${serviceName}`}</Text>
            </View>
            <IonIcon name="qr-code-outline" size={25} color="white" onPress={()=>navigation.navigate("QrGenerator")}/>
        </View>
    );

}


const topbarStyles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        width: '90%',
        marginTop: 35
    },

    modeContainer: {
        marginTop: 3,
        
    },
    workModeText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 13,
        color: 'white',
        textAlign: 'center',
        opacity: 0.8
    },
    serviceName:{
        fontFamily: 'Inter_400Regular',
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    }
});


const QueueControl:React.FC<Props> = ({queueLength, addToQueue, removeFromQueue}) => {
    return(
        <View style={queueControlStyles.container}>
            <TouchableOpacity style={queueControlStyles.controlBtn} onPress={removeFromQueue}>
                <Text style={queueControlStyles.controlText}>-</Text>
            </TouchableOpacity>
            <View style={{position: 'relative'}}>
                <Text style={queueControlStyles.number}>{queueLength}</Text>
                <Text style={queueControlStyles.queuedText}>Queued</Text>
            </View>

            <TouchableOpacity style={queueControlStyles.controlBtn} onPress={addToQueue}>
                <Text style={queueControlStyles.controlText}>+</Text>
            </TouchableOpacity>

        </View>
    )
}

const queueControlStyles = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: "row",
        width: "100%",
        marginTop: 20,
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingBottom: 60,
        
    },
    number:{
        fontSize: 70,
        fontWeight: "bold",
        color: '#fff',
        minWidth: 100,
        textAlign: "center"
    },
    queuedText:{
        position: 'absolute',
        bottom: -10,
        // width: "300%",
        left: "25%",
        color: '#fff',
        opacity: 0.8,
        fontSize: 13,

    },
    controlBtn:{
        height: 60,
        width: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: "white",
    },
    controlText:{
        color: "#6767CD",
        fontSize: 45,
        fontWeight: "bold",
        paddingBottom: 5,
    }
})