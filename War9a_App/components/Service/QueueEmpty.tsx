import React, { useContext } from 'react';
import { Image, View, Text } from 'react-native';

import noQueueImg from '../../assets/NoQueue.png'
import noQueueImgPurple from '../../assets/NoQueuePurple.png'
import { LanguageContext } from '../Languages';


interface props {
    workMode?: boolean,
}

export const QueueEmpty:React.FC<props> = ({workMode=false}) => {

    const {language} = useContext(LanguageContext);
    return(
        <View style={{marginTop: "auto", marginBottom: "auto", width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            
            {!workMode ? <Image source={noQueueImg}/>
                        :
                        <Image source={noQueueImgPurple}/>
            }

            <Text style={{textAlign:"center", fontSize:22.5, fontFamily:"Inter_600SemiBold", paddingTop: 30}}>{language.serviceQueue.emptyTitle}</Text>
            <Text style={{textAlign:"center", fontSize:17.5, fontFamily:"Inter_700Bold", paddingTop: 10, maxWidth: "70%", opacity: 0.4}}>{language.serviceQueue.emptyDesc}</Text>
        </View>
    );
}