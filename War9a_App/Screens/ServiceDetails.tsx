import React, { useContext } from 'react';
import {StyleSheet, Text, View, Linking, ScrollView, Route, TouchableOpacity, } from 'react-native';
import { vh} from 'react-native-expo-viewport-units';
import { StatusBar } from 'expo-status-bar';
import CachedImage from 'react-native-expo-cached-image';


import { ScreenHeading } from '../components/UIComponents/ScreenHeading';
import { DetailCard } from '../components/Service/DetailCard';
import { UIButton } from '../components/Buttons/UIButton'
import { Shadow } from '../components/UIComponents/Shadow'
import { QueueCard } from '../components/Service/QueueCard';
import { Platform } from 'expo-modules-core';
import { LanguageContext } from '../components/Languages';


interface Props {
    navigation: NavigationType,
    route: Route
  }

export const ServiceDetails:React.FC<Props> = ({navigation, route}) => {

    const phoneNumber = route.params.serviceData.phoneNumber ? route.params.serviceData.phoneNumber : "+18423795338";


    const onPressCall = () => {
    const url = Platform.OS === "android" ? `tel:${phoneNumber}` : `telprompt:${phoneNumber}`
	Linking.canOpenURL(url)
		.then((supported) => {
			if (supported) {
				return Linking.openURL(url)
					.catch(() => null);
			}
            else{
                alert("Calls are not supported by this device!, phoneNumber is " + phoneNumber)
            }
		});
    }

    const creationDate = route.params.serviceData.created.toDate().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const {language} = useContext(LanguageContext);
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor={'transparent'} translucent />

            <Shadow style={styles.imageShadow} strength={10} color="white"/>
            <Shadow style={styles.shadow} strength={3} color="black"/>

            <CachedImage source={route.params.image} style={styles.image} resizeMethod="scale" resizeMode="cover"/>
            <ScreenHeading text={route.params.serviceData.name} pos="absolute" top={35} color="white" bookmark={true} bkimage={route.params.image}/>
            <QueueCard style={styles.queueCard} number={route.params.serviceData.queued[0].data.length} onPress={()=>navigation.navigate("ServiceQueue", {db:route.params.db, createdOn: creationDate,  serviceId:route.params.serviceId, serviceData:route.params.serviceData,  userUid:route.params.userUid, userName:route.params.userName, expoPushToken: route.params.expoPushToken})}/>


            <ScrollView style={styles.infoContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.serviceName}>{route.params.serviceData.name}</Text>
                <DetailCard icon="calendar-outline" text={`${language.ServicePage.joined} ${creationDate}`} description={route.params.serviceData.openCloseDates ? route.params.serviceData.openCloseDates : "Tuesday - Friday, 4:00PM - 9:00PM"}/>
                <TouchableOpacity onPress={()=>navigation.navigate("Map", {latlng: route.params.serviceData.latlng})}>
                    <DetailCard icon="location-sharp" text={language.ServicePage.locationTitle} description={route.params.serviceData.address}/>
                </TouchableOpacity>
                
                <View style={{width: "60%", marginTop: 40, alignSelf: 'center'}}>
                    <UIButton text={language.ServicePage.contactBtn} sz="lg" shadow={true} fontWeight={600} press={() => onPressCall()}/>
                </View>

                <Text style={styles.aboutTitle}>{language.ServicePage.aboutTitle + " " + route.params.serviceData.name}</Text>
                <Text style={styles.aboutService}>{route.params.serviceData.description ? route.params.serviceData.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consectetur lorem ac est convallis dictum in a ex. Aenean placerat ex risus. In quis lacinia dolor. Etiam non magna quis felis congue scelerisque eu et dolor. Mauris tempus enim et eros moll"}</Text>

            </ScrollView>

            <Shadow style={styles.bottomShadow} strength={10} color="white"/>


        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
        
    },
    image:{
        width: "100%",
        height: vh(30),
        borderRadius: 7,
        zIndex:2
    },
    shadow:{
        height: 20,
        width: "100%",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 12,},
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        backgroundColor: 'rgba(255,255,255,0.9)',
        position: 'absolute',
        top: -20,
    },
    queueCard:{
        position: 'absolute',
        top: vh(30) - 30,
        zIndex: 3,
    },
    infoContainer:{
        display: 'flex',
        width: "90%",

    },
    serviceName:{
        fontFamily: 'Inter_700Bold',
        fontSize: 32,
        maxWidth: "80%",
        marginTop: 45,
                
    },
    aboutTitle:{
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        paddingTop: 40,
        
    },
    aboutService:{
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
        paddingTop: 10,
        letterSpacing: 0.5,
        lineHeight: 25,
        marginBottom: 100,
        
    },
    imageShadow:{
        height: 70,
        width: "100%",
        position: 'absolute',
        top: vh(30) - 70,
        zIndex: 2
    },
    bottomShadow:{
        height: 70,
        width: "100%",
        position: 'absolute',
        bottom: -10,
    },

})