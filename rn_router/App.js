import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import CategoriesScreen from './screens/CategoriesScreen';
import MealDetailScreen from './screens/MealDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='light'/>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            title:"All Categories",
            headerStyle:{backgroundColor:"brown"},
            headerTintColor:'white',
            contentStyle: {backgroundColor:"#3f2f25"}
          }}
        >
          <Stack.Screen
            name = "MealScategories"
            component={CategoriesScreen}
            options={{
              title:"All Categories",
              headerStyle:{backgroundColor:"brown"},
              headerTintColor:'white',
              contentStyle: {backgroundColor:"#3f2f25"}
            }}
          />
          <Stack.Screen
            name = "MealOverview"
            component={MealsOverviewScreen}
            // options={({route, navigation})=>{
            //   const catId = route.params.categoryId;
            //   return {
            //     title: catId,
            //   };
            // }}
          />
          <Stack.Screen
            name="MealDetail"
            component={MealDetailScreen}
            // options={
            //   {
            //     headerRight: ()=>{
            //       return <Button title='tap me'/>
            //     }
            //   }
            // }
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
