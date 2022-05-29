import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { UIButton } from "../components/Buttons/UIButton";

interface Props {
    navigation: NavigationType,
  }

export const ModeSelection:React.FC<Props> = ({navigation}) => {
    return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight:"700", fontSize:20, marginBottom: '5%'}}>Sign up as</Text>
            
            <UIButton text="A Daily User" fontWeight={700} mb={4} press={()=>navigation.navigate('MainHub')}/>
            
            <Text style={{fontWeight:"700"}}> or </Text>
            
            {/* <UIButton text="Business/Service" fontWeight={600} mt={4} sz={"md"} press={()=>navigation.navigate('MainHub')}/> */}
            
            <UIButton text="Register as a service" color="rgba(120,30,213,1)" fontWeight={600} mt={4} sz={"md"} press={()=>navigation.navigate('RegisterService')}/>
            <Text style={styles.businessDisclaimer}>For accounts that want to use War9a as a service, join the app by pressing the button below</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    businessDisclaimer: {
        fontWeight:"700",
        fontSize:12, opacity:0.3,
        width:"55%",
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10,
        
    },
})