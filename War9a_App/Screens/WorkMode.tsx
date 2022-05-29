import { arrayRemove, arrayUnion, doc, Firestore, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, } from 'react-native';
import axios from "axios";

import { QueueEmpty } from '../components/Service/QueueEmpty';
import { QueueTicket } from '../components/Service/QueueTicket';
import { Shadow } from '../components/UIComponents/Shadow';
import { Header } from '../components/WorkMode/Header';
import { LaneTypes } from '../components/Service/LaneTypes';

interface WorkModeProps {
    db: Firestore,
    userUid: string,
    serviceOwned: string,
}

export const WorkMode:React.FC<WorkModeProps> = ({db, userUid, serviceOwned}) => {

    const [serviceName, setServiceName] = useState(serviceOwned);
    const [queue, setQueue] = useState<any>(undefined);
    const [tpc, setTpc] = useState(0);
    const [tpcHistory, setTpcHistory] = useState<Array<number>>([]);
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [currentClient, setCurrentClient] = useState("");
    const [seats, setSeats] = useState(0);
    const [lanes, setLanes] = useState(1);
    const [presentNotified, setPresentNotified] = useState<Array<string>>([]);
    const [tpcNotified, setTpcNotified] = useState<Array<string>>([]);
    const [serviceData, setServiceData] = useState<any>(undefined);
    const [laneTypesLength, setLaneTypesLength] = useState(0);
    const [currentQueue, setCurrentQueue] = useState(0);

    

    //TPC calculation + Notification Sending
    useEffect(()=>{
        if(queue !== undefined && queue.length > 0){
            // console.log(" cc: " + currentClient + " qc: " + queue[0].uid)
            // console.log(currentClient !== queue[0].uid)
            if(currentClient !== queue[0].uid){
                setCurrentClient(queue[0].uid);
                setCurrentTime(Date.now());
                console.log("time: " + Date.now() + " client: " + queue[0].uid);
                console.log("tpc: " + tpc)
            }

            if(queue !== undefined && queue.length > 0){
                let tempPresentNotified:Array<string> = presentNotified;
                //Notify the first bunch of people to be present to fill the waiting seats and work lanes
                for(let i=0; i<=queue.length && i<lanes+3; i++){
                    if(queue[i] !==undefined && queue[i].pushToken.split(" ")[0] !== "noToken" && !tempPresentNotified.includes(queue[i].pushToken)){
                        axios.post('https://exp.host/--/api/v2/push/send', {
                            to: queue[i].pushToken,
                            title: 'War9a',
                            body: "Your queue is closer, Be present at the service location now!"
                        })
                        .then(function (response:any) {
                            // console.log(response);
                            console.log(presentNotified.includes(queue[i].pushToken))
                            tempPresentNotified = [...tempPresentNotified, queue[i].pushToken]
                            setPresentNotified([...presentNotified, ...tempPresentNotified]);
                        })
                        .catch(function (error:any) {
                            // console.log(error);
                        });
                    }
                }

                //Notify the next bunch of people
                for(let i=lanes+3; i<=queue.length && i<lanes+8; i++){
                    if(queue[i] !==undefined && queue[i].pushToken && queue[i].pushToken.split(" ")[0] !== "noToken" && !tpcNotified.includes(queue[i].pushToken)){
                        let time = (i-1) * Math.round(tpc/60000);
                        let body = "Be present at the service location in " + time + "mins";
                        if(time > 90){
                           body = "Be present at the service location in " + (time/60).toFixed(1) + "hrs";
                        }

                        axios.post('https://exp.host/--/api/v2/push/send', {
                            to: queue[i].pushToken,
                            title: 'War9a',
                            body: body
                        })
                        .then(function (response:any) {
                            // console.log(response);
                            setTpcNotified([...tpcNotified, queue[i].pushToken]);
                        })
                        .catch(function (error:any) {
                            // console.log(error);
                        });
                    }
                }
            }

            
            


        }
        else{
            setCurrentClient("");
        }
    },[queue])


    useEffect(()=>{
        if(serviceData){
            setQueue(serviceData.queued[currentQueue].data)
        }
    },[serviceData])
    
    
    const getInitialData = async() => {
        

        const unsub = onSnapshot(doc(db, "services2", serviceOwned.toString().trim()), (doc) => {
        
                setLaneTypesLength(doc.data()?.laneTypes.length);
                // setQueue(doc.data()?.queued[currentQueue].data);
                setServiceName(doc.data()?.name);
                setTpc(doc.data()?.tpc);
                setTpcHistory([doc.data()?.tpc, ]);
                setSeats(doc.data()?.seats);
                setLanes(doc.data()?.lanes);
                setServiceData(doc.data());
        });
    }

    //to Add someone to queue V2 MULTIPLE LINES Only
    const v2PlusBtn = async() => {

        let clientNumber = queue.length + 1;
        // console.log(currentQueue)
        let exists = false;

        queue.map((obj:any)=>obj.uid === "Client #" + clientNumber ? exists=true : null)

        if(exists){
            for(let i=0; ;i++){
                exists=false;
                console.log(i);
                clientNumber = i;
                queue.map((obj:any)=>obj.uid === "Client #" + clientNumber ? exists=true : null)

                if(!exists){
                    break;
                }
            }
        }

        const serviceDataRef = doc(db, "services2", serviceOwned.toString());
        let tempTypeQueues = serviceData.queued;
            tempTypeQueues[currentQueue].data.push({uid:"Client #" + clientNumber,name:"Client #" + clientNumber,pushToken:"Client #" + clientNumber});

        await updateDoc(serviceDataRef, {
            queued: tempTypeQueues,
        });

        setQueue(serviceData.queued[currentQueue].data);
    }

     //To remove someone from queue (MULTI LINES ONLY)
     const v2MinusBtn = async() => {
    
        let currentTpc = Date.now() - currentTime;

        const tempTpcHistory = [...tpcHistory, currentTpc]

        setTpcHistory(tempTpcHistory);

        let sumOfTpcHistory = 0;
        tempTpcHistory.map((tpc)=> sumOfTpcHistory+=tpc);

        setTpc(sumOfTpcHistory/tempTpcHistory.length);

        console.log(currentTpc.toLocaleString());

        setCurrentTime(Date.now());


        //tell the person that they just got out of queue
        if(queue[0] !== undefined && queue[0].pushToken.split(" ")[0] !== "noToken"){
            // console.log(serviceData.queued[currentQueue].pushTokens[0])
            axios.post('https://exp.host/--/api/v2/push/send', {
                to: queue[0].pushToken,
                title: 'War9a',
                body: "Owner removed you from queue"
            })
            .then(function (response:any) {
                // console.log(response);
            })
            .catch(function (error:any) {
                // console.log(error);
            });
        }

        

        const serviceDataRef = doc(db, "services2", serviceOwned.toString());

        let tempQueued = serviceData.queued;
            
            // tempQueued[currentQueue].ids = tempQueued[currentQueue].ids.filter(function(f:string) { return f !== tempQueued[currentQueue].ids[0] });
            tempQueued[currentQueue].data = tempQueued[currentQueue].data.filter(function(f:any) { return f.uid !== tempQueued[currentQueue].data[0].uid });

        await updateDoc(serviceDataRef, {
            queued: tempQueued,
            tpc: sumOfTpcHistory/tempTpcHistory.length
        });
        
        if(queue[0].uid.split(" ")[0] !== "Client"){
            const userDataRef = doc(db, "users2", queue[0].uid);
            await updateDoc(userDataRef, {
                queues: arrayRemove(serviceOwned.toString())
            });
        }

        //tell the next person to come

        // console.log(serviceData.queued[currentQueue].pushTokens[lanes+2])
            
        if(queue[1] !== undefined && queue[1].pushToken && queue[1].pushToken.split(" ")[0] !== "noToken"){
            setPresentNotified([...presentNotified, queue[1].pushToken]);
            axios.post('https://exp.host/--/api/v2/push/send', {
                to: queue[1].pushToken,
                title: 'War9a',
                body: "You're Next! Be Ready! 🏄"
            })
            .then(function (response:any) {
                // console.log(response);
            })
            .catch(function (error:any) {
                // console.log(error);
            });
        }


        setQueue(serviceData.queued[currentQueue].data);
    }

    const addToQueue = () =>{
        Alert.alert('Add to Queue?', 'Do you want to add to queue?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'Yes', onPress: () => v2PlusBtn() },
          ]);  
    }

    const removeFromQueue = () =>{
        Alert.alert('Remove From Queue?', 'Do you want to remove from queue?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'Yes', onPress: () => v2MinusBtn() },
          ]);     
    }

    useEffect(()=>{
        getInitialData();
        console.log("refresh")
    },[]);

    const handleLaneTypeChange = (index:number) => {
        setQueue(serviceData.queued[index].data);
        // setQueueNames(docData.queued[index].names);
        // setQueuePushTokens(docData.queued[index].pushTokens);
        setCurrentQueue(index);
    }

    return(
        <View>
            <Header serviceName={serviceName} queueLength={queue !== undefined ? queue.length : 0} addToQueue={addToQueue} removeFromQueue={removeFromQueue}/>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Currently In Queue</Text>
                <Text style={styles.tpcText}>Tpc: {Math.round(tpc/60000)} mins</Text>
            </View>

            <View style={{display: 'flex', alignItems: 'center'}}>
                {laneTypesLength !== 0 && serviceData!==undefined ? <LaneTypes serviceData={serviceData} handleLaneTypeChange={handleLaneTypeChange} color="#6767CD"/> : <View/>}
            </View>

            
            {
                !serviceData || serviceData &&  queue!==undefined && queue.length === 0 ?
                    <View style={{ marginTop:laneTypesLength !== 0 ? 0 : -35, minHeight: laneTypesLength !== 0 ? "55%" : "65%",}}>
                        <QueueEmpty workMode={true}/>
                    </View>
                :
                <ScrollView style={{display: 'flex', height: '55%', maxHeight: '55%', marginTop: 20,}}>
                    {queue !== undefined ? queue.map((obj:any, i:number) => 
                            <QueueTicket key={i} index={i+1} color="#6767CD" userName={obj.name}/>
                        ) : <View/>}
                </ScrollView>}

            <Shadow style={styles.bottomShadow} strength={5} color={"white"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: 10,
        marginBottom: 5,
        
    },
    title:{
        fontSize: 20,
    },
    tpcText:{
        fontWeight: "900",
        color: "#6767CD"
    },
    bottomShadow:{
        height: 70,
        width: "100%",
        position: 'absolute',
        bottom: -25,
    },
})