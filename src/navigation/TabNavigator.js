import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ClasesStack from "./ClasesStack";
import ReservaScreen from "../screens/ReservaScreen";
import PerfilScreen from "../screens/PerfilScreen";
import ClasesScreen from "../screens/ClasesScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={ClasesStack}
        options={{
          title: "Clases disponibles",
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />

      <Tab.Screen
        name="Reservas"
        component={ReservaScreen}
        options={{
          title: "Mis Reservas",
          tabBarIcon: ({ color }) => <Ionicons size={28} name="list-outline" color={color} />,
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          title: "Mi Perfil",
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person-circle-outline" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}