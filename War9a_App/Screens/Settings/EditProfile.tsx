import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ToastAndroid, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';

import { UIButton } from "../../components/Buttons/UIButton";
import { BackButton } from "../../components/Buttons/BackButton"
import { doc, Firestore, updateDoc,} from 'firebase/firestore';
import Toast from 'react-native-root-toast';

interface Props {
    db: Firestore,
    userUid: string,
}

export const EditProfile:React.FC<Props> = ({db, userUid}) => {
    const [name, setName] = useState("");

    const navigation = useNavigation();


    const handleNameChange = async() => {
        if(name.trim() !== ""){
            const userDataRef = doc(db, "users2", userUid);
            await updateDoc(userDataRef, {
                name: name
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
    }

    
    return(
        <RootSiblingParent>
            <View style={styles.container}>

                <View style={{alignSelf: "flex-start", marginLeft: "10%", marginTop: "20%"}}>
                    <BackButton onPress={()=>navigation.goBack()} />
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.formContainer}>
                        <Text style={styles.actionTitle}>Change your Username</Text>
                        <Text style={styles.actionDescription}>This what shows up when you join any queue!</Text>
                        <TextInput placeholder="New Username" style={styles.input} value={name} onChangeText={(val)=>setName(val)}/>
                        <UIButton text="Confirm" sz="lg" mt={10} press={()=>handleNameChange()} />
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