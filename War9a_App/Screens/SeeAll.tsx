import React , {useContext, useEffect, useState} from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';

import { collection, query, where, doc, getDoc, getDocs, documentId, Firestore, updateDoc, arrayRemove, arrayUnion, orderBy} from "firebase/firestore";


import { Navigation } from '../components/Navigation';
import { ServiceCard } from '../components/Service/ServiceCard';
import { ScreenHeading } from '../components/UIComponents/ScreenHeading';
import { QueueEmpty } from '../components/Service/QueueEmpty';
import { LanguageContext } from '../components/Languages';


interface Props {
    db: Firestore,
    userUid: string,
    userName: string,
    expoPushToken: string,
  }

export const SeeAll:React.FC<Props> = ({db, userUid, userName, expoPushToken}) => { //screen to show us all the business's available

    const [services, setServices] = useState<any>();

    const getAllServices = async() => {
        const top10 = query(collection(db, "services2"), orderBy("likes", "desc"));
    
        const querySnapshot = await getDocs(top10);
        let docsArray:any = []
        querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        docsArray.push(doc)
        });
        setServices(docsArray);
      }

      useEffect(()=>{
        if(!services){
            getAllServices();
        }
      },[services]);

    const updateFavorite = async(docId:string) => {

        const isFavorited = true;

        const userDataRef = doc(db, "users2", userUid);
        if(isFavorited){
            //Here We Remove The Service to The Favorites
            await updateDoc(userDataRef, {
                favorites: arrayRemove(docId)
            });
        }
        else{
            //Here We Add The Service to The Favorites
            await updateDoc(userDataRef, {
                favorites: arrayUnion(docId)
            });
        }
    };
    const {language} = useContext(LanguageContext);
    return(
        <View style={[{flex:1, justifyContent: 'flex-start', position: 'relative', alignItems: 'center', marginTop: 60}]}>
            <ScreenHeading text={language.MainHub.allBtn} fs={24} shadow={false} options={false}/>
            
            <ScrollView style={{marginBottom: 100, marginTop: 15}} showsVerticalScrollIndicator={false}>
                { services ? services.map((doc:any, i:number) => 
                            <ServiceCard key={i} mb={1} width={90} navigate="ServiceQueue" db={db} userUid={userUid} userName={userName} expoPushToken={expoPushToken} serviceId={doc.id} serviceData={doc.data()} bookmarkPress={()=>{updateFavorite(doc.id)}} bookmarked={()=>{return true}}/>
                            )
                        : <View style={{display: "flex" ,minHeight: "100%" ,justifyContent: 'center', alignItems: 'center'}}>
                            <QueueEmpty />
                        </View>
                }
            </ScrollView>
            

            <Navigation active="queues"/>
        </View>
    );
}