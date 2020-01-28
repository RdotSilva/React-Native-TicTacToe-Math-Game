import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert
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
  const [playerTurnAllowed, setPlayerTurnAllowed] = useState(false);

  // Check board for a winner. Return 1 if Player 1 wins, -1 if Player 2 wins, 0 if tie.
  const checkForWinner = () => {
    const TILES_IN_ROW = 3;

    let sum;

    // Check rows.
    for (let i = 0; i < TILES_IN_ROW; i++) {
      sum = gameState[i][0] + gameState[i][1] + gameState[i][2];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }

    // Check columns.
    for (let i = 0; i < TILES_IN_ROW; i++) {
      sum = gameState[0][i] + gameState[1][i] + gameState[2][i];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }

    // Check diagonals
    sum = gameState[0][0] + gameState[1][1] + gameState[2][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    // Check diagonals
    sum = gameState[2][0] + gameState[1][1] + gameState[0][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    // No winners return a zero for tie.
    return 0;
  };

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
        key={i}
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
      setPlayerTurnAllowed(true);
      console.log(`Correct! ${currentPlayer}'s turn`);
    } else {
      setPlayerTurnAllowed(false);
      setCurrentPlayer(currentPlayer === 1 ? -1 : 1);
      getRandomMathQuestion();
      console.log(`Incorrect! ${currentPlayer}'s turn`);
    }
  };

  const initializeGame = () => {
    setGameState([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
  };

  // Render X or O icon based on 2d array.
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

  // Handles the logic when a user presses a tile
  const onTilePress = (row, column) => {
    if (playerTurnAllowed) {
      // Copy game array.
      let arr = gameState.slice();
      arr[row][column] = currentPlayer;
      setGameState(arr);
      setPlayerTurnAllowed(false);
      setCurrentPlayer(currentPlayer === 1 ? -1 : 1);
      getRandomMathQuestion();
      let winner = checkForWinner();

      if (winner === 1) {
        Alert.alert("Player 1 wins!");
        initializeGame();
      } else if (winner === -1) {
        Alert.alert("Player 2 wins!");
        initializeGame();
      }
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
          <TouchableOpacity
            onPress={() => onTilePress(0, 0)}
            style={[styles.tile, styles.topLeftTile]}
          >
            {renderGameIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onTilePress(0, 1)}
            style={[styles.tile, styles.topMidTile]}
          >
            {renderGameIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onTilePress(0, 2)}
            style={[styles.tile, styles.topRightTile]}
          >
            {renderGameIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.tileContainer}>
          <TouchableOpacity
            onPress={() => onTilePress(1, 0)}
            style={[styles.tile, styles.midLeftTile]}
          >
            {renderGameIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onTilePress(1, 1)}
            style={[styles.tile, styles.midMidTile]}
          >
            {renderGameIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onTilePress(1, 2)}
            style={[styles.tile, styles.midRightTile]}
          >
            {renderGameIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.tileContainer}>
          <TouchableOpacity
            onPress={() => onTilePress(2, 0)}
            style={[styles.tile, styles.bottomLeftTile]}
          >
            {renderGameIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onTilePress(2, 1)}
            style={[styles.tile, styles.bottomMidTile]}
          >
            {renderGameIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onTilePress(2, 2)}
            style={[styles.tile, styles.bottomRightTile]}
          >
            {renderGameIcon(2, 2)}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.playerDisplayContainer}>
        <Text style={styles.playerTextDisplay}>
          {currentPlayer === 1 ? "Player One" : "Player Two"}
        </Text>
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
    backgroundColor: "#7394B3",
    justifyContent: "space-evenly"
  },
  tile: {
    borderWidth: 3,
    width: 100,
    height: 100,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 18
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
  },
  playerDisplayContainer: {
    backgroundColor: "#E29DA0",
    alignSelf: "center",
    borderWidth: 0.5,
    borderRadius: 25
  },
  playerTextDisplay: {
    fontSize: 60
  }
});
