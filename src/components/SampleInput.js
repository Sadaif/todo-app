import React from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function SampleInput({ title, placeholder }) {
  return (
    <TouchableOpacity onPress={() => Alert.alert("I am sample field :)")}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        editable={false}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="grey"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    padding: 15,
    borderRadius: 5,
    borderColor: "grey",
    backgroundColor: "#f2f2f2",
  },
});
