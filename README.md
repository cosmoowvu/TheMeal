# The Meal - React Native Recipe App

A mobile app that uses React Native to allow users to search for recipes, can save favorite recipes, and select main ingredients from list to search for recipes.


## Features

- **Search by Name** : Find recipes by texing the name of meal.
- **Filter by Main Ingredient**: Select one main ingredient from list to fine matching recipes.
- **Favorites**: Save favorite recipes it will be saved to Favorites screen. On Favorites screen can be removed by swipe.
- **Recipe Detail**: View ingredients and how to cooking.
- **Tab Navigation**: Simple UI using bottom tab navigation

## Technologies used

- React Native + Expo
- React Navigation (Stack + Tabs)
- Axios
- AsyncStorage
- TheMealDB API

## API reference

[TheMealBD] (https://www.themealdb.com/) - free open recipe API

## Installation

bash
- cd the meal -app
- npm install -g expo-cli
- npm install @react-native-async-storage/async-storage \
@react-navigation/bottom-tabs \
@react-navigation/native \
@react-navigation/stack \
axios \
expo-status-bar \
react-native-paper
- npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
- expo install react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated 

## Dependencies

"@react-native-async-storage/async-storage": "^2.1.1",
"@react-navigation/bottom-tabs": "^7.2.0",
"@react-navigation/native": "^7.0.14",
"@react-navigation/stack": "^7.1.1",
"axios": "^1.7.9",
"expo": "~52.0.32",
"react-native-paper": "^5.14.5",


## How to run the app

1. Install Node.js and npm
2. Install Expo CLI
3. Start the app (npm run android)
4. Open Android emulator (Android studio)

## How to use the app

1. Open the app and explore the bottom tab menu.
2. Home tab:
	- Show all meals
	- Tap on a meal to see recipe details (ingredients & instructions)
	- Tap the Heart icon (❤️) to save it to your favorites
3. Ingredient tab:
	- Choose one main ingredient (e.g., egg, beef, etc.)
	- Tap Submit to see meals that use that ingredient
	- Tap a meal to view full details
4. Favorites tab:
	- View your favorited meals
	- Swipe left on a recipe card to remove it from favorites


## Credit

https://www.themealdb.com/

## Contact
Email : panthita.dpl@gmail.com