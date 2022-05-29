
import React , {useEffect, useRef, useState} from 'react';
import { StyleSheet, View, useWindowDimensions, ActivityIndicator, ScrollView } from 'react-native';

import { Header } from "../components/MainHub/Header";
import { AvailableServices } from '../components/MainHub/AvailableServices';
import { InviteFriends } from '../components/MainHub/InviteFriends';
import { Navigation } from '../components/Navigation';

import * as Location from 'expo-location';



import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, Firestore, query, orderBy, limit} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

interface Props {
    db: Firestore,
    userUid: string,
    userName: string,
    serviceOwned: undefined | string,
    expoPushToken: string,
  }

export const MainHub:React.FC<Props> = ({db, userUid, userName, serviceOwned, expoPushToken}) => {

  const navigation = useNavigation();

  const [services, setServices] = useState<any>();

  const getServices = async() => {
    const top10 = query(collection(db, "services2"), orderBy("likes", "desc"), limit(10));
    
    const querySnapshot = await getDocs(top10);
    let docsArray:any = []
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      docsArray.push(doc)
    });
    setServices(docsArray)
  }

  useEffect(()=>{
    if(!services){
      getServices();
    }
  },[services]);

  const [location, setLocation] = useState<any>(null);
  const [address, setAddress] = useState<null | any>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  let text = 'Waiting..';

  const windowHeight = useWindowDimensions().height;
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
      setLocation(location);
      let tempAddress = await Location.reverseGeocodeAsync(location.coords);
      // console.log(tempAddress)
      setAddress(tempAddress);
    })();
  }, []);

    return(
        <View style={[{ minHeight: Math.round(windowHeight), flex:1, justifyContent: 'flex-start', position: 'relative', alignItems: 'center',}]}>
            <Header userUid={userUid} db={db} city={address ? address[0].city : ""} postalCode={address ? address[0].region : ""} serviceOwned={serviceOwned} userName={userName} expoPushToken={expoPushToken}/>
            <ScrollView style={{maxWidth: "100%", width: "100%"}}>
              {services ? <AvailableServices services={services} db={db} userUid={userUid} userName={userName} expoPushToken={expoPushToken}/> : <ActivityIndicator size="large" color="black" style={{margin: 80}}/>}
              <InviteFriends />
            </ScrollView>
            <Navigation active="explore"/>
        </View>
    );
}

const styles = StyleSheet.create({
    
})

