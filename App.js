import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default function App() {
  const [gameState, setGameState] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(1);

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
    initializeGame();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>1 + 1 = ?</Text>
      </View>
      <View>
        <View style={styles.tileContainer}>
          <View style={[styles.tile, styles.topLeftTile]}>
            {renderGameIcon(0, 0)}
          </View>
          <View style={[styles.tile, styles.topMidTile]}>
            {renderGameIcon(0, 1)}
          </View>
          <View style={[styles.tile, styles.topRightTile]}>
            {renderGameIcon(0, 2)}
          </View>
        </View>
        <View style={styles.tileContainer}>
          <View style={[styles.tile, styles.midLeftTile]}>
            {renderGameIcon(1, 0)}
          </View>
          <View style={[styles.tile, styles.midMidTile]}>
            {renderGameIcon(1, 1)}
          </View>
          <View style={[styles.tile, styles.midRightTile]}>
            {renderGameIcon(1, 2)}
          </View>
        </View>
        <View style={styles.tileContainer}>
          <View style={[styles.tile, styles.bottomLeftTile]}>
            {renderGameIcon(2, 0)}
          </View>
          <View style={[styles.tile, styles.bottomMidTile]}>
            {renderGameIcon(2, 1)}
          </View>
          <View style={[styles.tile, styles.bottomRightTile]}>
            {renderGameIcon(2, 2)}
          </View>
        </View>
      </View>
      <View>
        <TextInput style={styles.answer}>Answer?</TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  tile: {
    borderWidth: 1,
    width: 100,
    height: 100
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
  }
});
