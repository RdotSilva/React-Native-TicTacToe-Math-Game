import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default function App() {
  const [gameState, setGameState] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.tileContainer}>
        <View style={[styles.tile, styles.topLeftTile]}>
          <Icon style={styles.xShape} name="close"></Icon>
        </View>
        <View style={[styles.tile, styles.topMidTile]}>
          <Icon style={styles.oShape} name="circle-outline"></Icon>
        </View>
        <View style={[styles.tile, styles.topRightTile]}></View>
      </View>
      <View style={styles.tileContainer}>
        <View style={[styles.tile, styles.midLeftTile]}></View>
        <View style={[styles.tile, styles.midMidTile]}></View>
        <View style={[styles.tile, styles.midRightTile]}></View>
      </View>
      <View style={styles.tileContainer}>
        <View style={[styles.tile, styles.bottomLeftTile]}></View>
        <View style={[styles.tile, styles.bottomMidTile]}></View>
        <View style={[styles.tile, styles.bottomRightTile]}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  tile: {
    borderWidth: 1,
    width: 100,
    height: 100
  },
  tileContainer: {
    flexDirection: "row"
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
  }
});
