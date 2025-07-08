import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const RecipeCard = ({recipe, onPress, isFavorite}) => {

    return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: recipe.strMealThumb }} style={styles.image}/>
        <View style={styles.textContainer}>
            <Text style={styles.title}>
            {recipe.strMeal} 
            {isFavorite && <AntDesign name="heart" size={18} color="red" />}
            </Text>
            <View style={styles.footer}>
                <Text style={styles.category}>Category : {recipe.strCategory}</Text>
                
                <AntDesign name="arrowright" size={25} color="black"  />
                
            </View>
        </View>
    </TouchableOpacity>
    );  
};

const styles = StyleSheet.create({
    card:{
        flexDirection:"row",
        backgroundColor:"#fff",
        borderRadius:12,
        marginHorizontal:10,
        marginVertical:6,
        padding:10,
        shadowOffset:{ width: 0, height: 3},
        shadowColor:"#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation:5,
    },
    image:{
        width:80,
        height:80,
        borderRadius:10
    },
    textContainer:{
        flex: 1,
        paddingLeft: 12,
        justifyContent:"center",
    },
    title:{
        fontSize: 18,
        fontWeight:"bold",
        color:"#333",
        flexDirection: "row",
    },
    category:{
        fontSize:14,
        color:"#777",
        marginTop:4,
    },
    footer:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignContent:"center",
    },
})

export default RecipeCard;