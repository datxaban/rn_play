import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, Alert, FlatList} from 'react-native';
import Title from '../components/ui/Title';
import { useEffect, useState } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import {Ionicons} from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

// function generateRandom(min,max, exclude){
//   const rand = Math.floor(Math.random()*(max-min)) + min;

//   if (rand === exclude){
//     return generateRandom(min, max, exclude);
//   } else{
//     return rand;
//   }
// }

function generateRandom(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandom(min, max, exclude);
  } else {
    return rndNum;
  }
}

let min = 1;
  let max = 99;

export default function GameScreen({userNum,onGameOver}) {

  const initialGuess = generateRandom(1,99,userNum);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(()=>{
    if (currentGuess === userNum){
      onGameOver(guessRounds.length);
    }
  },[currentGuess,userNum, onGameOver])

  useEffect(()=>{
    min = 1;
    max = 99;
  },[])

  function nextGuessHandler(direction) {
    if((direction=="lower" && currentGuess<userNum) 
      || 
      (direction=="higher" && currentGuess>userNum))
    {
      Alert.alert("Dont play wrong boy!!")
      return;    
    }

    if(direction === "lower"){
      max = currentGuess - 1;
      if (max === userNum) onGameOver(guessRounds.length);  
    }
    else{
      min = currentGuess + 1
      if (min === userNum) onGameOver(guessRounds.length);  
    }
    if(max-min<=1){
      onGameOver(guessRounds.length);
      return;
    }
    const newNum = generateRandom(min,max,userNum);
    setCurrentGuess(newNum);
    setGuessRounds((previous)=>[newNum,...previous])
    return;
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent Guess</Title>
      <NumberContainer>
        {currentGuess}
      </NumberContainer>
      <View>
        <Text>
          Higher or lower
        </Text>
        <View>
          <PrimaryButton
            onPress={nextGuessHandler.bind(this,"higher")}
          ><Ionicons
            name="md-add"
          ></Ionicons>
          </PrimaryButton>
          <PrimaryButton
            onPress={nextGuessHandler.bind(this,"lower")}
          >
            <Ionicons
              name="md-remove"
            />
          </PrimaryButton>
        </View>
          
      </View>
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRounds.length - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,

  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer:{
    flex: 1,
    padding: 16,
  }
});
