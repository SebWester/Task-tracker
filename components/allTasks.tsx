import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

// Get and display all tasks

export default function AllTasks() {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    loadTasks();
  }, [tasks]);

  async function loadTasks() {
    try {
      const stored = await AsyncStorage.getItem("todos");
      if (stored) setTasks(JSON.parse(stored));
    } catch (err) {
      console.error("Could not get tasks", err);
    }
  }

  async function removeTask(taskToRemove: string) {
    try {
      const updatedTasks = tasks.filter((task) => task !== taskToRemove);
      await AsyncStorage.setItem("todos", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      console.log("Task deleted");
    } catch (err) {
      console.error("Could not delete task", err);
    }
  }

  return (
    <View style={styles.container}>
      {tasks.length > 0 ? (
        <>
          {" "}
          <Text style={styles.title}>Display tasks</Text>
          <FlatList
            data={tasks}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text>{item}</Text>
                <TouchableOpacity onPress={() => removeTask(item)}>
                  <FontAwesome name={"close"} color={"black"} size={20} />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : (
        <Text>No tasks to do</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskItem: {
    backgroundColor: "#eee",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    width: 200,
    justifyContent: "space-between",
  },
});
