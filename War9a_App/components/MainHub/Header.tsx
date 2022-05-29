import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableHighlight, TextInput, Alert } from 'react-native';
import { UIButton } from "../Buttons/UIButton";
import { TagButton } from "../Buttons/TagButton";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { Firestore } from 'firebase/firestore';
import { LanguageContext } from '../Languages';

interface Props {
    city: string,
    postalCode?: string,
    db?: Firestore,
    userUid?: string,
    serviceOwned?: undefined | string,
    userName?: string,
    expoPushToken?: string,
}

export const Header:React.FC<Props> = ({db, userUid, city, postalCode, serviceOwned, userName, expoPushToken}) => {
    return(
        <>
        <View style={styles.container}>
            {/* <View style={styles.bg}></View> */}
            <TopBar city={city} postalCode={postalCode} serviceOwned={serviceOwned}/>
            <SearchBar userUid={userUid} db={db} city={city} userName={userName} expoPushToken={expoPushToken}/>
        </View>
            <Filters userUid={userUid} db={db} city={city} userName={userName} expoPushToken={expoPushToken}/>
        </>
    );
}


const styles = StyleSheet.create({
    container:{
        display:'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        // height: 210,
        width: "100%",
        // borderBottomLeftRadius: 15,
        // borderBottomRightRadius: 15,
        paddingTop: 20,
        backgroundColor:'#25855A',
        
    },
    bg:{
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor:'#25855A',
        height: 185,
        width: "100%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
});



const TopBar:React.FC<Props> = ({city, postalCode, serviceOwned}) =>{
    const navigation = useNavigation();

    const [workPressCounter, setWorkPressCounter] = useState(0);

    let serviceOwner = serviceOwned!==undefined ? true : false;
    
    const WorkModePress = () =>{
        if(!serviceOwner){
            if(workPressCounter < 3){
                setWorkPressCounter(workPressCounter + 1);
                alert(`Press ${3 - workPressCounter} more times to register a service.`);
            }
            else{
                navigation.navigate("RegisterService");
            }
        }
        else{
            navigation.navigate("WorkMode");
        }
    }

    const {language} = useContext(LanguageContext);

    return(
        <View style={topbarStyles.container}>
            <TouchableOpacity onPress={WorkModePress}>
                <IonIcon name="shuffle-outline" size={30} color="white"/>
            </TouchableOpacity>
            <View style={topbarStyles.locationContainer}>
                <Text style={topbarStyles.locationDropDown}>{language.MainHub.locationBtn}</Text>
                <Text style={topbarStyles.locationValue}>{`${city},${postalCode}`}</Text>
            </View>
            <IonIcon name="qr-code-outline" size={25} color="white" onPress={()=>navigation.navigate("QrScanner")}/>
        </View>
    );

}


const topbarStyles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        width: '90%',
        marginTop: 35
    },

    locationContainer: {
        
    },
    locationDropDown: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
    },
    locationValue:{
        fontFamily: 'Inter_400Regular',
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    }
});

const SearchBar:React.FC<Props> = ({db, userUid, city, userName, expoPushToken}) =>{
    const navigation = useNavigation();

    const [search, onChangeSearch] = React.useState("");

    const handleSearchInput = (value:string) => {
        if(search === ""){
            navigation.navigate("Search", {db:db, userUid:userUid, userName:userName, expoPushToken: expoPushToken, value:value, city:city});
            // onChangeSearch(value);
        }
        else{
            onChangeSearch(value);
        }
    }
    const {language} = useContext(LanguageContext);

    return(
        <View style={searchBarStyles.container}>
            <MIcon name="search" size={25} color="white" style={{marginLeft: 2}}/>
            <TextInput value={search} onChangeText={handleSearchInput} style={searchBarStyles.input} placeholder={language.MainHub.searchTitle} placeholderTextColor = "rgba(255,255,255,0.5)"></TextInput>
            <TagButton text={language.MainHub.filtersBtn} sz="sm" color='#5A56F3' icon="filter"/>
        </View>
    );

}


const searchBarStyles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginTop: 25,
        backgroundColor: 'rgba(255,255,255,0.04)',
        padding: 7,
        borderRadius: 30,
        marginBottom: 15,
        
    },
    input:{
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        width: '70%',
        color: 'white',
        paddingLeft: 5,
    },
});

const Filters:React.FC<Props> = ({db, userUid, city, userName, expoPushToken}) =>{

    const navigation = useNavigation();

    const handleFilterPress = (filter:string) => {
        navigation.navigate("Search", {db:db, userUid:userUid, userName:userName, value:"", city:city, filter:filter, expoPushToken: expoPushToken});
    }

    const {language} = useContext(LanguageContext);

    return(
        // <ScrollView style={filtersStyles.scrollView} contentContainerStyle={filtersStyles.container} horizontal={true} bounces={true} centerContent={true} showsHorizontalScrollIndicator={false}>
        //     <TagButton text="Doctor" sz="md" ml={15} color='#F0635A' icon="medical" press={()=>{handleFilterPress("Doctor")}}/>
        //     <TagButton text="Barber" sz="md" ml={15} color='#F59762' icon="md-cut-sharp" press={()=>{handleFilterPress("Barber")}}/>
        //     <TagButton text="Food" sz="md" ml={15} color='#29D697' icon="fast-food" press={()=>{handleFilterPress("Food")}}/>
        //     <TagButton text="Any" sz="md" ml={15} color='#46CDFB' icon="medal" press={()=>{handleFilterPress("Any")}}/>
        //     {/* <View style={{marginRight:190}}></View> */}
        // </ScrollView>
        
        <View style={{position: 'relative'}}>
            <View style={filtersStyles.bg}></View>
            <ScrollView style={filtersStyles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
                <TagButton text={language.queueDetails.categories[0]} sz="md" ml={15} color='#F0635A' icon="medical" press={()=>{handleFilterPress("Doctor")}}/>
                <TagButton text={language.queueDetails.categories[1]} sz="md" ml={15} color='#F59762' icon="md-cut-sharp" press={()=>{handleFilterPress("Barber")}}/>
                <TagButton text={language.queueDetails.categories[2]} sz="md" ml={15} color='#29D697' icon="fast-food" press={()=>{handleFilterPress("Food")}}/>
                <TagButton text={language.queueDetails.categories[3]} sz="md" ml={15} color='#46CDFB' icon="medal" press={()=>{handleFilterPress("Any")}}/>
            </ScrollView>
        </View>
    );

}


const filtersStyles = StyleSheet.create({
    bg:{
        position: 'absolute',
        backgroundColor: "#25855A",
        height: "50%",
        width: "100%",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    scrollView:{
        overflow:'scroll',
        display: 'flex',
        flexDirection: 'row',
        minWidth: '100%',
        // backgroundColor: 'red',
        // position: 'absolute',
        // top:155, 
        // paddingBottom: 30,
        // marginTop: 10,
        flexGrow: 0,
    },
    container:{
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // minWidth: '100%',
        // marginTop: 8,
        // backgroundColor: 'red',
        // overflow: 'scroll'
        // position: 'absolute',
        // height: 41,
        
    },
    input:{
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        width: '70%',
        color: 'white',
        
    },
});


