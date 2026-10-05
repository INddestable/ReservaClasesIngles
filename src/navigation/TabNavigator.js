import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ClasesStack from "./ClasesStack";
import ReservaScreen from "../screens/ReservaScreen";
import PerfilScreen from "../screens/PerfilScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={ClasesStack}
        options={{
          title: "Inicio",
        }}
      />

      <Tab.Screen
        name="Reservas"
        component={ReservaScreen}
        options={{
          title: "Reservas",
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          title: "Perfil",
        }}
      />
    </Tab.Navigator>
  );
}