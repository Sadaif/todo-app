import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  Alert,
  Pressable,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FooterButton from "../components/FooterButton";
import { userStore } from "../store";
import SampleInput from "../components/SampleInput";

export default function AddTask({ navigation }) {
  const [textInput, setTextInput] = React.useState("");

  const [state, actions] = userStore();

  React.useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveTodoToUserDevice(state.todos);
  }, [state.todos]);

  const addTodo = () => {
    if (textInput == "") {
      Alert.alert("Error", "Please add something in title");
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      actions.addTodo(newTodo);
      navigation.push("Home");
      setTextInput("");
    }
  };

  const saveTodoToUserDevice = async (todos) => {
    try {
      const stringifyTodos = JSON.stringify(todos);

      await AsyncStorage.setItem("todos", stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      if (todos != null) {
        actions.getTodo(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const TimeInput = ({ title, placeholder }) => {
    return (
      <TouchableOpacity
        onPress={() => Alert.alert("I am sample field :)")}
        style={{ flexDirection: "column" }}
      >
        <Text
          style={{
            fontSize: 15,
            marginBottom: 10,
            marginTop: 10,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
        <TextInput
          editable={false}
          placeholder={placeholder}
          style={styles.timeInput}
          placeholderTextColor="grey"
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={20}
            color="black"
            style={{ marginTop: 2 }}
          />
        </Pressable>

        <Text
          style={{
            fontSize: 20,
            marginLeft: 15,
          }}
        >
          Add Task
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Title
        </Text>
        <TextInput
          value={textInput}
          placeholder="Design team meeting"
          style={styles.input}
          onChangeText={(text) => setTextInput(text)}
          placeholderTextColor="grey"
        />

        <SampleInput title="Deadline" placeholder="2021-02-28" />

        <View
          style={{
            flexDirection: "row",
            // width: "auto",
            justifyContent: "space-between",
          }}
        >
          <TimeInput title="Start time" placeholder="11:00 Am" />
          <TimeInput title="End time" placeholder="14:00 Pm" />
        </View>

        <SampleInput title="Remind" placeholder="10 minutes early" />
        <SampleInput title="Repeat" placeholder="Weekly" />
      </View>

      <View style={styles.footer}>
        <FooterButton title={"Create a Task"} onPress={addTodo} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    bottom: Platform.OS === "ios" ? 0 : 15,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
    flex: 1,
    marginVertical: 20,
  },
  input: {
    padding: 15,
    borderRadius: 5,
    borderColor: "grey",
    backgroundColor: "#f2f2f2",
  },

  timeInput: {
    padding: 15,
    borderRadius: 5,
    borderColor: "grey",
    backgroundColor: "#f2f2f2",
    width: 150,
  },

  header: {
    marginTop: Platform.OS === "ios" ? 0 : 20,
    padding: 20,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#d9d9d9",
  },
});
