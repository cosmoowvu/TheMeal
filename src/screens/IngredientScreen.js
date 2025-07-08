import react,{ useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import axios from "axios";
import { Checkbox } from 'react-native-paper'

const INGREDIENT_LIST = [
    "chicken_breast", "egg", "onion", "tomato", "milk", "cheese", "beef", "potato", "carrot", "garlic"
];

const IngredientsScreen = ({ navigation }) => {
    const [selected, setSelected] = useState(null);

    const toggleIngredient = (item) => {
        if (selected === item) {
            setSelected(null);
        } else {
            setSelected(item);
        }
    };

    const fetchRecipe = async () => {
        if (!selected) {
            Alert.alert("Please select main ingredients.")
            return;
        }

        try {
            const res = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selected}`
            );
            const meals = res.data.meals || [];

                navigation.navigate("MenuResult", {
                meals,
                ingredient: selected,
            });

            } catch (err) {
                console.error("Fetch error:", err);
                Alert.alert("Error loading recipes.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select your main ingredient.</Text>

            <FlatList
                data={INGREDIENT_LIST}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => toggleIngredient(item)}>
                    <Image
                        source={{ uri: `https://www.themealdb.com/images/ingredients/${item}-small.png` }}
                        style={styles.image}
                    />
                    <Text style={styles.text}>{item.replace("_", " ")}</Text>
                    <Checkbox status={selected === item ? "checked" : "unchecked"} />
                </TouchableOpacity> )}
            />

            <TouchableOpacity style={styles.button} onPress={fetchRecipe}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    text:{
        fontSize: 25,
        margin: 10,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
    },
    button: {
        backgroundColor: "#02a44e",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
});

export default IngredientsScreen ;