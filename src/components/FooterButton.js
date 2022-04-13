import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function FooterButton({ title, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    width: "90%",
    backgroundColor: "#29a329",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    // letterSpacing: 0.25,
    color: "white",
  },
});
