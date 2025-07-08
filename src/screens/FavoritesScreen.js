import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Animated, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RecipeCard from "../components/RecipeCard";
import { useFocusEffect } from "@react-navigation/native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

const FavoritesScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      loadFavorites();
    }, []);

    useFocusEffect(
      React.useCallback(() => {
      loadFavorites();
      }, [])
    );
  
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        const favoriteRecipes = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavorites(favoriteRecipes);
      } catch (error) {
        console.error("Error loading favorites", error);
      }
    };

    const removeFromFavorites = async (idMeal) => {
      try {
        const updated = favorites.filter((f) => f.idMeal !== idMeal);
        setFavorites(updated);
        await AsyncStorage.setItem("favorites", JSON.stringify(updated));
      } catch (err) {
        console.error("Remove error", err);
      }
    };

    const renderFavoriteItem = ({ item }) => {
      const translateX = new Animated.Value(0);
      const showDeleteBg = new Animated.Value(0);

      const handleGesture = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: false }
      );

      const handleEnd = ({ nativeEvent }) => {
        if (nativeEvent.translationX < -SCREEN_WIDTH * 0.35) {
          Animated.timing(translateX, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }).start(() => removeFromFavorites(item.idMeal));
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      };

      const backgroundOpacity = translateX.interpolate({
        inputRange: [-SCREEN_WIDTH, 0],
        outputRange: [1, 0],
        extrapolate: "clamp",
      });
  
    return (
      <View style={styles.swipeWrapper}>
        <Animated.View style={[styles.deleteBackground, { opacity: backgroundOpacity }]}>
          <MaterialIcons name="delete" size={28} color="white" />
        </Animated.View>

        <PanGestureHandler
          onGestureEvent={handleGesture}
          onEnded={handleEnd}
        >
          <Animated.View style={[styles.animatedCard, { transform: [{ translateX }] }]}>
            <RecipeCard
              recipe={item}
              isFavorite={true}
              onPress={() =>
                navigation.navigate("Home", {
                  screen: "RecipeDetail",
                  params: { recipe: item },
                })
              }
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite recipes yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderFavoriteItem}
        />
      )}
    </View>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#777",
    marginTop: 20,
  },
  swipeWrapper: {
    position: "relative",
    marginVertical: 6,
  },
  animatedCard: {
    zIndex: 1,
  },
  deleteBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff3b30",
    borderRadius: 12,
    zIndex: 0,
  },
});

export default FavoritesScreen;