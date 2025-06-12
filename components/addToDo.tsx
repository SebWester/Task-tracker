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

export default function AddToDo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  async function saveTasks(newTasks: string[]) {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(newTasks));
    } catch (err) {
      console.error("Could not save task", err);
    }
  }

  async function addTask() {
    if (!task.trim()) return;

    const updated = [...tasks, task];
    setTasks(updated);
    setTask("");
    await saveTasks(updated);
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
        {/* <View>
          <Text style={styles.text}>ADD TASK</Text>
        </View> */}

        <FontAwesome name={"plus"} color={"#01A4F5"} size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  textField: {
    borderWidth: 1,
    borderColor: "darkgray",
    textAlign: "center",
    width: 200,
  },
  button: {
    width: 50,
    height: 35,
    // backgroundColor: "#01A4F5",
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
