import { StatusBar } from "expo-status-bar";
import { FlatList, View, StyleSheet } from "react-native";
import {CATEGORIES} from "../data/dummy-data";
import CategoryGridTitle from "../components/CategoryGridTitle";





function CategoriesScreen({navigation}){

    function renderCategoryItem(itemData) {
        function pressHandler() {
            navigation.navigate('MealOverview',{
                categoryId: itemData.item.id,
            });
        }

        return (
            <CategoryGridTitle
                title={itemData.item.title}
                color={itemData.item.color}
                onPress={pressHandler}
            />
        );
    }

    return <FlatList 
        data={CATEGORIES} 
        keyExtractor={(item)=>item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
    />
}

export default CategoriesScreen;

