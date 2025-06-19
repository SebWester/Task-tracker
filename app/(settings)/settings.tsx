import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useMode } from "@/context/ColorModeContext";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { mode, toggleMode } = useMode();

  console.log(mode);

  const appTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={appTheme.container}>
        <Text style={appTheme.header}>Settings</Text>
        <TouchableOpacity style={appTheme.button} onPress={toggleTheme}>
          <Text style={appTheme.buttonText}>Change theme</Text>
        </TouchableOpacity>

        <TouchableOpacity style={appTheme.button} onPress={toggleMode}>
          <Text style={appTheme.buttonText}>Change color mode</Text>
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
  button: {
    backgroundColor: "#bbbbbb",
    padding: 10,
    marginTop: 10,
    width: 150,
    borderRadius: 12,
  },
  buttonText: {
    textAlign: "center",
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
  button: {
    backgroundColor: "#bbbbbb",
    padding: 10,
    marginTop: 10,
    borderRadius: 12,
    width: 150,
  },
  buttonText: {
    textAlign: "center",
  },
});
