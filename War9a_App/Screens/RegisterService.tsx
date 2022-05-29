import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableHighlight, TextInput, Platform, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker'

import { UIButton } from "../components/Buttons/UIButton";
import { BackButton } from "../components/Buttons/BackButton"
import { Timestamp } from 'firebase/firestore';
import { RoundTag } from '../components/Buttons/RoundTag';
import { Map } from './Map';

interface Props {
    userUid: string,
    addService: (registration:serviceRegistration) => void;
}

export const RegisterService:React.FC<Props> = ({userUid, addService}) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [latlng, setLatlng] = useState<latlng>({latitude: 48.85319687656681, longitude: 2.41})
    const [city, setCity] = useState("");
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [image, setImage] = useState(null);
    const [seats, setSeats] = useState<number | string>("");
    const [lanes, setLanes] = useState<number | string>("");
    const [laneTypes, setLaneTypes] = useState<Array<string>>([]);
    const [laneAmounts,setLaneAmounts] = useState<Array<number | string>>([""]);
    const [tags, setTags] = useState("");
    const [queued, setQueued] = useState<Array<any>>([{data:[]}]);
    

    const [doctorTag, setDoctorTag] = useState(false);
    const [barberTag, setBarberTag] = useState(false);
    const [foodTag, setFoodTag] = useState(false);
    const [otherTag, setOtherTag] = useState(false);

    const handleRoundTagPress = (tag:tags) => {
        setDoctorTag(tag==="doctor" ? true : false);
        setBarberTag(tag==="barber" ? true : false);
        setFoodTag(tag==="food" ? true : false);
        setOtherTag(tag==="other" ? true : false);
        setTags(tag);
    }


    const handleLaneTypes = (value:string, index:number) => {
        let tempLaneTypes = [...laneTypes];
        tempLaneTypes[index] = value;
        setLaneTypes(tempLaneTypes)
    }

    const handleLaneAmount = (value:number, index:number) => {
        let tempLaneAmounts:Array<number | string> = [...laneAmounts];
        tempLaneAmounts[index] = value;
        setLaneAmounts(tempLaneAmounts)
        let lanes = 0;
        tempLaneAmounts.map((val:any)=>lanes=lanes+val)
        console.log(lanes);
        setLanes(lanes);
    }

    useEffect(()=>{
        if(laneTypes!==[]){
            if(tags==="other" || tags==="doctor"){
                let queuedTemplate:Array<any> = [];
                
                laneTypes.map(()=>{
                    queuedTemplate.push({data:[]})
                })
    
                setQueued(queuedTemplate);
            }
        }
    },[laneTypes])

    const [uploaded, setUploaded] = useState(false);
    const [fileName, setFileName] = useState("");
    const [downloadURL, setDownloadURL] = useState<string | null>(null);
    
    const [uploading, setUploading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage((result as any).uri);
      let fileNameArray = (result as any).uri.split("/");
      setFileName(fileNameArray[fileNameArray.length  - 1])
    }
  };

  const uploadImage = async() => {

      const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
              resolve(xhr.response);
          };
          xhr.onerror = function(){
              reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', (image as any), true);
          xhr.send(null);
      });

        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, (blob as any));

        let UploadResult = "notSet";
        
        uploadTask.on('state_changed', 
        (snapshot) => {
            setUploading(true);
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                setUploading(true);
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            console.log(error);
        }, 
        () => {
            setUploading(false);
            setUploaded(true);
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            setDownloadURL(downloadURL);
            (blob as any).close();
            });
        }
        );
  }

  
  const addToDatabase = () =>{
    if(name.trim() !== "" && address.trim() !== "" && city.trim() !== "" && description.trim() !== "" 
    && image && downloadURL){
        let nameAsArray:Array<string> = [];
        const nameAsCharacters:Array<string> = [...name.toLowerCase()];
        
        let x = 0;
        for(let i=0; i<nameAsCharacters.length; i++){
            if(i>0){
                if(nameAsCharacters[i] !== " "){
                    nameAsArray.push(nameAsArray[x-1] + nameAsCharacters[i]);
                    
                }
                else{
                    i++;
                    console.log(nameAsCharacters[i])
                    nameAsArray.push(nameAsCharacters[i]);
                }
            }
            else{
                nameAsArray.push(nameAsCharacters[i]);
            }
            x++;
        }

        nameAsArray.push(name.toLowerCase());

        let registration:serviceRegistration = {
            name: name,
            nameAsArray: nameAsArray,
            address: address,
            latlng: latlng,
            city: city,
            description: description,
            image: downloadURL,
            owner: userUid,
            phone: phoneNumber,
            created: Timestamp.now(),
            queued: queued,
            seats: +seats,
            lanes: +lanes,
            laneTypes: laneTypes,
            openCloseDates: openDate + "-" + closeDate,
            tags: [tags],
            likes: 0,
            rating: 3,
            tpc: 0
        }
        addService(registration);
        setSubmitted(true);
        console.log(downloadURL);
    }
    else{
        alert("Error: Must fill all fields!")
    }
}

const handleSubmit = () =>{
    if(name.trim() !== "" && address.trim() !== "" && city.trim() !== "" && description.trim() !== "" 
    && image && tags.trim() !== "" && seats.toString().trim() !== "" && lanes.toString().trim() !== "" && openDate !== null && closeDate !== null){
        handleNextBtn(description);
        uploadImage();
    }
    else{
        alert("Error: Must fill all fields!")
    }
}

//Submitting using the useEffect

useEffect(()=>{
    if(downloadURL){
        console.log(downloadURL);
        addToDatabase();
    }
},[downloadURL])

const navigation = useNavigation();

// Here we code the Visual changes

const [registerStep, setRegisterStep] = useState(1);

const handleBackBtn = () => {
    if(registerStep === 1){
        navigation.goBack();
    }
    else{
        setRegisterStep(registerStep - 1);
    }
}

const handleNextBtn = (value:string) => {
    if(value && value.trim() !== ""){
        setRegisterStep(registerStep + 1);
    }
    else{
        alert("Must Fill All Fields!");
    }
}

    const [open, setOpen] = useState(false);
    const [openDate, setOpenDate] = useState<any>(null);
    const [items, setItems] = useState([
        {label: 'Friday', value: 'Friday'},
        {label: 'Saturday', value: 'Saturday'},
        {label: 'Sunday', value: 'Sunday'},
        {label: 'Monday', value: 'Monday'},
        {label: 'Tuesday', value: 'Tuesday'},
        {label: 'Wednesday', value: 'Wednesday'},
        {label: 'Thursday', value: 'Thursday'}
    ]);
    
    const [open2, setOpen2] = useState(false);
    const [closeDate, setCloseDate] = useState<any>(null);

    
    return(
        <View style={styles.container}>

            {registerStep !==3 ? <View style={{alignSelf: "flex-start", marginLeft: "10%", marginTop: "20%"}}>
                <BackButton onPress={handleBackBtn} color="rgba(120,30,213,1)" />
            </View>
            :
            <></>
        }

            <View style={{...styles.formContainer, height: registerStep===3 ? "100%" : "auto"}}>
                    {registerStep === 1 ?
                        <View style={styles.formContainer}>
                            <Text style={styles.actionTitle}>Set The Service's Image</Text>
                            <Text style={styles.actionDescription}>This what people first judge your service by, so choose carefully!</Text>
                            { image ? !uploading ? <Image source={{uri: image}} style={styles.imagePreview}/>: <ActivityIndicator size="large" color="black" /> : <View  style={styles.imagePreview}/>}
                            { !image ? <UIButton text="   Select Image   " sz="lg" mt={10} press={pickImage} color="black"/> : <UIButton text="Next" sz="lg" mt={10} press={()=>handleNextBtn(image)} color="rgba(120,30,213,1)"/>}
                        </View>
                    :
                        registerStep === 2 ?
                        <View style={styles.formContainer}>
                            <Text style={styles.actionTitle}>Set The Service's Name</Text>
                            <Text style={styles.actionDescription}>This will appear as the name of the service!</Text>
                            <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={(val)=>setName(val)}/>
                            <UIButton text="Next" sz="lg" mt={10} press={()=>handleNextBtn(name)} color="rgba(120,30,213,1)"/>
                        </View>
                        :
                            registerStep === 3 ?
                            // <View style={styles.formContainer}>
                            //     <Text style={styles.actionTitle}>Set The Service's Address</Text>
                            //     <Text style={styles.actionDescription}>This must be the exact physical location of your service.</Text>
                            //     <TextInput placeholder="Address" style={styles.input} selectTextOnFocus={true} value={address} onChangeText={(val)=>setAddress(val)}/>
                            //     <UIButton text="Next" sz="lg" mt={10} press={()=>handleNextBtn(address)} color="rgba(120,30,213,1)"/>
                            // </View>
                            <Map registrationAddress={address} setRegistrationAddress={setAddress} setRegistrationCity={setCity} setLatlng={setLatlng} onSetServiceLocation={()=>handleNextBtn(address)}/>
                            :
                                // registerStep === 4 ?
                                // <View style={styles.formContainer}>
                                //     <Text style={styles.actionTitle}>Set The Service's City</Text>
                                //     <Text style={styles.actionDescription}>This must be the city your service operates in.</Text>
                                //     <TextInput placeholder="City" style={styles.input} value={city} onChangeText={(val)=>setCity(val)}/>
                                //     <UIButton text="Next" sz="lg" mt={10} press={()=>handleNextBtn(city)} color="rgba(120,30,213,1)"/>
                                // </View>
                                // :
                                    registerStep === 4 ?
                                    <View style={styles.formContainer}>
                                        <Text style={styles.actionTitle}>Set The Service's Description</Text>
                                        <Text style={styles.actionDescription}>A detailed description of the service and what it provides, users will judge your service based on it's image and description, the more detailed the better!</Text>
                                        <TextInput multiline placeholder="Description" style={styles.input} value={description} onChangeText={(val)=>setDescription(val)}/>
                                        <UIButton text="Next" sz="lg" fontWeight={600} mt={10} press={()=>handleNextBtn(description)} color="rgba(120,30,213,1)"/>
                                    </View>
                                    :
                                        registerStep === 5 ?
                                        <View style={styles.formContainer}>
                                            <Text style={styles.actionTitle}>Set The Service's Tags</Text>
                                            <Text style={styles.actionDescription}>The category your service should appear in</Text>
                                            <ScrollView horizontal={true} style={{paddingLeft: '5%', marginTop: '2%', paddingTop: 15, paddingBottom: 15}}>
                                                <RoundTag name="Doctor" icon="medical" active={doctorTag} color="#F0635A" onPress={()=>handleRoundTagPress("doctor")}/>
                                                <RoundTag name="Barber" icon="md-cut-sharp" active={barberTag} color="#F59762" onPress={()=>handleRoundTagPress("barber")}/>
                                                <RoundTag name="Food" icon="fast-food" active={foodTag} color="#29D697" onPress={()=>handleRoundTagPress("food")}/>
                                                <RoundTag name="Other" icon="md-heart-half-sharp" active={otherTag} color="black" onPress={()=>handleRoundTagPress("other")}/>
                                            </ScrollView>
                                            <UIButton text="Next" sz="lg" fontWeight={600} mt={10} press={()=>handleNextBtn(tags)} color="rgba(80,20,213,1)"/>
                                        </View>
                                        :
                                            registerStep === 6 ?
                                            <View style={styles.formContainer}>
                                                <Text style={styles.actionTitle}>Set The Service's Seats</Text>
                                                <Text style={styles.actionDescription}>The number of seats in the Waiting room</Text>
                                                <TextInput placeholder="Number of Waiting Seats" style={styles.input} keyboardType="numeric" value={seats.toString()} onChangeText={(val)=>setSeats(+val)}/>
                                                <UIButton text="Next" sz="lg" fontWeight={600} mt={10} press={()=>handleNextBtn(seats.toString())} color="rgba(80,20,213,1)"/>
                                            </View>
                                                :
                                                registerStep === 7 ?
                                                <View style={styles.formContainer}>
                                                    <Text style={styles.actionTitle}>Set The Service's Lanes</Text>
                                                    <Text style={styles.actionDescription}>The number of people you can serve at once. "ex: the number of clients getting their haircuts at the same time"</Text>
                                                    { tags !== "barber" && tags !== "food" ?
                                                        laneTypes.length === 0 ?
                                                            <ScrollView>
                                                                <View style={styles.doubleInputContainer}>
                                                                    <TextInput placeholder="Type of the lane" style={styles.typeOfLanesInput} value={laneTypes[0]} onChangeText={(val)=>handleLaneTypes(val, 0)}/>
                                                                    <TextInput placeholder="Amount" style={styles.numberOfLanesInput} keyboardType="numeric" value={laneAmounts[0].toString()} onChangeText={(val)=>handleLaneAmount(+val, 0)}/>
                                                                </View>
                                                                <Text style={styles.plusBtn} onPress={()=>{setLaneTypes([...laneTypes, ""]); setLaneAmounts([...laneAmounts, 1])}}>+</Text>
                                                            </ScrollView>
                                                            :
                                                            <ScrollView>
                                                                {laneTypes.map((v:string, index:number)=>
                                                                    <View style={styles.doubleInputContainer} key={index}>
                                                                        <TextInput placeholder="Type of the lane" style={styles.typeOfLanesInput} autoFocus={true} value={laneTypes[index]} onChangeText={(val)=>handleLaneTypes(val, index)}/>
                                                                        <TextInput placeholder="Amount" style={styles.numberOfLanesInput} keyboardType="numeric" value={laneAmounts[index].toString()} onChangeText={(val)=>handleLaneAmount(+val, index)}/>
                                                                    </View>
                                                                )}
                                                                <Text style={styles.plusBtn} onPress={()=>{setLaneTypes([...laneTypes, ""]); setLaneAmounts([...laneAmounts, 1])}}>+</Text>
                                                            </ScrollView>
                                                        :
                                                        <TextInput placeholder="Number of Queue Lines/Lanes" style={styles.input} keyboardType="numeric" value={lanes.toString()} onChangeText={(val)=>setLanes(+val)}/>
                                                    }
                                                    <UIButton text="Next" sz="lg" fontWeight={600} mt={10} press={()=>handleNextBtn(lanes.toString())} color="rgba(80,20,213,1)"/>
                                                </View>
                                                    :
                                                    registerStep === 8 ?
                                                    <View style={styles.formContainer}>
                                                        <Text style={styles.actionTitle}>Set The Service's Phone Number</Text>
                                                        <Text style={styles.actionDescription}>Preferably a dedicated customer support phone number</Text>
                                                        <TextInput placeholder="Phone Number" style={styles.input} keyboardType="numeric" value={phoneNumber.toString()} onChangeText={(val)=>setPhoneNumber(val)}/>
                                                        <UIButton text="Next" sz="lg" fontWeight={600} mt={10} press={()=>handleNextBtn(phoneNumber.toString())} color="rgba(80,20,213,1)"/>
                                                    </View>
                                                        :
                                                        registerStep === 9 ?
                                                        <View style={styles.formContainer}>
                                                            <Text style={styles.actionTitle}>Set The Service's Open And Close Dates</Text>
                                                            <Text style={styles.actionDescription}>A detailed description of the service and what it provides, users will judge your service based on it's image and description, the more detailed the better!</Text>
                                                            <View style={{width: '90%',}}>
                                                                <DropDownPicker
                                                                    open={open}
                                                                    value={openDate}
                                                                    items={items}
                                                                    setOpen={setOpen}
                                                                    setValue={setOpenDate}
                                                                    setItems={setItems}
                                                                    placeholder="Select the Opening Day"
                                                                    style={{marginBottom: 10}}
                                                                    maxHeight={300}
                                                                />
                                                                <DropDownPicker
                                                                    open={open2}
                                                                    value={closeDate}
                                                                    items={items}
                                                                    setOpen={setOpen2}
                                                                    setValue={setCloseDate}
                                                                    setItems={setItems}
                                                                    placeholder="Select the Closing Day"
                                                                    zIndex={1000}
                                                                    maxHeight={300}
                                                                />
                                                            </View>
                                                            {!open && !open2 ?
                                                                <UIButton text="Finish" sz="lg" fontWeight={600} mt={10} press={handleSubmit} color="rgba(80,20,213,1)"/>
                                                            :
                                                            <View></View>
                                                            }
                                                        </View>
                                                        :
                                                            uploading ?
                                                            <View style={styles.centeredContainer}>
                                                                <ActivityIndicator size="large" color="black" />
                                                            </View>
                                                            :
                                                                submitted ?
                                                                <View style={styles.centeredContainer}>
                                                                    <Text>Submitted Successfully!</Text>
                                                                    <UIButton text="Go Back" sz="lg" mt={10} press={()=>navigation.navigate("Welcome")}/>
                                                                </View>
                                                                :
                                                                <View style={styles.centeredContainer}>
                                                                    <Text>Uploading!</Text>
                                                                    <UIButton text="Go Back" sz="lg" mt={10} press={()=>navigation.navigate("Welcome")}/>
                                                                </View>
                                            
                }
            </View>
            

        </View>
    );
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    formContainer:{
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        marginTop: "10%",
    },
    centeredContainer:{
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: "50%",
        // marginTop: "auto",
        // marginBottom: "auto",
        
    },
    input:{
        width: "75%",
        fontSize: 14,
        textAlign: 'center',
        borderColor: "black",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 7,
        margin: 5,
        padding: 12,
    },
    imagePreview:{
        width: "90%",
        height: 200,
        backgroundColor: "gray",
        borderRadius: 5
    },
    actionTitle:{
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: "rgba(0,0,0,0.7)",
        marginBottom: 10,
    },
    actionDescription:{
        fontSize: 13,
        fontFamily: 'Inter_600SemiBold',
        color: "rgba(0,0,0,0.5)",
        marginBottom: 20,
        textAlign: 'center',
        width: "85%",
        
    },
    doubleInputContainer:{
        display: 'flex',
        flexDirection: 'row',
        maxWidth: "90%"
    },
    typeOfLanesInput:{
        width: "75%",
        fontSize: 14,
        textAlign: 'center',
        borderColor: "black",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 7,
        margin: 5,
        padding: 12,
    },
    numberOfLanesInput:{
        width: "30%",
        fontSize: 14,
        textAlign: 'center',
        borderColor: "black",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 7,
        margin: 5,
        padding: 12,
    },
    plusBtn:{
        fontSize:30,
        textAlign:"center",
        padding: 10,
        backgroundColor: "rgba(80,20,213,1)",
        width: 60,
        height: 60,
        maxWidth: 60,
        maxHeight: 60,
        borderRadius: 30,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop:10,
        marginBottom: 20
    }
})