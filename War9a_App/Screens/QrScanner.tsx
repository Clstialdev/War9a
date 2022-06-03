import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, ToastAndroid } from 'react-native';
import { vh,vw } from 'react-native-expo-viewport-units';
import { Camera } from 'expo-camera';
import { UIButton } from '../components/Buttons/UIButton';
import { useNavigation } from '@react-navigation/native';
import { arrayUnion, doc, Firestore, getDoc, updateDoc } from 'firebase/firestore';
import axios from 'axios';
import Toast from 'react-native-root-toast';

import { AndroidCamera } from '../components/AndroidCamera';
import { ScreenHeading } from '../components/UIComponents/ScreenHeading';

interface Props {
    db:Firestore,
    userUid:string,
    userName: string,
    expoPushToken: string,
}

export const QrScanner:React.FC<Props> = ({db, userUid, userName, expoPushToken}) => {

    const navigation = useNavigation();
    const [service, setService] = useState<any>(undefined);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [codeFetched, setCodeFetched] = useState<boolean>(false);
    const [serviceId, setServiceId] = useState("");
    const [qrValue, setQrValue] = useState("");

  useEffect(() => {
      (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
        
        setCodeFetched(false);
  }, []);


  useEffect(()=>{
    if(qrValue!==""){
        handleQrCodeScanned(qrValue);
    }
  },[qrValue])

  useEffect(()=>{
    if(serviceId!==""){
        fetchService(serviceId);
    }
  },[serviceId])

  useEffect(()=>{ //this function is automatically triggered everytime the service variable is changed.
    if(service!==undefined){
        // joinService(serviceId);
        if(Platform.OS==="ios"){
            Toast.show('😎 Fast Travel to ' + service.name + '!', {duration: Toast.durations.LONG, backgroundColor: "white", shadowColor:"black", textColor:"black", position:-50});
        }
        else{
            ToastAndroid.show('😎 Fast Travel to ' + service.name + '!', ToastAndroid.SHORT);
        }

        const creationDate = service.created.toDate().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        navigation.navigate("MainHub");
        navigation.navigate("ServiceQueue", {db:db, serviceId: serviceId, serviceData: service, userUid:userUid, userName:userName, expoPushToken: expoPushToken})
    }
  },[service])

  const fetchService = async(serviceId:string) =>{
    const docSnap = await getDoc(doc(db, "services2", serviceId));

    if (docSnap.exists()) {
      setService(docSnap.data());
    }
  }

  const joinService = async(serviceId:string) =>{ 
    const serviceDataRef = doc(db, "services2", serviceId);
    await updateDoc(serviceDataRef, {
        queued: arrayUnion(userUid),
        queuedNames: arrayUnion(userName),
        queuedPushTokens: arrayUnion(expoPushToken)
    });

    const userDataRef = doc(db, "users2", userUid);
    await updateDoc(userDataRef, {
        queues: arrayUnion(serviceId)
    });

   axios.post('https://exp.host/--/api/v2/push/send', {
            to: service.expoPushToken,
            title: "War9a: " + service.name,
            body: "Someone Joined your queue"
          })
          .then(function (response:any) {
            // console.log(response);
          })
          .catch(function (error:any) {
            console.log(error);
          });
  }

  const handleQrCodeScanned = async(data:any) => {
     console.log(data)
    setCodeFetched(true);

    if(data.includes("war9a.com") && data.includes("join/")){
        let split = data.split("/")
        let serviceId = split[split.length - 1];
        if(serviceId.length===20){
            setServiceId(serviceId);
        }
        else{
            alert("Invalid Qr code!" + data);
        }
        
    }
    else{
        alert("Invalid Qr code!");
    }

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>

    <ScreenHeading text='Scan Qr Code' color='white' shadow={false} mt={80} pos="absolute"/>


    <AndroidCamera
        onBarCodeScanned={async(...args) => { if(qrValue !== args[0].data) setQrValue(args[0].data) }}
        barCodeScannerSettings={{
          barCodeTypes: codeFetched==false ? ["qr"] : [],
        }}
        style={{ flex: 1, height: vw(100)}}
      />
      <View style={styles.squareContainer}>
          <View style={styles.topLeftBox}></View>
          <View style={styles.topRightBox}></View>
          <View style={styles.bottomLeftBox}></View>
          <View style={styles.bottomRightBox}></View>
      </View>
      {/* {codeFetched && <UIButton text={'Tap to Scan Again'} press={() => setCodeFetched(false)} sz="lg" mt={10}/>} */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   flexDirection: 'column',
    //   justifyContent: 'center',
    //   alignItems: "center"
    position: 'relative',
    },
    squareContainer:{
        width: vw(60),
        height: vw(60),
        // backgroundColor: 'green',
        position: 'absolute',
        top: vh(50) - vw(30),
        left: vw(20)
    },
    topLeftBox:{
        position: 'absolute',
        height: "35%",
        width: "35%",
        borderRadius: 10,
        borderTopColor: "rgba(255,255,255,1)",
        borderTopWidth: 6,
        borderLeftColor: "rgba(255,255,255,1)",
        borderLeftWidth: 6,
    },
    topRightBox:{
        position: 'absolute',
        height: "35%",
        width: "35%",
        borderRadius: 10,
        borderTopColor: "rgba(255,255,255,1)",
        borderTopWidth: 6,
        borderRightColor: "rgba(255,255,255,1)",
        borderRightWidth: 6,
        right: 0,
    },
    bottomLeftBox:{
        position: 'absolute',
        height: "35%",
        width: "35%",
        borderRadius: 10,
        borderBottomColor: "rgba(255,255,255,1)",
        borderBottomWidth: 6,
        borderLeftColor: "rgba(255,255,255,1)",
        borderLeftWidth: 6,
        bottom: 0,
    },
    bottomRightBox:{
        position: 'absolute',
        height: "35%",
        width: "35%",
        borderRadius: 10,
        borderBottomColor: "rgba(255,255,255,1)",
        borderBottomWidth: 6,
        borderRightColor: "rgba(255,255,255,1)",
        borderRightWidth: 6,
        bottom: 0,
        right: 0,
    },
  });