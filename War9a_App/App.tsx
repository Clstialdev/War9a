import { StatusBar } from 'expo-status-bar';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { Image, LogBox, StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_300Light ,Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black} from '@expo-google-fonts/inter';
import { enableScreens } from 'react-native-screens';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, getDocs, doc, addDoc, setDoc, DocumentData, updateDoc, arrayUnion } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithCredential, getAuth, signOut, onAuthStateChanged, User} from "firebase/auth";
import Constants from 'expo-constants'; //So we can read app.json extra
import * as Google from 'expo-google-app-auth'; //google auth libraries
import * as Notifications from 'expo-notifications';
import { Platform } from 'expo-modules-core';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
enableScreens();

import { LanguageContext, Thesaurus } from './components/Languages';
import { Welcome } from './Screens/Welcome';
import { ModeSelection } from './Screens/ModeSelection';
import { MainHub } from './Screens/MainHub';
import { RegisterService } from './Screens/RegisterService';
import { ServiceDetails } from './Screens/ServiceDetails';
import { ServiceQueue } from './Screens/ServiceQueue';
import { WorkMode } from './Screens/WorkMode';
import { Favorites } from './Screens/Favorites';
import { MyQueues } from './Screens/MyQueues';
import { Profile } from './Screens/Profile';
import { Search } from './Screens/Search';
import { EditProfile } from './Screens/Settings/EditProfile';
import { QrScanner } from './Screens/QrScanner';
import { EditNotifications } from './Screens/Settings/EditNotifications';
import { ChangeLanguage } from './Screens/Settings/ChangeLanguage';
import { QrGenerator } from './Screens/QrGenerator';
import { SeeAll } from './Screens/SeeAll';
import { Map } from './Screens/Map';


export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useState<DocumentData>();
  const [serviceOwned, setServiceOwned] = useState<undefined | string>(undefined);

  // const firebaseConfig = {
  //   apiKey: "AIzaSyDRVnooEn7gSidAq9MI0mr_RvSu0PJHusU",
  //   authDomain: "war9a-app.firebaseapp.com",
  //   projectId: "war9a-app",
  //   storageBucket: "war9a-app.appspot.com",
  //   messagingSenderId: "509469309775",
  //   appId: "1:509469309775:web:c7e113b46c1d07c19fa33a"
  // };

  const firebaseConfig = {
    apiKey: (Constants as any).manifest.extra.FIREBASE_CONFIG_APIKEY,
    authDomain: (Constants as any).manifest.extra.FIREBASE_CONFIG_AUTHDOMAIN,
    projectId: (Constants as any).manifest.extra.FIREBASE_CONFIG_PROJECTID,
    storageBucket: (Constants as any).manifest.extra.FIREBASE_CONFIG_STORAGEBUCKET,
    messagingSenderId: (Constants as any).manifest.extra.FIREBASE_CONFIG_SENDERID,
    appId: (Constants as any).manifest.extra.FIREBASE_CONFIG_APPID
  };

  
  const Firebase = initializeApp(firebaseConfig);
  
  const db = getFirestore(Firebase);


  const addService = async(registration:serviceRegistration) => {
      if(user){
        const docRef = await addDoc(collection(db, "services2"), {
          name: registration.name,
          nameAsArray: registration.nameAsArray,
          address: registration.address,
          latlng: registration.latlng,
          city: registration.city,
          image: registration.image,
          description: registration.description,
          owner: registration.owner,
          created: registration.created,
          seats: registration.seats,
          lanes: registration.lanes,
          laneTypes: registration.laneTypes,
          openCloseDates: registration.openCloseDates,
          tags: registration.tags,
          likes: registration.likes,
          rating: registration.rating,
          tpc: registration.tpc,
          queued: registration.queued,
          expoPushToken: expoPushToken,
        });
        console.log("Document written with ID: ", docRef.id);

        const userDataRef = doc(db, "users2", user.uid);
        await updateDoc(userDataRef, {
            service_owned: docRef.id,
            service_provider: true,
        });
        setServiceOwned(docRef.id);
    }
    else{
      alert("no user, clear cache and login with google!");
    }
  }


  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  //this useEffect fetches the user data on login
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("no user");
        setUser(undefined);
      }
    });
    handleUserAfterAuth();
  },[user]);


  const handleUserAfterAuth = async() => {
    if(user){
      const docSnap = await getDoc(doc(db, "users2", user.uid));
      

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        if(docSnap.data().language !== undefined){
          let language=docSnap.data().language;
          language === "french" ? setLanguage(Thesaurus.french) : language === "arabic" ? setLanguage(Thesaurus.arabic) :setLanguage(Thesaurus.english)
          
        }
        console.log("User found, Document data:", docSnap.data());
        if(docSnap.data().service_provider){
          setServiceOwned(docSnap.data().service_owned);
        }
      } else {
        console.log("No user document found!");
        const docRef = await setDoc(doc(db, "users2", user.uid), {
          name: user.displayName,
          favorites: [],
          queues: [],
          service_provider: false,
          language: "english",
          notifications: {active: true, onNewClient: true, onRemoved: true, sound:true}
        }).then(()=>{
          console.log("Document Written");
        });
      }
    }
    else{
      console.log("No user to search for!");
    }
  }

  const Glogin = async () => {
    try {
      //await GoogleSignIn.askForPlayServicesAsync();
      const result = await Google.logInAsync({ //return an object with result token and user
        iosClientId: (Constants as any).manifest.extra.IOS_KEY, //From app.json
        androidClientId: (Constants as any).manifest.extra.ANDROID_KEY, //From app.json
        iosStandaloneAppClientId: (Constants as any).manifest.extra.IOS_KEY,
        androidStandaloneAppClientId: (Constants as any).manifest.extra.ANDROID_KEY_STANDALONE,
      });
      if (result.type === 'success') {
        // console.log(result);
        setIsLoading(true);
        const credential = GoogleAuthProvider.credential( //Set the tokens to Firebase
          result.idToken,
          result.accessToken
        );
        const auth = getAuth();
        
        signInWithCredential(auth, credential).then(()=>{
          
        }).catch((error) => {
            console.log(error);
        });
        
        return true;

      } else {
        return false;
        //CANCEL
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
      return false;
    }
  };

  const GLogOut = (onSuccess:()=>void) => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      setServiceOwned(undefined)
      onSuccess();
      console.log("logged out");

    }).catch((error) => {
      // An error happened.
      alert(error)
    });
  }



  LogBox.ignoreAllLogs(true);


  //Notification settings start here
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState('noToken');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  //this useEffect Fetches the permissions to send notifications
  useEffect(() => {
    registerForPushNotificationsAsync().then((token:any) => { if(token!==undefined) {setExpoPushToken(token)}});

    // This listener is fired whenever a notification is received while the app is foregrounded
    (notificationListener as any).current = Notifications.addNotificationReceivedListener(notification => {
      setNotification((notification as any));
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    (responseListener as any).current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    
    return () => {
      Notifications.removeNotificationSubscription((notificationListener as any).current);
      Notifications.removeNotificationSubscription((responseListener as any).current);
    };

  }, []);


  const [language, setLanguage] = useState<any>(Thesaurus.english)

  const handleChangeLanguage = (language:languages) =>{
    switch (language) {
      case "english":
        setLanguage(Thesaurus.english);
        break;
      case "french":
        setLanguage(Thesaurus.french);
        break;
      case "arabic":
        setLanguage(Thesaurus.arabic);
        break;
    
      default:
        break;
    }
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

  return (
    <View style={styles.app}>
      <LanguageContext.Provider value={{language, handleChangeLanguage}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" children={() => <Welcome Glogin={Glogin} user={user} />}/>
            <Stack.Screen name="ModeSelection" component={ModeSelection}/>
            <Stack.Screen name="RegisterService" children={() => <RegisterService addService={addService} userUid={user ? user.uid : "Null"} />}/>
            <Stack.Screen name="MainHub" children={()=> <MainHub db={db} userUid={user ? user.uid : "Null"} userName={user ? userData ? userData.name : "User" : "User"} serviceOwned={serviceOwned} expoPushToken={expoPushToken}/>}/>
            <Stack.Screen name="Search" component={Search}/>
            <Stack.Screen name="SeeAll" children={()=> <SeeAll db={db} userUid={user ? user.uid : "Null"} userName={user ? userData ? userData.name : "User" : "User"} expoPushToken={expoPushToken} />}/>
            <Stack.Screen name="QrScanner" children={()=> <QrScanner db={db} userUid={user ? user.uid : "Null"} userName={user ? userData ? userData.name : "User" : "User"} expoPushToken={expoPushToken} />}/>
            <Stack.Screen name="ServiceDetails" component={ServiceDetails}/>
            <Stack.Screen name="ServiceQueue" component={ServiceQueue}/>
            <Stack.Screen name="WorkMode" children={()=> <WorkMode db={db} userUid={user ? user.uid : "Null"} serviceOwned={serviceOwned!==undefined ? serviceOwned : "Error Service Not Found"}/>}/>
            <Stack.Screen name="QrGenerator" children={()=> <QrGenerator serviceId={serviceOwned!==undefined ? serviceOwned : "Error Service Not Found"}/>}/>
            <Stack.Screen name="MyQueues" children={()=> <MyQueues db={db} userUid={user ? user.uid : "Null"} userName={user ? userData ? userData.name : "User" : "User"} expoPushToken={expoPushToken} />}/>
            <Stack.Screen name="Favorites" children={()=> <Favorites db={db} userUid={user ? user.uid : "Null"} userName={user ? userData ? userData.name : "User" : "User"} expoPushToken={expoPushToken} />}/>
            
            <Stack.Screen name="Map" component={Map}/>
            
            <Stack.Screen name="Profile" children={()=> <Profile db={db} userUid={user ? user.uid : "Null"} userName={user ? userData ? userData.name : "User" : "User"} serviceOwned={serviceOwned} GLogOut={GLogOut}/>}/>
            <Stack.Screen name="EditProfile" children={()=> <EditProfile db={db} userUid={user ? user.uid : "Null"} />}/>
            <Stack.Screen name="EditNotifications" children={()=> <EditNotifications db={db} userUid={user ? user.uid : "Null"} notificationSettings={userData?.notifications}/>}/>
            <Stack.Screen name="ChangeLanguage" children={()=> <ChangeLanguage db={db} userUid={user ? user.uid : "Null"}/>}/>
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageContext.Provider>
    </View>
  );
  }
}


const styles = StyleSheet.create({
    app: {
      flex: 1,
    },
})

//Fetches notification permissions
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'War9a',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
