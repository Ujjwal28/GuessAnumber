import React from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import Colors from "../../static/colors";
import Card from "../Card";
import NumberContainer from "../NumberContainer";
// import GameOverIcon from "../../static/gameOverIcon";

const GameOver = props => {
  return (
    <Card style={styles.screen}>
      <Image
        style={styles.image}
        source={require("../../static/images/kd.png")}
      />
      <Text>Number of Rounds:{props.noOfRounds}</Text>
      <NumberContainer>Game Over!</NumberContainer>
      <Button
        title="New Game"
        color={Colors.primary}
        onPress={props.newGameHandler}
      />
      <Text>Number was: {props.userChoice}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40
  }
});

export default GameOver;
