
import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ImageSourcePropType } from 'react-native';


import { arrayRemove, arrayUnion, doc, FieldValue, Firestore, getDoc, increment, updateDoc } from "firebase/firestore";

import { ScrollView } from 'react-native-gesture-handler';

import { ServiceCard } from '../Service/ServiceCard';
import { LanguageContext } from '../Languages';
import { useNavigation } from '@react-navigation/native';

interface Props {
    services: any,
    db: Firestore,
    userUid: string,
    userName: string,
    expoPushToken: string,
}

export const AvailableServices:React.FC<Props> = ({services, db, userUid, userName, expoPushToken}) => {

    const navigation = useNavigation();

    const updateFavorite = async(docId:string) => {

        const isFavorited = await isBookmarked(docId);

        const serviceDataRef = doc(db, "services2", docId);

        const userDataRef = doc(db, "users2", userUid);
        if(isFavorited){
            //Here We Remove The Service to The Favorites
            await updateDoc(userDataRef, {
                favorites: arrayRemove(docId),
            });
            await updateDoc(serviceDataRef, {
                likes: increment(-1)
            });
        }
        else{
            //Here We Add The Service to The Favorites
            await updateDoc(userDataRef, {
                favorites: arrayUnion(docId)
            });
            await updateDoc(serviceDataRef, {
                likes: increment(1)
            });
        }
    };

    const isBookmarked = async(docId:string) => {
        const userDataRef = doc(db, "users2", userUid);
        const docSnap = await getDoc(userDataRef);
        return docSnap.data()?.favorites.includes(docId);
    }
    const {language} = useContext(LanguageContext);

    return(
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>{language.MainHub.availableTitle}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("SeeAll")}>
                    <Text style={styles.moreBtn}>{language.MainHub.allBtn + ` >`}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.servicesContainer} >
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingLeft: 5}}>
                    
                    { services ? services.map((doc:any, i:number) => 
                        <ServiceCard key={i} db={db} userUid={userUid} userName={userName} expoPushToken={expoPushToken} serviceId={doc.id} serviceData={doc.data()} bookmarkPress={()=>{updateFavorite(doc.id)}} bookmarked={()=>{return isBookmarked(doc.id)}}/>
                        )
                    : <View></View>
                    }
                    
                    {/* <ServiceCard image={servicePreview} name="Magnifique Barbershop" address="St.Cloud Blvd * 2X012,AA"/> */}
                    {/* <ServiceCard image={servicePreview2} name="The Doctor" address="Brbrs Blvd * 2X002,BC"/>
                    <ServiceCard image={servicePreview3} name="Barbershop" address="St.Cloud Blvd * 2X012,AA"/>
                    <ServiceCard image={servicePreview4} name="Pallas Food" address="St.Cloud Blvd * 2X012,AA"/> */}
                </ScrollView>
            </View>
        </View>
    );
}




const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems: 'center',
        width: "100%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginTop: 18
    },
    headingContainer:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%'
    },
    heading:{
        color:'rgba(18, 13, 38, 0.8)',
        fontSize: 17,

    },
    moreBtn:{
        color:'rgba(116, 118, 136, 0.8)',
        fontFamily:'Inter_900Black',
        fontSize: 13,
    },
    servicesContainer:{
        width: '100%',
    },
});
