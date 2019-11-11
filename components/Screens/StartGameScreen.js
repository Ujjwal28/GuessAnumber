import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import Colors from "../../static/colors";
import Input from "../Input";
import Card from "../Card";
import NumberContainer from "../NumberContainer";

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [number, setNumber] = useState("");

  const inputHandler = input => {
    setEnteredValue(input.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmHandler = () => {
    const num = parseInt(enteredValue);
    if (isNaN(num) || num <= 0 || num > 99) {
      Alert.alert("Invalid Number!", "Choose a Number between 1 to 99.", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler }
      ]);
      return;
    }
    setConfirmed(true);
    setNumber(num);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confrimOutput;

  if (confirmed) {
    confrimOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected:</Text>
        <NumberContainer>{number}</NumberContainer>
        <Button
          title="START GAME"
          color={Colors.primary}
          onPress={() => props.onStartGame(number)}
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={inputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Reset"
              onPress={resetInputHandler}
              color={Colors.accent}
            />
            <Button
              title="Confirm"
              onPress={confirmHandler}
              color={Colors.primary}
            />
          </View>
        </Card>

        {confrimOutput}
        <Image
          style={styles.image}
          source={require("../../static/images/game-controller.png")}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingHorizontal: 15
  },
  input: {
    width: "15%",
    textAlign: "center"
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  image: {
    width: 220,
    height: 220
  }
});

export default StartGameScreen;
