import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import AddToDo from "../../components/addToDo";
import AllTasks from "@/components/allTasks";
import CompletedTasks from "@/components/completedTasks";

export default function Index() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  function triggerRefresh() {
    setRefreshFlag((prev) => !prev);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}>Daily task tracker</Text>
          <AddToDo onAdd={triggerRefresh} />
          <AllTasks refresh={refreshFlag} />
          <CompletedTasks />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
