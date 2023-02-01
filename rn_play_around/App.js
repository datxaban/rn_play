import {StyleSheet, Text, View, TextInput, ScrollView, Button, FlatList } from 'react-native';
import { useState } from 'react';
import GoalInput from "./components/GoalInput";
import GoalItem from './components/GoalItem';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [goalList, setGoalList] = useState([]);

  function startAddGoalHandler(){
      setModalIsVisible(true)
  }

  function addGoalHandler(goalText){
    setGoalList((previousGoal) => [...previousGoal,{text:goalText,id:Math.random().toString()}]);
    endAddGoalHandler();
  }


  function deleteGoalHandler(id) {
    setGoalList((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }
  
  function endAddGoalHandler() {
    setModalIsVisible((a)=>!a);
  }

  return (
    <>
    <StatusBar style="dark"/>
    <View style={styles.appContainer}> 
      <Button 
        title='Add New Goal' 
        color="#5e0ac"
        onPress={startAddGoalHandler}
      />
      {modalIsVisible && <GoalInput
        onAddGoal={addGoalHandler}
        onDisplay={modalIsVisible}
        onCancel={endAddGoalHandler}
      />}
      <View style={styles.goalsContainer}>
        <FlatList 
          data = {goalList}
          renderItem = {(itemData) => {
            return(
            <GoalItem 
              text={itemData.item.text}
              id={itemData.item.id}
              onDeleteItem = {deleteGoalHandler} 
            />);
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false} />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8
  },
  goalsContainer: {
    flex: 5
  },
  goalItem:{
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
    color: "white",
  },
  goalText:{
    color: "white",
  },
});
