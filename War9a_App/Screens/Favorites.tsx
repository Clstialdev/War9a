import React , {useContext, useEffect, useState} from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';

import { collection, query, where, doc, getDoc, getDocs, documentId, Firestore, updateDoc, arrayRemove, arrayUnion, FieldValue, increment} from "firebase/firestore";


import { Navigation } from '../components/Navigation';
import { ServiceCard } from '../components/Service/ServiceCard';
import { ScreenHeading } from '../components/UIComponents/ScreenHeading';
import { FavoritesEmpty } from '../components/Service/FavoritesEmpty';
import { LanguageContext } from '../components/Languages';


interface Props {
    db: Firestore,
    userUid: string,
    userName: string,
    expoPushToken: string,
  }

export const Favorites:React.FC<Props> = ({db, userUid, userName, expoPushToken}) => {

    const [services, setServices] = useState<any>();

    const getFavorites = async() => {
        const userDataRef = doc(db, "users2", userUid);
        const docSnap = await getDoc(userDataRef);

        const Query = query(collection(db, "services2"), where(documentId(), 'in', docSnap.data()?.favorites));

        const querySnapshot = await getDocs(Query);
        let docsArray:any = []
        querySnapshot.forEach((doc) => {
        //   console.log(doc.id, " => ", doc.data());
          docsArray.push(doc)
        });
        setServices(docsArray);
      }

      useEffect(()=>{
        if(!services){
            getFavorites();
        }
      },[services]);

    const updateFavorite = async(docId:string) => {

        const isFavorited = true;

        const serviceDataRef = doc(db, "services2", docId);

        const userDataRef = doc(db, "users2", userUid);
        if(isFavorited){
            //Here We Remove The Service to The Favorites
            await updateDoc(userDataRef, {
                favorites: arrayRemove(docId),
            });
            await updateDoc(serviceDataRef, {
                likes: increment(-1)
            });
        }
        else{
            //Here We Add The Service to The Favorites
            await updateDoc(userDataRef, {
                favorites: arrayUnion(docId)
            });
            await updateDoc(serviceDataRef, {
                likes: increment(1)
            });
        }
    };
    
    const {language} = useContext(LanguageContext);

    return(
        <View style={[{flex:1, justifyContent: 'flex-start', position: 'relative', alignItems: 'center', marginTop: 60}]}>
            <ScreenHeading text={language.Navigation.favoritesBtn} fs={24} shadow={false} options={true}/>
            
            <ScrollView style={{marginBottom: 100, marginTop: 15}} showsVerticalScrollIndicator={false}>
                { services ? services.map((doc:any, i:number) => 
                            <ServiceCard key={i} mb={1} width={90} db={db} userName={userName} userUid={userUid} expoPushToken={expoPushToken} serviceId={doc.id} serviceData={doc.data()} bookmarkPress={()=>{updateFavorite(doc.id)}} bookmarked={()=>{return true}}/>
                            )
                        :  <View style={{display: "flex" ,minHeight: "100%" ,justifyContent: 'center', alignItems: 'center'}}>
                                <FavoritesEmpty />
                            </View>
                }
            </ScrollView>
            

            <Navigation active="favorites"/>
        </View>
    );
}