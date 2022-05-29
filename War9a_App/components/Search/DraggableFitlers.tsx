
import React, { Dispatch, SetStateAction, useContext, useState,} from 'react';
import {StyleSheet, Text, View, ScrollView, Route,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { RoundTag } from '../Buttons/RoundTag';
import { LanguageContext } from '../Languages';

interface FiltersProps {
    setTags: Dispatch<SetStateAction<string>>,
    setDistance: Dispatch<SetStateAction<number>>,
    filtered?: string, 
}

export const DraggableFitlers:React.FC<FiltersProps> = ({setTags, setDistance, filtered}) => {

    const [doctorTag, setDoctorTag] = useState(filtered==="doctor" ? true : false);
    const [barberTag, setBarberTag] = useState(filtered==="barber" ? true : false);
    const [foodTag, setFoodTag] = useState(filtered==="food" ? true : false);
    const [anyTag, setAnyTag] = useState(filtered==="any" ? true : false);

    const handleRoundTagPress = (tag:"doctor"|"barber"|"food"|"") => {
        setDoctorTag(tag==="doctor" ? true : false);
        setBarberTag(tag==="barber" ? true : false);
        setFoodTag(tag==="food" ? true : false);
        setAnyTag(tag==="" ? true : false);
        setTags(tag);
    }

    const [todayTag, setTodayTag] = useState(false);
    const [tomorrowTag, setTomorrowTag] = useState(false);
    const [weekTag, setWeekTag] = useState(false);
    const [noDateTag, setNoDateTag] = useState(true);

    const handleDateTagPress = (tag:"today"|"tomorrow"|"week"|"") => {
        setTodayTag(tag==="today" ? true : false);
        setTomorrowTag(tag==="tomorrow" ? true : false);
        setWeekTag(tag==="week" ? true : false);
        setNoDateTag(tag==="" ? true : false);
    }

    const [tenKmTag, setTenKmTag] = useState(false);
    const [thirtyKmTag, setThirtyKmTag] = useState(false);
    const [noLocationTag, setNoLocationTag] = useState(true);

    const handleLocationTagPress = (tag:10|30|0) => {
        setTenKmTag(tag===10 ? true : false);
        setThirtyKmTag(tag===30 ? true : false);
        setNoLocationTag(tag===0 ? true : false);
    }

    const {language} = useContext(LanguageContext);
    
    return(
        <View style={dragableStyles.container}>
            <View style={dragableStyles.handle}></View>
            <Text style={dragableStyles.title}>Filters</Text>

            <ScrollView horizontal={true} style={{paddingLeft: '5%', marginTop: '2%', paddingTop: 15, paddingBottom: 15}}>
                <RoundTag name={language.queueDetails.categories[0]} icon="medical" active={doctorTag} color="#F0635A" onPress={()=>handleRoundTagPress("doctor")}/>
                <RoundTag name={language.queueDetails.categories[1]}  icon="md-cut-sharp" active={barberTag} color="#F59762" onPress={()=>handleRoundTagPress("barber")}/>
                <RoundTag name={language.queueDetails.categories[2]}  icon="fast-food" active={foodTag} color="#29D697" onPress={()=>handleRoundTagPress("food")}/>
                <RoundTag name={language.queueDetails.categories[3]}  icon="md-heart-half-sharp" active={anyTag} color="black" onPress={()=>handleRoundTagPress("")}/>
            </ScrollView>

            <Text style={{paddingLeft: '5%', fontSize:17, fontFamily: 'Inter_600SemiBold', marginTop: 20, marginBottom: 10}}>{language.searchFilters.timeTitle}</Text>
            <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap' ,alignItems: 'flex-start', paddingLeft: '5%'}}>
                <BeveledTag name={language.searchFilters.timeValues[0]} active={todayTag} onPress={()=>handleDateTagPress("today")}/>
                <BeveledTag name={language.searchFilters.timeValues[1]} active={tomorrowTag} onPress={()=>handleDateTagPress("tomorrow")}/>
                <BeveledTag name={language.searchFilters.timeValues[2]} active={weekTag} onPress={()=>handleDateTagPress("week")}/>
                <BeveledTag icon="calendar" name="Any Time, Any Date" active={noDateTag} onPress={()=>handleDateTagPress("")}/>
            </View>
            <Text style={{paddingLeft: '5%', fontSize:17, fontFamily: 'Inter_600SemiBold', marginTop: 20, marginBottom: 10}}>{language.searchFilters.locationTitle}</Text>
            <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingLeft: '5%'}}>
                <BeveledTag name="10 Km" active={tenKmTag} color="#29D697" onPress={()=>handleLocationTagPress(10)}/>
                <BeveledTag name="30 Km" active={thirtyKmTag} color="#29D697" onPress={()=>handleLocationTagPress(30)}/>
                <BeveledTag name="Same city" active={noLocationTag} color="#F0635A" onPress={()=>handleLocationTagPress(0)}/>
            </View>
        </View>
    );
}

const dragableStyles = StyleSheet.create({
    container:{
        // alignItems: 'center',
        paddingTop: 10,
    },
    handle:{
        height: 4,
        width: "20%",
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 30,
        alignSelf: 'center'
    },
    title:{
        fontFamily: 'Inter_900Black',
        fontSize: 25,
        marginTop: 50,
        marginLeft: "5%",
        
    },

})


const BeveledTag:React.FC<stateTagProps> = ({icon, name, active=false, color="#25855A", onPress}) => {
    
    const shadow = active ? {
        shadowColor: color ? color : "black",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 21,
    } : {}

    const beveledTag = StyleSheet.create({
        container:{
            backgroundColor: active ? color : "white",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: icon ? 13 : 15,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: active ? color : "rgba(0,0,0,0.05)",
            marginTop: 10,
            marginRight: 5,
            
            ...shadow
        },
        text:{
            paddingLeft: 5,
            fontFamily: 'Inter_900Black',
            fontSize: 17,
            color: active ? "white" :  "rgba(0,0,0,0.55)"
        },
    })

    return(
        <TouchableOpacity style={beveledTag.container} onPress={onPress}>
            {icon ? <Icon name={icon} size={25} color={!active ? color : "white"}/> : <View></View>}
            <Text style={beveledTag.text}>{name}</Text>
        </TouchableOpacity>
    );
}

