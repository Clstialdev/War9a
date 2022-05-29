import React , {Dispatch,  useState} from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';

interface LaneTypesProps {
    serviceData: any,
    handleLaneTypeChange: Dispatch<any>,
    color?: string
}

export const LaneTypes:React.FC<LaneTypesProps> = ({serviceData, handleLaneTypeChange, color="green"}) =>{

    const Types = serviceData.laneTypes ? serviceData.laneTypes : [];
    const [typeState, setTypeState] = useState<Array<boolean>>([]);
    Types.map((typeName:string, index:number)=>{
        typeState.push(index === 0 ? true : false);
    })

    const handleTypePress = (i:number) =>{
        let tempStates:Array<boolean> = [];
        typeState.map((value:boolean, index:number)=>{
            index === i ? tempStates[index] = true : tempStates[index] = false; 
        })
        setTypeState(tempStates);
        handleLaneTypeChange(i);
        
    }

    if(Types.length > 0){
        return(
            
            <ScrollView horizontal={true} style={LaneTypeStyles.container}>
                { Types.map((typeName:string, i:number)=>
                <TouchableOpacity onPress={()=>handleTypePress(i)} key={i}>
                    <View style={!typeState[i] ? LaneTypeStyles.buttonInactive : {...LaneTypeStyles.buttonInactive, ...LaneTypeStyles.buttonActive, backgroundColor: color, borderColor:color}}>
                        <Text style={!typeState[i] ? LaneTypeStyles.text : {...LaneTypeStyles.text, color:"white"}}>{typeName}</Text>
                    </View>
                </TouchableOpacity>
            )
                }
            </ScrollView>
        )
    }
    else{
        return(
            <View></View>
        )
    }
    
}

const laneTypeBtnSize = 50;

const LaneTypeStyles = StyleSheet.create({
    container: {
        display: 'flex',
        margin: 'auto',
        maxHeight: laneTypeBtnSize,
        marginTop: 10,
    },
    buttonInactive:{
        height: laneTypeBtnSize,
        // width: laneTypeBtnSize,
        // backgroundColor: 'white',
        borderWidth: 1,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginLeft: 5,
        marginRight: 5,
        opacity: 0.5
    },
    buttonActive:{
        opacity: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    text:{
        fontWeight: "bold",
        color: "gray",
    }
})