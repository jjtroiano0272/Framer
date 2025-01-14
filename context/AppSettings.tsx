import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface SettingsContextType {
  appSettings: {
    inputType: "fightStick" | "gamePad" | "leverless" | "custom";
    inputConfig: string[][];
  };
  appSettingsInitialized: boolean;
  setSettings: (key: string, value: any) => void;
}

const defaultValues: SettingsContextType = {
  appSettings: {
    inputType: "fightStick",
    inputConfig: [
      ["LP", "MP", "HP", "HP+HK"], // top row of buttons
      ["LK", "MK", "HK", "MP+MK"], // bottom row of buttons
    ],
  },
  appSettingsInitialized: false,
  setSettings: () => {
    console.warn("setSettings not implemented.");
  },
};

export const AppSettingsContext =
  createContext<SettingsContextType>(defaultValues);

export const AppSettingsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [appSettingsInitialized, setAppSettingsInitialized] = useState(false);
  const [appSettings, setAppSettings] = useState(defaultValues.appSettings);

  useEffect(() => {
    AsyncStorage.getItem("appSettings").then((data) => {
      if (data) {
        setAppSettings(JSON.parse(data));
      }
      setAppSettingsInitialized(true);
    });
  }, []);

  const setSettings = (key: string, value: any) => {
    const mergedSettings = {
      ...appSettings,
      [key]: value,
    };
    setAppSettings(mergedSettings);
    AsyncStorage.setItem("appSettings", JSON.stringify(mergedSettings));

    console.log(`mergedSettings: ${JSON.stringify(mergedSettings, null, 2)}`);
  };

  return (
    <AppSettingsContext.Provider
      value={{ appSettings, appSettingsInitialized, setSettings }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
