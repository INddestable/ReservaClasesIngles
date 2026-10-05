import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ClasesStack from "./ClasesStack";
import ReservaScreen from "../screens/ReservaScreen";
import PerfilScreen from "../screens/PerfilScreen";
import ClasesScreen from "../screens/ClasesScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={ClasesStack}
        options={{
          title: "Clases disponibles",
        }}
      />

      <Tab.Screen
        name="Reservas"
        component={ReservaScreen}
        options={{
          title: "Mis Reservas",
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          title: "Mi Perfil",
        }}
      />
    </Tab.Navigator>
  );
}