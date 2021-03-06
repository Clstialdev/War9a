import { StatusBar } from "expo-status-bar";
import React, { createContext, useEffect, useRef, useState } from "react";
import { Image, LogBox, StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { enableScreens } from "react-native-screens";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  addDoc,
  setDoc,
  DocumentData,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithCredential,
  getAuth,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import Constants from "expo-constants"; //So we can read app.json extra
import * as Google from "expo-google-app-auth"; //google auth libraries
import * as Notifications from "expo-notifications";
import { Platform } from "expo-modules-core";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
enableScreens();

import { LanguageContext, Thesaurus } from "./components/Languages";
import { Welcome } from "./Screens/Welcome";
import { ModeSelection } from "./Screens/ModeSelection";
import { MainHub } from "./Screens/MainHub";
import { RegisterService } from "./Screens/RegisterService";
import { ServiceDetails } from "./Screens/ServiceDetails";
import { ServiceQueue } from "./Screens/ServiceQueue";
import { WorkMode } from "./Screens/WorkMode";
import { Favorites } from "./Screens/Favorites";
import { MyQueues } from "./Screens/MyQueues";
import { Profile } from "./Screens/Profile";
import { Search } from "./Screens/Search";
import { EditProfile } from "./Screens/Settings/EditProfile";
import { QrScanner } from "./Screens/QrScanner";
import { EditNotifications } from "./Screens/Settings/EditNotifications";
import { ChangeLanguage } from "./Screens/Settings/ChangeLanguage";
import { QrGenerator } from "./Screens/QrGenerator";
import { SeeAll } from "./Screens/SeeAll";
import { Map } from "./Screens/Map";

export default function App() {
  const [isLoading, setIsLoading] = useState(false); //State of whether the app is loading or not

  const [user, setUser] = useState<User>(); //state for the user object from google auth
  const [userData, setUserData] = useState<DocumentData>(); //state of user DB data
  const [serviceOwned, setServiceOwned] = useState<undefined | string>(
    undefined
  ); //state for whether user has a business or not

  const firebaseConfig = {
    //firebase API keys
    apiKey: (Constants as any).manifest.extra.FIREBASE_CONFIG_APIKEY,
    authDomain: (Constants as any).manifest.extra.FIREBASE_CONFIG_AUTHDOMAIN,
    projectId: (Constants as any).manifest.extra.FIREBASE_CONFIG_PROJECTID,
    storageBucket: (Constants as any).manifest.extra
      .FIREBASE_CONFIG_STORAGEBUCKET,
    messagingSenderId: (Constants as any).manifest.extra
      .FIREBASE_CONFIG_SENDERID,
    appId: (Constants as any).manifest.extra.FIREBASE_CONFIG_APPID,
  };

  const Firebase = initializeApp(firebaseConfig); //initialising our firebase connection with our config object

  const db = getFirestore(Firebase); //getting our firebase firestore (Database) object

  const addService = async (registration: serviceRegistration) => {
    //function for adding the service to database
    if (user) {
      //if user exists /is authenticated
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
    } else {
      alert("no user, clear cache and login with google!");
    }
  };

  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  //this useEffect fetches the user data on login
  useEffect(() => {
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
  }, [user]);

  const handleUserAfterAuth = async () => {
    //this handles what happens after authentication
    if (user) {
      //if user exists
      const docSnap = await getDoc(doc(db, "users2", user.uid)); //we fetch the user db data
      if (docSnap.exists()) {
        //if data in db exists
        console.log("User found, Document data:", docSnap.data()); //we log that we did find the user
        setUserData(docSnap.data()); //we set our userData state to the fetched data
        if (docSnap.data().language !== undefined) {
          //if user has chosen a language
          let language = docSnap.data().language; //we get the language from his db data
          language === "french" // if his language is set to french
            ? setLanguage(Thesaurus.french) //we set the language of the app to french
            : language === "arabic" //else if arabic
            ? setLanguage(Thesaurus.arabic) //we set the language of the app to arabic
            : setLanguage(Thesaurus.english); //else we set the language of the app to english by default
        }
        if (docSnap.data().service_provider) {
          //we check if this user is a business owner
          setServiceOwned(docSnap.data().service_owned); //we fetch the ID of his business
        }
      } else {
        //if user is not in our database we add him to the database with default values using a JSON object
        console.log("No user document found!");
        const docRef = await setDoc(doc(db, "users2", user.uid), {
          name: user.displayName,
          favorites: [],
          queues: [],
          service_provider: false,
          language: "english",
          notifications: {
            active: true,
            onNewClient: true,
            onRemoved: true,
            sound: true,
          },
        }).then(() => {
          console.log("Document Written");
        });
      }
    } else {
      console.log("No user to search for!");
    }
  };

  const Glogin = async () => {
    //allows us to sign in with google
    try {
      //await GoogleSignIn.askForPlayServicesAsync();
      const result = await Google.logInAsync({
        //return an object with result token and user
        iosClientId: (Constants as any).manifest.extra.IOS_KEY, //From app.json
        androidClientId: (Constants as any).manifest.extra.ANDROID_KEY, //From app.json
        iosStandaloneAppClientId: (Constants as any).manifest.extra.IOS_KEY,
        androidStandaloneAppClientId: (Constants as any).manifest.extra
          .ANDROID_KEY_STANDALONE,
      });
      if (result.type === "success") {
        // console.log(result);
        setIsLoading(true);
        const credential = GoogleAuthProvider.credential(
          //Set the tokens to Firebase
          result.idToken,
          result.accessToken
        );
        const auth = getAuth();

        signInWithCredential(auth, credential)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });

        return true;
      } else {
        return false;
        //CANCEL
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
      return false;
    }
  };

  const GLogOut = (onSuccess: () => void) => {
    //allows us to logout
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setServiceOwned(undefined);
        onSuccess();
        console.log("logged out");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };

  LogBox.ignoreAllLogs(true); //we're ignoring some logs from the expo simulator while developing the app

  //Notification settings start here
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState("noToken"); //default state of the push notification token
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  //this useEffect Fetches the permissions to send notifications
  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) => {
      if (token !== undefined) {
        setExpoPushToken(token);
      }
    });

    // This listener is called whenever a notification is received
    (notificationListener as any).current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification as any);
      });

    // This listener is called when a user taps a notification
    (responseListener as any).current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      //then we remove the subscription for the notification
      Notifications.removeNotificationSubscription(
        (notificationListener as any).current
      );
      Notifications.removeNotificationSubscription(
        (responseListener as any).current
      );
    };
  }, []);

  const [language, setLanguage] = useState<any>(Thesaurus.english); //by default the app language is set to english

  const handleChangeLanguage = (language: languages) => {
    //function to handle language changes, we pass this to the settings page later on
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
  };

  if (!fontsLoaded) {
    // we want to make sure the fonts are loaded before we show the app welcome screen
    return <AppLoading />;
  } else {
    // here is the navigation stack of our app and the pages it allows us to access
    return (
      <View style={styles.app}>
        <LanguageContext.Provider value={{ language, handleChangeLanguage }}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="Welcome"
                children={() => <Welcome Glogin={Glogin} user={user} />}
              />
              <Stack.Screen name="ModeSelection" component={ModeSelection} />
              <Stack.Screen
                name="RegisterService"
                children={() => (
                  <RegisterService
                    addService={addService}
                    userUid={user ? user.uid : "Null"}
                  />
                )}
              />
              <Stack.Screen
                name="MainHub"
                children={() => (
                  <MainHub
                    db={db}
                    userUid={user ? user.uid : "Null"}
                    userName={
                      user ? (userData ? userData.name : "User") : "User"
                    }
                    serviceOwned={serviceOwned}
                    expoPushToken={expoPushToken}
                  />
                )}
              />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen
                name="SeeAll"
                children={() => (
                  <SeeAll
                    db={db}
                    userUid={user ? user.uid : "Null"}
                    userName={
                      user ? (userData ? userData.name : "User") : "User"
                    }
                    expoPushToken={expoPushToken}
                  />
                )}
              />
              <Stack.Screen
                name="QrScanner"
                children={() => (
                  <QrScanner
                    db={db}
                    userUid={user ? user.uid : "Null"}
                    userName={
                      user ? (userData ? userData.name : "User") : "User"
                    }
                    expoPushToken={expoPushToken}
                  />
                )}
              />
              <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
              <Stack.Screen name="ServiceQueue" component={ServiceQueue} />
              <Stack.Screen
                name="WorkMode"
                children={() => (
                  <WorkMode
                    db={db}
                    userUid={user ? user.uid : "Null"}
                    serviceOwned={
                      serviceOwned !== undefined
                        ? serviceOwned
                        : "Error Service Not Found"
                    }
                  />
                )}
              />
              <Stack.Screen
                name="QrGenerator"
                children={() => (
                  <QrGenerator
                    serviceId={
                      serviceOwned !== undefined
                        ? serviceOwned
                        : "Error Service Not Found"
                    }
                  />
                )}
              />
              <Stack.Screen
                name="MyQueues"
                children={() => (
                  <MyQueues
                    db={db}
                    userUid={user ? user.uid : "Null"}
                    userName={
                      user ? (userData ? userData.name : "User") : "User"
                    }
                    expoPushToken={expoPushToken}
                  />
                )}
              />
              <Stack.Screen
                name="Favorites"
                children={() => (
                  <Favorites
                    db={db}
                    userUid={user ? user.uid : "Null"}
                    userName={
                      user ? (userData ? userData.name : "User") : "User"
                    }
                    expoPushToken={expoPushToken}
                  />
                )}
              />

              <Stack.Screen name="Map" component={Map} />

              <Stack.Screen
                name="Profile"
                children={() => (
                  <Profile
                    db={db}
                    userUid={user ? user.uid : "Null"}
                    userName={
                      user ? (userData ? userData.name : "User") : "User"
                    }
                    serviceOwned={serviceOwned}
                    GLogOut={GLogOut}
                  />
                )}
              />
              <Stack.Screen
                name="EditProfile"
                children={() => (
                  <EditProfile db={db} userUid={user ? user.uid : "Null"} />
                )}
              />
              <Stack.Screen
                name="EditNotifications"
                children={() => (
                  <EditNotifications
                    db={db}
                    userUid={user ? user.uid : "Null"}
                    notificationSettings={userData?.notifications}
                  />
                )}
              />
              <Stack.Screen
                name="ChangeLanguage"
                children={() => (
                  <ChangeLanguage db={db} userUid={user ? user.uid : "Null"} />
                )}
              />
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
});

//Fetches notification permissions
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "War9a",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
