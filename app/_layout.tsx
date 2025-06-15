import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "lightgray",
          }}
        >
          <Tabs.Screen
            name="(home)"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="(settings)"
            options={{
              title: "Settings",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="cog" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
