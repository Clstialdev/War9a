import React , {useContext, useEffect, useState} from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Platform, Linking } from 'react-native';

import { collection, query, where, doc, getDoc, getDocs, documentId, Firestore, updateDoc, arrayRemove, arrayUnion, deleteDoc} from "firebase/firestore";


import { Navigation } from '../components/Navigation';
import { ServiceCard } from '../components/Service/ServiceCard';
import { ScreenHeading } from '../components/UIComponents/ScreenHeading';
import { FavoritesEmpty } from '../components/Service/FavoritesEmpty';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as StoreReview from 'expo-store-review';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { LanguageContext } from '../components/Languages';


interface Props {
    db: Firestore,
    userUid: string,
    userName: string,
    serviceOwned: undefined | string,
    GLogOut: (onSuccess:()=>void)=>void,
  }

export const Profile:React.FC<Props> = ({db, userUid, userName, serviceOwned, GLogOut}) => {

    const navigation = useNavigation();

    const onPressCall = () => {
        const phoneNumber = "+14359876354";
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

    const rateApp = async() => {
        // if(Platform.OS === "android"){
        //     const androidPackageName = 'host.exp.exponent';
        //     // Open the Android Play Store in the browser -> redirects to Play Store on Android
        //     Linking.openURL(
        //     `https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`
        //     );
        //     // Open the Android Play Store directly
        //     Linking.openURL(`market://details?id=${androidPackageName}&showAllReviews=true`);
        // }
        // else{
        //     const itunesItemId = 982107779;
        //     // Open the iOS App Store in the browser -> redirects to App Store on iOS
        //     Linking.openURL(`https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`);
        //     // Open the iOS App Store directly
        //     Linking.openURL(
        //     `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`
        //     );
        // }

        const isAvailable = await StoreReview.isAvailableAsync();
        if(isAvailable){
            StoreReview.requestReview();
        }
    }

    const contactUs = () => {
            Linking.openURL(`mailto:support@war9a.com`);

            const email = "support@war9a.com";
            const url = Platform.OS === "android" ? `mailto:${email}` : `mailto:${email}`
            Linking.canOpenURL(url)
                .then((supported) => {
                    if (supported) {
                        return Linking.openURL(url)
                            .catch(() => null);
                    }
                    else{
                        alert("MailTo are not supported by this device! email is " + email)
                    }
                });
    }

    const logOut = () => {
        GLogOut(()=>navigation.navigate("Welcome"));
    }

    const terminateService = async() => {
        if(serviceOwned!==undefined){
            await deleteDoc(doc(db, "services2", serviceOwned))
            const userDataRef = doc(db, "users2", userUid);
            await updateDoc(userDataRef, {
                service_provider: false,
                service_owned: "" 
            });
            GLogOut(()=>navigation.navigate("Welcome"));
            navigation.navigate("Welcome");
        }
    }

    const {language} = useContext(LanguageContext);


    return(
        <View style={[{flex:1, justifyContent: 'flex-start', position: 'relative', alignItems: 'center', marginTop: 60}]}>
            <ScreenHeading text={language.Navigation.profileBtn} fs={24} shadow={false} options={true}/>
            
            <ScrollView style={{marginBottom: 100, marginTop: 15, width: "85%"}} showsVerticalScrollIndicator={false}>
                <Text style={ProfileStyles.userName}>
                    {userName}
                </Text>
                <Text style={ProfileStyles.title}>
                    {language.profile.profileSettings.title}
                </Text>
                <ListItem text={language.profile.profileSettings.edit} icon="settings-outline" onPress={()=>navigation.navigate("EditProfile")}/>
                <Text style={ProfileStyles.title}>
                    {language.profile.appSettings.title}
                </Text>
                <ListItem text={language.profile.appSettings.notifications} icon="notifications-outline" onPress={()=>navigation.navigate("EditNotifications")}/>
                <ListItem text={language.profile.appSettings.languages} icon="language-outline" onPress={()=>navigation.navigate("ChangeLanguage")}/>
                <Text style={ProfileStyles.title}>
                    {language.profile.moreInformation.title}
                </Text>

                {serviceOwned === undefined ? <ListItem text={language.profile.moreInformation.registerService} icon="business-outline" color="purple" textColor='purple' onPress={()=>navigation.navigate("RegisterService")}/> : <ListItem text={language.profile.moreInformation.terminate} icon="business-outline" color="darkred" textColor='darkred' onPress={()=>terminateService()}/>}
                

                <ListItem text={language.profile.moreInformation.customerService} icon="call-outline" onPress={()=>onPressCall()}/>
                <ListItem text={language.profile.moreInformation.review} icon="star-outline" onPress={()=>rateApp()}/>
                <ListItem text={language.profile.moreInformation.contact} icon="mail-outline" onPress={()=>contactUs()}/>
                <ListItem text={language.profile.moreInformation.disconnect} icon="log-out-outline" color="red" textColor='red' onPress={()=>logOut()}/>
                
            </ScrollView>
            

            <Navigation active="profile"/>
        </View>
    );
}

const ProfileStyles = StyleSheet.create({
    userName:{
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 20,
    },
    title:{
        fontSize: 22,
        marginBottom: 20,
        marginTop: 10,
        fontWeight: "600",

    }
});





interface ListItemProps {
    text: string,
    icon: string,
    color?: string,
    textColor?: string,
    onPress?: ()=>void,
}

const ListItem:React.FC<ListItemProps> = ({text, icon, color="green", textColor, onPress}) => {
    return(
        <TouchableOpacity style={ListItemStyles.container} onPress={onPress}>
            <Icon name={icon} color={color} size={30}/>
            <Text style={{...ListItemStyles.text, color: textColor}}>{text}</Text>
        </TouchableOpacity>
    )
}

const ListItemStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        alignItems: 'center',
        paddingLeft: "5%",
        paddingRight: "5%",
        marginBottom: 15,
    },
    text: {
        fontSize: 18,
        paddingLeft: 20,
        fontWeight: "500",
    }

})