import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './src/screens/HomeScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen'
import FavoritesScreen from './src/screens/FavoritesScreen';
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IngredientsScreen from './src/screens/IngredientScreen';
import MenuResultScreen from './src/screens/MenuResultScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#02a44e"},
      headerTintColor: "#fff",
      headerTitleAlign: "center",
      headerTitleStyle: { fontSize:24, fontWeight: "bold"},
    }}
  >
    <Stack.Screen
        name = "The Meal"
        component={HomeScreen}
        />
    <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
      /> 
  </Stack.Navigator>
  );
};

const IngredientStack = () => {
  return (
  <Stack.Navigator
    initialRouteName="MainIngredients"
    screenOptions={{
      headerStyle: { backgroundColor: "#02a44e"},
      headerTintColor: "#fff",
      headerTitleAlign: "center",
      headerTitleStyle: { fontSize:24, fontWeight: "bold"},
    }}
  >
    <Stack.Screen
        name="MainIngredients"
        component={IngredientsScreen}
        options={{ title: "Main Ingredients" }}
      />

    <Stack.Screen
        name="MenuResult"
        component={MenuResultScreen}
        options={{ title: "Menu" }}
      />

  </Stack.Navigator>
  );
};

const FavStack = () => {
  return (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#02a44e"},
      headerTintColor: "#fff",
      headerTitleAlign: "center",
      headerTitleStyle: { fontSize:24, fontWeight: "bold"},
    }}
  >
    <Stack.Screen
        name="Favorites Recipes"
        component={FavoritesScreen}
      />
      
  </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "restaurant-menu";
          else if (route.name === "Favorites") iconName = "favorite";
          else if (route.name === "Ingredients") iconName = "kitchen";
          return <MaterialIcons name={iconName} size={size} color={color} />
        },
        
      })}>

      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />

      <Tab.Screen
      name="Ingredients"
      component={IngredientStack}
      options={{ headerShown: false }}
      />
      
      <Tab.Screen
      name="Favorites"
      component={FavStack}
      options={{ headerShown: false }}
      />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
