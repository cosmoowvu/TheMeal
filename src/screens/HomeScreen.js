import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from "axios";
import SearchBox from "../components/SearchBox";
import RecipeCard from "../components/RecipeCard";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
    const [search,setSearch] = useState("");
    const [recipes,setRecipes] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState(new Set());

    const fetchRecipe = async () => {
        try {
            const reponse = await axios.get(
                "https://www.themealdb.com/api/json/v1/1/search.php?s=");
            setRecipes(reponse.data.meals);
        } catch(error) {console.error("Error fetching", error);

             }
    };

    const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      const favs = stored ? JSON.parse(stored) : [];
      setFavoriteIds(new Set(favs.map(f => f.idMeal)));
    } catch (err) {
      console.error("Error loading favorites", err);
    }
  };

  useEffect(() => {
    fetchRecipe();
    loadFavorites();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

    return (
    <View>
    
    <Text>{search}</Text>
    <SearchBox
        placeholder="Search Recipe by Name"
        value={search}
        onChangeText={(value) => setSearch(value)}
    />
    
    <FlatList
        data={recipes.filter((recipe) =>
            recipe.strMeal.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
            <RecipeCard recipe={item}
            isFavorite={favoriteIds.has(item.idMeal)}
            onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
            />
        )}
    />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    recipeContainer: {
        marginHorizontal: 10,
        flexDirection:"row",
        alignItems:"center",
    },
    text: {
        fontSize:26,
        margin: 10,
    },
    input: {
        borderWidth: 1,
        backgroundColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        marginBottom: 10,
    },
    image:{
        width: 100,
        height: 100,
        marginRight:10,
    }
});

export default HomeScreen;