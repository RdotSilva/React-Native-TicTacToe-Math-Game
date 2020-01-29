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
  const [gameOver, setGameOver] = useState(false);

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

  // Generate a random math questions.
  const getRandomMathQuestion = () => {
    let randomQuestion =
      mathQuestions[Math.floor(Math.random() * mathQuestions.length)];

    setCurrentQuestion(randomQuestion);
  };

  // Render the question Text component.
  const renderQuestion = question => {
    let randomQuestion = question;
    return (
      <Text
        style={[
          styles.questionText,
          currentPlayer === 1 ? { color: "#DE1A1A" } : { color: "#35CE8D" }
        ]}
      >
        {randomQuestion.question}
      </Text>
    );
  };

  // Get the answers from the answer key and shuffle before rendering.
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
  const checkAnswer = (question, answer) => {
    let correctAnswer = question.correctAnswer;

    if (correctAnswer === answer) {
      setPlayerTurnAllowed(true);
    } else {
      setPlayerTurnAllowed(false);
      setCurrentPlayer(currentPlayer === 1 ? -1 : 1);
      getRandomMathQuestion();
    }
  };

  const initializeGame = () => {
    setGameState([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
    setGameOver(false);
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
      checkForGameOver();

      // Handles the alert for player win.
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

  // Check values inside of gameState array to see if the game is over (end in tie)
  const checkForGameOver = () => {
    let arr = gameState;
    let numberOfPlays = 0;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        // If you find any zeros that means game is NOT over
        if (arr[i][j] !== 0) {
          numberOfPlays++;
        }
      }
    }

    if (numberOfPlays === 9) {
      setGameOver(true);
      initializeGame();
    }
  };

  const renderCorrectText = () => {
    if (playerTurnAllowed) {
      if (currentPlayer === 1) {
        return "X correct!";
      } else {
        return "O correct!";
      }
    } else if (currentPlayer === 1) {
      return "Player X";
    } else if (currentPlayer === -1) {
      return "Player O";
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
      <View
        style={[
          styles.playerDisplayContainer,
          playerTurnAllowed
            ? { backgroundColor: "#9EE37D" }
            : { backgroundColor: "#E29DA0" }
        ]}
      >
        <Text style={styles.playerTextDisplay}>{renderCorrectText()}</Text>
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
    backgroundColor: "#C8D5E1",
    justifyContent: "space-evenly"
  },
  tile: {
    borderWidth: 3,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 18,
    borderColor: "#555760"
  },
  tileContainer: {
    flexDirection: "row",

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
    color: "#DE1A1A",
    fontSize: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  oShape: {
    color: "#35CE8D",
    fontSize: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  questionContainer: {
    alignSelf: "center"
  },
  questionText: {
    fontSize: 100
  },
  answerContainer: {
    fontSize: 60,
    backgroundColor: "#8B8C8A",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10
  },
  answerText: {
    fontSize: 60,
    width: 200,
    textAlign: "center",
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#F8EB8C",
    overflow: "hidden"
  },
  playerDisplayContainer: {
    backgroundColor: "#E29DA0",
    alignSelf: "center",
    borderWidth: 0.5,
    borderRadius: 25
  },
  playerTextDisplay: {
    fontSize: 60,
    color: "#06070B",
    margin: 10
  }
});
