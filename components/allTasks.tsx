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

type Task = {
  text: string;
  date: string;
};

export default function AllTasks({
  refresh,
  onComplete,
}: {
  refresh: boolean;
  onComplete: () => void;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    loadTasks();
  }, [refresh]);

  async function loadTasks() {
    try {
      const stored = await AsyncStorage.getItem("todos");
      if (stored) {
        const parsed: Task[] = JSON.parse(stored);
        setTasks(parsed);
      }
    } catch (err) {
      console.error("Could not get tasks", err);
    }
  }

  async function removeTask(taskToRemove: string) {
    try {
      const updatedTasks = tasks.filter((task) => task.text !== taskToRemove);
      await AsyncStorage.setItem("todos", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      console.log("Task deleted");
    } catch (err) {
      console.error("Could not delete task", err);
    }
  }

  async function deleteOldDoneTasks() {
    try {
      const stored = await AsyncStorage.getItem("doneDate");
      if (stored && stored !== currentDate) {
        await AsyncStorage.removeItem("done");
        await AsyncStorage.setItem("doneDate", currentDate);
      } else if (!stored) {
        await AsyncStorage.setItem("doneDate", currentDate);
      }
    } catch (err) {
      console.error("Could not delete old done tasks", err);
    }
  }

  useEffect(() => {
    deleteOldDoneTasks();
  }, [currentDate]);

  async function taskDone({ doneTask }: { doneTask: string }) {
    try {
      const stored = await AsyncStorage.getItem("done");
      let doneList = stored ? JSON.parse(stored) : [];

      if (!doneList.includes(doneTask)) {
        doneList.push(doneTask);
        await AsyncStorage.setItem("done", JSON.stringify(doneList));
        removeTask(doneTask);
        onComplete();
      }
    } catch (err) {
      console.error("Something went wrong");
    }
  }

  const todaysTasks = tasks.filter((task) => task.date === currentDate);

  return (
    <View style={styles.container}>
      {todaysTasks.length > 0 ? (
        <>
          <Text style={styles.title}>Today's tasks</Text>
          <FlatList
            scrollEnabled={false}
            data={todaysTasks}
            keyExtractor={(item) => item.text}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>{item.text}</Text>

                {/* Mark task as done */}
                <TouchableOpacity
                  style={styles.deleteTask}
                  onPress={() => taskDone({ doneTask: item.text })}
                >
                  <FontAwesome name={"check"} color={"green"} size={20} />
                </TouchableOpacity>

                {/* Delete task */}
                <TouchableOpacity
                  style={styles.deleteTask}
                  onPress={() => removeTask(item.text)}
                >
                  <FontAwesome name={"close"} color={"darkred"} size={20} />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : (
        <Text style={{ textAlign: "center", fontWeight: "600", fontSize: 16 }}>
          No tasks today
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
