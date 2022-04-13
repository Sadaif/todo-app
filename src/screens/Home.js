import React, { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Platform,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userStore } from "../store";
import FooterButton from "../components/FooterButton";
import CompletedTask from "../components/CompletedTask";
import PendingTask from "../components/PendingTask";

export default function Home({ navigation }) {
  const [state, actions] = userStore();

  useEffect(() => {
    () => actions.getTodosFromUserDevice();
  }, []);

  useEffect(() => {
    () => actions.saveTodoToUserDevice(state.todos);
  }, [state.todos]);

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
        <Text
          style={{
            fontSize: 20,
          }}
        >
          To-Do App
        </Text>
        <View style={styles.icons}>
          <Icon name="search" size={25} color="grey" />
          <Icon name="notifications-none" size={25} color="grey" />
          <Icon name="menu" size={25} color="grey" />
        </View>
      </View>

      <Text
        style={{
          fontSize: 20,
          padding: 20,
        }}
      >
        Completed Tasks
      </Text>

      <CompletedTask todos={state.todos} />

      <Text
        style={{
          fontSize: 20,
          padding: 20,
        }}
      >
        Pending Tasks
      </Text>

      <PendingTask todos={state.todos} />

      <View style={styles.footer}>
        <FooterButton
          title="Add a task"
          onPress={() => navigation.push("AddTask")}
        />
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

  header: {
    marginTop: Platform.OS === "ios" ? 0 : 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#d9d9d9",
  },

  icons: {
    flexDirection: "row",
  },
});
