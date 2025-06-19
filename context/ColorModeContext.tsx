import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ColorMode = true | false;

type ColorModeContext = {
  mode: ColorMode;
  toggleMode: () => void;
};

const ColorModeContext = createContext<ColorModeContext | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ColorMode>(false);

  useEffect(() => {
    (async () => {
      const storedMode = await AsyncStorage.getItem("colorMode");
      if (storedMode !== null) {
        setMode(storedMode === "true");
      }
    })();
  }, []);

  const toggleMode = async () => {
    const newMode: ColorMode = !mode;
    setMode(newMode);

    await AsyncStorage.setItem("colormode", newMode.toString());
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
