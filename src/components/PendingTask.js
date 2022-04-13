import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { userStore } from "../store";

const COLORS = { primary: "#1f145c", white: "#fff" };
export default function PendingTask({ todos }) {
  const [state, actions] = userStore();

  const ListItem = ({ todo }) => {
    if (todo.completed === false) {
      return (
        <View style={styles.listItem}>
          {todo.completed === true ? (
            <TouchableOpacity onPress={() => actions.markTodoComplete(todo.id)}>
              <View style={[styles.actionIcon, { backgroundColor: "green" }]}>
                <Icon name="done" size={20} color="white" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => actions.markTodoComplete(todo.id)}>
              <View
                style={[
                  styles.actionIcon,
                  {
                    borderWidth: 1,
                    borderColor: "grey",
                    backgroundColor: "white",
                  },
                ]}
              ></View>
            </TouchableOpacity>
          )}

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: COLORS.primary,
                marginLeft: 10,
                marginTop: 3,
                textDecorationLine: todo?.completed ? "line-through" : "none",
              }}
            >
              {todo?.task}
            </Text>
          </View>

          <TouchableOpacity onPress={() => actions.deleteTodo(todo.id)}>
            <View style={styles.actionIcon}>
              <Icon name="delete" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 10 }}
      data={todos}
      renderItem={({ item }) => <ListItem todo={item} />}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginLeft: 5,
    borderRadius: 3,
  },
});
