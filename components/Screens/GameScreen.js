import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import NumberContainer from "../NumberContainer";
import Card from "../Card";
import Colors from "../../static/colors";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rnum = Math.floor(Math.random() * (max - min)) + min;
  if (rnum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rnum;
  }
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const guessHandler = guess => {
    if (
      (guess === "lower" && currentGuess < userChoice) ||
      (guess === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" }
      ]);
      return;
    }
    if (guess == "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds(currRounds => currRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponents's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button
          title="LOWER"
          color={Colors.accent}
          onPress={guessHandler.bind(this, "lower")}
        />
        <Button
          title="GREATER"
          color={Colors.primary}
          onPress={guessHandler.bind(this, "greater")}
        />
      </Card>
      <Image
        style={styles.image}
        source={require("../../static/images/game-controller.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  },
  image: {
    width: 220,
    height: 220
  }
});

export default GameScreen;
