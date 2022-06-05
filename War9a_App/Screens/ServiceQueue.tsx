import React , {Dispatch, useContext, useEffect, useState} from 'react';
import { Image, StyleSheet, View, ScrollView, Route, Text, TouchableOpacity } from 'react-native';
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import axios from "axios";

import { UIButton } from '../components/Buttons/UIButton';
import { ScreenHeading } from '../components/UIComponents/ScreenHeading';
import { SwitchButton } from '../components/Buttons/SwitchButton';
import { DetailCard } from '../components/Service/DetailCard';
import { QueueEmpty } from "../components/Service/QueueEmpty";
import { QueueTicket } from '../components/Service/QueueTicket';
import { LanguageContext } from '../components/Languages';
import { LaneTypes } from '../components/Service/LaneTypes'



interface Props {
    navigation: NavigationType,
    route: Route
  }

export const ServiceQueue:React.FC<Props> = ({navigation, route}) => {

    const [queue, setQueue] = useState<any>();
    const [docData, setDocData] = useState<any>(undefined);
    const [currentQueue, setCurrentQueue] = useState(0);
    const [laneTypes, setLaneTypes] = useState<any>([]);
    const [inQueue, setInQueue] = useState(false);
    const [presentIn, setPresentIn] = useState<any>(undefined);
    
    

    const getQueue = async() => { //gets the queue details from the database

        const unsub = onSnapshot(doc(route.params.db, "services2", route.params.serviceId), (doc) => {
            
            setQueue(doc.data()?.queued[currentQueue].data);
            setLaneTypes(doc.data()?.laneTypes)
            
            setDocData(doc.data());
            // console.log(doc.data())

        });

    }

    useEffect(()=>{
        if(!queue){
            getQueue();
        }
    },[queue]);

    useEffect(()=>{ //we check for whether the user is already queued in any of the kiosks a service might offer
            let found = -1;
            if(docData && docData.queued ){
                docData.queued.map((set:any, setIndex:number)=>set.data.map((obj:any, i:number)=> obj.uid === route.params.userUid ? found=setIndex : console.log("not found in queue")))

                if(found>=0){
                    setInQueue(true);
                    setPresentIn(found);
                }
                else{
                    setInQueue(false);
                }
                
                
            }
    },[docData]);

    const [showQueue, setShowQueue] = useState(true);
    const expoPushToken = route.params.expoPushToken !== "noToken" ? route.params.expoPushToken : "noToken #" + route.params.userUid;

    const enterQueue = async() => {
        const serviceDataRef = doc(route.params.db, "services2", route.params.serviceId); //fetch service Data
        const userDataRef = doc(route.params.db, "users2", route.params.userUid); //fetch user data

            let tempTypeQueues = docData.queued; //get queue
            tempTypeQueues[currentQueue].data.push({uid:route.params.userUid,name:route.params.userName,pushToken:expoPushToken});
             
            await updateDoc(serviceDataRef, { queued: tempTypeQueues }); //request to update the queue
            await updateDoc(userDataRef, { queues: arrayUnion(route.params.serviceId) }); //request to update the user data
            setInQueue(true); //this runs only if the queue update request is accepted
        //we inform the business owner that the client has joined the queue.
        axios.post('https://exp.host/--/api/v2/push/send', {
            to: route.params.serviceData.expoPushToken,
            title: "War9a: " + route.params.serviceData.name,
            body: "Someone Joined your queue"
          })
          .then(function (response:any) { console.log(response); })
          .catch(function (error:any) { console.log(error);});
    };

    const leaveQueue = async() => {
        const serviceDataRef = doc(route.params.db, "services2", route.params.serviceId);
        const userDataRef = doc(route.params.db, "users2", route.params.userUid);

        
            let tempQueued = docData.queued;

            console.log(presentIn)

            if(inQueue && presentIn!==undefined){
                tempQueued[presentIn].data = tempQueued[presentIn].data.filter(function(f:any) { return f.uid !== route.params.userUid });
                setPresentIn(undefined);
            }
            else{
                tempQueued[currentQueue].data = tempQueued[currentQueue].data.filter(function(f:any) { return f.uid !== route.params.userUid });
            }



            await updateDoc(serviceDataRef, {
                queued: tempQueued,
            });
    
            await updateDoc(userDataRef, {
                queues: arrayRemove(route.params.serviceId)
            });

            setInQueue(false);
            // setQueue(docData.queued[currentQueue]);
        

    };

    const handleLaneTypeChange = (index:number) => {
        setQueue(docData.queued[index].data);
        setCurrentQueue(index);
    }

    const {language} = useContext(LanguageContext);

    return(
        <View style={[{flex:1, justifyContent: 'flex-start', position: 'relative', alignItems: 'center', paddingTop: 50,}]}>
            <ScreenHeading text={route.params.serviceData.name} mt={15} fs={24} shadow={false} options={true}/>

            <SwitchButton option1={language.serviceQueue.queueTab} option2={language.serviceQueue.detailsTab} state={showQueue} onPress={setShowQueue} mt={20}/>

            {laneTypes.length !== 0 ? <LaneTypes serviceData={route.params.serviceData} handleLaneTypeChange={handleLaneTypeChange}/> : <View/>}

            {showQueue?
                
                    !docData || docData.queued[currentQueue].data.length === 0 ?
                        <QueueEmpty />
                    :
                    <ScrollView style={{display: 'flex', maxHeight: '75%', marginTop: 20,}}>
                        {docData ? docData.queued[currentQueue].data.map((object:any, i:number) => 
                                <QueueTicket key={object.uid} index={i+1} userName={object.name}/>
                            ) : <View/>}
                    </ScrollView>
                
            :
            <ScrollView style={{flex: 1, paddingTop: 20}} showsVerticalScrollIndicator={false}>
                <DetailCard icon="calendar-outline" text={`${language.serviceDetails.joinedTitle} ${route.params.createdOn}`} description="Tuesday - Friday, 4:00PM - 9:00PM"/>
                <TouchableOpacity onPress={()=>navigation.navigate("Map", {latlng:route.params.serviceData.latlng})}>
                    <DetailCard icon="location-sharp" text={language.serviceDetails.locationTitle} description={route.params.serviceData.address} />
                </TouchableOpacity>
                <DetailCard icon="person" text={language.serviceDetails.queueTitle} description={`There are ${queue.length} people in queue.`}/>
                <DetailCard icon="time" text={language.serviceDetails.waitingTitle} description={`${Math.round(route.params.serviceData.tpc/60000)} Minutes`}/>
                <DetailCard icon="star" text={language.serviceDetails.ratingTitle} description={`${route.params.serviceData.rating} Avg.`}/>
                <DetailCard icon="bookmark" text={language.serviceDetails.favoritedTitle} description={`Favorited by ${route.params.serviceData.likes} Users.`}/>
                <DetailCard icon="pin" text={language.serviceDetails.visitedTitle} description='Visited by 629 Users.'/>
            </ScrollView>
            
            }

              
            
            
            
            {
                inQueue ? 
                <UIButton text={language.serviceQueue.leaveBtn} pos='absolute' b={10} color="darkred" mb={60} sz="xxl" press={()=>{leaveQueue()}}/>
                :
                <UIButton text={language.serviceQueue.enterBtn} pos='absolute' b={10} mb={60} sz="xxl" press={()=>{enterQueue()}}/>
            }

        </View>
    );
}