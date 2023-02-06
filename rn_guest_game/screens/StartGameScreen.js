import { StatusBar } from 'expo-status-bar';
import { 
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text, View, TextInput, Alert, useWindowDimensions , Dimensions } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useState } from 'react';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

export default function StartGameScreen({onPickNumber}) {

  const [number,setNumber] = useState('');
  // const deviceHeight = Dimensions.get('window').height;
   const {width,height} = useWindowDimensions();

  function handlerChangeNumber(num) {
    setNumber(num);
  }

  const confirmInput = () =>{
    const chosenNum = parseInt(number);

    if (isNaN(chosenNum) || chosenNum <= 0){
      Alert.alert("Invalid input","Only input from 0 to 99",
      [{text:"Okay",style:"destructive",onPress:() => setNumber('')}]);
      return
    }

    onPickNumber(chosenNum);
    return;
  }

  const resetInput = () =>{
    console.log("Test");
  }

  const marginTopDistance = height < 380? 30: 100;

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, {marginTop:marginTopDistance}]}>
          <Title>Guess My Number</Title>
          <View style={styles.inputContainer}>
            <Text style={styles.instructionText}>Enter a number</Text>
            <TextInput 
              style={styles.numberInput} 
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize='none'
              autoCorrect={false}
              value={number}
              onChangeText={handlerChangeNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  onPress={resetInput}
                >Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  onPress={confirmInput}
                >Confirm</PrimaryButton>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1
  },
  rootContainer:{
    flex: 1,
    // marginTop: marginTop < 380 ? 30 : 100,
    alignItems:"center"
  },
  inputContainer: {
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: '#3b021f',
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    justifyContent:"center",
    alignItems:"center",
  },
  instructionText:{
    color: Colors.accent500,
    fontSize: 24
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: '#ddb52f',
    borderBottomWidth: 2,
    color: '#ddb52f',
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonsContainer:{
    flexDirection: 'row',
  },
  buttonContainer:{
    flex: 1,
  }
});
