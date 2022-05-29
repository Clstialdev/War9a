import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    color?: string,
    shadow?: boolean,
    onPress?: ()=>void,
}

export const BackButton:React.FC<Props> = ({color="green", shadow, onPress}) => {

    const navigation = useNavigation();
    return(
        <TouchableOpacity style={styles.container} onPress={()=> onPress ? onPress() : navigation.goBack()}>
            {/* <View style={styles.btn}></View> */}
            <Icon name="arrow-back" size={30} color={color} style={ shadow ? styles.shadow : {}}/>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    container: {
        marginTop: 2
    },
    btn:{
        height: 15,
        width: 15,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderRadius: 2,
        borderColor: "green",
        padding: 8,
        transform: [{rotateZ: '-45deg'}],
    },
    shadow: {
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: {width: 0, height: 1},
        elevation: 22,
        borderRadius: 20,
    }
})