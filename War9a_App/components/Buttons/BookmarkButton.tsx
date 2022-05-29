import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CachedImage from 'react-native-expo-cached-image';

import servicePreview from '../../assets/ServicePreview.png';


interface Props{
    image?: string | false,
    size?: number,
    pos?: "absolute" | "relative",
    top?: number | "auto",
    right?: number,
    mt?: number,
    ml?: number,
    onPress?: () => void,
    active?: boolean,
}

export const BookmarkButton:React.FC<Props> = ({image=servicePreview, size, top, right, pos, mt, ml, onPress, active}) => {

    // const ServiceImage  = image ? image : servicePreview;

    const [bookmarked, setBookmarked] = useState(false);

    useEffect(()=>{
        if(active !== undefined){
            setBookmarked(active);
        }
    },[active]);

    const handleBookmarkPress = () => {
        setBookmarked(!bookmarked);
        onPress ? onPress() : console.log("Bookmark Pressed, No action!");
    }

    const styles = StyleSheet.create({
        bookmark:{
            backgroundColor: 'rgba(255,255,255,0.9)',
            height: size ? size : 25,
            width: size ? size : 25,
            // elevation: 1,
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            position: pos ? pos : 'relative',
            top: top ? top : 0,
            right: right ? right : 0,
            marginTop: mt ? mt : 0,
            marginLeft: ml ? ml : 0,
            
        },
        bkblur:{
            height: size ? size : 25,
            width: size ? size : 25,
            position: 'absolute',
            borderRadius: 5,
            opacity: 0.3
        },
    })
    
    

    return(
            <View style={styles.bookmark} >    
                {image ? <CachedImage source={image} style={styles.bkblur} 
                    resizeMethod="resize" resizeMode="cover" blurRadius={4} /> : <View></View> }
                <TouchableOpacity onPress={()=>{handleBookmarkPress()}}>
                    <Icon name={bookmarked ? "bookmark" : "bookmark-outline"} size={size ? size/1.7 : 15} color="#F0635A"/>
                </TouchableOpacity>
            </View>
    )
}


