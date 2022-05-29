import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

import servicePreview from '../../assets/ServicePreview.png';
import group from '../../assets/Group.png';

import { BookmarkButton } from '../Buttons/BookmarkButton';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import CachedImage from 'react-native-expo-cached-image';
import { Firestore } from 'firebase/firestore';



interface cardProps {
    db:Firestore,
    serviceId: string,
    serviceData: any,
    userUid:string,
    userName:string,
    expoPushToken: string,
    width?: number,
    mb?: number,
    navigate?: string,
    bookmarkPress?: ()=> void,
    bookmarked?: () => Promise<any> | boolean,
}

export const ServiceCard:React.FC<cardProps> = ({db, serviceId, serviceData, userUid, userName, expoPushToken, navigate="ServiceDetails" ,width, mb, bookmarkPress, bookmarked}) => {
    const navigation = useNavigation();
    const ServiceImage  = serviceData.image ? {uri: serviceData.image.toString()} : servicePreview;
    const [isBookmarked, setIsBookmarked] = useState(false);

    const updateBookmark = async() => {
        if(bookmarked != undefined){
            let state = await bookmarked();
            setIsBookmarked(state);
        }
    }

    useEffect(()=>{
        updateBookmark();
    },[isBookmarked]);

    let tpc = serviceData.tpc ? serviceData.tpc : 300000;

    return(
        <TouchableOpacity onPress={()=>navigation.navigate(navigate, {db:db,image:ServiceImage, serviceId:serviceId, serviceData:serviceData, userUid:userUid, userName:userName, expoPushToken: expoPushToken})}>
        <View style={{...cardStyles.container , width: width ? vw(width) : vw(50), marginBottom: mb ? mb : 20}}>
            
            <View style={cardStyles.time} >
                {/* <CachedImage source={ServiceImage} style={cardStyles.blur} 
                resizeMethod="resize" resizeMode="cover" blurRadius={4}/> */}
                <Text style={cardStyles.timeValue}>{Math.round(tpc/60000)}</Text>
                <Text style={cardStyles.timeType}>Mins</Text>
            </View>

            {bookmarkPress ? <BookmarkButton pos="absolute" top={5} right={7} onPress={bookmarkPress} active={isBookmarked}/>
                :
                <View></View>
            }
            <CachedImage source={ServiceImage} style={cardStyles.image} 
            resizeMethod="scale" resizeMode="cover"/>

            <Text style={cardStyles.name}>{serviceData.name}</Text>
            <View style={cardStyles.flex}>
                <Image source={group} resizeMethod="resize" resizeMode="contain" style={{height: 18, width:36}}/>
                <Text style={cardStyles.inQueueText}>+20 In queue</Text>
            </View>
            <View style={cardStyles.flex}>
                <Icon name="location-sharp" size={12} style={{color:'rgba(113,110,144,0.5)'}}/>
                <Text style={cardStyles.locationText}>{serviceData.address}</Text>
            </View>
        </View>
        </TouchableOpacity>
    );
}


const cardStyles = StyleSheet.create({
    container:{
        display:'flex',
        width: vw(50),
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: 'rgba(46, 46, 79, 0.2)',
        elevation: 8,
        marginTop: 15,
        marginBottom: 20,
        marginLeft: 10,
        paddingBottom: 9

    },
    blur:{
        height: 40,
        width: 40,
        position: 'absolute',
        borderRadius: 7,
        opacity: 0.3
    },
    time:{
        backgroundColor: 'rgba(255,255,255,0.9)',
        height: 40,
        width: 40,
        position: 'absolute',
        // elevation: 1,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        top: 5,
        left: 7
    },
    timeValue:{
        color: "#F0635A",
        fontFamily: "Inter_700Bold",
        fontSize: 18,
        lineHeight: 18
    },
    timeType:{
        color: "#F0635A",
        fontFamily: "Inter_400Regular",
        fontSize: 12,
        textTransform: 'uppercase',
        lineHeight: 12
    },
    bookmark:{
        backgroundColor: 'rgba(255,255,255,0.9)',
        height: 25,
        width: 25,
        position: 'absolute',
        // elevation: 1,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        top: 5,
        right: 7
    },
    bkblur:{
        height: 25,
        width: 25,
        position: 'absolute',
        borderRadius: 5,
        opacity: 0.3
    },
    image:{
        width: "100%",
        height: 140,
        borderRadius: 7
    },
    name:{
        fontFamily: 'Inter_700Bold',
        fontSize: 11.5,
        marginLeft: 8,
        marginTop: 12
    },
    flex:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 8
    },
    inQueueText:{
        color:'rgba(63, 56, 221, 1)',
        fontSize: 11,
        fontFamily: 'Inter_600SemiBold',
        marginLeft: 4,
    },
    locationText:{
        color: 'rgba(113,110,144,0.5)',
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        marginLeft: 4
    }
});