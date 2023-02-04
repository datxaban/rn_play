import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ImageBackground, SafeAreaView } from 'react-native';
import {LinearGradient} from "expo-linear-gradient"
import StartGameScreen from './screens/StartGameScreen';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import {useFonts} from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {

  const [userNumber,setUserNumber] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans':require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold':require("./assets/fonts/OpenSans-Bold.ttf"),
  })

  if (!fontsLoaded){
    return <AppLoading/>;
  }


  function pickedNumberHandler(num){
    setUserNumber(num);
    setGameOver(false);
  }

  const gameOverHandler = (round) =>{
    setGameOver(true);
    setGuessRounds(round)
  }

  function startNewGameHandler(){
    setUserNumber(null);
    setGuessRounds(0);
  }


  let screen = 
  <StartGameScreen
    onPickNumber={pickedNumberHandler}
  />

  if(userNumber){
    screen = <GameScreen
    userNum={userNumber}
    onGameOver={gameOverHandler}
    />
  }

  if (gameOver && userNumber){
    screen = <GameOverScreen
      roundsNumber={guessRounds}
      onStartNewGame={startNewGameHandler}
    />
  }

  return (
    <LinearGradient 
      colors={[Colors.primary700, Colors.accent500]} 
      style={styles.rootScreen}
    >
      <ImageBackground 
        source={require('./assets/images/background.png')} 
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  }
  
});
