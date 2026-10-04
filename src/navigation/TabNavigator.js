import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InicioScreen from "../screens/InicioScreen";
import ClasesStack from "./ClasesStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={InicioScreen}
      />

      <Tab.Screen
        name="Clases"
        component={ClasesStack}
      />
    </Tab.Navigator>
  );
}