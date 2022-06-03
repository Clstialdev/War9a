import React , {useContext, useEffect, useState} from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';

import { collection, query, where, doc, getDoc, getDocs, documentId, Firestore, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore";


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

export const MyQueues:React.FC<Props> = ({db, userUid, userName, expoPushToken}) => {

    const [services, setServices] = useState<any>();

    const getQueues = async() => {
        const userDataRef = doc(db, "users2", userUid);
        const docSnap = await getDoc(userDataRef);

        const Query = query(collection(db, "services2"), where(documentId(), 'in', docSnap.data()?.queues));

        const querySnapshot = await getDocs(Query);
        let docsArray:any = []
        querySnapshot.forEach((doc) => {
        //   console.log(doc.id, " => ", doc.data());
          docsArray.push(doc)
        });
        setServices(docsArray);
      }

      useEffect(()=>{ //this function only runs once everytime we go to the My Queues screen
        if(!services){
            getQueues();
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
            <ScreenHeading text={language.Navigation.queuesBtn} fs={24} shadow={false} options={true}/>
            
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