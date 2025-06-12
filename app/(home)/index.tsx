import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet } from "react-native";
import AddToDo from "../../components/addToDo";
import AllTasks from "@/components/allTasks";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.text}>Task tracker</Text>
        <AddToDo />

        <AllTasks />
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
    marginTop: 10,
    marginBottom: 10,
  },
});
