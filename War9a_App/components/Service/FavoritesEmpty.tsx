import React from 'react';
import { Image, View, Text } from 'react-native';

import noQueueImg from '../../assets/NoQueue.png'

export const FavoritesEmpty:React.FC = () => {

    return(
        <View style={{marginTop: "auto", marginBottom: "auto", width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={noQueueImg}/>
            <Text style={{textAlign:"center", fontSize:22.5, fontFamily:"Inter_600SemiBold", paddingTop: 30}}>Favorites Empty</Text>
            <Text style={{textAlign:"center", fontSize:15.5, fontFamily:"Inter_700Bold", paddingTop: 10, maxWidth: "70%", opacity: 0.4}}>You can add some favorites through the explore page </Text>
        </View>
    );
}