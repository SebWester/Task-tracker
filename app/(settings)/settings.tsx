import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();

  const appTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={appTheme.container}>
        <Text style={appTheme.header}>Settings</Text>
        <TouchableOpacity style={appTheme.themeButton} onPress={toggleTheme}>
          <Text>Change theme</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontSize: 25,
    marginTop: 20,
  },
  themeButton: {
    backgroundColor: "#bbbbbb",
    padding: 10,
    marginTop: 10,
    borderRadius: 12,
  },
});

const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#222831",
  },
  header: {
    color: "white",
    fontSize: 25,
    marginTop: 20,
  },
  themeButton: {
    backgroundColor: "#bbbbbb",
    padding: 10,
    marginTop: 10,
    borderRadius: 12,
  },
});
