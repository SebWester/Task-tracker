import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { DarkTheme } from "@react-navigation/native";

export default function CompletedTasks({ newDone }: { newDone: boolean }) {
  const [markedTasks, setMarkedTasks] = useState<string[]>([]);
  const { theme } = useTheme();

  const appTheme = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    loadCompletedTasks();
  }, [newDone]);

  async function loadCompletedTasks() {
    try {
      const completed = await AsyncStorage.getItem("done");
      if (completed) setMarkedTasks(JSON.parse(completed));
    } catch (err) {
      console.error("Could not load completed tasks");
    }
  }

  //   useEffect(() => {
  //     async function removeDuplicates() {

  //     // !!! Delete duplicates !!!
  //       const stored = await AsyncStorage.getItem("done");
  //       if (stored) {
  //         const parsed = JSON.parse(stored);
  //         const unique = [...new Set(parsed)];
  //         await AsyncStorage.setItem("done", JSON.stringify(unique));
  //       }

  //     //  !!! Delete all completed tasks !!!
  //       await AsyncStorage.removeItem("done");
  //     }

  //     removeDuplicates();
  //   }, []);

  return (
    <View style={appTheme.container}>
      {markedTasks.length > 0 ? (
        <>
          <Text style={appTheme.title}>Completed Tasks</Text>
          {markedTasks.map((item) => (
            <View key={item} style={appTheme.taskItem}>
              <Text style={appTheme.taskText}>{item}</Text>
            </View>
          ))}
        </>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}

const lightTheme = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
  taskItem: {
    backgroundColor: "#c8e6c9",
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
    textDecorationLine: "line-through",
  },
});

const darkTheme = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
    color: "white",
  },
  taskItem: {
    backgroundColor: "#c8e6c9",
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
    textDecorationLine: "line-through",
  },
});
