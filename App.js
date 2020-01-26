import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

import shuffle from "./utils/shuffle";

// Quiz questions imported from separate file to keep things clean.
import questions from "./utils/questions";

export default function App() {
  const [gameState, setGameState] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [mathQuestions, setMathQuestions] = useState(questions);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const getRandomMathQuestion = () => {
    let randomQuestion =
      mathQuestions[Math.floor(Math.random() * mathQuestions.length)];

    setCurrentQuestion(randomQuestion);
  };

  const renderQuestion = question => {
    let randomQuestion = question;
    return <Text style={styles.questionText}>{randomQuestion.question}</Text>;
  };

  const getAnswersToQuestion = question => {
    let currentQuestion = question;
    let keyArray = Object.keys(currentQuestion.answers);
    let shuffledArray = shuffle(keyArray);

    return shuffledArray.map((keyName, i) => (
      <Text
        onPress={() =>
          checkAnswer(currentQuestion, currentQuestion.answers[keyName])
        }
        style={styles.answerText}
      >
        {currentQuestion.answers[keyName]}
      </Text>
    ));
  };

  // Check for the correct answer. Takes the current question and answer and compares them both.
  // TODO: This will eventually set a flag to allow the player to pick a tile or to go onto the next player.
  const checkAnswer = (question, answer) => {
    let correctAnswer = question.correctAnswer;

    if (correctAnswer === answer) {
      console.log("CORRECT");
    } else {
      console.log("NOT CORRECT");
    }
  };

  const initializeGame = () => {
    setGameState([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
  };

  const renderGameIcon = (row, column) => {
    let value = gameState[row][column];

    switch (value) {
      case 1:
        return <Icon style={styles.xShape} name="close"></Icon>;
      case -1:
        return <Icon style={styles.oShape} name="circle-outline"></Icon>;
      default:
        return <View></View>;
    }
  };

  // Init game when component mounts
  useEffect(() => {
    initializeGame(), getRandomMathQuestion();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        {currentQuestion === null ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          renderQuestion(currentQuestion)
        )}
      </View>
      <View>
        <View style={styles.tileContainer}>
          <TouchableOpacity style={[styles.tile, styles.topLeftTile]}>
            {renderGameIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, styles.topMidTile]}>
            {renderGameIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, styles.topRightTile]}>
            {renderGameIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.tileContainer}>
          <TouchableOpacity style={[styles.tile, styles.midLeftTile]}>
            {renderGameIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, styles.midMidTile]}>
            {renderGameIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, styles.midRightTile]}>
            {renderGameIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.tileContainer}>
          <TouchableOpacity style={[styles.tile, styles.bottomLeftTile]}>
            {renderGameIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, styles.bottomMidTile]}>
            {renderGameIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, styles.bottomRightTile]}>
            {renderGameIcon(2, 2)}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.answerContainer}>
        <View style={styles.singleAnswerContainer}>
          {currentQuestion === null ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            getAnswersToQuestion(currentQuestion)
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    backgroundColor: "powderblue",
    justifyContent: "space-around"
  },
  tile: {
    borderWidth: 1,
    width: 100,
    height: 100,
    backgroundColor: "skyblue"
  },
  tileContainer: {
    flexDirection: "row",
    backgroundColor: "purple",
    justifyContent: "center"
  },
  topLeftTile: {
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  topMidTile: {
    borderTopWidth: 0
  },
  topRightTile: {
    borderTopWidth: 0,
    borderRightWidth: 0
  },
  midLeftTile: {
    borderLeftWidth: 0
  },
  midMidTile: {},
  midRightTile: {
    borderRightWidth: 0
  },
  bottomLeftTile: {
    borderBottomWidth: 0,
    borderLeftWidth: 0
  },
  bottomMidTile: {
    borderBottomWidth: 0
  },
  bottomRightTile: {
    borderBottomWidth: 0,
    borderRightWidth: 0
  },
  xShape: {
    color: "red",
    fontSize: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  oShape: {
    color: "green",
    fontSize: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  questionContainer: {
    backgroundColor: "beige",
    alignSelf: "center"
  },
  questionText: {
    fontSize: 60
  },
  answerContainer: {
    fontSize: 60,
    backgroundColor: "tan",
    alignSelf: "center",
    borderColor: "purple",
    borderWidth: 1
  },
  answerText: {
    fontSize: 60,
    width: 200,
    textAlign: "center",
    borderWidth: 1,
    margin: 5
  }
});
