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

export default function AllTasks({ refresh }: { refresh: boolean }) {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    loadTasks();
  }, [refresh]);

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

  async function taskDone({ doneTask }: { doneTask: string }) {
    try {
      const stored = await AsyncStorage.getItem("done");
      let doneList = stored ? JSON.parse(stored) : [];

      if (!doneList.includes(doneTask)) {
        doneList.push(doneTask);
        await AsyncStorage.setItem("done", JSON.stringify(doneList));
        removeTask(doneTask);
      }
    } catch (err) {
      console.error("Something went wrong");
    }
  }

  return (
    <View style={styles.container}>
      {tasks.length > 0 ? (
        <>
          <Text style={styles.title}>Todays tasks</Text>
          <FlatList
            scrollEnabled={false}
            data={tasks}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>{item}</Text>

                {/* Mark task as done */}
                <TouchableOpacity
                  style={styles.deleteTask}
                  onPress={() => taskDone({ doneTask: item })}
                >
                  <FontAwesome name={"check"} color={"green"} size={20} />
                </TouchableOpacity>

                {/* Delete task */}
                <TouchableOpacity
                  style={styles.deleteTask}
                  onPress={() => removeTask(item)}
                >
                  <FontAwesome name={"close"} color={"darkred"} size={20} />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : (
        <Text style={{ textAlign: "center", fontWeight: 600, fontSize: 16 }}>
          No tasks to do
        </Text>
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
    textAlign: "center",
  },
  taskItem: {
    backgroundColor: "#d0e7ff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    width: 200,
    justifyContent: "space-between",
  },
  taskText: {
    flex: 3,
    flexWrap: "wrap",
  },
  deleteTask: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
