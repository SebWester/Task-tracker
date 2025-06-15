import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AddToDo from "../../components/addToDo";
import AllTasks from "@/components/allTasks";
import CompletedTasks from "@/components/completedTasks";
import { useTheme } from "@/context/ThemeContext";

export default function Index() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { theme } = useTheme();

  const appTheme = theme === "light" ? lightTheme : DarkTheme;

  function triggerRefresh() {
    setRefreshFlag((prev) => !prev);
  }

  function triggerCompleted() {
    setCompleted((prev) => !prev);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={appTheme.container}>
        <ScrollView>
          <Text style={appTheme.text}>Daily task tracker</Text>
          <AddToDo onAdd={triggerRefresh} />
          <AllTasks refresh={refreshFlag} onComplete={triggerCompleted} />
          <CompletedTasks newDone={completed} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});

const DarkTheme = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#222831",
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});
