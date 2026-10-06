import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ReservaProvider } from "./src/context/ReservasContext";
import TabNavigator from "./src/navigation/TabNavigator";
import { colors } from "./src/theme";
import { LoginProvider } from "./src/context/LoginContext";

const temaNavegacion = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.fondo,
    card: colors.superficie,
    primary: colors.primario,
    text: colors.texto,
    border: colors.borde,
  },
};

export default function App() {
  return (
    <LoginProvider>
      <ReservaProvider>
        <SafeAreaProvider>
          <NavigationContainer theme={temaNavegacion}>
            <StatusBar style="dark" />
            <TabNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ReservaProvider>
    </LoginProvider>
  );
}