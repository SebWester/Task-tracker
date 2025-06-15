import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();

  const appTheme = theme === "light" ? lightStyles : darkStyles;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={appTheme.container}>
        <Text>Settings</Text>
        <TouchableOpacity style={appTheme.themeButton} onPress={toggleTheme}>
          <Text>Change theme</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  themeButton: {
    backgroundColor: "#bbbbbb",
    padding: 10,
    marginTop: 10,
    borderRadius: 12,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222831",
  },
  themeButton: {
    backgroundColor: "#bbbbbb",
    padding: 10,
    marginTop: 10,
    borderRadius: 12,
  },
});
