import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

export default function AddToDo({ onAdd }: { onAdd: () => void }) {
  const [task, setTask] = useState("");

  async function addTask() {
    if (!task.trim()) return;

    try {
      const stored = await AsyncStorage.getItem("todos");
      const currentTasks = stored ? JSON.parse(stored) : [];

      const newTask = {
        text: task,
        date: new Date().toLocaleDateString(), // t.ex. "2025-06-15"
      };

      const updated = [...currentTasks, newTask];
      await AsyncStorage.setItem("todos", JSON.stringify(updated));

      setTask("");
      onAdd();
    } catch (err) {
      console.error("Could not save task", err);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        value={task}
        onChangeText={setTask}
        placeholder="Add task"
      />

      <TouchableOpacity style={styles.button} onPress={addTask}>
        <FontAwesome name={"plus"} color={"#01A4F5"} size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 6,
    backgroundColor: "#cccccc",
    color: "#1a1a1a",
  },
  textField: {
    textAlign: "center",
    width: 200,
  },
  button: {
    width: 50,
    height: 35,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 5,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    color: "white",
  },
});
