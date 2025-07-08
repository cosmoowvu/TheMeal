import React from "react";
import { View, Text, StyleSheet, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SearchBox = ({ placeholder, value, onChangeText }) => {
    return(
        <View style={styles.container}>
            <FontAwesome name="search" size={24} color="black" />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:"white",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 45,
        shadowOffset:{ width: 0, height: 2},
        shadowColor:"#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation:3,
    },
    input:{
        color:"#333",
        flex:1,
        fontSize: 18,
    },
    icon: {
        marginRight: 8,
    },
});

export default SearchBox;