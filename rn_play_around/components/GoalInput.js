import {StyleSheet, Text, View, TextInput, Image, ScrollView, Button, FlatList, Modal } from 'react-native';
import { useState } from 'react';

function GoalInput(props){
    const [goalText, setGoalText] = useState('');

    const goalInputHandler = (goal) => {
        setGoalText(goal);
      }
    
    function addGoalHandler(){
        props.onAddGoal(goalText);
        setGoalText('');
    }

    return(
        <Modal visible={props.onDisplay} animationType="fade">
            <View style={styles.inputContainer}>
                <Image  style={styles.image} source={require('../assets/images/goal.png')}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="Input"
                    onChangeText={goalInputHandler}
                    value={goalText}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button 
                            title='Add Goal' 
                            onPress={addGoalHandler}
                            color="white"
                            disabled={!goalText}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button title='Cancel' onPress={props.onCancel}/>
                    </View>
                    
                </View>
            </View>
            
        </Modal>
    )
}

export default GoalInput;

const styles = StyleSheet.create({
    image:{
        width: 100,
        height: 100,
        margin: 20,
        
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
      backgroundColor: "pink"
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#e4d0ff',
      backgroundColor: "#e4d0ff",
      width: '70%',
      marginRight: 8,
      padding: 16,
      width: "100%",
      borderRadius: 10
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
    buttonContainer:{
        flexDirection:"row",
        marginTop: 16
    },
    button:{
        width: "40%",
        marginHorizontal: 8
    }
  });