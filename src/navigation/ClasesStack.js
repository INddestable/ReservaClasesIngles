import react from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClasesScreen from "../screens/ClasesScreen";
import DetalleClase from "../screens/DetalleClasesScreen";
// para la navegación Stack, la constante debe ser Stack
const Stack = createNativeStackNavigator();
export default function ClasesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        //nombre que se le dará al componente
        //qué pasa si por ejemplo quiero darle el nombre de cada curso de inglés?
        name="Home"
        component={ClasesScreen}
        // va en doble llave porque es un atributo
        options ={{ headerShown: true, title:"Clases de Inglés" }}
      />
      <Stack.Screen
        name="DetalleClase"
        component={DetalleClase}
        options={{ title: "Detalle", headerBackTitle: "Atrás" }}
      />
    </Stack.Navigator>
  );
}
