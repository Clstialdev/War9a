import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View, Share, TouchableOpacity, ImageSourcePropType, } from 'react-native';
import { UIButton } from '../Buttons/UIButton';

import InviteImg from "../../assets/InviteImg.png";
import { LanguageContext } from '../Languages';

export const InviteFriends = () =>{

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'Hey! Download War9a an amazing solution for queueing. War9a.com',
            url:
              'War9a.com'
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error:any) {
          alert(error.message);
        }
      };
      const {language} = useContext(LanguageContext)
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{language.MainHub.inviteTitle}</Text>
            <Text style={styles.desc}>{language.MainHub.inviteDesc}</Text>
            <UIButton text={language.MainHub.inviteBtn} sz="md" fontWeight={600} style={{paddingLeft: 15, paddingRight: 20}} press={onShare}/>
            <Image source={InviteImg} style={styles.image} 
                resizeMethod="resize" resizeMode="cover"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height: 140,
        width: "90%",
        backgroundColor: "#D6FFDA",
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 15,
        borderRadius: 7,
        marginTop: 10,
        marginLeft: "5%",
        
    },
    title:{
        fontFamily: "Inter_600SemiBold",
        fontSize: 15,
        paddingTop: 8,

    },
    desc:{
        fontFamily: "Inter_900Black",
        fontSize: 11.5,
        paddingTop: 6,
        paddingBottom: 10,
        // opacity: 0.7,
        color: "#484D70"
    },
    image:{
        position: 'absolute',
        right: 0,
        bottom: 0,
    }

});