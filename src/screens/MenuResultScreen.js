import React from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";

const MenuResultScreen = ({ route, navigation }) => {
  const { meals, ingredient } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Main ingredient : {ingredient.replace("_", " ")}
      </Text>

      {meals.length === 0 ? (
        <Text style={styles.noResult}>No related menu found.</Text>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              isFavorite={false}
              onPress={async () => {
                try {
                    const res = await axios.get(
                        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`
                    );
                    const fullMeal = res.data.meals?.[0];
                    if (fullMeal) {
                        navigation.navigate("Home", {
                            screen: 'RecipeDetail',
                            params: { recipe: fullMeal },
                        });
                    } else {
                        Alert.alert('Error','No recipe detail found.');
                    }
                } catch (error) {
                    console.error("Error fetching recipe detail:", error);
                    Alert.alert("Error","Failed to load recipe detail.");
                }
              }
              }
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noResult: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});

export default MenuResultScreen;
