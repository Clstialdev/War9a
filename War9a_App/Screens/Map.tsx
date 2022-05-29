import MapView, { AnimatedRegion, Animated, Marker, LatLng } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Route } from 'react-native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import pin from '../assets/icon.png';

import {ScreenHeading} from '../components/UIComponents/ScreenHeading'
import {UIButton} from '../components/Buttons/UIButton'

interface Props {
  navigation?: NavigationType,
  route?: Route | undefined,
  registrationAddress?: string,
  setRegistrationAddress?: React.Dispatch<React.SetStateAction<string>>,
  setRegistrationCity?: React.Dispatch<React.SetStateAction<string>>,
  setLatlng?: React.Dispatch<React.SetStateAction<latlng>>,
  onSetServiceLocation: ()=>void,
}

export const Map:React.FC<Props> = ({navigation, route, registrationAddress, setRegistrationAddress, setRegistrationCity, setLatlng, onSetServiceLocation}) => {

  const latlng = route && route.params.latlng;
  const displayOnly = route && route.params.latlng ? true : false;
  
  const [location, setLocation] = useState<any>(null);
  const [region, setRegion] = useState(new AnimatedRegion({
    latitude: latlng ? latlng.latitude : 37.78825,
    longitude: latlng ? latlng.longitude : -122.4324,
    latitudeDelta: 0.0942,
    longitudeDelta: 0.0421,
  }))

  const [updated, setUpdated] = useState(false);

  const [addressName, setAddressName] = useState<null | any>(null);

  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  const [marker, setMarker] = useState<any>({latitude: latlng ? latlng.latitude : 48.85319687656681, longitude: latlng ? latlng.longitude : 2.41});



  useEffect(() => {
    if(!displayOnly){
      updateLocation();
    }
  }, []);

  const updateLocation = async() =>{
    
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let tempLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
      setLocation(tempLocation);

      // setLatitude(tempLocation.coords.latitude);
      // setLongitude(tempLocation.coords.longitude);

      let tempAddress = await Location.reverseGeocodeAsync(tempLocation.coords);
      // console.log(tempAddress)
      // setAddress(tempAddress);

      if(!updated){
        setRegion(new AnimatedRegion({
          latitude: tempLocation.coords.latitude,
          longitude: tempLocation.coords.longitude,
          latitudeDelta: 0.00942,
          longitudeDelta: 0.01421,
        }))
        setUpdated(true);
      }
  }

  useEffect(()=>{
    checkPin()

    setRegion(new AnimatedRegion({
      latitude: marker.latitude,
      longitude: marker.longitude,
      latitudeDelta: 0.00942,
      longitudeDelta: 0.01421,
    }))

  },[marker]);

  const checkPin = async() => {
    console.log(marker)
    let temp = await Location.reverseGeocodeAsync(marker);
    if(setRegistrationAddress && setLatlng && setRegistrationCity){
      setRegistrationAddress(temp[0].name + ", " + temp[0].region);
      setLatlng(marker);
      setRegistrationCity(temp[0].city + "");
    }
    else{
      setAddressName(temp[0].name + ", " + temp[0].region)
    }
      console.log(temp)
  }



  return (
    <View style={styles.container}>
      <ScreenHeading text='Map' mt={50} pos="absolute" color="gray" shadow={false}/>
      <Animated style={styles.map} region={(region as any)} showsUserLocation={true} onPress={(e)=>{if(!displayOnly){setMarker(e.nativeEvent.coordinate)}}} moveOnMarkerPress={true}>
        <Marker coordinate={marker} pinColor="rgba(80,20,213,1)" />
      </Animated>
      <View style={styles.actionContainer}>
        <Text style={styles.text}>{registrationAddress ? registrationAddress.toString() : addressName ? addressName.toString() : ""}</Text>
        {displayOnly ? <></> : <UIButton text="Set Service Location" color="rgba(80,20,213,1)" shadow={true} press={()=>onSetServiceLocation()}/>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  actionContainer:{
    position: 'absolute',
    bottom: "10%",
  },
  text:{
    fontSize: 18,
    color: "rgba(80,20,213,1)",
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:30,
    paddingRight:30,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 11.14,
    elevation: 17,
  }
});