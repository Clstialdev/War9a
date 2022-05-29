import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Logo from '../assets/logo.webp';
import AppLoading from 'expo-app-loading';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { User } from 'firebase/auth';

import {UIButton} from '../components/Buttons/UIButton';
import { useNavigation } from '@react-navigation/native';
import { LanguageContext } from '../components/Languages';


interface WelcomeProps {
  Glogin: () => Promise<boolean>,
  user: User | undefined,
}

export const Welcome:React.FC<WelcomeProps> = ({Glogin, user}) => {

  const navigation = useNavigation();

  const [signedIn, SetSignedIn] = useState(user ? true : false);

  useEffect(()=>{
    SetSignedIn(user ? true : false);
  },[user])

  const handleGoogleAuth = async() => {
    try{
      let isConnected = await Glogin();
      console.log("isConnected: " + isConnected);
    }
    catch{
      console.log("Error with Google Auth");
      SetSignedIn(false);
    }
  };

  const {language} = useContext(LanguageContext);

  return (
    <View style={styles.container}>
      <Image source={Logo} resizeMethod="resize" resizeMode="contain" fadeDuration={1000} style={styles.logo}/> 
        <View style={styles.textContainer}>
          <Text style={styles.title}>{language.Welcome.title}</Text>
          <Text style={styles.subtitle}>{language.Welcome.description}</Text>
        </View>
        {!signedIn ?
        <UIButton text={language.Welcome.googleBtn} icon="logo-google" fontWeight={600} mb={30} pos="absolute" b={10} press={handleGoogleAuth}/>
         : 
        <UIButton text={language.Welcome.button} fontWeight={600} mb={30} pos="absolute" b={10} press={()=>navigation.navigate('MainHub')}/>
         }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    
  },
  logo: {
    width: vw(90),
    position: 'absolute',
    top: "26%",
    maxWidth: 300,
    maxHeight: 150,
  },
  textContainer: {
    display:'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  title: {
    fontSize:32,
    color:'black',
    textAlign: 'center',
    fontFamily: 'Inter_700Bold'
  },
  subtitle:{
    fontSize:10.67,
    color:'rgba(0,0,0,0.48)',
    textAlign: 'center',
    fontFamily: 'Inter_700Bold',
    maxWidth: "70%",
    marginTop: 10,
    
  },
});
