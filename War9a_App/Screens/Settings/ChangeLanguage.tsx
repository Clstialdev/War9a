import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, ToastAndroid, Platform, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';

import { UIButton } from "../../components/Buttons/UIButton";
import { BackButton } from "../../components/Buttons/BackButton"
import { doc, Firestore, updateDoc,} from 'firebase/firestore';
import Toast from 'react-native-root-toast';
import { RoundTag } from '../../components/Buttons/RoundTag';
import { LanguageContext } from '../../components/Languages';

interface Props {
    db: Firestore,
    userUid: string,
}

export const ChangeLanguage:React.FC<Props> = ({db, userUid}) => {

    const {handleChangeLanguage} = useContext(LanguageContext);

    const navigation = useNavigation();

    const [language, setLanguage] = useState<languages>("english");

    const [englishTag, setEnglishTag] = useState(true);
    const [frenchTag, setFrenchTag] = useState(false);
    const [arabicTab, setArabicTag] = useState(false);


    const handleRoundTagPress = (tag:languages) => {
        setEnglishTag(tag==="english" ? true : false);
        setFrenchTag(tag==="french" ? true : false);
        setArabicTag(tag==="arabic" ? true : false);
        setLanguage(tag);
    }


    const handleLanguageChange = async() => {
        if(language.trim() !== ""){
            const userDataRef = doc(db, "users2", userUid);
            await updateDoc(userDataRef, {
                language: language
            });
            handleChangeLanguage(language);
            if(Platform.OS==="ios"){
                Toast.show('Restarting App', {duration: Toast.durations.LONG, backgroundColor: "white", shadowColor:"black", textColor:"black", position:-50});
            }
            else{
                ToastAndroid.show('Restarting App!', ToastAndroid.SHORT);
            }
            setTimeout(() => {
                navigation.navigate("Welcome");
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
                        <Text style={styles.actionTitle}>Change the app Language</Text>
                        <Text style={styles.actionDescription}>This will be the main language of the app but will not change service names or their description!</Text>
                            <ScrollView horizontal={true} style={{paddingLeft: '5%', marginTop: '2%', paddingTop: 15, paddingBottom: 15}}>
                                <RoundTag name="English" icon="globe-outline" active={englishTag} color="#1FDE95" onPress={()=>handleRoundTagPress("english")}/>
                                <RoundTag name="French" icon="layers-outline" active={frenchTag} color="#1F85DE" onPress={()=>handleRoundTagPress("french")}/>
                                <RoundTag name="Arabic" icon="book-outline" active={arabicTab} color="#DEB01F" onPress={()=>handleRoundTagPress("arabic")}/>
                            </ScrollView>
                        <UIButton text="Confirm" sz="lg" mt={20} press={()=>handleLanguageChange()} />
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