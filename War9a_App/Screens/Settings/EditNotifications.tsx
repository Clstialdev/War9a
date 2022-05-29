import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Switch, ToastAndroid, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { doc, Firestore, updateDoc,} from 'firebase/firestore';
import Toast from 'react-native-root-toast';
import ToggleSwitch from 'toggle-switch-react-native'

import { UIButton } from "../../components/Buttons/UIButton";
import { BackButton } from "../../components/Buttons/BackButton"

interface Props {
    db: Firestore,
    userUid: string,
    notificationSettings: notificationSettings | undefined,
}

export const EditNotifications:React.FC<Props> = ({db, userUid, notificationSettings}) => {
    const navigation = useNavigation();

    console.log(notificationSettings!==undefined)
    
    const [notifications, setNotifications] = useState(notificationSettings!==undefined ? notificationSettings.active : true);
    const [notificationSound, setNotificationSound] = useState(notificationSettings!==undefined ? notificationSettings.sound : true);
    const [removedNotification, setRemovedNotification] = useState(notificationSettings!==undefined ? notificationSettings.onRemoved : true);
    const [newClientNotification, setNewClientNotifications] = useState(notificationSettings!==undefined ? notificationSettings.onNewClient : true);

    const handleMasterSwitch = () => {
        if(notifications){
            setNotificationSound(false);
            setRemovedNotification(false);
            setNewClientNotifications(false);
        }
        else{
            setNotificationSound(true);
            setRemovedNotification(true);
            setNewClientNotifications(true);
        }
        setNotifications(!notifications);
    }

    const handleSoundSwitch = (value:boolean, setChange:(value:boolean)=>void) => {
        if(!value){
            setNotifications(true);
        }

        if(removedNotification===false && newClientNotification===false && value){
            setNotifications(false);
        }
        
        setChange(!value);
    }

    const handleRemovedSwitch = (value:boolean, setChange:(value:boolean)=>void) => {
        if(!value){
            setNotifications(true);
        }

        if(notificationSound===false && newClientNotification===false && value){
            setNotifications(false);
        }
        
        setChange(!value);
    }

    const handleNewClientSwitch = (value:boolean, setChange:(value:boolean)=>void) => {
        if(!value){
            setNotifications(true);
        }

        if(notificationSound===false && removedNotification===false && value){
            setNotifications(false);
        }
        
        setChange(!value);
    }


    const handleNotificationsSubmit = async() => {
            const userDataRef = doc(db, "users2", userUid);
            await updateDoc(userDataRef, {
                notifications: {
                    active: notifications,
                    sound: notificationSound,
                    onRemoved: removedNotification,
                    onNewClient: newClientNotification,
                },
            });

            if(Platform.OS==="ios"){
                Toast.show('Restart App for changes to occur', {duration: Toast.durations.LONG, backgroundColor: "white", shadowColor:"black", textColor:"black", position:-50});
            }
            else{
                ToastAndroid.show('Restart App for changes to occur!', ToastAndroid.SHORT);
            }
            setTimeout(() => {
                navigation.goBack();
            }, 2000);
    }

    
    return(
        <RootSiblingParent>
            <View style={styles.container}>

                <View style={{alignSelf: "flex-start", marginLeft: "10%", marginTop: "20%"}}>
                    <BackButton onPress={()=>navigation.goBack()} />
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.formContainer}>
                        <Text style={styles.actionTitle}>Notification Settings</Text>
                        <Text style={styles.actionDescription}>This determines how the app handles notifications for your account.</Text>

                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 20, justifyContent: 'space-between', width: '70%'}}>
                            <Text style={{paddingRight: 10, fontSize: 16, fontWeight: 'bold', opacity:0.7}}>Notifications</Text>
                            {Platform.OS === "ios" ?
                            <Switch
                                trackColor={{ false: '#767577', true: '#25855A' }}
                                thumbColor={notifications ? '#fff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>handleMasterSwitch()}
                                value={notifications}
                            />
                            :
                            <ToggleSwitch
                            isOn={notifications}
                            onColor="#25855A"
                            offColor="#3e3e3e"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="large"
                            onToggle={()=>handleMasterSwitch()}
                            />}
                            
                        </View>

                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 15, justifyContent: 'space-between', width: '70%'}}>
                            <Text style={{paddingRight: 10, fontSize: 16, fontWeight: 'bold', opacity:0.7}}>Sound on Notify</Text>
                            {Platform.OS === "ios" ?
                            <Switch
                                trackColor={{ false: '#767577', true: '#25855A' }}
                                thumbColor={notificationSound ? '#fff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>handleSoundSwitch(notificationSound, setNotificationSound)}
                                value={notificationSound}
                            />
                            :
                            <ToggleSwitch
                            isOn={notificationSound}
                            onColor="#25855A"
                            offColor="#767577"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="large"
                            onToggle={()=>handleSoundSwitch(notificationSound, setNotificationSound)}
                            />}
                        </View>

                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between', width: '70%'}}>
                            <Text style={{paddingRight: 10, fontSize: 16, fontWeight: 'bold', opacity:0.7}}>Removed From Queue</Text>
                            {Platform.OS === "ios" ?
                            <Switch
                                trackColor={{ false: '#767577', true: '#25855A' }}
                                thumbColor={removedNotification ? '#fff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>handleRemovedSwitch(removedNotification, setRemovedNotification)}
                                value={removedNotification}
                            />
                            :
                            <ToggleSwitch
                            isOn={removedNotification}
                            onColor="#25855A"
                            offColor="#767577"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="large"
                            onToggle={()=>handleRemovedSwitch(removedNotification, setRemovedNotification)}
                            />}
                        </View>

                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between', width: '70%'}}>
                            <Text style={{paddingRight: 10, fontSize: 16, fontWeight: 'bold', opacity:0.7}}>New Client in Queue</Text>
                            {Platform.OS === "ios" ?
                            <Switch
                                trackColor={{ false: '#767577', true: '#6767CD' }}
                                thumbColor={newClientNotification ? '#fff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>handleNewClientSwitch(newClientNotification, setNewClientNotifications)}
                                value={newClientNotification}
                            />
                            :
                            <ToggleSwitch
                            isOn={newClientNotification}
                            onColor="#6767CD"
                            offColor="#767577"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="large"
                            onToggle={()=>handleNewClientSwitch(newClientNotification, setNewClientNotifications)}
                            />}
                        </View>
                        
                        <UIButton text="Confirm" sz="lg" mt={50} press={()=>handleNotificationsSubmit()}/>
                    </View>
                </View>
                

            </View>
        </RootSiblingParent>
    );
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    formContainer:{
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        marginTop: "10%",
    },
    centeredContainer:{
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: "50%",
        // marginTop: "auto",
        // marginBottom: "auto",
        
    },
    input:{
        width: "75%",
        fontSize: 14,
        textAlign: 'center',
        borderColor: "black",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 7,
        margin: 5,
        padding: 12,
        

    },
    imagePreview:{
        width: "90%",
        height: 200,
        backgroundColor: "gray",
        borderRadius: 5
    },
    actionTitle:{
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: "rgba(0,0,0,0.7)",
        marginBottom: 10,
    },
    actionDescription:{
        fontSize: 13,
        fontFamily: 'Inter_600SemiBold',
        color: "rgba(0,0,0,0.5)",
        marginBottom: 20,
        textAlign: 'center',
        width: "85%",
        
    },
})

