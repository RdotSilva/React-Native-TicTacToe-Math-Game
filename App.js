import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.tileContainer}>
        <View style={[styles.tile, styles.topLeftTile]}></View>
        <View style={[styles.tile, styles.topMidTile]}></View>
        <View style={[styles.tile, styles.topRightTile]}></View>
      </View>
      <View style={styles.tileContainer}>
        <View style={styles.tile}></View>
        <View style={styles.tile}></View>
        <View style={styles.tile}></View>
      </View>
      <View style={styles.tileContainer}>
        <View style={styles.tile}></View>
        <View style={styles.tile}></View>
        <View style={styles.tile}></View>
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
  }
});
