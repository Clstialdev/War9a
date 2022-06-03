import React, { Dispatch, useEffect, useRef, useState } from 'react';
import {Image, StyleSheet, Text, TextInput, View, ScrollView, Route} from 'react-native';
import { vh,vw } from 'react-native-expo-viewport-units';
import { StatusBar } from 'expo-status-bar';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Drawer from '../components/UIComponents/DraggableView';

import { DraggableFitlers } from '../components/Search/DraggableFitlers';
import { ScreenHeading } from '../components/UIComponents/ScreenHeading';
import { TagButton } from "../components/Buttons/TagButton";

import { ServiceCard } from '../components/Service/ServiceCard';
import { collection, getDocs, query, where } from 'firebase/firestore';


interface Props {
    route: Route,
}

export const Search:React.FC<Props> = ({route}) => { //search screen allows us to search for businesses

    const value = route ? route.params.value : "";
    const [search, onChangeSearch] = useState(value);

    const [tags, setTags] = useState("");
    const [distance, setDistance] = useState(0);

    const [results, setResults] = useState<any>();

    const getResults = async() => { //gets the search results
        if(!route.params.filter){ //if user hasn't set a filter we use the words he used in the search bar for the query
            const Query = query(collection(route.params.db, "services2"), where("nameAsArray", "array-contains", search.trim().toLowerCase()));
            const querySnapshot = await getDocs(Query);
    
            let docsArray:any = []
            querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            docsArray.push(doc)
            });
            setResults(docsArray)
        }
        else{ //else we use the filter he set to find results
            const Query = query(collection(route.params.db, "services2"), where("tags", "array-contains", route.params.filter.toLowerCase()));
            const querySnapshot = await getDocs(Query);
            
            // console.log("test")
            let docsArray:any = []
            querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            docsArray.push(doc)
            });
        
            setResults(docsArray)
        }

  }

  useEffect(()=>{
      getResults();
  },[search]);

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor={'transparent'} translucent />

            <ScreenHeading text="Search" shadow={false}/>
            { !route.params.filter ? <SearchBar search={search} onChangeSearch={onChangeSearch}/>  : <View/>}

            <View style={{...styles.filtersContainer, marginTop: route.params.filter ? 20 : 0, marginBottom: route.params.filter ? 20 : 10}}>
                <Text style={styles.filterText}>Filters: </Text>
                <ScrollView horizontal={true} style={{width: "90%", borderRadius:30}} showsHorizontalScrollIndicator={false}>
                    {route.params.filter === "Doctor" ? <TagButton text={"Doctor"} icon="medical" sz="md" fs={14} color="#F0635A" ml={5} shadow={false}/>
                    : route.params.filter === "Food" ?
                    <TagButton text={"Food"} icon="fast-food" sz="md" fs={14} color="#29D697" ml={5} shadow={false}/>
                    : route.params.filter === "Barber" ?
                    <TagButton text={"Barber"} icon="md-cut-sharp" sz="md" fs={14} color="#F59762" ml={5} shadow={false}/>
                    :
                    <TagButton text={"Any"} icon="pin" sz="md" fs={14} color="gray" ml={5} shadow={false}/>
                    }
                    <TagButton text={route.params.city} icon="pin" sz="md" fs={14} color="gray" ml={5} shadow={false}/>
                </ScrollView>
            </View>


            {/* <ScrollView style={{maxHeight: vh(10)}} showsVerticalScrollIndicator={false}>
            { results ? results.map((doc:any, i:number) => 
                        <ServiceCard width={90} key={i} db={route.params.db} userUid={route.params.userUid} serviceId={doc.id} image={doc.data().image} name={doc.data().name} address={doc.data().address} description={doc.data().description} bookmarkPress={()=>{updateFavorite(doc.id)}} bookmarked={()=>{return isBookmarked(doc.id)}}/>
                        )
                    : <View></View>
                    }
            </ScrollView> */}

            <Drawer
                initialDrawerSize={0.25}
                autoDrawerUp={1} // 1 to auto up, 0 to auto down
                renderContainerView={()=>(
                    <ScrollView style={{maxHeight: vh(70.8)}} showsVerticalScrollIndicator={false}>
                        { results ? results.map((doc:any, i:number) => 
                                tags==="" ? <ServiceCard mb={1} width={90} key={i} db={route.params.db} userName={route.params.userName} userUid={route.params.userUid} expoPushToken={route.params.expoPushToken} serviceId={doc.id} serviceData={doc.data()}/>
                                :
                                doc.data().tags && doc.data().tags.includes(tags) ? <ServiceCard mb={1} width={90} key={i} db={route.params.db} userName={route.params.userName} userUid={route.params.userUid} expoPushToken={route.params.expoPushToken} serviceId={doc.id} serviceData={doc.data()}/>
                                :
                                <View key={i}></View>
                                )
                        : <View></View>
                        }
                    </ScrollView>
                )}
                // renderDrawerView={() => (
                    
                //     <View style={{height:66, width: vw(100)}}>
                //     <Text>Head</Text>
                // </View>
                // )}
                renderInitDrawerView={() => (
                    <View style={{width: vw(100), borderRadius: 20,}}>
                        <DraggableFitlers setTags={setTags} setDistance={setDistance} filtered={!route.params.filter ? "any" : route.params.filter.toLowerCase()}/>
                    </View>
                )}
             />
            

            

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        top: 70
    },
    filtersContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        marginTop: 5,
        paddingLeft: "7%",
        
    },
    filterText: {
        fontSize: 17,
        fontFamily: 'Inter_600SemiBold',
        // paddingRight: 10,
        color: "rgba(0,0,0,0.6)"
    },
});

interface SearchBar {
    search: string,
    onChangeSearch: Dispatch<any>,
}


const SearchBar:React.FC<SearchBar> = ({search ,onChangeSearch}) =>{
    
    // const value = route ? route.params.value : "";
    // const [search, onChangeSearch] = React.useState(value);

    const textRef = useRef<any>();
    
    useEffect(()=>{
        setTimeout(() => textRef.current.focus(), 10)
    },[textRef])

    return(
        <View style={searchBarStyles.container}>
            <MIcon name="search" size={30} color="#25855A"/>
            <TextInput ref={textRef} autoFocus={true} value={search} onChangeText={onChangeSearch} style={searchBarStyles.input} placeholder={'Search...'} placeholderTextColor = "rgba(0,0,0,0.6)"></TextInput>
            <TagButton text="Filters" sz="sm" icon="filter" style={{paddingTop: 7, paddingBottom: 7}}/>
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
        marginTop: 5,
        // backgroundColor: 'black',
        padding: 10,
        borderRadius: 30
    },
    input:{
        fontFamily: 'Inter_300Light',
        fontSize: 21,
        width: '70%',
        color: 'black',
        letterSpacing: 0.5,
        paddingLeft: 10,
        
    },
});


// const SearchResult = () =>{
//     return(
//         <View style={searchResultStyle.container}>

//             <Image source={ServicePreview} style={{width: 20}}/>

//             <View>
//                 <Text>30 Mins</Text>
//                 <Text>Name</Text>
//                 <Text>Specialist in</Text>
//             </View>
//         </View>
//     );
// }

// const searchResultStyle = StyleSheet.create({
//     container:{
//         display: 'flex',
//         flexDirection: 'row',
//         padding: 10,
        
//     },
// });